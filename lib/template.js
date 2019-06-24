module.exports = {
    home:function(list){
        return `
        <!doctype html>
        <html>
        <head>
            <title>TWITTLER</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="/css/style.css" type="text/css">
        </head>
        <body>
            
            <form action="/create_process" method="post" id="create">
            <div>
                <div id="title">TWITTLER</div>    
                <p><input type="text" placeholder="username" name="name" id="newUser"></p>
                <p><textarea name="description" placeholder="description" id="newDesc"></textarea></p>
            </div> 
            <p>
                <input type="submit" value="tweet!" id="tweetButton">
            </p>
            </form>
                <input type="button" value="check new tweet" id="random">
            <form action="/random_process" method="post" id="random"></form>
            <div id="messages">
                ${list}
            </div>
            
        </body>        
        </html>
        `},
    newTweet:`<input type="text">`,
    messages:`<button></button>`,
    filtered:function(list){
        return `
        <!doctype html>
        <html>
        <head>
            <link rel="stylesheet" href="/css/style.css" type="text/css">
            <title id="title">TWITTLER</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>TWITTLER</h1>
            <form action="/create_process" method="post">
            <div>    
                <p><input type="text" placeholder="username" name="name"></p></div>
                <p><textarea name="description" placeholder="description"></textarea></p>
            </div> 
            <p>
                <input type="submit" value="tweet!">
            </p>
            </form>
                <input type="button" value="check new tweet" id="random">
            <form action="/random_process" method="post" id="random"></form>
            <div id="messages">
                ${list}
            </div>
        </body>        
        </html>
        `}
    }