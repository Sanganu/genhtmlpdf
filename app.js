const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");
const fs = require("fs");
const pdf = require("html-pdf");
const axios = require("axios");
var color = ""
const questions = [
    {type:"input",
      name:"github",
      message:"Enter Gihub Username?"},
    {
        type:"list",
        name:"color",
        message:"Choose Prefered Color",
        choices: ["red","blue","green","pink"]
    }
]
   inquirer.prompt(questions)
    .then(response => {
       console.log("Searching for profile ",response.github);
        color = response.color;
        return response
    }).then(response => {
           return axios.get(`https://api.github.com/users/${response.github}`)
    })   
    .then((dataresponse) => {
            console.log(dataresponse);
            details = {
                name:dataresponse.data.name,
                avatar:dataresponse.data.avatar_url,
                followers: dataresponse.data.followers,
                following:dataresponse.data.following,
                public_repos:dataresponse.data.public_repos,
                location: dataresponse.data.location,
                company:dataresponse.data.company,
                email: dataresponse.data.email,
                blog:dataresponse.data.blog,
                color:color
            }
           return generateHTML(details)
    }).then((html) => {
           // console.log("HTML generated",html);
            fs.writeFile("index.html",html,function(err,result){
                if(err) console.log("Error in writing to index")
                console.log("Result after writing Index html");
                const htmlfile = fs.readFileSync("./index.html","utf8");
                const options ={ format: 'Letter'};
                pdf.create(htmlfile,options).toFile("./profile.pdf",function(err,res){
                    if (err) return console.log(err);
                    console.log("File created",res);
                });
              //  return html
            });
          
    }).catch(error =>{
        console.log("Error ",error)
    });
