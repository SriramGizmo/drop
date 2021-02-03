import React, {useState} from 'react';
import './DropBox.css';
import {Avatar, Button} from "@material-ui/core";
import av from "./avatar.jpg"
import db from "./firebase"

function DropBox() {

  const [dropMessage, setDropMessage] = useState("");
  const [dropImage, setDropImage] = useState("");

  const sendDrop = e => {
    e.preventDefault();
    db.collection('posts').add({
      displayName: 'Elon Musk',
      username: 'elonmusk',
      verified: true,
      text: dropMessage,
      image: dropImage,
      avatar: "https://image.freepik.com/free-vector/vintage-styled-sunset-with-palm-trees-silhouettes-logo-icon-gesign-template-black-background-vaporwave-sun_148087-297.jpg"
    });
    setDropMessage("");
    setDropImage("");
  }

  return (
    <div className="dropBox">
      <form>
        <div className="dropBox__input">
        <Avatar alt="Sriram" src={av} />
        
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
