# server.py
import zmq
import pickle
from datetime import datetime

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:5555")

print("Server is running...")

while True:
    message = socket.recv()
    start_time, end_time = pickle.loads(message)

    delta = end_time - start_time
    total_seconds = delta.total_seconds()
    milliseconds = int(delta.total_seconds() * 1000)

    result = (total_seconds, milliseconds)
    socket.send(pickle.dumps(result))
