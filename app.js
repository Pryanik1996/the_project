const express = require('express');
const app = express();
const { connectDB } = require('./src/db/');
const indexRoute = require('./src/routes/index.routes');

const middleware = require('./src/middleware/middleware');

middleware(app);

app.use('/', indexRoute);

app.listen(8080, () => {
  console.log('Server started!!!');
  connectDB();
});
