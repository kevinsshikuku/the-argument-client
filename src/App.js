import React,{ useEffect } from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';
import ReactGA from 'react-ga';
import './App.css';



import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp/index.js";
import Header from "./Components/Header";
import FabComponent from "./Components/Fab";
import AddMessage  from "./pages/AddMessage/index";
import About from "./pages/About/About";

ReactGA.initialize('UA-202240616-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  
    const history = useHistory();
   history.listen((location) => {
      ReactGA.set({page:location.pathname});
      ReactGA.pageview(location.pathname)
   });
  
  useEffect( () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
},[history] )
  
  return (
    <div className="App">
          <Header/>
          <FabComponent/>
          <Switch>
             <Route exact path="/" component={Home}/>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/signIn" component={SignUp}/>
             <Route exact path="/createmessage" component={AddMessage}/>
             <Route exact path="/about" component={About}/>
          </Switch>

    </div>
  );
}

export default App;
