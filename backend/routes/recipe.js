const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const mongoose = require('mongoose')
const { isAuthenticated } = require('../middleware/isAuthenticated')

router.post('/send-recipe', async (req, res) => {
    try {
        const {name, ingredients, instructions, description, owner, categories} = req.body
        const recipeData = {
            name,
            description,
            ingredients:JSON.stringify(ingredients),
            instructions:JSON.stringify(instructions),
            owner,
            categories
        }

        const newRecipe = new schemas.Recipes(recipeData)

        const saveRecipe = await newRecipe.save()

        if(saveRecipe){
            res.send('Recipe Saved')
        }
    } catch(err){
        console.error(err)
        res.send(err)
    }

    res.end()
})

router.post('/send-recipe/:id', async (req, res) => {
    try {
        const id = req.params.id
        const {name, ingredients, instructions, description, owner, categories} = req.body
        const recipeData = {
            name,
            description,
            ingredients:JSON.stringify(ingredients),
            instructions:JSON.stringify(instructions),
            owner,
            categories
        }

        const newRecipe = new schemas.Recipes(recipeData)

        await schemas.Recipes.updateOne({"_id":id}, recipeData)
        
        res.send(`Recipe ${name} has been updated`)
    } catch(err){
        console.error(err)
        res.send(err)
    }

    res.end()
})

router.get('/get-recipe-name/:name', async (req, res) => {
    const name = req.params.name
    const result = await schemas.Recipes.find({"name":name})
    res.send({data:result})
})

router.get('/get-recipe-owner/', isAuthenticated, async (req, res) => {
    const userID = req.session.user._id
    console.log('User ID',userID)
    const result = await schemas.Recipes.find({owner:userID})
    res.send({data:result})
})

router.get('/get-recipe/:id', async (req, res) => {
    const id = req.params.id
    const result = await schemas.Recipes.find({"_id":id})
    res.send({data:result})
})

router.get('/get-recipes', isAuthenticated, async (req, res) => {
    console.log('User session from get all recipes:', {id:req.session.id, session:req.session})
    const result = await schemas.Recipes.find()
    res.send({data:result})
})

module.exports = router