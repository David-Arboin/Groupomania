const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth');//--Middleware d'authentification

const usersCtrl = require('../controllers/users');

//--Route GET qui renvoie toutes les Posts dans la base de données
router.get('/', auth, usersCtrl.getAllUsers);

module.exports = router;