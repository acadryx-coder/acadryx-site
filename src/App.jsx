// App.jsx — routes
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import Contact from "./pages/Contact.jsx";
import Demo from "./pages/Demo.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/pricing"  element={<Pricing />} />
      <Route path="/contact"  element={<Contact />} />
      <Route path="/demo"     element={<Demo />} />
    </Routes>
  );
}
