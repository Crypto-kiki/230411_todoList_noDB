const fruits = [
  "apple",
  "banana",
  "pineapple",
  "orange",
  "melon",
  "watermelon",
  "guava",
  "grape",
  "kiwi",
];

// const moreThanFiveLetters = fruits.filter((v, i) => {
//   return v.length >= 5;
// });

// console.log(moreThanFiveLetters);

const foods = [
  { type: "fruit", name: "apple" },
  { type: "vegetable", name: "carrot" },
  { type: "fruit", name: "banana" },
  { type: "fruit", name: "kiwi" },
  { type: "vegetable", name: "tomato" },
  { type: "fruit", name: "orange" },
  { type: "vegetable", name: "onion" },
];

const onlyFruits = foods.filter((v, i) => {
  return v.type === "fruit";
});
/* [
  { type: 'fruit', name: 'apple' },
  { type: 'fruit', name: 'banana' },
  { type: 'fruit', name: 'kiwi' },
  { type: 'fruit', name: 'orange' }
]
필터는 조건을 토대로 값을 저장, 맞는 값만 불러오고*/

const mapFruits = foods.map((v, i) => {
  return v.type === "fruit";
});
/*
[
  true,  false,
  true,  true,
  false, true,
  false
]
맵함수는 조건 자체를 저장함.*/

const onlyMapFruits = foods.map((v, i) => {
  if (v.type === "fruit") {
    return v;
  }
});
/*
[
  { type: 'fruit', name: 'apple' },
  undefined,
  { type: 'fruit', name: 'banana' },
  { type: 'fruit', name: 'kiwi' },
  undefined,
  { type: 'fruit', name: 'orange' },
  undefined
]
조건 자체를 저장하는데 조건에 안맞을 때, undefined로 출력함.*/

console.log(onlyFruits);
console.log(mapFruits);
console.log(onlyMapFruits);
