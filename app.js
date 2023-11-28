const express = require("express");
const cors = require("cors");
const todosRouter = require("./routes/todos");

const app = express();

const port = 3010;

app.use(cors());
app.use(express.json());
//api 서버 만들 시 필수! 없으면 상대방이 보낸 메세지를 받아들일 수 없음
//POSTMAN 사용함
app.use(express.urlencoded({ extended: true }));
//json 외 key 등을 받을때 필요한 코드. 상기 코드와 유사한 사유
app.use("/todos", todosRouter);

app.get("/", (req, res) => {
  return res.send("Hello, Express!");
});
// req가 있으면 return 필수, 서버가 열려있는 지 확인하기 위함

app.listen(port, () => {
  console.log(`🚀 Server is listening on port : ${port}`);
});
