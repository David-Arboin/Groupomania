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

/* import {TokenAndUserIdContext} from '../loginPage' */

export default function Section({ handleModification }) {
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState(null)
    const [users, setUsers] = useState(null)
    const navigate = useNavigate()
    let [token, setToken] = React.useContext(TokenContext)
    let [userId, setUserId] = React.useContext(UserIdContext)
    const [refreshPosts, setRefreshposts] = useState(null)
    const [modification, setModification] = useState(true)
    const [like, setLike] = useState(true)
    const [annulation, setAnnulation] = useState(false)
    const [addLike, setAddLike] = useState(false)

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
    }

    //*****************Modification d'un post */
    const handleModify = (event) => {
        event.preventDefault()
        const target = event.target
        console.log(target)
        /*         posts = posts.filter(a => a.userId !== event.userId)
    this.setState({posts: posts}) */
    }

    //--Annuler la modification d'un post

    //****************Suppression d'un post
    const handleDelete = (event) => {
        event.preventDefault()
        let target = event.target.id
        console.log(target)
        const requestOptions = {
            method: 'DELETE',
            headers: { Authorization: 'Bearer ' + token },
        }
        fetch(
            'http://localhost:8000/groupomania/posts/' + target,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    //--Déconnexion
    const logout = (e) => {
        setToken('')
        setUserId('')

        /*     localStorage.removeItem('userId'); */
        navigate('/')
    }
console.log(token)
console.log(userId)
console.log(posts)
    //--Like
    const handleLike = (event) => {
        let target = event

        const requestOptions = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: JSON.stringify({
                userId: userId,
                like: 1,
            }),
        }
        console.log(target)

        fetch(
            'http://localhost:8000/groupomania/posts/' + target + '/like',
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => console.log(data))

    }

    return isLoading ? (
        'Loading !'
    ) : (
        <section className="displaySection">
            <button onClick={logout} className="displayButtonLogout">
                Déconnexion
            </button>
            <div className="displayCreatePost">
                <div className="hello">Bienvenue {users.name}</div>
                <div className="displayTitleCreatePost">
                    <h1>Créer un post</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        name="post"
                        type="text"
                        className="displayText"
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
                          post.userId === userId ? (
                              <div className="displayPost">
                                  <div className="conteneur">
                                      <h1 className="dispayNamePoster">
                                          Votre post
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
                                      <div className="numberOfLikes"></div>
                                  </div>
                                  <div>
                                      {modification ? (
                                          <div className="displayButtons">
                                              <button
                                                  id={post._id}
                                                  className="modifyPost styleButton"
                                                  onClick={() =>
                                                      setModification(false)
                                                  }
                                              >
                                                  Modifier
                                              </button>

                                              <div className="displayLikes">
                                                  <div className="displayLikesAndNumberLikes">
                                                      {like === 1 ? (
                                                          <FontAwesomeIcon
                                                              icon={faThumbsUp}
                                                              onClick={() =>
                                                                  handleLike(
                                                                      post._id
                                                                  )
                                                              }
                                                              className="likeOff"
                                                          ></FontAwesomeIcon>
                                                      ) : (
                                                          <FontAwesomeIcon
                                                              icon={faThumbsUp}
                                                              onClick={() =>
                                                                  handleLike(
                                                                      post._id
                                                                  )
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
                                                  onClick={(e) =>
                                                      handleDelete(e)
                                                  }
                                              >
                                                  Supprimer
                                              </button>
                                          </div>
                                      ) : (
                                          <div className="displayButtons">
                                              <input
                                                  className="decoButton styleButton"
                                                  type="submit"
                                                  name="envoyer"
                                              ></input>
                                              <input
                                                  name="image"
                                                  type="file"
                                                  accept="image/png, image/jpeg"
                                                  className="decoSelectFile styleButton"
                                                  alt="Modifier l'image"
                                                  id="image"
                                              ></input>
                                              <button
                                                  id={post._id}
                                                  className="deletePost styleButton"
                                                  onClick={() =>
                                                      setModification(true)
                                                  }
                                              >
                                                  Annuler
                                              </button>
                                          </div>
                                      )}
                                  </div>
                              </div>
                          ) : (
                              <div className="displayPost">
                                  <div className="conteneur">
                                      <h1 className="dispayNamePoster">
                                          Publié par : {post.name}
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
                          )
                      )}
            </div>
        </section>
    )
}
