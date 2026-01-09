import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contacts from "../pages/Contacts";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Home from "../pages/Home";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />}></Route>
            <Route path="/contacts" element={
                <ProtectedRoute>
                    <Contacts />
                </ProtectedRoute>
            } />
            <Route path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            ></Route>
        </Routes>
    )
}
export default AppRoutes;
