import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
const socket = io.connect("http://localhost:4000");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join the chat</h3>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} room={room} username={name} />
      )}
    </div>
  );
}

export default App;
