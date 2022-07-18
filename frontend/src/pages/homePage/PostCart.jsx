import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { TokenContext, UserIdContext, NameContext } from '../../App'



const PostCard = (props) => {
    const { post, setPosts } = props.data

    let [token, setToken] = React.useContext(TokenContext)
    let [userId, setUserId] = React.useContext(UserIdContext)
    let [name, setName] = React.useContext(NameContext)

    const [refreshPosts, setRefreshposts] = useState(null)
    const [modification, setModification] = useState(false)
    const [like, setLike] = useState(true)
    const [annulation, setAnnulation] = useState(false)
    const [addLike, setAddLike] = useState(false)

    //*****************Modification d'un post */
    //--Récupération de la saisie de textArea et de l'image
    const textAreaAndImage = useRef([])
    const addTextAreaAndImage = (el) => {
        textAreaAndImage.current.push(el)
    }

    const sendModification = (event) => {
        event.preventDefault()
        const form = event.target
        const postId = form[1].id
        const formData = new FormData()
        const requestOptionsModifiyPost = {
            method: 'PUT',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }

        if (form[0].value === '' && form[2].files[0] === undefined) {
            alert('Vous avez oublié de saisir un texte et/ou un image')
        } else if (form[0].value === '' && form[2].files[0] !== undefined) {
            formData.append('image', form[2].files[0])

            fetch(
                'http://localhost:8000/groupomania/posts/' + postId,
                requestOptionsModifiyPost
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
                            const posts = data.sort(function (a, b) {
                                return a.createdAt - b.createdAt
                            })
                            setPosts(posts)
                            if (posts) {
                                setModification(false)
                            }
                        })
                })
        } else if (form[0].value !== '' && form[2].files[0] === undefined) {
            formData.append('post', form[0].value)

            fetch(
                'http://localhost:8000/groupomania/posts/' + postId,
                requestOptionsModifiyPost
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
                            const posts = data.sort(function (a, b) {
                                return a.createdAt - b.createdAt
                            })
                            setPosts(posts)
                            if (posts) {
                                setModification(false)
                            }
                        })
                })
        } else if (form[0].value !== '' && form[2].files[0] !== undefined) {
            formData.append('post', form[0].value)
            formData.append('image', form[2].files[0])

            fetch(
                'http://localhost:8000/groupomania/posts/' + postId,
                requestOptionsModifiyPost
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
                            const posts = data.sort(function (a, b) {
                                return a.createdAt - b.createdAt
                            })
                            setPosts(posts)
                            if (posts) {
                                setModification(false)
                            }
                        })
                })
        }
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

    //*************************Like
    const handleLike = async (event) => {
        let postId = event

        const arrayUsersLiked = post.usersLiked
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }

        if (!arrayUsersLiked.includes(userId)) {
            const requestOptionsLike = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
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
                    const newArrayPosts = fetch(
                        'http://localhost:8000/groupomania/posts',
                        requestOptions
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const posts = data.sort(function (a, b) {
                                return a.createdAt - b.createdAt
                            })
                            setPosts(posts)
                        })
                })
        } else {
            const requestOptionsLike = {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    like: 0,
                }),
            }

            await fetch(
                'http://localhost:8000/groupomania/posts/' + postId + '/like',
                requestOptionsLike
            )
                .then((response) => response.json())
                .then((data) => {
                    const newArrayPosts = fetch(
                        'http://localhost:8000/groupomania/posts',
                        requestOptions
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const posts = data.sort(function (a, b) {
                                return a.createdAt - b.createdAt
                            })
                            setPosts(posts)
                        })
                })
        }
    }

    return post.userId === userId ||
        name === process.env.REACT_APP_NAME ? (
        modification ? (
            <div className="displayPost">
                <div className="conteneur">
                    <h1 className="dispayNamePoster">
                        Mode modification activé
                    </h1>
                    <form onSubmit={sendModification} className="displayTexteareaModificationMode">
                        <textarea
                            name="post"
                            type="text"
                            className="displayTextAreaToModif"
                            ref={addTextAreaAndImage}
                            placeholder="Si vous le souhaitez, vous pouvez saisir du texte dans cette zone et choisir un image avec le boutton ci-dessous"
                        ></textarea>
                        <div className="displayButtons">
                            <input
                                id={post._id}
                                className="styleButton"
                                type="submit"
                                name="envoyer"
                            ></input>
                            <input
                                name="image"
                                type="file"
                                ref={addTextAreaAndImage}
                                accept="image/png, image/jpeg"
                                className="styleButton"
                                alt="Modifier l'image"
                                id="image"
                            ></input>
                            <button
                                className="annulationPost styleButton"
                                onClick={() => setModification(false)}
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
                    <h1 className="dispayNamePoster">Votre post</h1>
                    <h1 className="dispayNamePoster">{`Publié le ${new Date(
                        post.createdAt
                    ).toLocaleDateString('fr')} à ${new Date(
                        post.createdAt
                    ).toLocaleTimeString('fr')}`}</h1>
                    <div className="displayTextAndImage">
                        <div className="displayImage">
                            <img
                                src={post.imageUrl}
                                alt=""
                                align="right"
                                className="image"
                            />
                            <p className="displayText">{post.post}</p>
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
                                    onClick={() => handleLike(post._id)}
                                    className="likeOff"
                                ></FontAwesomeIcon>
                            ) : (
                                <FontAwesomeIcon
                                    icon={faThumbsUp}
                                    onClick={() => handleLike(post._id)}
                                    className="likeOn"
                                ></FontAwesomeIcon>
                            )}
                            <p className="numberOfLikes">{post.likes}</p>
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
    ) : (
        <div className="displayPost">
            <div className="conteneur">
                <h1 className="dispayNamePoster">Publié par : {post.name}</h1>
                <h1 className="dispayNamePoster">
                    {`Publié le ${new Date(post.createdAt).toLocaleDateString(
                        'fr'
                    )} à ${new Date(post.createdAt).toLocaleTimeString('fr')}`}
                </h1>
                <div className="displayTextAndImage">
                    <div className="displayImage">
                        <img
                            src={post.imageUrl}
                            alt=""
                            align="right"
                            className="image"
                        />
                        <p className="displayText">{post.post}</p>
                    </div>
                </div>
            </div>
            <div className="displayLikes">
                <div className="displayLikesAndNumberLikes">
                    {like === 1 ? (
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            onClick={() => handleLike(post._id)}
                            className="likeOff"
                            size="4x"
                        ></FontAwesomeIcon>
                    ) : (
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            onClick={() => handleLike(post._id)}
                            className="likeOn"
                            size="4x"
                        ></FontAwesomeIcon>
                    )}
                    <p className="numberOfLikes">{post.likes}</p>
                </div>
            </div>
        </div>
    )
}

export default PostCard
