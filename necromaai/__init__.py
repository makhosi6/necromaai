import numpy as np
import tensorflow as tf
import json


with open('./data/ithuba.json') as f:
   data = np.array(json.load(f))

print(data)

# Prepare input and output data
X = data[:-1]  # Input sequences
y = data[1:]   # Output sequences

# Normalize the data
X_mean, X_std = np.mean(X), np.std(X)
y_mean, y_std = np.mean(y), np.std(y)
X = (X - X_mean) / X_std
y = (y - y_mean) / y_std

# Split the data into training and testing sets
train_size = int(0.8 * len(X))
X_train, X_test = X[:train_size], X[train_size:]
y_train, y_test = y[:train_size], y[train_size:]

# Build the LSTM model
model = tf.keras.Sequential()
model.add(tf.keras.layers.LSTM(128, input_shape=(6,1), return_sequences=True))
model.add(tf.keras.layers.Dropout(0.2))
model.add(tf.keras.layers.LSTM(128))
model.add(tf.keras.layers.Dense(6))

# Compile the model
model.compile(loss='mse', optimizer='adam')

# Train the model
model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_test, y_test))

# Generate a prediction for the next item in the array
next_items = model.predict(np.expand_dims(X_test[-1], axis=0)) * y_std + y_mean
for item in next_items:
   print(np.array(item))


