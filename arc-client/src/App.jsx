import { Route,Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/adminPage/Admin";
import "./App.css";
import PastPapers from "./components/pastPapers/PastPapers";


function App() {

  return (
    
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/dashboard/*" element={<Admin />} />
    <Route path="/pastpapers" element={<PastPapers/>} />
  </Routes>
  )
}

export default App;