const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const path = require('path');
const userRoute = require('./routes/userRoute')
// const employedRoute = require('./routes/employedRoute')
// const unemployedRoute = require('./routes/unemployedRoute')

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', userRoute)
//app.use('/employed', employedRoute)
//app.use('/unemployed', unemployedRoute)

app.listen(3000, function(){
    console.log("App is listening on port 3000");
})
