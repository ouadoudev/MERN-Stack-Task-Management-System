const mongoose=require('mongoose');
require('dotenv').config();

const db=process.env.DATABASE_URL

mongoose.connect(db)
    .then(()=>console.log("Connected to MongoDB"))
    .catch((err)=>{ 
        console.error("Failed to connect to MongoDB",err)
        process.exit(1)
});  