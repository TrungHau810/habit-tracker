import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import cookie from 'react-cookies';

import Home from './pages/Home';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { UserContext } from './contexts/userContext';
import { useEffect, useReducer } from 'react';
import { UserReducer } from './reducers/userReducer';
import Dashboard from './pages/Habit/Dashboard';
import HabitDetail from './pages/Habit/HabitDetail';
import NewHabit from './pages/Habit/NewHabit';
import { Toaster } from 'react-hot-toast';
import NewLog from './pages/Habit/NewLog';
import Contact from './pages/Contact';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';

function App() {

  const [user, dispatch] = useReducer(UserReducer, null);

  useEffect(() => {
    const token = cookie.load('access_token');
    if (token) {
      const storedUser = localStorage.getItem("user_data");
      if (storedUser) dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
    else
      dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <UserContext.Provider value={[user, dispatch]}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/habit/:id" element={<HabitDetail />} />
            <Route path="/dashboard/habit/create" element={<NewHabit />} />
            <Route path="/dashboard/habit/log/create" element={<NewLog />} />

            <Route path='/forgot-password' element={<ForgotPassword />} />

            <Route path='/about' element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
