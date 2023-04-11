const express = require("express");

let todoData = require("../todoData.json");
// let인 이유는 이후 데이터 삭제도 필요하기 때문

const router = express.Router();

router.get("/", (req, res) => {
  console.log(todoData);
  // 현재 DV상태를 알기 위해 console.log를 추가한 것임.
  res.json(todoData);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }

  console.log(todoData);
  res.json(todoData[parseInt(id)]);
});

router.post("/", (req, res) => {
  const { title, desc } = req.body;
  // console.log(title, desc);
  // 결과값 : 🍕 피자 먹방 피자 존맛탱     이걸 todoData

  todoData.push({ title, desc, isDone: false });
  // todoData.push({title: title, desc: desc}); 를 축약한 것
  console.log(todoData);

  res.json(todoData);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, desc } = req.body;

  if (parseInt(id) >= todoData.length) {
    res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }

  /*여기서 if문은 title, desc 값 둘 다 입력을 안했을 경우, title, desc값이 삭제되어 버림.
따라서 if문을 사용해서 둘 다 값이 없을 경우 에러처리함.*/

  if (!title && !desc) {
    res
      .status(400)
      .json({ error: "타이틀이나 설명 중에 하나의 값은 입력해야 합니다." });
  }
  /*
하지만 문제점은, 둘 중 하나만 보냈을 경우 예시로 title 값만 써서 보내면 desc 값이 삭제되어 버림.
따라서 아래와 같이 삼항 연사자를 적용해줘야 함.
*/
  todoData[parseInt(id)] = {
    title: title ? title : todoData[parseInt(id)].title,
    desc: desc ? desc : todoData[parseInt(id)].desc,
    isDone: todoData[parseInt(id)].isDone,
  };

  /*값이 하나만 전달되더라도 나머지 값은 기존 값 유지하도록.
  만약 값을 입력안하고 PUT http://localhost:3010/todo/1 이런식으로 보낸다면, 기존의 todoData 2번째 배열이 삭제됨. isDone만 남음. 따라서 위에 if(!title && !desc를 작성해줘야 함.)
 	*/

  console.log(todoData);
  res.json(todoData);
});

router.put("/done/:id", (req, res) => {
  // console.log(req.params);
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    res.status(400).json({ error: "존재하지 않는 ID입니다." });
  }

  todoData[parseInt(id)] = {
    title: todoData[parseInt(id)].title,
    desc: todoData[parseInt(id)].desc,
    // title, desc는 바뀌는 내용이 없으니 기존것 그대로 가져오는 코드
    isDone: !todoData[parseInt(id)].isDone,
    // isDone은 완료여부가 바뀌니 !todoData[parseInt(id)].isDone 사용
  };

  console.log(todoData);
  // http://localhost:3010/todo/done/0 해보면 0~1 두개뿐임
  // 실행해보면 0으로 실행해보면 첫 번째 React 복습의 isDone: true로 바뀜. 재실행하면 다시 False로 바뀜

  res.json(todoData);
});

router.delete("/:id", (req, res) => {
  // 배열에서 하나를 제거하려면 JS에서 filter라는 것을 알아야 함.
  const { id } = req.params;

  if (parseInt(id) >= todoData.length) {
    res.status(400).json({ error: "존재하지 않는 ID입니다." });
    // todoData의 배열이 9개인데 id 값으로 10개를 줬을 경우 에러임.
    // 400은 클라이언트 쪽 에러
  }

  todoData = todoData.filter((v, i) => {
    return parseInt(id) !== i;
  });

  console.log(todoData);

  res.json(todoData);
  // http://localhost:3010/todo/0 해보면 하나씩 지워짐
});

module.exports = router;
