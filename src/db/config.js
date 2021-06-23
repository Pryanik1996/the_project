const mongoUrl = "mongodb://localhost:27017/theproject";
const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = { mongoUrl, options };
