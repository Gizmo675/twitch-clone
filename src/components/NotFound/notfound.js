import React from 'react';
import jamy from '../../assets/jamy.jpg'

function NotFound() {
  return(
    <div className="containerDecaleResultats">
      <h2 className="titreGames">Dis donc Jamy ? <br/>Tu chercherais une page qui n'existe pas ?</h2>
      <img src={jamy} alt="fred jamy" className='imgCarte' />
    </div>
  )
}
export default NotFound