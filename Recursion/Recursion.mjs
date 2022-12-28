function Recursion(number) {
  if (number > 10) return;
  console.log(number);
  Recursion(number + 1);
}

Recursion(1);