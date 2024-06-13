const mongoose=require('mongoose');
require('dotenv').config();

const localDB = process.env.DATABASE_LOCAL;
const atlasDB = process.env.DATABASE_ATLAS;

const db = process.env.NODE_ENV === 'production' ? atlasDB : localDB;

mongoose.connect(db)
    .then(()=>console.log("Connected to MongoDB"))
    .catch((err)=>{ 
        console.error("Failed to connect to MongoDB",err)
        process.exit(1)
});  