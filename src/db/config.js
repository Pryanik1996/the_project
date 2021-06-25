// const mongoUrl = "mongodb://localhost:27017/theproject";
const mongoUrl =
	"mongodb+srv://ruslan:12345@cluster0.b1bxl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const options = {
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useNewUrlParser: true,
};

module.exports = { mongoUrl, options };
