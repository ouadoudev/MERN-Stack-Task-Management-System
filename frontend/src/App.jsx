import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Layout from "./components/dashboard/layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VerifyEmail from "./components/profile/verifyEmail";
import EmailSent from "./components/profile/EmailSent";

import UpdateUser from "./components/profile/updateProfile";
import Task from "./components/dashboard/Task";
import PasswordResetForm from "./components/profile/PasswordResetForm";

axios.defaults.baseURL = "https://taskly-q9iz.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route path="/tasks" element={<Task />} />
        </Route>
        <Route path="/password-reset" element={<PasswordResetForm />} />
        <Route path={`/update/profile/:id`} element={<UpdateUser />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/email-sent" element={<EmailSent />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
