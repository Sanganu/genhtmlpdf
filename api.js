const axios = require("axios");
require("dotenv").config()
const api ={
    getUserData(username){
       return axios.get(`https://api.github.com/users/${username}`)
        
        .catch(err => {
            console.log("User Not found");
            process.exit(1);
        })
    },
    getTotalStar(username){
         
    }

}

module.exports = api;
