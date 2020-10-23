import React, { useEffect, useState } from 'react';
import api from '../../api'

function Sidebar() {

  const [topStreams, setTopStreams] = useState([])

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
        stream.truePic = ''
        stream.login = ''

        // si le user id et le game id correspond, je rajoute le nom, l'avatar et le streameur
        gamesNamesArray.forEach(name=>{
            arrayUsers.forEach(user=>{
              if(stream.user_id === user.id && stream.game_id === name.id) {
                stream.truePic = user.profile_image_url
                stream.gameName = name.name
                stream.login = user.login
              }
          })
        })
        return stream
      })
      // je met le state a jour avec les 6 premiers top streams
      setTopStreams(finalArray.slice(0,6))
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