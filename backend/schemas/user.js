const mongoose = require('mongoose');

const mongooseErrors = require('mongoose-errors')//--Gestionnaire d'erreurs monggose

//--Package de validation pour prévalider les informations avant de les enregistrer
//--Assure l'unicité du mail grâce au module mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {type: String, require: true, unique: true },//-- nom de l'utilisateur [unique]
    email: {type: String, require: true, unique: true },//-- adresse e-mail de l'utilisateur [unique]
    password: {type: String, require: true }//-- mot de passe de l'utilisateur haché
});

//--Applique le uniqueValidator au schéma avant dans faire un modèle
userSchema.plugin(uniqueValidator);
userSchema.plugin(mongooseErrors);
module.exports = mongoose.model('User', userSchema)