const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const hbs = require("hbs");
const path = require("path");
const { mongoUrl } = require("./src/db/config");
const { connect } = require("./src/db/connect");
const indexRoute = require('./src/routes/index.routes')
const userRoute = require('./src/routes/user.routes')

const app = express()


const PORT = 3000;

hbs.registerPartials(path.join(process.env.PWD,"src", "views", "partials"));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "81267891273897318973289jhkkjh",
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

app.use("/", indexRoute);
app.use('/users', userRoute)


app.listen(PORT, () => {
  console.log("Server started!!!");
  connect();
});
