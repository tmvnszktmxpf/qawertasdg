var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '111111';
const someOtherPlaintextPassword = '111112';
bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    bcrypt.compare(myPlaintextPassword, hash, function(err, result){
        console.log('my password', result);
        console.log(hash)
    })
    bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result){
        console.log('other password', result);
    })
    



    bcrypt.compare('12345', '$2b$10$BYojoDdi5TN/SC2zF3AMf.vEaprAEQ4YDWRAMuidb9yoBC3JQrXPO', function(err, result){
        console.log('test', result);
    })
});