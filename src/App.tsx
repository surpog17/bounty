import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginComponent } from "./page/Login";
import { RegisterComponent } from "./page/Registeration";
import EmployeeAttendance from "./page/Attendance";
import Navbar from "./components/NavBar";
import ProfilePage from "./page/profile";
import NotFound from "./page/NotFound";
import Footer from "./components/Footer";
function App() {
  const auth = localStorage.getItem("login");
  
  
  return (
       <BrowserRouter>
      {auth && <Navbar  />}

      <Routes>
        
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<RegisterComponent />} />
        <Route path="/attendance" element={<EmployeeAttendance />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {auth && <Footer />}
    </BrowserRouter>
  )
}

export default App
