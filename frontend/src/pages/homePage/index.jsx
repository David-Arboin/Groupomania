import './Section.scss'
import React, {
    useState,
    useEffect,
    useParams,
    useContext,
    useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TokenContext } from '../../App'
import { UserIdContext } from '../../App'

/* import {TokenAndUserIdContext} from '../loginPage' */

export default function Section() {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState(null)
    const [users, setUsers] = useState(null)
    const navigate = useNavigate()
    const [token, setToken] = React.useContext(TokenContext)
    const [userId, setUserId] = React.useContext(UserIdContext)

    //**************Affichage des posts
    const fetchData = useCallback(
        async (postsOrusers) => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            }

            const response = await fetch(
                `http://localhost:8000/groupomania/${postsOrusers}/`,
                requestOptions
            )
            if (response.ok === false) {
                throw 'Une erreur est survenue lors de la requête'
            }
            const data = await response.json()
            return data
        },
        [token]
    )

    useEffect(() => {
        const getPostsAndUsers = async () => {
            try {
                const posts = await fetchData('posts')
                const users = await fetchData('users')

                posts.forEach((post) => {
                    users.forEach((emailAndName) => {
                        if (
                            post[emailAndName] === undefined &&
                            post.userId === emailAndName._id
                        ) {
                            post.email = emailAndName.email
                            post.name = emailAndName.name
                        }
                    })
                })

                setPosts(posts)
                setUsers(users)
            } catch (err) {
                console.log(err)
            }
        }
        if (token) {
            getPostsAndUsers()
        }
    }, [token, fetchData])

    useEffect(() => {
        if (posts && users) {
            setIsLoading(false)
        }
    }, [posts, users])
    //*****************Création d'un post

    //--Récupération de la saisie de textArea et de l'image
    const textAreaAndImage = useRef([])
    const addTextAreaAndImage = (el) => {
        textAreaAndImage.current.push(el)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(userId)
        const form = e.target
        const formData = new FormData()
        formData.append('post', form[0].value)
        formData.append('image', form[1].files[0])
        /*         let time = e.timeStamp */
        console.log(form[0].value)
        console.log(form[1].files[0])
        const requestOptions = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }
        fetch('http://localhost:8000/groupomania/posts', requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            navigate('/homePage')
    }

    //*****************Modification d'un post */
    const handleModify = (event) => {
        const target = event.target
        console.log(target)
        /*         posts = posts.filter(a => a.userId !== event.userId)
    this.setState({posts: posts}) */
    }

    //****************Suppression d'un post */
    const handleDelete = (event) => {
        const target = event.target
        console.log(target)

        /*         posts = posts.filter(a => a.userId !== event.userId)
        this.setState({posts: posts}) */
    }

    //--Déconnexion
    const logout = (e) => {
        setToken('')
        setUserId('')

        /*     localStorage.removeItem('userId'); */
        navigate('/')
    }

    return (
        <section className="displaySection">
            <button onClick={logout} className="displayButtonLogout">
                Déconnexion
            </button>
            <div className="displayCreatePost">
                <div className="hello">Bienvenue {}</div>
                <div className="displayTitleCreatePost">
                    <h1>Créer un post</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="post"
                        type="text"
                        className="displayText"
                        ref={addTextAreaAndImage}
                    ></textarea>
                    <div className="displayinputImageAndButtonPublish">
                        <input
                            name="image"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="decoSelectFile"
                            ref={addTextAreaAndImage}
                            id="image"
                        ></input>
                        <input className="decoButton" type="submit"></input>
                    </div>
                </form>
            </div>
            <div className="displayHeaderSection">
                <h1>Liste des posts</h1>
            </div>
            <div className="displayPosts">
                {isLoading
                    ? 'Loading..'
                    : posts.map((post, index) => (
                          <div className="displayPost">
                              <div className="conteneur">
                                  <h1 className="dispayNamePoster">
                                      Publier par :{post.email}
                                  </h1>
                                  <p className="displayText">
                                      <img
                                          src={post.imageUrl}
                                          alt=""
                                          align="right"
                                          className="image"
                                      />
                                      {post.post}
                                  </p>
                              </div>
                              <div className="displayLikes">
                                  {/*                                   <FontAwesomeIcon icon="fa-solid fa-thumbs-up" /> */}
                                  <div className="numberOfLikes"></div>
                                  {/*                                <FontAwesomeIcon icon="fa-solid fa-thumbs-down" /> */}
                                  <div className="numberOfDislikes"></div>
                              </div>
                              <div className="displayButtons">
                                  <button
                                      className="modifyPost"
                                      onClick={(e) => handleModify(e)}
                                  >
                                      Modifier
                                  </button>
                                  <button
                                      className="deletePost"
                                      onClick={(e) => handleDelete(e)}
                                  >
                                      Supprimer
                                  </button>
                              </div>
                          </div>
                      ))}
            </div>
        </section>
    )
}