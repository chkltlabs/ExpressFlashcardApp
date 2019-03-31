const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); //without this, req.body always returns undefined
app.use('/static', express.static('public'));
app.set('view engine', 'pug'); //sets the file extension of all render methods to *.pug


const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);


app.use((req, res, next) => { //placement is important!! Express checks each function and method above for a match first, and if none is found, defaults to this one. This function throws a new error and passes it to next, which triggers the error page for all pages, below
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => { //if an error is ever thrown, this triggers.
    res.locals.error = err;
    res.status(err.status);
   res.render('error');

});

const port = 3000;

function dateify(number){
    let out = new Date() + " " ;
    console.log(out.substr(16, 9)
        + "app running on http://localhost:"
        + number);
}

app.listen(port, dateify(port));