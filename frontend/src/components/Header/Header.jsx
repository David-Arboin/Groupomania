import './Header.scss';
import img from '../../images/icon-left-font-monochrome-black.png';
import { useNavigate } from 'react-router-dom'


function Header () {



    return (
      <header className="header">
        <div className="displayHeader">
          <h1>Réseau social de</h1>
          <img src={img} alt="repas" />
        </div>
      </header>
    )
}

export default Header
