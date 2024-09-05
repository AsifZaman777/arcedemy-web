import { Route,Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/adminPage/Admin";
import "./App.css";
import CambridgePapers from "./components/pastPapers/CambridgePapers";


function App() {

  return (
    
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/dashboard/*" element={<Admin />} />
    <Route path="/cambridge" element={<CambridgePapers/>} />
  </Routes>
  )
}

export default App;