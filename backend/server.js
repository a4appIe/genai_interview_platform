require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/database");
const PORT = process.env.PORT;
console.log(process.env.PORT);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})