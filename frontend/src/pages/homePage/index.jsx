/* eslint-disable */

import React, {
    useState,
    useEffect
} from 'react'
import { useRef } from 'react'
import { TokenContext } from '../../App'
import { NameContext } from '../../App'
import PostCard from './PostCart'
import Swal from 'sweetalert2'

export default function Section() {
    const SwalWelcome = require('sweetalert2')
    
    let [token, setToken] = React.useContext(TokenContext)
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
                const posts = data.slice().sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
                setPosts(posts)
                SwalWelcome.fire({
                    title: `Bonjour ${name} !`,
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
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

        if (form[0].value === '' && form[1].files[0] === undefined) {
            Swal.fire('Vous avez oublié de saisir un texte et/ou un image')
        } else if (form[0].value === '' && form[1].files[0] !== undefined) {
            formData.append('image', form[1].files[0])
            formData.append('post', 'Aucun texte saisie')
            formData.append('name', name)
            setIsLoading(true)

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
                                return (
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                            })
                            setPosts(posts)
                            form.reset()
                            setIsLoading(false)
                        })
                })
        } else if (form[0].value !== '' && form[1].files[0] === undefined) {
            console.log('ICI')
            formData.append('post', form[0].value)
            formData.append('name', name)
        setIsLoading(true)

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
                                return (
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                            })
                            setPosts(posts)
                            form.reset()
                            setIsLoading(false)
                        })
                })
        } else if (form[0].value !== '' && form[1].files[0] !== undefined) {
            formData.append('post', form[0].value)
            formData.append('image', form[1].files[0])
            formData.append('name', name)
            setIsLoading(true)

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
                                return (
                                    new Date(b.createdAt) -
                                    new Date(a.createdAt)
                                )
                            })
                            setPosts(posts)
                            form.reset()
                            setIsLoading(false)
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

    return isLoading ? (
        <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    ) : (
        <section className="displaySection">
            <div className="displayCreatePost">
                <div className="hello">Bienvenue {name} 🙂</div>
                <div className="displayTitleCreatePost">
                    <label for="post" className="titleCreatePost">Créer un post</label>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        id="post"
                        name="post"
                        type="text"
                        className="displayTextArea"
                        ref={addTextAreaAndImage}
                        placeholder="Si vous le souhaitez, vous pouvez saisir du texte dans cette zone et choisir un image avec le boutton ci-dessous"
                    ></textarea>
                    <div className="displayinputImageAndButtonPublish">
                        <div className='displayLabelAndInputImage'>
                        <label for="image" id='colorLabelChooseImage'>Choisi une image</label>
                        <input
                            name="image"
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={addTextAreaAndImage}
                            id="image"
                            alt="image poster par un utilisateur"
                        />
                        </div>
                        <input className="styleButton" type="submit" value="Envoyer"></input>
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
