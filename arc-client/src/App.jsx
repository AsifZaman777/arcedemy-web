import { Route,Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Admin from "./pages/adminPage/Admin";
import "./App.css";


function App() {

  return (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/dashboard/*" element={<Admin />} />
  </Routes>
  )
}

export default App;