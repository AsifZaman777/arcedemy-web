import { Route,Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/adminPage/Admin";
import "./App.css";
import CambridgePapers from "./components/pastPapers/CambridgePapers";
import EdexcelPapers from "./components/pastPapers/EdexcelPapers";


function App() {

  return (
    
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/dashboard/*" element={<Admin />} />
    <Route path="/cambridge" element={<CambridgePapers/>} />
    <Route path="/edexcel" element={<EdexcelPapers/>} />
  </Routes>
  )
}

export default App;