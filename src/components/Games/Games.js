import React, { useEffect, useState } from 'react';
import api from '../../api'

function Games() {

  const [games, setGames] = useState([])

  useEffect(()=> {
    const fetchData = async () => {
      const result = await api.get('https://api.twitch.tv/helix/games/top')
      // console.log(result);

      let dataArray = result.data.data
      let finalArray = dataArray.map(game=>{
        let newUrl = game.box_art_url
        .replace('{width}', '250')
        .replace('{height}', '300')
      game.box_art_url = newUrl
      return game
      })
      setGames(finalArray)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="titreGames">
        Jeux les plus populaires
      </h1>
      <div className="flexAcceuil">

      </div>
    </div>
  )
}
export default Games