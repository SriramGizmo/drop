import React, {useState,useEffect} from 'react'
import './Feed.css'
import DropBox from './DropBox'
import Post from './Post'
// import test from './test.jpg'
// import av from "./avatar.jpg"
import {db,auth} from './firebase'
import FlipMove from 'react-flip-move'
import { useDispatch } from 'react-redux'
import { logout } from './features/userSlice'
import { Button } from '@material-ui/core'


function Feed() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts')
      .orderBy("timestamp","desc")
      .onSnapshot(snapshot =>(
        setPosts(snapshot.docs.map(doc => {
                                    const data = doc.data();
                                    const id = doc.id;
                                    return {id, ...data}
      }))
    ))
  }, []);

  const dispatch = useDispatch();

  const logoutOfApp = () => {
    dispatch(logout())
    auth.signOut();
  }

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
        <Button 
          className="feed__logoutButton"
          onClick={logoutOfApp}
          variant="contained">Log Out</Button>
      </div>
      
      <DropBox />

      <FlipMove>
      {posts.map(post => (
        <Post 
        key={post.id}
        displayName={post.displayName}
        username={post.username}
        verified={post.verified}
        text={post.text}
        image={post.image}
        avatar={post.avatar}
        timestamp={post.timestamp}
      />
      ))}
      </FlipMove>
      
    </div>
  )
}

export default Feed
