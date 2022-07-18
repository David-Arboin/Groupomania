//--Logique métier des routes
const Users = require('../schemas/user');

//**********Récupération de tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    Users.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};

//**********Récupération d'un utilisateur
exports.getOneUser = (req, res, next) => {
    Users.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
};