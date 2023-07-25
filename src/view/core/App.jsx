import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import Home from "../pages/Home";
import Faq from "../pages/Faq";

const App = () => {
  return (
    <div className="main flex items-center justify-center min-h-screen w-screen text-[#E5E4DC] place-content-center">
      <BrowserRouter>
        <Routes>
          <Route exact strict path="/" element={<Home />} />
          <Route exact strict path="/faq" element={<Faq />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default App
