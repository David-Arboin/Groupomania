import React, {
    useState,
    useEffect,
    useNavigate,
    useParams,
    useContext,
    useCallback,
} from 'react'
import { useRef } from 'react'
import ReactDOM from 'react-dom'

import { TokenContext } from '../../App'
import { UserIdContext } from '../../App'
import { NameContext } from '../../App'
import PostCard from './PostCart'

export default function Section() {
    const [users, setUsers] = useState(null)
    /*   const navigate = useNavigate(); */

    let [token, setToken] = React.useContext(TokenContext)
    let [userId, setUserId] = React.useContext(UserIdContext)
    let [name, setName] = React.useContext(NameContext)

    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState(null)
    const [user, setUser] = useState(null)

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
                const posts = data.slice().sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
                setPosts(posts)
                setIsLoading(false)
            })
    }, [])

    //****************Création d'un post */

    const textAreaAndImage = useRef([])
    const addTextAreaAndImage = (el) => {
        textAreaAndImage.current.push(el)
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const formData = new FormData()
        const requestOptionsCreate = {
            method: 'POST',
            headers: { Authorization: 'Bearer ' + token },
            body: formData,
        }

        console.log(form[0].value)
        console.log(form[1].files[0])

        if (form[0].value === '' && form[1].files[0] === undefined) {
            alert('Vous avez oublié de saisir un texte et/ou un image')
        } else if (form[0].value === '' && form[1].files[0] !== undefined) {
            formData.append('image', form[1].files[0])
            formData.append('post', "Aucun texte saisie")
            formData.append('name', name)

            fetch(
                'http://localhost:8000/groupomania/posts',
                requestOptionsCreate
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
                            const posts = data.slice().sort(function (a, b) {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })
                            setPosts(posts)
                            form.reset()
                        })
                })
        } else if (form[0].value !== '' && form[1].files[0] === undefined) {
            console.log('ICI')
            formData.append('post', form[0].value)
            formData.append('name', name)
            fetch(
                'http://localhost:8000/groupomania/posts',
                requestOptionsCreate
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
                            const posts = data.slice().sort(function (a, b) {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })
                            setPosts(posts)
                            form.reset()
                        })
                })
        } else if (form[0].value !== '' && form[1].files[0] !== undefined) {
            formData.append('post', form[0].value)
            formData.append('image', form[1].files[0])
            formData.append('name', name)

            fetch(
                'http://localhost:8000/groupomania/posts',
                requestOptionsCreate
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
                            const posts = data.slice().sort(function (a, b) {
                                return new Date(b.createdAt) - new Date(a.createdAt)
                            })
                            setPosts(posts)
                            form.reset()
                        })
                })
        }
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
            <div className="displayCreatePost">
                <div className="hello">Bienvenue {name} 🙂</div>
                <div className="displayTitleCreatePost">
                    <h1 className="titleCreatePost">Créer un post</h1>
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
                                ref={addTextAreaAndImage}
                                id="image"
                                alt="image poster par un utilisateur"
                            />
                        <input className="styleButton" type="submit"></input>
                    </div>
                </form>
            </div>

            <div className="displayPosts">
                {posts.map((post, index) => (
                    <PostCard data={{ post, setPosts }} />
                ))}
            </div>
        </section>
    )
}
