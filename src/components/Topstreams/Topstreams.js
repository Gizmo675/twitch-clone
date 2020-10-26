import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import api from '../../api'

function TopStreams() {

  const [channels, setChannels] = useState([])

  useEffect(()=> {
    const fetchData = async ()=> {
      // Je veux les streams les plus regardés
      const result = await api.get('https://api.twitch.tv/helix/streams')
      let dataArray = result.data.data
      // console.log(dataArray);

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

      let queryParamsGame = ''
      let queryParamsUsers = ''

      // je boucle pour definir les parametres de chaque streamer/jeux
      gameIDs.map(id=> {
        return (queryParamsGame = queryParamsGame + `id=${id}&`)
      })
      userIDs.map(id=> {
        return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
      })

      // Je finalise l'url personnalisé
      let urlFinalGames = baseUrlGames + queryParamsGame
      let urlFinalUsers = baseUrlUsers + queryParamsUsers

      // je peux appelé sur l'url personnalisé
      let gamesNames = await api.get(urlFinalGames)
      let getUsers = await api.get(urlFinalUsers)

      // J'isole la donnée
      let gamesNamesArray = gamesNames.data.data
      let arrayUsers = getUsers.data.data
      // console.log(gamesNamesArray, arrayUsers);

      // je cree le tableau complet
        // pour chaque top stream je rajoute des variables
      let finalArray = dataArray.map(stream => {

        stream.gameName = ''
        stream.login = ''

        // si le user id et le game id correspond, je rajoute le nom, l'avatar et le streameur
        gamesNamesArray.forEach(name=>{
            arrayUsers.forEach(user=>{
              if(stream.user_id === user.id && stream.game_id === name.id) {
                stream.gameName = name.name
                stream.login = user.login
              }
          })
        })

        // J'adapte la taille de la thumbnail du stream
        let newUrl = stream.thumbnail_url
        .replace('{width}', '320')
        .replace('{height}', '180')
        stream.thumbnail_url = newUrl
        
        return stream
      })
      // je met le state a jour avec les 6 premiers top streams
      setChannels(finalArray)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1 className="titreGames">Stream les plus populaires</h1>
      <div className="flexAcceuil">

        {channels.map((channel, index)=>(
          <div key={index} className="carteStream">
            <img src={channel.thumbnail_url} alt="jeux en cours" className='imgCarte' />
            <div className="cardBodyStream">
              <h5 className="titreCarteStream">{channel.user_name}</h5>
              <p className="textStream">{channel.gameName}</p>
              <p className="textStream viewers">Viewers : {channel.viewer_count}</p>
              <Link className='lien' to={{ pathname: `/live/${channel.login}` }}>
                <div className="btnCarte">Regarder {channel.user_name}</div>
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default TopStreams