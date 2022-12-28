function hanoi(count, from, to, temp) {
  if (count === 0) return;
  
  hanoi(count - 1, from, temp, to);
  console.log(`원반 ${count}를 ${from}에서 ${to}로 이동`);
  hanoi(count - 1, temp, to, from);
}


hanoi(3, 'A', 'C', 'B');
// 원반 3개, A 에서 C 로 이동, B 사용 가능

