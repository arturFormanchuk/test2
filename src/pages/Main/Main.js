import React, {useContext, useState, useEffect} from 'react'
import './Main.css'
import firebase from "firebase";
import {AuthContext} from "../../components/Auth/Auth";
import {Redirect} from "react-router-dom";
import Header from "../../components/Header/Header";
import Chart from "react-google-charts";
import SocialMedia from "../../components/SocialMedia/SocialMedia";

function Main() {

  const [config, setConfig] = useState([])

  const createConfig = (data) => {

    let finishArr = []

    data.forEach((el) => {
      let arr = []
      let countF = data.filter((log) => {
        if (el.time === log.time && log.source === 'facebook') {
          return el
        }
      })
      let countG = data.filter((log) => {
        if (el.time === log.time && log.source === 'google') {
          return el
        }
      })
      arr = [el.time * 10, countF.length, countG.length]
      finishArr.push(arr)
    })

    let stringArr = finishArr.map(JSON.stringify)
    let uniqStrArr = new Set(stringArr)
    let uniqueArray = Array.from(uniqStrArr, JSON.parse);
    setConfig(uniqueArray.sort(function (a, b) {
      return a[0] - b[0]
    }))
  }

  const getLogins = async () => {
    let ref = firebase.database().ref(`logins`)

    let data = ''

    await ref.once('value').then(function async(snapshot) {
        data = snapshot.val()
        createConfig(data.logins)
      }
    )
  }

  useEffect(() => {
    setTimeout(() => (
      getLogins()
    ), 2000)
  }, [])

  const {currentUser} = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to="/login"/>;
  }

  return (
    <>
      <Header variant={'main'}/>
      <div className='text-container'>
        <p className='logsInfo'>Logs info</p>
        <p className='logsSub'>See below the time and logs info</p>
      </div>

      <div className='chartPos containerData'>
        <Chart
          width={'100%'}
          height={'100%'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Minutes', 'Facebook', 'Google'],
            [0, 0, 0],
            ...config
          ]}
          options={{
            series: {
              1: {curveType: 'function'},
            },
          }}

        />
      </div>
      <div>
        <SocialMedia/>
      </div>

    </>
  )
}

export default Main