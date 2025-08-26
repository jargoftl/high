import { Routes, Route } from "react-router-dom";
import Homepage from "./componets/Homepage";
import ConnectPage from "./componets/ConnectPage";
import Passwordpage from "./componets/passwordpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/connect" element={<ConnectPage />} />
      <Route path="/admin" element={<Passwordpage />} />
    </Routes>
  );
}

export default App;
