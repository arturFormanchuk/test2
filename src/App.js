import React from "react";
import './App.css';
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Started from "./pages/Started/Started";
import {BrowserRouter, Route} from "react-router-dom";
import {AuthProvider} from "./components/Auth/Auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Route path='/login' exact component={Login}/>
        <Route path='/' exact component={Main}/>
        <Route path='/get-started' exact component={Started}/>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

