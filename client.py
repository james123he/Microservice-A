# client.py
import zmq
import pickle
from datetime import datetime, timedelta

context = zmq.Context()
socket = context.socket(zmq.REQ)
socket.connect("tcp://localhost:5555")

# Example datetimes
start_time = datetime.now()
end_time = start_time + timedelta(seconds=5.64)  # simulate a delta

# Send datetime objects to server
socket.send(pickle.dumps((start_time, end_time)))

# Receive result
result = pickle.loads(socket.recv())
print(f"Total seconds: {result[0]}")
print(f"Milliseconds: {result[1]}")
