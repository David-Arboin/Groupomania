import React, { useState, useContext } from 'react'
import img from '../../images/icon-left-font-monochrome-white.png'
import { useNavigate } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import { TokenContext } from '../../App'
import { UserIdContext } from '../../App'
import { NameContext } from '../../App'

import Swal from 'sweetalert2'

function Header() {
    let [token, setToken] = useContext(TokenContext)
    let [userId, setUserId] = useContext(UserIdContext)
    let [name, setName] = useContext(NameContext)

    const navigate = useNavigate()
    const SwalLogOut = require('sweetalert2')



    //--Déconnexion
    const logout = (e) => {
        setToken(undefined)
        setUserId('')
        setName(undefined)
        navigate('/')
                //--Sweet Alert
                SwalLogOut.fire({
                    title: 'Au revoir et à bientôt !',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
    }

    return (
        <header className="header">
            <div className="displayHeaderLeft"></div>
            <div className="displayHeader">
                <img src={img} alt="repas" />
            </div>
            <div className="displayButtonLogout">

            {token === undefined && userId === '' ?
                '' : 
                <FontAwesomeIcon
                    icon={faPowerOff}
                    onClick={logout}
                    className="buttonLogout"
                    size="3x"
                ></FontAwesomeIcon>}

            </div>
        </header>
    )
}

export default Header
