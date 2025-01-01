import { Route,Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/adminPage/Admin";
import "./App.css";

import CamPaperSelect from "./components/pastPapers/cambridge/CamPaperSelect";
import CambridgePapers from "./components/pastPapers/cambridge/CambridgePapers";
import EdPaperSelect from "./components/pastPapers/edexcel/EdPaperSelect";
import EdexcelPapers from "./components/pastPapers/edexcel/EdexcelPapers";
import McqSolver from "./components/mcqSolver/McqSolverPapers";
import McqTest from "./components/mcqSolver/McqTest";


function App() {

  return (
    
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/dashboard/*" element={<Admin />} />
    <Route path="/cambridge" element= {<CamPaperSelect/>} />
    <Route path="/cambridgepapers" element={<CambridgePapers/>} />
    <Route path="/edexcel" element= {<EdPaperSelect/>} />
    <Route path="/edexcelpapers" element={<EdexcelPapers/>} />
    <Route path="/mcqsolver" element={<McqSolver/>} />
    <Route path="/mcqtest" element={<McqTest/>} />
     <Route path="/mcq-test" element={<McqTest />} />

   
  </Routes>
  )
}

export default App;