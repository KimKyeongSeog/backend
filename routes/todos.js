const express = require("express");

const router = express.Router();

let todoId = 1;
let todos = [{ id: 1, title: "🧹 청소하기", isDone: false }]; // 데이터베이스 따로 설정 하지않음. 메모리에 저장, 서버 리셋 시 데이터 증발

router.post("/", (req, res) => {
  const { title } = req.body; // CRUD:create ,구조분해 문법 : 중복되는 내용을 줄일 수 있다. // appThunk에서 데이터를 전달 받음
  if (!title) {
    return res.status(400).json({
      message: "Not exist title"
    });
  }

  todoId++; // ++의미 수치의 + , 자신의 값을 변환 (+= 1;)(todoID = todoID +1 )

  const newTodo = { id: todoId, title, isDone: false };
  //Key, value값이 같기에 생략함 9번줄 코드에서 타이틀값 받아옴 (title : title)

  todos.push(newTodo);

  return res.json({ todo: newTodo }); //appSlice에 있는 Create.action.payload
});

router.get("/", (req, res) => {
  return res.json({ todos });
}); // 모든 todos 데이터 출력  > return시 thunk 이동

router.get("/:todoId", (req, res) => {
  const { todoId } = req.params; //파라미터, 구조분해하여 꺼내쓰기 가능, 숫자 아닌 경우를 위해 에러 처리 하단 참고

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number" // id값을 숫자로 설정하였기에 숫자만 입력하게 설정. isNaN 참고
    });
  }

  let existTodo;

  todos.map((v, i) => {
    if (v.id === +todoId) {
      existTodo = v;
    }
  });

  if (!existTodo) {
    return res.status(400).json({
      message: "Not exist todo." // 빈 값인 경우
    });
  }

  return res.json({ todo: existTodo });
});

router.put("/:todoId/done", (req, res) => {
  const { todoId } = req.params; //DONE 요청

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number" // id값을 숫자로 설정하였기에 숫자만 입력하게 설정. isNaN 참고
    });
  }

  let updateTodo;

  todos = todos.map((v, i) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title: v.title, isDone: !v.isDone };

      return updateTodo;
    } else {
      return v;
    } // 기존 todos에 업데이트가 필요하여 만듦 isDone만 !
  }); // i만 써야할 경우 v입력 필수, v만 쓸 경우 i 생략 가능
  if (!updateTodo) {
    return res.status(400).json({
      message: "Not exist todo." // 빈 값인 경우
    });
  }
  return res.json({ todo: updateTodo });
});

router.put("/:todoId", (res, req) => {
  const { todoId } = req.params;
  const { title } = req.body; //내용을 받아오기에 body를 받아옴

  if (isNaN(todoId) || !title) {
    return res.status(400).json({
      message: "Not exist data."
    });
  }

  let updateTodo;

  todos = todos.map((v, i) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title: title, isDone: v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });

  return res.json({ todo: updateTodo });
});

router.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number"
    });
  }

  todos = todos.filter((v) => {
    if (v.id !== +todoId) {
      return v; //삭제의 경우 filter 사용 , map함수 사용 시 undefined
    }
  });

  return res.json({ message: "Deleted todo." });
});

module.exports = router;
