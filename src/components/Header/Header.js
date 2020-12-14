import React from 'react';
import {useHistory} from 'react-router-dom'
import Button from "../Button/Button";


import './header.css'
import firebaseConfig from "../../config/firebase-config";

function Header({variant}) {

  const history = useHistory()

  return (
    <div className='header'>
      {
        variant === 'main' ?
          <Button className='blue' onClick={() => (history.push('/get-started'))} title={'Get Started'}/>
          :
          <Button className='transparent' onClick={() => (history.goBack())} title={'Back'}/>
      }

      <Button onClick={() => firebaseConfig.auth().signOut()} className='transparent' title={'Log out'}/>
    </div>
  );

}

export default Header;