import { Routes, Route } from "react-router-dom";
import Homepage from "./componets/Homepage";
import ConnectPage from "./componets/ConnectPage";
import Adminpage from "./componets/Passwordpage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/connect" element={<ConnectPage />} />
      <Route path="/admin" element={<Adminpage />} />
    </Routes>
  );
}

export default App;
