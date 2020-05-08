require('dotenv').config()

var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require("mongoose");

var app = express();

var db = require('./db');

var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transactionRoute = require('./routes/transactions.route');
var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');

var connectDB = require('./connection');

//connect to mongo cluster

try {
  connectDB();
} catch (error) {
  console.log("can't connect! : " + error);
}


//connect to mongo cluster

app.set('views', './views');
app.set('view engine', 'pug');

var cookiesMiddleware = require('./middlewares/cookies.middleware');
var usersMiddleware = require('./middlewares/users.middleware');
var sessionsMiddleware = require('./middlewares/sessions.middleware');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
  sessionsMiddleware.requireSession,
  sessionsMiddleware.count
)


app.use(
  '/books',
  bookRoute
)

app.use(
  '/users',
  usersMiddleware.requireAuth,
  userRoute
)

app.use(
  '/transactions',
  usersMiddleware.requireAuth,
  transactionRoute
)

app.use(
  '/auth',
  authRoute
)

app.use(
  '/cart',
  cartRoute
)



// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", 
  (request, response) => {
  response.render("index");
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
