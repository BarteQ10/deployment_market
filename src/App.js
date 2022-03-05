import './App.css';
import {Home} from './Home';
import {Category} from './Category';
import {Product} from './Product';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import { Transaction } from './Transaction';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Market in React JS
      </h3>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <button type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        className="navbar-toggler" aria-controls="navbarNav" 
        aria-expanded="false" aria-label="Toggle navigation">
          Menu
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
            <NavLink className="btn btn-light btn-outline-primary m-1" to="/home">
              Home
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="btn btn-light btn-outline-primary m-1" to="/category">
              Category
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="btn btn-light btn-outline-primary m-1" to="/product">
              Product
            </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="btn btn-light btn-outline-primary m-1" to="/transaction">
              Transaction
            </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/category' element={<Category/>}/>
        <Route path='/product' element={<Product/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
      </Routes>
      <footer className="bg-light text-center text-lg-start">    
      <div className="text-center p-3">
        Author: Bartłomiej Paszkowski<br></br>
        Update:14.02.2022   
      </div>      
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
