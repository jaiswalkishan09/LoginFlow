const express = require("express");
const userProtectedRouter = require("./routes/userProtectedRoutes");
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

app.use(express.json());
app.use(cors());

app.use("/api", userRouter);
app.use("/api/profile", userProtectedRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server listning on port no:", PORT);
});
