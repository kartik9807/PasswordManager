const express = require("express")

const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const { MongoClient } = require('mongodb');
const dotenv = require("dotenv")
dotenv.config()
app.use(bodyParser.json())

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
app.use(cors())

// Database Name
const dbName = 'allPasswords';

client.connect()
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err))

const port = 3000

//Get all the passwords
app.get("/",async (req,res)=>{
    try{
        const db = client.db(dbName)
        const collection = db.collection('passwords');
        const findResult = await collection.find({}).toArray();
        res.json(findResult)
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})

// save a password
app.post("/",async (req,res)=>{
    try{
        const password = req.body
        const db = client.db(dbName)
        const collection = db.collection('passwords');
        const findResult = await collection.insertOne(password);
        res.json({success:true,result:findResult})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})

//delete a password
app.delete("/",async (req,res)=>{
    try{
        const password = req.body
        const db = client.db(dbName)
        const collection = db.collection('passwords');
        const findResult = await collection.deleteOne(password);
        res.json({success:true,result:findResult})
    }catch(err){
        console.error(err)
        res.status(500).json({error:"Internal Server Error"})
    }
})
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})