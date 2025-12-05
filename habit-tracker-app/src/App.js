import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import { UserContext } from './contexts/userContext';
import { useEffect, useReducer } from 'react';
import { UserReducer } from './reducers/userReducer';

function App() {

  const [user, dispatch] = useReducer(UserReducer, null);

  useEffect(() => {
    // Set user from local storage if needed
    const storedUser = localStorage.getItem("user_data");
    if (storedUser) {
      dispatch({ type: 'login', payload: JSON.parse(storedUser) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
