const express = require('express');
const dotenv = require('dotenv').config();
const app=express();
const port=3000;
const postsRouter = require("./routers/posts");

app.use(express.json());


// registro le rotte per le pizze
app.use("/posts", postsRouter);


app.listen(port,()=>{
    console.log(`app attiva su http://localhost:${port}`);
});
