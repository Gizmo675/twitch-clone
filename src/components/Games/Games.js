import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import api from '../../api'

function Games() {

  const [games, setGames] = useState([])

  useEffect(()=> {
    const fetchData = async () => {
      // Je veux la liste des jeux les plus streamé
      const result = await api.get('https://api.twitch.tv/helix/games/top')

      let dataArray = result.data.data
      let finalArray = dataArray.map(game=>{
        // Je modifie la largeur et hauteur
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
        {games.map((game, index)=>(
          <div key={index} className="carteGames">
            <img src={game.box_art_url} alt="jeu profile pic" className="imgCarte"/>
            <div className="cardBodyGames">
              <h5 className="titreCartesGames">{game.name}</h5>
              <Link className='lien' to={{
                pathname: 'game/' + game.name,
                state: {
                  gameID: game.id
                }
                }} >
                <div className="btnCarte">Regarder {game.name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Games