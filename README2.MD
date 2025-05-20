This microservice computes the difference between two datetime objects, returning:

  - Total seconds (as float)

  - Milliseconds (as int)

Communication is done via ZeroMQ (REQ-REP pattern) and Python's pickle for serialization.

How to Programmatically REQUEST Data:

  1. Connect to the service on port 5555.

  2. Serialize a tuple of two datetime objects using pickle.

  3. Send the serialized message via ZeroMQ REQ socket.

Example (Client Request)
  1. include imports
  2. Setup ZMQ REQ socket
  3. Create datetime inputs
  4. Set start and end times:
     start_time = start_time_example
     end_time = end_time_example
  5. Send serialized datetime pair:
     socket.send(pickle.dumps((start_time, end_time)))

How to Programmatically RECEIVE Data:
Wait for a response from the server after sending your request.

Deserialize the received binary response using pickle.

You will get a tuple: (total_seconds: float, milliseconds: int)

Example (Client Response Handling)
  1. include imports
  2. Setup ZMQ REQ socket
  3. Create datetime inputs
  4. Send serialized datetime pair
  5. Receive and decode response:
     result = pickle.loads(socket.recv())
