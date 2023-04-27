let express = require('express');

let app = express();

app.use(express.static(__dirname+'dist/sushi-frontend'));

app.get('/*',(req,resp)=> {
  resp.sendFile(__dirname+'dist/sushi-frontend');
})

app.listen(process.env.PORT || 8080);
