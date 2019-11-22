const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const api = require("./api");
const generateHTML = require("./generateHTML");
//New packages
const open = require("open");
const convertFactory = require("electron-html-to");

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

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
  }

function startentry(){
    inquirer.prompt(questions)
    .then(response => {
        console.log("Searching for profile ",response.github)
        api.getUserData(response.github)
        .then(dataresponse => {
           // console.log("Github data",dataresponse.data.login);
            console.log(`The URL ${dataresponse.data.avatar_url}
            The Number of followers = ${dataresponse.data.followers} 
            THe Number of following = ${dataresponse.data.following}
            The Public Repos = ${dataresponse.data.public_repos}
            The Location = ${dataresponse.data.location}
            The Company = ${dataresponse.data.company}
            The Name = ${dataresponse.data.name}
            The email = ${dataresponse.data.email}
            `);
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
                color:response.color
            }
            return generateHTML(details)
        }).then(html => {
            console.log(html);
            // const conversion = convertFactory({
            //     converterPath: convertFactory.converters.PDF
            //   });
      
            //   conversion({ html }, function(err, result) {
            //     if (err) {
            //       return console.error(err);
            //     }
      
            //     result.stream.pipe(
            //       fs.createWriteStream(path.join(__dirname, "resume.pdf"))
            //     );
            //     conversion.kill();
            //   });
      
            //   open(path.join(process.cwd(), "resume.pdf"));
           
        });
    })
} 

startentry();