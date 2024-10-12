import { Route,Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/adminPage/Admin";
import "./App.css";
import CambridgePapers from "./components/pastPapers/CambridgePapers";
import EdexcelPapers from "./components/pastPapers/EdexcelPapers";
import McqSolver from "./components/mcqSolver/McqSolverPapers";
import McqTest from "./components/mcqSolver/McqTest";


function App() {

  return (
    
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/dashboard/*" element={<Admin />} />
    <Route path="/cambridge" element={<CambridgePapers/>} />
    <Route path="/edexcel" element={<EdexcelPapers/>} />
    <Route path="/mcqsolver" element={<McqSolver/>} />
    <Route path="/mcqtest" element={<McqTest/>} />
  </Routes>
  )
}

export default App;