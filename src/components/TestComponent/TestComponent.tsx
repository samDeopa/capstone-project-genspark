import { useState } from "react";

const TestComponent = () => {
  const handleLogin = () => {
    setResult(`Logged in Successfully ${userId}`);
  };
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  return (
    <div>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <h1>{result}</h1>
    </div>
  );
};

export default TestComponent;
