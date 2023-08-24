const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')
const mongoose = require('mongoose')

router.post('/send-recipe', async (req, res) => {
    const {name, ingredientLineArr, instructionLineArr} = req.body
    // console.log({name, ingredientLineArr, instructionLineArr})
    // console.log(req.body)
    const recipeData = {
        name:name,
        ingredients:JSON.stringify(ingredientLineArr),
        instructions:JSON.stringify(instructionLineArr)
    }

    const newRecipie = new schemas.Recipes(recipeData)

    const saveRecipe = await newRecipie.save()

    if(saveRecipe){
        res.send('Recipe Saved')
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