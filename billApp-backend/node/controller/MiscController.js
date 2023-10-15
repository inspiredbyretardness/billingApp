const asyncHandler = require("express-async-handler");

const Metal = require('../models/MetalModel')
const Stone = require("../models/StoneModel")

const getAllMetalls = asyncHandler(async(req,res)=>{
    try {
      const metals =  await Metal.find({})
      console.log(metals);
      res.json(metals)
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})

const saveMetal = asyncHandler(async(req,res)=>{
    const {metalName}= req.body;
    try {
        console.log({metalName});
    const saveAMetal = await Metal.create({metalName})
        res.json(saveAMetal)
        console.log(saveAMetal);
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
const getAllStone = asyncHandler(async(req,res)=>{
    try {
        const getStones = await Stone.find({})
        res.json(getStones)
    } catch (error) {
        console.log(error);
        res.json(error.errors)
    }
})
const saveStone = asyncHandler(async(req,res)=>{
    try {
        const {stoneName,isPrecious} = req.body;
        const save = await Stone.create({stoneName,isPrecious})
        res.json(save)
    } catch (error) {
        res.json(error.errors)
    }
})
module.exports = {getAllMetalls,saveMetal,getAllStone,saveStone} 