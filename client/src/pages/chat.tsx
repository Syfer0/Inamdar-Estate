import io from "socket.io-client";
const socket = io.connect();
function chat() {
  const sendMessage = () => {};
  return (
    <div>
      <input placeholder="Message..." />
      <button>Send Message</button>
    </div>
  );
}

export default chat;
