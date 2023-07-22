// import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import DataProvider from './context/DataProvider';
import {BrowserRouter,Routes,Route, Navigate, Outlet} from 'react-router-dom';
// components 
import Login from './components/account/Login'
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreateBlog from './components/create/CreateBlog';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/about/About';
import Contact from './components/contact/Contact';
// if user is authenicated then only user can use the other components otherwise navigate it to login page
const PrivateRoute=({isAuthenticated,...props})=>{
  return isAuthenticated ?
    <>
    <Header/>
    <Outlet/>
    </>
    :
    <Navigate replace to='/login'/>
}

function App() {

  // useState for redirect to login while refreshing and authenticate user
  const [isAuthenticated,isUserAuthenticated]=useState(false);
  return (
    // Initially
    // <div style={{marginTop:70}} >
    //   <Login/>
    // </div>

    // after DataProvider and Home
<DataProvider>
  <BrowserRouter>
  {/* move header to outlet bcoz we want to display nav only when user is authenicated */}
    {/* <Header/> */}
    <div style={{marginTop:70}} >
      <Routes> 
      {/* <Route path='/login' element={<Login/>}/> */}
      <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>
      {/* <Login/> */}
      {/* <Home/> */}      
      {/* wrap for private route */}
      <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
      <Route path='/' element={<Home/>}/>
      </Route>


      <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
      <Route path='/create' element={<CreateBlog/>}/>
      </Route>

      {/* to open a particular blog */}
      <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
      <Route path='/details/:id' element={<DetailView/>}/>
      </Route>

      <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
      <Route path='/update/:id' element={<Update/>}/>
      </Route>

      <Route path='/about' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
      <Route path='/about' element={<About/>}/>
      </Route>

      <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
      <Route path='/contact' element={<Contact/>}/>
      </Route>

    </Routes> 
    </div>
    </BrowserRouter>
    </DataProvider>

  );
}

export default App;
