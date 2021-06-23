const express = require('express');
const { mongoUrl } = require('../db/connect');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const hbs = require('hbs');
const path = require('path');

module.exports = function (app) {
  hbs.registerPartials(path.resolve('views', 'partials'));

  app.use(cors());

  app.set('view engine', 'hbs');
  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      secret: '81267891273897318973289jhkkjh',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
      store: MongoStore.create({ mongoUrl }),
    })
  );

  app.use((req, res, next) => {
    res.locals.username = req.session.username;
    res.locals.admin = req.session.userAdmin;
    next();
  });
};
