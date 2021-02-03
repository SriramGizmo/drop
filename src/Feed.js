import React, {useState,useEffect} from 'react'
import './Feed.css'
import DropBox from './DropBox'
import Post from './Post'
import test from './test.jpg'
import av from "./avatar.jpg"
import db from './firebase'
import FlipMove from 'react-flip-move'


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

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
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
