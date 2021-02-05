import React, {useState} from 'react';
import './DropBox.css';
import {Avatar, Button} from "@material-ui/core";
import { db} from "../features/firebase"
import firebase from 'firebase'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function DropBox() {

  const [dropMessage, setDropMessage] = useState("");
  const [dropImage, setDropImage] = useState("");

  const user = useSelector(selectUser);

  const sendDrop = e => {
    e.preventDefault();
    db.collection('posts').add({
      displayName: user.displayName,
      uid: user.uid,
      username: user.username,
      verified: user.verified,
      text: dropMessage,
      image: dropImage,
      avatar: user.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setDropMessage("");
    setDropImage("");
  }

  

  return (
    <div className="dropBox">
      <form>
        <div className="dropBox__input">
        <Avatar alt={user.displayName} src={user.photoURL} />
        
        {/* <input placeholder= "What's poppin?" type="text"></input> */}
        <div className="dropBox__inputField">
          <textarea 
            onChange={(e) => setDropMessage(e.target.value)}
            value={dropMessage} 
            maxLength= '256' 
            placeholder="Whats's poppin? Drop it here."></textarea>
          <input 
            onChange={(e) => setDropImage(e.target.value)}
            value={dropImage}
            className="dropBox__imageInput"
            placeholder="Optional: Enter image URL"
            type="text"/>
        </div>
        
        </div>
        
        <Button onClick={sendDrop} type="submit" className="dropBox__dropButton">Drop</Button>
      </form>
    </div>
  )
}

export default DropBox
