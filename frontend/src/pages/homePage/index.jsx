import './Section.scss';
import React, {
  useState,
  useEffect,
  useParams,
  useContext,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import ReactDOM from 'react-dom';

import { TokenContext } from '../../App';
import { UserIdContext } from '../../App';
import { NameContext } from '../../App';
import PostCard from './PostCart';

/* import {TokenAndUserIdContext} from '../loginPage' */

export default function Section() {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();

  let [token, setToken] = React.useContext(TokenContext);
  let [userId, setUserId] = React.useContext(UserIdContext);
  let [name, setName] = React.useContext(NameContext);

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState(null);

  //**************Affichage des posts

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/groupomania/posts', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  const textAreaAndImage = useRef([]);
  const addTextAreaAndImage = (el) => {
    textAreaAndImage.current.push(el);
  };

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

//****************Création d'un post */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();
    formData.append('post', form[0].value);
    formData.append('image', form[1].files[0]);
    console.log(form[0].value);
    console.log(form[1].files[0]);

    const requestOptionsCreate = {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token },
      body: formData,
    };
    fetch('http://localhost:8000/groupomania/posts', requestOptionsCreate)
      .then((response) => response.json())
      .then((data) => {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        };
        const newArrayPosts = fetch(
          'http://localhost:8000/groupomania/posts',
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            setPosts(data);
          });
      });
  };


  //--Déconnexion
  const logout = (e) => {
    setToken('');
    setUserId('');
    setName('');
    navigate('/');
  };

  useEffect(() => {
    if (!posts) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [posts]);

  console.log(posts);
  console.log(userId);


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
        {posts.map((post, index) =>
          <PostCard data={{ post, setPosts }} />
        )}
      </div>
    </section>
  );
}
