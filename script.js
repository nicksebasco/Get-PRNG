
window.onload = function(){
var predict_random = (function(){
  var rngstate;
  function MathRandom() {
    console.assert(rngstate, "You need to set the global variable `rngstate` first. For example: `rngstate = solve(Math.random(), Math.random());`");
    if (!rngstate) return;
    var r0 = (Math.imul(18030, rngstate[0] & 0xFFFF) + (rngstate[0] >>> 16)) | 0;
    rngstate[0] = r0;
    var r1 = (Math.imul(36969, rngstate[1] & 0xFFFF) + (rngstate[1] >>> 16)) | 0;
    rngstate[1] = r1;
    var x = ((r0 << 16) + (r1 & 0xFFFF)) | 0;
    // Division by 0x100000000 through multiplication by reciprocal.
    return (x < 0 ? (x + 0x100000000) : x) * 2.3283064365386962890625e-10;
  }

  function solve(first, second, gap) {
    // Given two values of Math.random() and number of other calls to Math.random() in between, solve for the rngstate.
    var first_x = first / 2.3283064365386962890625e-10;
    var first_r0_lower = first_x >>> 16;
    var first_r1_lower = first_x & 0xFFFF;
    var second_x = second / 2.3283064365386962890625e-10;
    var second_r0_lower = second_x >>> 16;
    var second_r1_lower = second_x & 0xFFFF;

    var first_r0_upper, first_r1_upper, second_r0, second_r1;

    var found = false;
    for (first_r0_upper = 0; first_r0_upper <= 0xFFFF; first_r0_upper++) {
      second_r0 =  (first_r0_upper << 16) | first_r0_lower;
      for (var i = 0; i <= gap; i++) {
        second_r0 = (Math.imul(18030, second_r0 & 0xFFFF) + (second_r0 >>> 16)) | 0;
      }
      if ((second_r0 & 0xFFFF) == second_r0_lower) {
        found = true;
        break;
      }
    }
    if (!found) {
      return null;
    }

    found = false;
    for (first_r1_upper = 0; first_r1_upper <= 0xFFFF; first_r1_upper++) {
      second_r1 =  (first_r1_upper << 16) | first_r1_lower;
      for (var i = 0; i <= gap; i++) {
        second_r1 = (Math.imul(36969, second_r1 & 0xFFFF) + (second_r1 >>> 16)) | 0;
      }
      if ((second_r1 & 0xFFFF) == second_r1_lower) {
        found = true;
        break;
      }
    }
    if (!found) {
      return null;
    }
    return [second_r0, second_r1];
  }

  // Example usage. Needs two prior known values (`observation1` and `observation2`) to pass to `solve`
  var num_unknown_values = 0; // Change this to the number of calls to Math.random() between our two observations
  var observation1 = Math.random();
  for (var i = 0; i < num_unknown_values; i++) {
    Math.random();
  }
  var observation2 = Math.random();
  rngstate = solve(observation1, observation2, num_unknown_values);

  //test
  var predicted, observed;
  for(var k = 0; k< 5; k++){
  predicted = MathRandom(); // Our own implementation of Math.random() with the solved rngstate from above
  console.log('Predicted:', predicted);
  observed = Math.random();
  console.log('Actual:', observed);
  }

  if ( predicted === observed ){
    return MathRandom;
  }
  else{
    return null;
  }
})();

chrome.runtime.sendMessage({method: "captureRand", message: predict_random});
};
