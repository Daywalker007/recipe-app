const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recipeSchema = new Schema({
    name:{type:String},
    ingredients:{type:String},
    instructions:{type:String},
    entryDate: {type:Date, default:Date.now}
})

const userSchema = new Schema({
    name:{type:String},
    email:{type:String},
    entryDate: {type:Date, default:Date.now}
})

const Recipes = mongoose.model('Recipes', recipeSchema, 'recipes')
const Users = mongoose.model('Users', userSchema, 'users')

const mySchemas = {
    'Recipes':Recipes,
    'Users':Users
}

module.exports = mySchemas