const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const hbs = require("hbs");
const path = require("path");
const { mongoUrl } = require("./src/db/config");
const { connect } = require("./src/db/connect");
const sessions = require('express-session')


const indexRoute = require("./src/routes/index.routes");
const userRoute = require("./src/routes/user.routes");
const postRouter = require("./src/routes/posts.routes");
const voteRouter = require("./src/routes/vote.routes");
const profileRouter = require("./src/routes/profile.routes");
const shareRouter = require("./src/routes/shares.routes");

const app = express();

const PORT = 3000;

hbs.registerPartials(path.join(process.env.PWD, "src", "views", "partials"));
hbs.registerHelper('addEditDelete', (owner, idUser) => {
  if(String(owner) === userId) {
    return new hbs.SafeString(`
    <a href="/posts/edit/{{this._id}}" class="btn btn-danger edit">Edit</a>
    <button class="btn btn-danger delete">Delete</button>
    `)
  }
}) 


app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionParser = sessions({
  name: app.get('cookieName'),
  secret: 'e1d322030d13b4d27cac8244491c65f4e86aab35819c8b922618b9ad0f6e846a49ee9199590abc1562b41f992543df897ea386b86666458e4ca6d9f73bdd5f9c',
  resave: false, // Не сохранять сессию, если мы ее не изменим
  saveUninitialized: false, // не сохранять пустую сессию
  // store: new FileStore({ // выбираем в качестве хранилища файловую систему
  //   secret: secretKey,
  // }),
  store: MongoStore.create({ // выбираем в качестве хранилища mongoDB
    mongoUrl
  }),
  cookie: { // настройки, необходимые для корректного работы cookie
    httpOnly: true, // не разрещаем модифицировать данную cookie через javascript
    // maxAge: 100000000, // устанавливаем время жизни cookie

  },
});
app.use(sessionParser);


app.set('cookieName', 'userCookie') // Устанавливаем в настройках сервера специальную переменную




app.use((req, res, next) => {
	res.locals.userName = req.session.userName;
	res.locals.userId = req.session.userId;
	res.locals.userAdmin = req.session.userAdmin;
  console.log(res.locals.userId )
  console.log(	res.locals.userAdmin)
	next();
});

app.use("/", indexRoute);
app.use("/users", userRoute);
app.use("/posts", postRouter);
app.use("/votes", voteRouter);
app.use("/profile", profileRouter);
app.use("/shares", shareRouter);

app.listen(PORT, () => {
	console.log("Server started!!!");
	connect();
});
