import React, {forwardRef} from 'react'
import './Post.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {Avatar} from "@material-ui/core";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PublishIcon from '@material-ui/icons/Publish';

const Post = forwardRef(({
  key,
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  timestamp
}, ref) => {
  return (
    <div className="post" ref={ref}>
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
          <div className="post__footerShare">
            <PublishIcon />
          </div>

        </div>
      </div>
    </div>
  );
});

export default Post
