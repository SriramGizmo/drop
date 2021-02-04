import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import {useDispatch, useSelector} from "react-redux"
import {login, logout, selectUser} from "./features/userSlice"
import Login from './Login';
import { useEffect } from 'react'
import { auth, db } from './firebase';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    function fetchUser() {
      auth.onAuthStateChanged(userAuth => {
        if(userAuth) {
          db.collection('users').doc(userAuth.uid).get()
            .then((doc) => {
              if(doc.exists) {
                var username = doc.get('username');
                var verified = doc.get('verified');
                dispatch(login({
                  email: userAuth.email,
                  uid: userAuth.uid,
                  displayName: userAuth.displayName,
                  photoURL: userAuth.photoURL,
                  username: username,
                  verified: verified,
                }));
              }
            });
        }
        else {
          dispatch(logout());
        }
      })
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app">
      {!user ? (<Login />) : (
        <div className="app__body">
        <Sidebar />
        <Feed /> 
        <Widgets />
      </div>
      )}
    </div>
  );
}

export default App;
