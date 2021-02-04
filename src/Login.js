import React, {useState} from 'react'
import './Login.css'
import {TextField, Button} from '@material-ui/core'
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import { auth, db } from "./firebase"
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'


function Login() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();

  

  const loginToApp = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then(userAuth => {
      db.collection('users').doc(userAuth.user.uid).get()
        .then((doc) => {
          if(doc.exists) {
            var username = doc.get('username');
            var verified = doc.get('verified');
            setUsername(username);
            setVerified(verified);
            dispatch(login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
              photoURL: userAuth.user.photoURL,
              username: username,
              verified: verified,
            }));
          }
        });
      
    }).catch(error => alert(error));
  };

  const register = () => {
    if (!name) {
      return alert("Please enter a Full Name");
    }
    if (!username) {
      return alert("Please enter a Username");
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      userAuth.user.updateProfile({
        displayName: name,
        photoURL: imageUrl,
      })
      .then(() => {
        const updateUserInfo = () => {
          db.collection('users').doc(userAuth.user.uid).set({
            displayName: name,
            username: username,
            verified: verified,
            email: userAuth.user.email,
          });
        }
        updateUserInfo();
      })
      .then(() => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: name,
          photoURL: imageUrl,
          username: username,
          verified: verified,
        }));
      });
    }).catch(error => alert(error));
  };


  return (
    <div className="login">
      <div className="login__box">
        <InvertColorsIcon className="login__boxLogo"/>
        <h1>Drop</h1>
        <form className="login__boxForm">
          <TextField 
            className="login__boxField"
            label="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Required if Registering" 
            variant="outlined" 
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField 
            className="login__boxField"
            label="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Required if Registering" 
            variant="outlined" 
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className="login__boxField" 
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Required" 
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField 
            className="login__boxField"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Required" 
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField 
            className="login__boxField"
            label="URL for Profile Picture"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Optional" 
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button 
            className="login__boxButton"
            onClick={loginToApp}
            variant="contained">Log In</Button>
          <p>Not a Member? {" "}
            <span className='login__register' onClick={register}>
               Register Now
            </span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login
