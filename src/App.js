import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Booking from './pages/Booking';
import ContactUs from './pages/ContactUs';
import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/contactus" element={<ContactUs />}/>
          <Route path="/booking" element={<Booking />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
