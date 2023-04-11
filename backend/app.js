const express = require("express");
const todoRouter = require("./routes/todo");

const app = express();

const port = 3010;

app.use(express.json());
// json형식을 원래는 못읽기 때문에 읽으라고 미들웨어를 붙여주는 것임.

app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}!📡`);
});
