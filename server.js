const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


// Bring in Api files
const users = require('./routes//api/users');
const profile = require('./routes//api/profile');
const posts = require('./routes//api/posts');


const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;


// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;


// Connect to mongoDB tru mongoose
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// passport middleware
app.use(passport.initialize());
// passport Config
require('./config/passport')(passport);


app.get('/', (req, res) => res.send('Hello world!'));


// Use route
// telling any route / users to go to users
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App started on ${port}`));

// jsonbewton creates the token
// passport and passport-jwt valites it and expracts the user info from it