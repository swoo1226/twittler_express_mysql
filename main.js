var express = require('express');
var app = express();
app.use(express.static('public'));
var topic = require('./lib/topic')


app.get('/', function(request, response){
    topic.home(request, response)
})
app.post('/create_process', function(request, response){
    topic.create_process(request, response)
})
app.post('/nameFilter', function(request, response){
    topic.nameFilter(request, response)
})
app.post('/delete_process', function(request, response){
    topic.delete_process(request, response)
})
app.use(function(request, response){
    response.status(400).send('Something Happens Error!');
})




app.listen(3000, () => console.log('Example app listening to on port 3000!'))

