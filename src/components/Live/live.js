import React from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'


function Live() {
  return(
    <div className="containerDecale">
      <ReactTwitchEmbedVideo height='754' width='100%' channel='SackziTV' />
    </div>
  )
}
export default Live