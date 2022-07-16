import './Header.scss';
import img from '../../images/icon-left-font-monochrome-white.png';
import { useNavigate } from 'react-router-dom'


function Header () {



    return (
      <header className="header">
        <div className="displayHeader">
          <img src={img} alt="repas" />
        </div>
      </header>
    )
}

export default Header
