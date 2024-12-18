import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./app/page";        // Import HomePage
import SignIn from "./signin/page";       // Import SignIn
import GamePage from "./app/gameplay/page"; // Import GamePage inside the gameplay folder

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
