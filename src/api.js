import axios from 'axios'

let api = axios.create({
  headers: {
    'Client-ID' : 'iwaidv25vut4pjchwdz7com9uoo4si',
    'Authorization': 'Bearer m67kuzf9i1edohc9sm8d02smdkmp92'
  }
})

/*
  CLIENT_ID: iwaidv25vut4pjchwdz7com9uoo4si
  REDIRECT: 'http://127.0.0.1/'
  LIEN AUTH: https://id.twitch.tv/oauth2/authorize?client_id=iwaidv25vut4pjchwdz7com9uoo4si&redirect_uri=http://127.0.0.1/&response_type=token
*/

export default api