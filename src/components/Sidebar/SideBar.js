import React, { useEffect, useState } from 'react';
import api from '../../api'

function Sidebar() {

  const [topStreams, setTopStreams] = useState([])
  useEffect(()=> {
    const fetchData = async ()=> {
      // Je veux les streams les plus regardés
      const result = await api.get('https://api.twitch.tv/helix/streams')
      let dataArray = result.data.data
      console.log(dataArray);

      // Je stock l'id de chaque jeux
      let gameIDs = dataArray.map(stream =>{
        return stream.game_id
      })

      // Je stock l'id de chaque streamer
      let userIDs = dataArray.map(stream =>{
        return stream.user_id
      })

      // Creation des URL personnalisés
      let baseUrlGames = 'https://api.twitch.tv/helix/games?'
      let baseUrlUsers = 'https://api.twitch.tv/helix/users?'
    }
    fetchData()
  }, [])

  return (
    <div className="sidebar">
      <h2 className="titreSidebar">Chaines recommandées</h2>
      <ul className="listeStream">

      </ul>
    </div>
  )
}
export default Sidebar