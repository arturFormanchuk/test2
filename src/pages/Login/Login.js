import React, {useContext, useState} from 'react'
import './login.css'
import firebase from "firebase";
import Button from "../../components/Button/Button";
import {Redirect} from "react-router-dom";
import {AuthContext} from "../../components/Auth/Auth";

function Login() {

  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  let ref = firebase.database().ref(`logins`)

  const LoginWithGoogle = () => {

    firebase.auth().signInWithPopup(googleProvider).then(async function (result) {

      let data = ''
      await ref.once('value').then(function (snapshot) {
          data = snapshot.val()
        }
      )

      let prevlogins = data.logins ? data.logins : []

      let time = Math.round(new Date(Date.now()).getMinutes() / 10)

      await ref.set(
        {
          logins: [...prevlogins, {source: 'google', time: String(time)}]
        }
      )

    }).catch(function (error) {
      alert(error)
    });
  }

  const LoginWithFacebook = () => {

    firebase.auth().signInWithPopup(facebookProvider).then(async function (result) {

      let data = ''
      await ref.once('value').then(function (snapshot) {
          data = snapshot.val()
        }
      )

      let prevlogins = data.logins ? data.logins : []

      let time = Math.round(new Date(Date.now()).getMinutes() / 10)

      await ref.set(
        {
          logins: [...prevlogins, {source: 'facebook', time: String(time)}]
        }
      )
    }).catch(function (error) {
      alert(error)
    });
  }

  const {currentUser} = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/"/>;
  }

  return (
    <div className='wrapper'>
      <div className="login__card center login__card-content">
        <span className='login_text '>Login</span>
        <div className='positionButtons'>
          <Button onClick={LoginWithGoogle} className='margin-b blue' title='Google'/>
          <Button onClick={LoginWithFacebook} className='margin-b blue' title='Facebook'/>
        </div>
      </div>
    </div>
  );
}

export default Login;
