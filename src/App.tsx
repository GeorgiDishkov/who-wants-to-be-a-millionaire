import { Route, Routes } from "react-router-dom";
import StartGame from "./pages/StartGame";
import EndGame from "./pages/EndGame";
import InGame from "./pages/inGame";

function App() {

  return (
    <Routes>
      <Route path="/" element={<StartGame />} />
      <Route path="/in-game" element={<InGame />} />
      <Route path="/end-game" element={<EndGame />} />
    </Routes>
  );
}

export default App;
