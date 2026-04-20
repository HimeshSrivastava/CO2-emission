import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv(r'C:\Users\sudip\Downloads\India_transport_linear_model_data.csv')
print("✅ Dataset loaded:", df.shape)
print(df[['year', 'gdp_bn', 'pop_bn', 'transport_co2_Mt']].round(2))

# Prepare features
X = df[['year', 'gdp_bn', 'pop_bn']]
y = df['transport_co2_Mt']

# Train/test split (time-aware: first 75% train, last 25% test)
split = int(0.75 * len(df))
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

print(f"\nTrain: {len(X_train)} years | Test: {len(X_test)} years")

# Fit model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

# Accuracy metrics
print("\n" + "="*50)
print("MODEL PERFORMANCE")
print("="*50)
print(f"TRAINING SET (n={len(X_train)}):")
print(f"  R²:     {r2_score(y_train, y_train_pred):.3f}")
print(f"  MAE:    {mean_absolute_error(y_train, y_train_pred):.2f} Mt")
print(f"  RMSE:   {np.sqrt(mean_squared_error(y_train, y_train_pred)):.2f} Mt")

print(f"\nTEST SET (n={len(X_test)}):")
print(f"  R²:     {r2_score(y_test, y_test_pred):.3f}")
print(f"  MAE:    {mean_absolute_error(y_test, y_test_pred):.2f} Mt")
print(f"  RMSE:   {np.sqrt(mean_squared_error(y_test, y_test_pred)):.2f} Mt")

print(f"\nModel Equation:")
print(f"transport_co2 = {model.intercept_:.1f}")
print(f"  + {model.coef_[0]:.2f} × year")
print(f"  + {model.coef_[1]:.3f} × gdp_bn")
print(f"  + {model.coef_[2]:.1f} × pop_bn")

# Predictions table
results = pd.DataFrame({
    'Year': df['year'],
    'Actual_Mt': y.round(2),
    'Predicted_Mt': np.concatenate([y_train_pred, y_test_pred]).round(2),
    'Error_Mt': (y - np.concatenate([y_train_pred, y_test_pred])).round(2)
})
print("\n" + "="*50)
print("PREDICTIONS TABLE")
print("="*50)
print(results.to_string(index=False))

# Future predictions (2029-2030 example)
future = pd.DataFrame({
    'year': [2029, 2030],
    'gdp_bn': [5000, 5500],  # Hypothetical GDP growth
    'pop_bn': [1.45, 1.47]
})
future_pred = model.predict(future)
print(f"\nFUTURE PREDICTIONS:")
print(f"2029: {future_pred[0]:.1f} Mt")
print(f"2030: {future_pred[1]:.1f} Mt")

# Plot
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
plt.scatter(y, np.concatenate([y_train_pred, y_test_pred]), alpha=0.7)
plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--', lw=2)
plt.xlabel('Actual Transport CO₂ (Mt)')
plt.ylabel('Predicted (Mt)')
plt.title('Actual vs Predicted')

plt.subplot(1, 2, 2)
plt.plot(df['year'][:split], y[:split], 'go-', label='Train Actual', linewidth=2)
plt.plot(df['year'][split:], y[split:], 'bo-', label='Test Actual', linewidth=2)
plt.plot(df['year'], np.concatenate([y_train_pred, y_test_pred]), 'r--', 
         label='Predicted', linewidth=2)
plt.xlabel('Year')
plt.ylabel('Transport CO₂ (Mt)')
plt.legend()
plt.grid(True, alpha=0.3)
plt.title('Time Series Fit')

plt.tight_layout()
plt.savefig('model_evaluation.png', dpi=300, bbox_inches='tight')
plt.show()

# Save results
results.to_csv('model_predictions.csv', index=False)
print("\n✅ Saved: model_predictions.csv + model_evaluation.png")
