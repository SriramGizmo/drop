import React from 'react'
import "./Widgets.css"
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
  TwitterFollowButton,
} from "react-twitter-embed"
import SearchIcon from '@material-ui/icons/Search';



function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's Happening</h2>
        <TwitterTweetEmbed 
          tweetId={"1278353774671802369"}
          options={{height: 300}}
        />
        <TwitterTimelineEmbed className="widgets_timeline"
          sourceType = "profile"
          screenName = "elonmusk"
          options={{height: "400"}}
          noScrollbar="true"
          // noHeader="true"
          // noBorders="true"
          // noFooter="true"
        />
        
        <TwitterShareButton
          options={{ text: "Yo", via: "srirampraveenva"}}
        />
      </div>
    </div>
  )
}

export default Widgets
