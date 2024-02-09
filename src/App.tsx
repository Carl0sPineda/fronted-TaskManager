import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Activity from "./pages/Activity";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
      <Router>
        <Navbar setSearchTerm={handleSearchTermChange} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/actividad" element={<Activity />} />
        </Routes>
        <Footer />
        <Toaster position="top-right" reverseOrder={false} />
      </Router>
    </div>
  );
}

export default App;
