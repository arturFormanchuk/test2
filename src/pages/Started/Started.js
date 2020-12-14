import React, {Component, useContext} from 'react';
import {AuthContext} from "../../components/Auth/Auth";
import {Redirect} from "react-router-dom";
import Header from "../../components/Header/Header";
import img from '../../image.png'

import './Started.css'

function Started() {

  const {currentUser} = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/login"/>;
  }

  return (
    <>
      <Header variant='started'/>
      <div className='background'>
        <img className='img' src={img}/>
      </div>
    </>
  );

}

export default Started;