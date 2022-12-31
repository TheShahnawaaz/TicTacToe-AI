// import logo from './logo.svg';
import AIBoard from "./Components/AIBoard";
import "./App.css";
import Navbar from "./Components/Navbar";
import RandBoard from "./Components/RandBoard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reset from "./Components/Reset";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<AIBoard />}></Route>
          <Route exact path="/hard" element={<AIBoard />}></Route>
          <Route exact path="/easy" element={<RandBoard />}></Route>
        </Routes>
        {/* <Reset /> */}
      </Router>
    </div>
  );
}

export default App;
