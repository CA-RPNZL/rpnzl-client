import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AppointmentProvider } from './contexts/AppointmentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Homepage from './pages/Homepage';
import Aboutpage from './pages/About';
import Services from './pages/Services';
import ContactUs from './pages/ContactUs';
import Booking from './pages/Booking';
import AdminPortal from './pages/AdminPortal';
import UserPortal from './pages/UserPortal';
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
  
  return (
    <div className="App">
      <AppointmentProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/about" element={<Aboutpage />}/>
            <Route path="/services" element={<Services />}/>
            <Route path="/contactus" element={<ContactUs />}/>
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<SignUp />}/> 
            <Route path="/userportal" element={<UserPortal />}/>
            <Route path="/booking" element={<Booking />} />
          </Routes>
          <Footer />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{ backgroundColor: '#E8EADD', color: '#FBF8F0', border: '#ABAF95' }}
            />
        </BrowserRouter>
        </AppointmentProvider>
    </div>
  );
}

export default App;