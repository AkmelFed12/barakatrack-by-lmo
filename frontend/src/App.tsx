import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import Qcm from "./pages/Qcm";
import Chatbot from "./pages/Chatbot";
import Reports from "./pages/Reports";
import Ramadan from "./pages/Ramadan";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/qcm" element={<Qcm />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/ramadan" element={<Ramadan />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}
