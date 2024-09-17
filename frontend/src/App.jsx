import "./App.css";
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";
import About from "./component/about/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./component/signup/Signup";
import Signin from "./component/signin/Signin";
import Todo from "./component/todo/Todo";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const id =sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login())
    }
    
  },[])
  return (
    <>
      
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/todo" element={<Todo/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/signin" element={<Signin/>}/>
        </Routes>
        <Footer />
      </Router>
      
    </>
  );
}

export default App;
