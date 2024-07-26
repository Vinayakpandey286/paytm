import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/Singup";
import { Signin } from "./pages/Singin";
import { SendMoney } from "./pages/SendMoney";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Signup />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
