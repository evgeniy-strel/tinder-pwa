import React from 'react';
import firebase from './firebase';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import firebaseConfig from './firebase';
import axios from 'axios';

function App() {
  const [titleText, setTitleText] = React.useState('');
  const [bodyText, setBodyText] = React.useState('');
  const [token, setToken] = React.useState('');

  const copy = () => {
    navigator.clipboard.writeText(token);
  };

  const notification = {
    notification: {
      title: titleText,
      body: bodyText,
    },
    to: token,
  };

  const secretKeyFireBase =
    'AAAAt18aYgc:APA91bGd2SVvNmQxvBa0xyTErjnOnKO35uTsiIEZiXlgoXkQ9nRxxQTdHXHCnyPxonWcxHtbix99xB0SIo6QXT_QgOvLQiWSQSwVbI7AU_Fy3CQK74O9nYOwmvGoIMnwKU-nUdKhaAA4';

  const sendNotification = async (currentToken) => {
    if (currentToken) {
      console.log('sended');
      await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        { ...notification, to: currentToken },
        {
          headers: {
            Authorization: 'key=' + secretKeyFireBase,
            'Content-Type': 'application/json',
          },
        },
      );
      alert('Уведомление выслано');
    } else {
      alert('Вы еще не получили токен!');
    }
  };

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        alert('Разрешения на уведомления выданы');
        console.log('Notification permission granted.');

        const app = initializeApp(firebaseConfig);

        const messaging = getMessaging(app);
        getToken(messaging, {
          vapidKey:
            'BMbO2V0paxmzqh3nB7Rb5QZ4vac--BNsCDgcOmv-KDePeg2uTr8IoSnoyK8HnlGRDotW-z6A5E-fnsOMgFm7qP8',
        }).then((currentToken) => {
          if (currentToken) {
            setToken(currentToken);
            sendNotification(currentToken);
          } else {
            alert('Не удалось получить токен');
            console.log('Can not get token');
          }
        });
      } else {
        alert('Нет прав на уведомления');
        console.log('Do not have permission!');
      }
    });
  }

  return (
    <div className="App" style={{ padding: 15 }}>
      <p>Title text</p>
      <input type="text" onChange={(e) => setTitleText(e.target.value)} />
      <p>Body text</p>
      <input type="text" onChange={(e) => setBodyText(e.target.value)} />
      <br />
      <button onClick={requestPermission} style={{ marginTop: 20 }}>
        Отправить уведомление
      </button>
      <p>Your token:</p>
      <p onClick={copy}>{token || 'токена нет'}</p>
    </div>
  );
}

export default App;
