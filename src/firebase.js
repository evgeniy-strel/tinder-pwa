import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyCy7l-TzZpRlubStnl4yIDTNxk8G-_1PV4',
  authDomain: 'react-pwa-77600.firebaseapp.com',
  projectId: 'react-pwa-77600',
  storageBucket: 'react-pwa-77600.appspot.com',
  messagingSenderId: '787574579719',
  appId: '1:787574579719:web:cd8302ac512d104fe240a2',
  measurementId: 'G-WJL1S79LPG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebaseConfig;
