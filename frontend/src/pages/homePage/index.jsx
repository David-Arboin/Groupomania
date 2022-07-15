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
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { TokenContext } from '../../App'
import { UserIdContext } from '../../App'
import { NameContext } from '../../App'

/* import {TokenAndUserIdContext} from '../loginPage' */

export default function Section() {
    const [users, setUsers] = useState(null)
    const navigate = useNavigate()

    const [refreshPosts, setRefreshposts] = useState(null)
    const [modification, setModification] = useState(false)
    const [like, setLike] = useState(true)
    const [annulation, setAnnulation] = useState(false)
    const [addLike, setAddLike] = useState(false)

    let [token, setToken] = React.useContext(TokenContext)
    let [userId, setUserId] = React.useContext(UserIdContext)
    let [name, setName] = React.useContext(NameContext)

    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState(null)

    //**************Affichage des posts

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }

    useEffect(() => {
        setIsLoading(true)
        fetch('http://localhost:8000/groupomania/posts', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data)
                setIsLoading(false)
            })
    }, [])

    /* 
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

    /*     useEffect(() => {
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
    }, [token, fetchData]) */

    //*****************Création d'un post

    //--Récupération de la saisie de textArea et de l'image
    const textAreaAndImage = useRef([])
    const addTextAreaAndImage = (el) => {
        textAreaAndImage.current.push(el)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData()
        formData.append('post', form[0].value)
        formData.append('image', form[1].files[0])
        console.log(form[0].value)
        console.log(form[1].files[0])

        const requestOptionsCreate = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }
        fetch('http://localhost:8000/groupomania/posts', requestOptionsCreate)
            .then((response) => response.json())
            .then((data) => {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
                const newArrayPosts = fetch(
                    'http://localhost:8000/groupomania/posts',
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setPosts(data)
                    })
            })
    }

    //*****************Modification d'un post */
    const handleModification = (event) => {
        event.preventDefault()
        const form = event.target
        console.log(form)
        const formData = new FormData()
         formData.append('post', form[0].value)
        formData.append('image', form[1].files[0])
        console.log(form[0].value)
        console.log(form[2].files[0])

         const requestOptionsModifiyPost = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }

        fetch('http://localhost:8000/groupomania/posts', requestOptionsModifiyPost)
            .then((response) => response.json())
            .then((data) => {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
                const newArrayPosts = fetch(
                    'http://localhost:8000/groupomania/posts',
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setPosts(data)
                    })
            })
    }

    //****************Suppression d'un post
    const handleDelete = async (event) => {
        event.preventDefault()
        let target = event.target.id
        console.log(target)
        const requestOptionsDelete = {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + token },
        }
        fetch(
            'http://localhost:8000/groupomania/posts/' + target,
            requestOptionsDelete
        )
            .then((response) => response.json())
            .then((data) => {
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
                const newArrayPosts = fetch(
                    'http://localhost:8000/groupomania/posts',
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setPosts(data)
                    })
            })
    }

    //--Déconnexion
    const logout = (e) => {
        setToken('')
        setUserId('')
        setName('')
        navigate('/')
    }

    //--Like
    const handleLike = async (event) => {
        let postId = event

        const requestOptionsLike = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: JSON.stringify({
                userId: userId,
                like: 1,
            }),
        }

         await fetch(
            'http://localhost:8000/groupomania/posts/' + postId + '/like',
            requestOptionsLike
        )
            .then((response) => response.json())
            .then((data) => {

                const requestOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token,
                    },
                }
                const newArrayPosts = fetch(
                    'http://localhost:8000/groupomania/posts/likes',
                    requestOptions
                )
                    .then((response) => response.json())
                    .then((data) => {
                        setPosts(data)
                        console.log('ICI')
                    })
            })
        }

    useEffect(() => {
        if (!posts) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [posts])

    console.log(posts)
    console.log(userId)
    

    return isLoading ? (
        'Loading !'
    ) : (
        <section className="displaySection">
            <button onClick={logout} className="displayButtonLogout">
                Déconnexion
            </button>
            <div className="displayCreatePost">
                <div className="hello">Bienvenue {name}</div>
                <div className="displayTitleCreatePost">
                    <h1>Créer un post</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="post"
                        type="text"
                        className="displayTextArea"
                        ref={addTextAreaAndImage}
                        placeholder="Si vous le souhaitez, vous pouvez saisir du texte dans cette zone et choisir un image avec le boutton ci-dessous"
                    ></textarea>
                    <div className="displayinputImageAndButtonPublish">
                        <input
                            name="image"
                            type="file"
                            accept="image/png, image/jpeg"
                            className="decoSelectFile styleButton"
                            ref={addTextAreaAndImage}
                            id="image"
                        ></input>
                        <input
                            className="decoButton styleButton"
                            type="submit"
                        ></input>
                    </div>
                </form>
            </div>

            <div className="displayPosts">
                {isLoading
                    ? 'Loading..'
                    : posts.map((post, index) =>
                          post.userId !== userId ? (
                              <div className="displayPost">
                                  <div className="conteneur">
                                      <h1 className="dispayNamePoster">
                                          Publié par : {post.name}
                                      </h1>
                                      <div className='displayTextAndImage'>
                                      <div className="displayImage">
                                          <img
                                              src={post.imageUrl}
                                              alt=""
                                              align="right"
                                              className="image"
                                          />
                                          <h1 className='displayText'>
                                          {post.post}
                                          </h1>
                                      </div>
                                      </div>
                                  </div>
                                  <div className="displayLikes">
                                      <div className="displayLikesAndNumberLikes">
                                          {like === 1 ? (
                                              <FontAwesomeIcon
                                                  icon={faThumbsUp}
                                                  onClick={() =>
                                                      handleLike(post._id)
                                                  }
                                                  className="likeOff"
                                              ></FontAwesomeIcon>
                                          ) : (
                                              <FontAwesomeIcon
                                                  icon={faThumbsUp}
                                                  onClick={() =>
                                                      handleLike(post._id)
                                                  }
                                                  className="likeOn"
                                              ></FontAwesomeIcon>
                                          )}
                                          <p className="numberOfLikes">
                                              {post.likes}
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          ) : modification ? (
                              <div className="displayPost">
                                  <div className="conteneur">
                                      <h1 className="dispayNamePoster">
                                          Mode modification activé
                                      </h1>
                                      <form onSubmit={handleModification}>
                                          <textarea
                                              name="post"
                                              type="text"
                                              className="displayTextAreaToModif"
                                              ref={addTextAreaAndImage}
                                              placeholder="Si vous le souhaitez, vous pouvez saisir du texte dans cette zone et choisir un image avec le boutton ci-dessous"
                                          ></textarea>
                                          <div className="displayButtons">
                                              <input
                                                  className="decoButton styleButton"
                                                  type="submit"
                                                  name="envoyer"
                                              ></input>
                                              <input
                                                  name="image"
                                                  type="file"
                                                  ref={addTextAreaAndImage}
                                                  accept="image/png, image/jpeg"
                                                  className="decoSelectFile styleButton"
                                                  alt="Modifier l'image"
                                                  id="image"
                                              ></input>
                                              <button
                                                  id={post._id}
                                                  className="annulationPost styleButton"
                                                  onClick={() =>
                                                      setModification(false)
                                                  }
                                              >
                                                  Annuler
                                              </button>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                          ) : (
                              <div data-set={post._id} className="displayPost">
                                  <div className="conteneur">
                                      <h1 className="dispayNamePoster">
                                          Votre post
                                      </h1>
                                      <div className='displayTextAndImage'>
                                      <div className="displayImage">
                                          <img
                                              src={post.imageUrl}
                                              alt=""
                                              align="right"
                                              className="image"
                                          />
                                          <h1 className='displayText'>
                                          {post.post}
                                          </h1>
                                        </div>
                                      </div>
                                  </div>
                                  <div className="displayButtons">
                                      <button
                                          id={post._id}
                                          className="modifyPost styleButton"
                                          onClick={() => setModification(true)}
                                      >
                                          Modifier
                                      </button>

                                      <div className="displayLikes">
                                          <div className="displayLikesAndNumberLikes">
                                              {like === 1 ? (
                                                  <FontAwesomeIcon
                                                      icon={faThumbsUp}
                                                      onClick={() =>
                                                          handleLike(post._id)
                                                      }
                                                      className="likeOff"
                                                  ></FontAwesomeIcon>
                                              ) : (
                                                  <FontAwesomeIcon
                                                      icon={faThumbsUp}
                                                      onClick={() =>
                                                          handleLike(post._id)
                                                      }
                                                      className="likeOn"
                                                  ></FontAwesomeIcon>
                                              )}
                                              <p className="numberOfLikes">
                                                  {post.likes}
                                              </p>
                                          </div>
                                      </div>

                                      <button
                                          id={post._id}
                                          className="deletePost styleButton"
                                          onClick={(e) => handleDelete(e)}
                                      >
                                          Supprimer
                                      </button>
                                  </div>
                              </div>
                          )
                      )}
            </div>
        </section>
    )
}
