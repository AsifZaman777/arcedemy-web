import { Route,Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import "./App.css";


function App() {

  return (
  <Routes>
    <Route path="/" element={<Landing />} />
    {/* <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} /> */}
  </Routes>
  )
}

export default App;