const fs = require('fs');

fs.readFile('tes3t.txt', 'utf8', (err, data) => {
//   if (err) throw err;
if(err) {console.log('에러 발생!!'); return;}
  console.log(data);
  console.log(2534);
});
console.log(6784);