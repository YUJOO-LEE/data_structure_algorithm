function strlength(arr) {
  if (!arr[0]) return 0;
  return strlength(arr.slice(0, -1)) + 1;
}

const str = "asdfg";
const length = strlength(str);

console.log(length);