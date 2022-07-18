import React, { useRef, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { TokenContext } from '../../App'
import { UserIdContext } from '../../App'
import { NameContext } from '../../App'
import { LogInContext } from '../../App'

export default function Section() {
    const [errorMessages, setErrorMessages] = useState({})
    const [signInInAndsignUpOrSignUp, setSignInInAndsignUpOrSignUp] =
        useState(true)
    const navigate = useNavigate()
    let [token, setToken] = React.useContext(TokenContext)
    let [userId, setUserId] = React.useContext(UserIdContext)
    let [name, setName] = React.useContext(NameContext)

    console.log(token)
    console.log(userId)

    const errors = {
        name: "Ceci n'est pas un nom ou pseudonyme valide",
        email: "Ceci n'est pas une adresse mail valide",
        pass: 'Votre mot de passe doit contenir au minimum 10 caractères, un chiffre, une minuscule, une majusle et un caratère spécial',
        ok: '',
    }

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        )

    //--Récupération de la saisie des inputs de connexion d'un compte existant
    const inputsSignIn = useRef([])
    const addInputsSignIn = (el) => {
        inputsSignIn.current.push(el)
    }

    //--Bouton Tout effacer pour resaisir le mail et le mot de passe sans avoir à les supprimer à "la main"

    const resetedSignIn = (e) => {
        document.getElementById('emailSignIn').innerHTML = ''
        document.getElementById('passwordSignIn').innerHTML = ''
        document.getElementById('emailSignIn').placeholder = ''
        document.getElementById('passwordSignIn').placeholder = ''
        setErrorMessages({ name: 'ok', message: errors.ok })
    }

    const resetedSignUp = (e) => {
        document.getElementById('nameSignUp').innerHTML = ''
        document.getElementById('emailSignUp').innerHTML = ''
        document.getElementById('passwordSignUp').innerHTML = ''
        document.getElementById('nameSignUp').placeholder = ''
        document.getElementById('emailSignUp').placeholder = ''
        document.getElementById('passwordSignUp').placeholder = ''
        setErrorMessages({ name: 'ok', message: errors.ok })
    }

    //*************************** SignIn
    const handleFormSignIn = (event, props) => {
        event.preventDefault()
        const email = inputsSignIn.current[0]
        const password = inputsSignIn.current[1]

        //--S'il n'y a pas d'Email : on alerte l'utilisateur qu'il doit saisir un mail
        if (email.value === '') {
            document.getElementById('emailSignIn').placeholder =
                "Oups ! Pas d'email"
            //--S'il n'y a pas de mot de passe : on alerte l'utilisateur qu'il doit en saisir un
        } else if (
            email.value !== '' &&
            !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)
        ) {
            setErrorMessages({
                name: 'emailErrorSignIn',
                message: errors.email,
            })
        } else if (password.value === '') {
            document.getElementById('passwordSignIn').placeholder =
                'Re oups ! Pas de mot de passe'
        } else if (
            password.value !== '' &&
            !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g.test(
                password.value
            )
        ) {
            setErrorMessages({ name: 'passErrorSignIn', message: errors.pass })
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            }
            fetch(
                'http://localhost:8000/groupomania/auth/login',
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    setToken(data.token)
                    setUserId(data.userId)
                    setName(data.name)
                    console.log(data.token)
                    console.log(data)
                    localStorage.setItem('token', JSON.stringify(data.token))
                    localStorage.setItem('userId', JSON.stringify(data.userId))
                    localStorage.setItem('name', JSON.stringify(data.name))
                    if (data.userId === undefined) {
                        alert('Veuillez vous inscrire sur la partie de droite')
                    } else {
                        navigate('/homePage')
                    }
                })
                .catch(function (error) {
                    console.log('Il y a un problème de connexion')
                    alert('Il y a un problème de connexion')
                    navigate('/')
                })
        }
    }
    //************************************SignUp
    const inputsSignUp = useRef([])
    const addInputsSignUp = (el) => {
        inputsSignUp.current.push(el)
    }

    const handleFormSignUp = (event) => {
        event.preventDefault()

        const name = inputsSignUp.current[0]
        const email = inputsSignUp.current[1]
        const password = inputsSignUp.current[2]

        if (name.value === '') {
            document.getElementById('nameSignUp').placeholder =
                'Oups ! Ni nom ni pseudo'
        } else if (
            name.value !== '' &&
            !/^([a-zA-Z0-9-_]{2,36})$/g.test(name.value)
        ) {
            setErrorMessages({
                name: 'nameErrorSignUp',
                message: errors.name,
            })
        } else if (email.value === '') {
            document.getElementById('emailSignUp').placeholder =
                "Re Oups ! Pas d'email"
        } else if (
            email.value !== '' &&
            !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email.value)
        ) {
            setErrorMessages({
                name: 'emailErrorSignUp',
                message: errors.email,
            })
        } else if (password.value === '') {
            document.getElementById('passwordSignUp').placeholder =
                'Re Re oups ! Pas de mot de passe'
        } else if (
            password.value !== '' &&
            !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/g.test(
                password.value
            )
        ) {
            setErrorMessages({ name: 'passErrorSignUp', message: errors.pass })
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                }),
            }
            fetch(
                'http://localhost:8000/groupomania/auth/signup',
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    alert(
                        'Votre compte a été enregistré ! Vous pouvez maintenant vous y connecter'
                    )
                    setSignInInAndsignUpOrSignUp(false)
                })
        }
    }

    return signInInAndsignUpOrSignUp ? (
        <section>
            {/* *******************************************SignIn*************************************************  */}

            <div className="signIn">
                <h1>Je suis ravis de déjà avoir un compte !</h1>
                <h1>Je me connecte juste dessous</h1>

                <form className="displayLogin" onSubmit={handleFormSignIn}>
                    <label>Email</label>
                    <label>
                        <input
                            name="email"
                            type="email"
                            ref={addInputsSignIn}
                            id="emailSignIn"
                            placeholder=""
                        />
                        <div className="password-icon">
                            <i className="fa-solid fa-eye"></i>
                            <i className="fa-solid fa-eye-slash"></i>
                        </div>
                    </label>

                    {renderErrorMessage('emailErrorSignIn')}
                    <label>Mot de passe</label>
                    <input
                        name="password"
                        type="password"
                        ref={addInputsSignIn}
                        id="passwordSignIn"
                    />
                    {renderErrorMessage('passErrorSignIn')}
                    <div className="displayResetSubmit">
                        <input
                            type="reset"
                            value="Tout effacer"
                            onClick={resetedSignIn}
                        />
                        <input
                            type="submit"
                            value="Je me connecte"
                            onClick={() => setSignInInAndsignUpOrSignUp(true)}
                        />
                    </div>
                </form>
            </div>
            <div className="separator"></div>
            {/* *******************************************SignUp*************************************************  */}
            <div className="signUp">
                <h1>Je n'ai pas encore de compte !</h1>
                <h1>Je m'inscrit en un éclair</h1>

                <form className="displaySignup" onSubmit={handleFormSignUp}>
                    <label type="name">Nom complet ou pseudonyme</label>
                    <input
                        name="name"
                        type="text"
                        ref={addInputsSignUp}
                        id="nameSignUp"
                    />
                    {renderErrorMessage('nameErrorSignUp')}
                    <label type="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        ref={addInputsSignUp}
                        id="emailSignUp"
                    />
                    {renderErrorMessage('emailErrorSignUp')}
                    <label type="password">Mot de passe</label>
                    <input
                        name="password"
                        type="password"
                        ref={addInputsSignUp}
                        id="passwordSignUp"
                    />
                    {renderErrorMessage('passErrorSignUp')}
                    <div className="displayResetSubmit">
                        <input
                            name="resetLogin"
                            type="reset"
                            value="Tout effacer"
                            onClick={resetedSignUp}
                        />
                        <input type="submit" value="Je crée mon compte" />
                    </div>
                </form>
            </div>
            <p className="messageTeamTechnique">
                Bienvenue sur le nouveau réseau social de Groupomania ! Vous
                utilisé la version bêta de l'application. Si vous rencontrez des
                problèmes, merci de nous en faire part à
                support@groupomania.complet Excellent journée.
            </p>
        </section>
    ) : (
        <section>
            {/* *******************************************SignIn*************************************************  */}
            <div className="signIn">
                <h1>Mon compte vient d'être créé à l'instant !</h1>
                <h1>Je me connecte juste dessous</h1>
                <form
                    className="displayLogin"
                    onSubmit={handleFormSignIn}
                    /* onChange={handleFormChange} */
                >
                    <label>Email</label>
                    <label>
                        <input
                            name="email"
                            type="text"
                            ref={addInputsSignIn}
                            id="emailSignIn"
                        />
                        <div className="password-icon">
                            <i className="fa-solid fa-eye"></i>
                            <i className="fa-solid fa-eye-slash"></i>
                        </div>
                    </label>

                    {renderErrorMessage('emailErrorSignIn')}
                    <label>Mot de passe</label>
                    <input
                        name="password"
                        type="password"
                        ref={addInputsSignIn}
                        id="passwordSignIn"
                    />
                    {renderErrorMessage('passErrorSignIn')}
                    <div className="displayResetSubmit">
                        <input
                            type="reset"
                            value="Tout effacer"
                            onClick={resetedSignIn}
                        />
                        <input
                            type="submit"
                            value="Je me connecte"
                            onClick={() => setSignInInAndsignUpOrSignUp(false)}
                        />
                    </div>
                </form>
            </div>
        </section>
    )
}
