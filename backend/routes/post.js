const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth');//--Middleware d'authentification
const multer = require('../middleware/multer-config');//--Middleware de gestion des fichiers

const postsCtrl = require('../controllers/posts');

//*****Routes des posts
//--Ajouter un nouveau post
router.post('/', auth, multer, postsCtrl.createPost);//--multer doit être après auth pour éviter l'enregistrement d'un fichier sans authentification

//--Mettre à jour une Post existante
router.put('/:id', auth, multer, postsCtrl.modifyPost);

//--Suppression d'une Post
router.delete('/:id', auth, postsCtrl.deletePost);

//--Récupération d'une Post spécifique
router.get('/:id', auth, postsCtrl.getOnePost);

//--Route GET qui renvoie toutes les Posts dans la base de données
router.get('/', auth, postsCtrl.getAllPosts);

module.exports = router;

//*****Route des likes
router.post('/:id/like', auth, postsCtrl.likePost)