import './App.css';
import Login from './screens/Login';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
function App() {
  return (
    < CartProvider>

      <Router>
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/Login' element={<Login />}></Route>
            <Route exact path='/SignUp' element={<SignUp />}></Route>
            <Route exact path='/myOrder' element={<MyOrder />}></Route>
          </Routes>
        </div>
      </Router>

    </CartProvider>
  );
}

export default App;
