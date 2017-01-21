var raspi = require('raspi-io');
var five = require('johnny-five');
var express = require('express');
var app = express();
var board = new five.Board({
  io: new raspi()
});
 
board.on('ready', function() {

var l_motor = five.Motor(['P1-33', 'P1-35']);
// the first is the pwm pin, the second one is direction

var r_motor = five.Motor(['P1-32', 'P1-36' ]);
  // Create an Led on pin 7 (GPIO4) on P1 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
//  (new five.Led('P1-33')).pulse(600);


app.get('/:left/:right',function(req,res){

var left = req.params.left;
var right = req.params.right;

// console.log('right: ' + right);
// console.log('left: ' + left);

if(left<0){
left = Math.abs(left)
l_motor.reverse(left)
}else{
l_motor.forward(left)
}
if(right<0){
	right = Math.abs(right)
	r_motor.reverse(right);
}else{
r_motor.forward(right)
}

 res.send('done');

})

var server = app.listen(8081,'0.0.0.0', function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})

});
