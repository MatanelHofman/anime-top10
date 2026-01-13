// index.js :


import express from "express";
import axios from "axios";


const app = express();
const port = 3000;
const API_URL = "https://api.jikan.moe/v4/"


app.set("view engine" , "ejs");
app.use(express.static("public"));

app.get("/", async (req, res)=>{
   

    try {
        const result = await axios.get(`${API_URL}top/anime`);
        const anime = result.data.data;
        const Top10 = anime.slice(0,10);
        
        
        
        res.render("index.ejs",{
            anime1 : Top10
        });
    } catch (error) {
        const  errorMessage = error.message;
        res.status(500).render("index.ejs", {
            error : `Oops we have a problem ! ${errorMessage}`,
            anime1 : []
        });
        
        
    } 
    
});


app.get("/anime/:id",async (req, res) => {
    try {
        const result = await axios.get(`${API_URL}anime/${req.params.id}/full`);
        const animeById = result.data.data;
        
        console.log(typeof(animeById));
        
        res.render("details.ejs",{
            animeById : animeById
        });
    } catch (error) {
        res.send("error");
        
    }
});


app.get("/random",async (req, res) => {
    
    try {
        const result = await axios.get(`${API_URL}random/anime`);
        const randomAnime = result.data.data;
        res.render("random.ejs",{
            randomAnime: randomAnime
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Somthing went wrong");
        
    }

});


app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
    
});