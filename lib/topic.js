var db = require('./database');
var qs = require('querystring');
var template = require('./template')


exports.home = function(request, response){
    db.query(`SELECT *FROM topic`, function(error, topics){
        if(error){
            throw error;
        }
        var list = '<div>';
        var i = topics.length-1;

        while(i >= 0){
            list = list + `
            <div class="list">
            <form action="/nameFilter" method="post"><div><input type="submit"  id="username" value=${topics[i].name} name="name"></div></form>
            <div class="created">${topics[i].created}</div>
            <div class="written">${topics[i].description}</div>
            <div><form action="/delete_process" method="post"><input type="hidden" name="name" value="${topics[i].id}"><input type="submit" method="post" class="deleteButton" value="delete"></form></div>
            </div>`
            i = i - 1;
        }
    
        list = list + '</div>'
        var homepage = template.home(list);
        response.writeHead(200);
        response.end(homepage)
    })
}
exports.create_process = function(request, response){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        if(post.name !== "" && post.description !== ""){
            db.query(`
                INSERT INTO topic (name, description, created)
                VALUES(?, ?, NOW())`, 
                [post.name, post.description],
            function(error, result){
                if(error){
                    throw error;
                }
                response.writeHead(302, {Location:'/'})
                response.end();
            }) 
        }else if(post.name === "" || post.description === ""){
            response.redirect();
        }
    })
}
exports.nameFilter = function(request, response){
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
        db.query(`SELECT *FROM topic WHERE name = ?`,[post.name], function(error, topics){
            if(error){
                throw error;
            }
            var list = '<a href="/"><button id="comeback">Back To Homepage</button></a><div>';
            var i = topics.length-1;
            while(i >= 0){
                list = list + `
                <div class="list">
                <form action="/nameFilter" method="post"><div><input type="submit"  id="username" value=${topics[i].name} name="name"></div></form>
                <div id="created">${topics[i].created}</div>
                <div id="written">${topics[i].description}</div>
                <form action="/delete_process" method="post"><input type="hidden" name="name" value="${topics[i].id}"><input type="submit" method="post" class="deleteButton" value="delete"></form>
                </div>
                `
                i = i - 1;
            }
            list = list + '</div>'
            
            var homepage = template.home(list);
            response.writeHead(200);
            response.end(homepage)
        })    
    })
}
    exports.delete_process = function(request, response){
        var body = '';
          request.on('data', function(data){
              body = body + data;
          });
          request.on('end', function(){
              var post = qs.parse(body);
            db.query(`DELETE FROM topic WHERE id = ?`,[post.name], function(error, topics){
                if(error){
                    throw error;
                }
                response.writeHead(302, {Location:'/'})
                response.end();
            })
        })
    }        
