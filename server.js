var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var low = require('lowdb')

var FileSync = require('lowdb/adapters/FileSync')

var adapter = new FileSync('db.json')
var db = low(adapter)

var bookRoute = require('./routes/book.route');
var userRoute = require('./routes/user.route');
var transactionRoute = require('./routes/transactions.route');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));// for parsing application/x-www-form-urlencoded

db.defaults({ books: [], users: [], transactions : []})
  .write()


app.use(
  '/books',
  bookRoute
)

app.use(
  '/users',
  userRoute
)

app.use(
  '/transactions',
  transactionRoute
)

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("index");
});


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
