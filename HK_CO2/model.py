import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv(r'C:\Users\sudip\Downloads\India_transport_linear_model_data.csv')
print(f"Loaded {len(df)} years of data")

# Simple model: year + GDP predict transport CO2
X = df[['year', 'gdp_bn']]
y = df['transport_co2_Mt']

model = LinearRegression().fit(X, y)
pred = model.predict(X)

print(f"R² Score: {model.score(X, y):.3f}")
print(f"Equation: transport_CO2 = {model.intercept_:.1f} + {model.coef_[0]:.2f}×year + {model.coef_[1]:.3f}×gdp_bn")

# Plot
plt.figure(figsize=(10,5))
plt.plot(df['year'], y, 'bo-', label='Actual', linewidth=3)
plt.plot(df['year'], pred, 'r--', label='Predicted', linewidth=2)
plt.xlabel('Year')
plt.ylabel('Transport CO₂ (Mt)')
plt.title('India Transport CO₂ Model')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('model_result.png', dpi=300)
plt.show()

print("✅ Model complete! Check model_result.png")

