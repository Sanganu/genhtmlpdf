function generateHTML(data){
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <style>
           .jumbotron{
               background-color: ${data.color};
           }
        </style>
    </head>
    <body>
        <div class="jumbotron">
         
            <header>
            Welcome ${data.name}
          <img src="${data.avatar}" alt="Photo of " height=200 width="200" />
         
        </header>
          
        </div>
        <div class="container">
            <h4>Followers = ${data.followers} </h4>
            <h5>Following = ${data.following}</h5>
            <h6>Public Repos = ${data.public_repos}</h6>
            <p>Email: ${data.email}</p>
            <p>Blog: ${data.blog}</p>
        </div>
        
    </body>
    </html>`;
}

module.exports = generateHTML;
