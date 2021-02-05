import React, {useState} from 'react'
import './Post.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {Avatar} from "@material-ui/core";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSelector } from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { selectUser } from '../features/userSlice';
import Timestamp from 'react-timestamp'
import { db } from '../features/firebase';

function Post({
  id,
  uid,
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  timestamp,
}) {
  const user = useSelector(selectUser);
  const [deleted, setDeleted] =  useState(false);
  // const deleteDrop = (e) => {
  //   e.preventDefault();
  //   if(uid===user.uid) {
  //     db.collection("posts").doc(id).delete().then(() => {
  //       console.log(id);
  //       setDeleted(true);
  //       console.log("Document successfully deleted!");
  //   }).catch((error) => {
  //       console.error("Error removing document: ", error);
  //   });
  //   } else {
  //     alert("Cannot delete other user's Drop");
  //   }
// }
  return (
    <div className="postFull">
      {deleted? (<h2>Deleted Drop</h2>) : (
          <div className="post">
          <div className="post__avatar">
            <Avatar alt={username} src={avatar} />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {displayName} {""}
                  <span className="post__headerSpecial">
                    {verified &&
                    <VerifiedUserIcon className="post__badge" />} @{username}
                  </span>
                </h3>
                {timestamp &&
                  <Timestamp className="post__headerTimestamp" date={timestamp.toDate()} relative autoUpdate/>
                }
                
              </div>
              <div className="post__headerDescription">
                <p>{text}</p>
              </div>
            </div>
            {image!=="" &&
            <img src={image} alt=""/>}
            <div className="post__footer">
              <div className="post__footerReply">
                <ChatBubbleOutlineIcon />
              </div>
              <div className="post__footerRedrop">
                <RepeatIcon />
              </div>
              <div className="post__footerLike">
                <FavoriteBorderIcon />
              </div>
              <div className="post__footerDelete">
                <DeleteOutlineIcon />
              </div>
    
            </div>
          </div>
        </div>
        )}
    </div>
    
    
  );
}

export default Post
