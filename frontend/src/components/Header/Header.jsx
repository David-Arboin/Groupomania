import './Header.scss'
import React, { useState } from 'react'
import img from '../../images/icon-left-font-monochrome-white.png'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import { TokenContext } from '../../App'
import { UserIdContext } from '../../App'
import { NameContext } from '../../App'

function Header() {
    let [token, setToken] = React.useContext(TokenContext)
    let [userId, setUserId] = React.useContext(UserIdContext)
    let [name, setName] = React.useContext(NameContext)

    const [logOut, setLogOut] = useState()
    const navigate = useNavigate()



    //--Déconnexion
    const logout = (e) => {
        setToken('')
        setUserId('')
        setName('')
        navigate('/')
    }

    return (
        <header className="header">
            <div className="displayHeaderLeft"></div>
            <div className="displayHeader">
                <img src={img} alt="repas" />
            </div>
            <div className="displayButtonLogout">

            logOut ?
                <FontAwesomeIcon
                    icon={faPowerOff}
                    onClick={logout}
                    className="buttonLogout"
                    size="3x"
                ></FontAwesomeIcon>
             : ''
            </div>
        </header>
    )
}

export default Header
