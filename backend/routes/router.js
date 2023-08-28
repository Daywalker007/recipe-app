const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const mongoose = require('mongoose')

router.post('/send-recipe', async (req, res) => {
    try {
        const {name, ingredients, instructions, owner, categories} = req.body
        console.log(owner)
        const recipeData = {
            name:name,
            ingredients:JSON.stringify(ingredients),
            instructions:JSON.stringify(instructions),
            owner:owner,
            categories
        }

        const newRecipie = new schemas.Recipes(recipeData)

        const saveRecipe = await newRecipie.save()

        if(saveRecipe){
            res.send('Recipe Saved')
        }
    } catch(err){
        console.error(err)
        res.send(err)
    }

    res.end()
})

router.get('/get-recipe/:name', async (req, res) => {
    const name = req.params.name
    console.log('Params: ', req.params)
    console.log('Name: ', name)
    const result = await schemas.Recipes.find({"name":name})
    res.send({data:result})
})

module.exports = router