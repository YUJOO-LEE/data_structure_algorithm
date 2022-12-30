function fibonacci1(n) {
  if (n === 0 || n === 1) return n;
  return fibonacci1(n - 2) + fibonacci1(n - 1);
}

function fibonacci3(n) {
  if (n <= 1) return n;

  let table = [0, 1];

  for (let i = 2; i <= n; i++) {
    table[i] = table[i - 2] + table[i - 1];
  }

  return table[n];
}

let start = new Date();
console.log(fibonacci1(40));
let end = new Date();
console.log(`fibonacci1 실행시간 : ${end - start}ms`);

start = new Date();
console.log(fibonacci3(40, {}));
end = new Date();
console.log(`fibonacci3 실행시간 : ${end - start}ms`);