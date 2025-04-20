import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
      </Routes>
    </div>
  );
};

export default App;
