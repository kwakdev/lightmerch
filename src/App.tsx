import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/mainpage";
import CartPage from "./pages/cartpage";
import PasswordGate from "./components/PasswordGate";

function App() {
  return (
    <PasswordGate>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </PasswordGate>
  );
}

export default App;