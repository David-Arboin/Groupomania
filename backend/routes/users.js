const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth');//--Middleware d'authentification
const usersCtrl = require('../controllers/users');

//--Route GET qui renvoie toutes les utilisateur
router.get('/', auth, usersCtrl.getAllUsers);

//--Route GET qui renvoie un utilisateur
router.get('/:id', auth, usersCtrl.getOneUser);

module.exports = router;