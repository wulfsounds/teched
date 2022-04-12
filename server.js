const express = require('express');
const path = require('path');

// load dependencies
const Sequelize = require("sequelize");
const session = require("express-session");
const exphbs = require('express-handlebars');

// Handlebars
const hbs = exphbs.create({});
const Blog = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// create database, ensure 'sqlite3' in your package.json
const sequelize = new Sequelize("database", "username", "password", {
  dialect: "sqlite",
  storage: "./session.sqlite",
});

// configure express
app.use(
  session({
    secret: "keyboard cat",
    store: new SequelizeStore({
      db: sequelize,
    }),
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true, // if you do SSL outside of node.
  })
);


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/blog-routes'));

Blog.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
  console.log('Server listening on: http://localhost:' + PORT);
});