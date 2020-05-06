require('dotenv').config()

var express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var low = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
var db = low(adapter);

var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transactionRoute = require('./routes/transactions.route');
var authRoute = require('./routes/auth.route');

app.set('views', './views');
app.set('view engine', 'pug');

var cookiesMiddleware = require('./middlewares/cookies.middleware');
var usersMiddleware = require('./middlewares/users.middleware');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

db.defaults({ books: [], users: [], transactions : []})
  .write()


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

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
var count = 1;
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", 
  cookiesMiddleware.requireCookie,
  (request, response) => {
  console.log(request.signedCookies.cookieId + ':' + count);
  count++;
  response.render("index");
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
