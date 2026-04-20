# FIXED pk.py - Updated for your ACTUAL column names (Petrol_Tonnes etc.)
# Copy-paste this complete corrected script

import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, mean_absolute_error
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau, Callback
import matplotlib.pyplot as plt
import os

class WarmupSchedule(Callback):
    def __init__(self, warmup_epochs=20, base_lr=0.001):
        super().__init__()
        self.warmup_epochs = warmup_epochs
        self.base_lr = base_lr
    
    def on_epoch_begin(self, epoch, logs=None):
        if epoch < self.warmup_epochs:
            lr = self.base_lr * (epoch + 1) / self.warmup_epochs
            self.model.optimizer.learning_rate.assign(lr)

# Step 1: Load data (YOUR actual columns)
df = pd.read_csv(r'C:\Users\sudip\Downloads\FINAL_INDIA_TRANSPORT_MODEL.csv')
print("✅ Dataset loaded:", df.shape)
print("Columns:", df.columns.tolist())

# Step 2: Fix date parsing (use Year/Month columns you have)
df['date'] = pd.to_datetime(df[['Year', 'Month']].assign(day=1))
df = df.sort_values('date').reset_index(drop=True)
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month

# YOUR actual feature columns (snake_case)
feature_cols = ['Petrol_Tonnes', 'Diesel_Tonnes', 'ATF_Tonnes', 'Lubes_Tonnes',
                'Population_millions', 'total_fossil_co2_Mt', 'urban_pct', 'gdp_growth_pct',
                'year', 'month']
target_col = 'transport_co2_proxy_Mt'

print("Target stats:", df[target_col].describe())

df_features = df[feature_cols + [target_col]].copy().dropna()
print(f"✅ Clean data: {df_features.shape}")

# Step 3: Scaling & sequences
scaler_features = StandardScaler()
scaler_target = StandardScaler()
scaled_features = scaler_features.fit_transform(df_features[feature_cols])
scaled_target = scaler_target.fit_transform(df_features[[target_col]])

TIME_STEPS = 12
def create_sequences(data, target, time_steps=12):
    X, y = [], []
    for i in range(len(data) - time_steps):
        X.append(data[i:i + time_steps])
        y.append(target[i + time_steps])
    return np.array(X), np.array(y)

X, y = create_sequences(scaled_features, scaled_target)
split = int(0.8 * len(X))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]
print(f"✅ Sequences - Train: {X_train.shape}, Test: {X_test.shape}")

# Checkpoints
os.makedirs('checkpoints', exist_ok=True)

# Step 4: Model
model = Sequential([
    LSTM(100, return_sequences=True, input_shape=(TIME_STEPS, len(feature_cols))),
    Dropout(0.2),
    LSTM(100, return_sequences=True),
    Dropout(0.2),
    LSTM(50),
    Dropout(0.2),
    Dense(25),
    Dense(1)
])
model.compile(optimizer=Adam(learning_rate=0.001), loss='mse')

# Step 5: Callbacks with warmup
warmup = WarmupSchedule(warmup_epochs=20)
checkpoint_best = ModelCheckpoint('checkpoints/best_co2_model.h5', monitor='val_loss', 
                                 save_best_only=True, mode='min', verbose=1)
checkpoint_epoch = ModelCheckpoint('checkpoints/epoch_{epoch:03d}.h5', 
                                  save_best_only=False, save_freq='epoch', verbose=0)
early_stop = EarlyStopping(monitor='val_loss', patience=25, restore_best_weights=True)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=12)

print("\n🚀 Starting training with warmup + checkpoints...")

history = model.fit(
    X_train, y_train,
    epochs=150,
    batch_size=16,
    validation_split=0.1,
    callbacks=[warmup, checkpoint_best, checkpoint_epoch, early_stop, reduce_lr],
    verbose=1
)

# Step 6: Results
train_pred = model.predict(X_train, verbose=0)
test_pred = model.predict(X_test, verbose=0)

train_pred = scaler_target.inverse_transform(train_pred)
y_train_inv = scaler_target.inverse_transform(y_train)
test_pred = scaler_target.inverse_transform(test_pred)
y_test_inv = scaler_target.inverse_transform(y_test)

print(f"\n✅ RESULTS:")
print(f"Train RMSE: {np.sqrt(mean_squared_error(y_train_inv, train_pred)):.4f} Mt")
print(f"Test RMSE: {np.sqrt(mean_squared_error(y_test_inv, test_pred)):.4f} Mt")

# Future 12 months (2026-2027)
last_sequence = scaled_features[-TIME_STEPS:].reshape(1, TIME_STEPS, len(feature_cols))
future_preds = []
last_year = df_features['year'].max()

for i in range(12):
    pred = model.predict(last_sequence, verbose=0)
    future_preds.append(pred[0, 0])
    
    # Simple feature extrapolation for next step
    new_row = np.zeros(len(feature_cols))
    new_row[-2:] = [last_year + (i // 12) + 1, (i % 12) + 1]  # year, month
    last_sequence = np.roll(last_sequence, -1, axis=1)
    last_sequence[0, -1, :] = new_row

future_preds = scaler_target.inverse_transform(np.array(future_preds).reshape(-1, 1)).flatten()
print(f"\n🔮 2026-2027 Predictions (Mt CO2):")
for i, pred in enumerate(future_preds):
    print(f"  Month {i+1}: {pred:.4f}")

# Plot
plt.figure(figsize=(15, 4))
plt.subplot(1, 3, 1)
plt.plot(history.history['loss'], label='Train')
plt.plot(history.history['val_loss'], label='Val')
plt.title('Loss (Warmup 20 epochs)')
plt.legend()

plt.subplot(1, 3, 2)
plt.plot(y_test_inv[:50].flatten(), label='Actual')
plt.plot(test_pred[:50].flatten(), label='Pred')
plt.title('Test Predictions')
plt.legend()

plt.subplot(1, 3, 3)
plt.plot(future_preds, 'o-')
plt.title('Future CO2 (Mt)')
plt.ylabel('transport_co2_proxy_Mt')

plt.tight_layout()
plt.savefig('co2_model_results.png', dpi=300)
plt.show()

model.save('final_co2_model.h5')
print("\n✅ SAVED: final_co2_model.h5 + checkpoints/")
