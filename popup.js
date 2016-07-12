window.onload = function(){
  var rand = function(){}, b1 = document.getElementById('b1'), b2 = document.getElementById('b2'), timer =null;

  b1.onclick = function(){
    document.getElementById('ri').innerHTML = ' '+Math.floor(rand()*10);
    document.getElementById('rd').innerHTML = ' '+rand();
  };

  b2.onclick = function(){
    var time = parseInt(document.getElementById('setTime').value);
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(function(){
      document.getElementById('ri').innerHTML = ' '+Math.floor(( rand()||0 )*10);
      document.getElementById('rd').innerHTML = ' '+rand();
    },time);
    return;
  };
  chrome.runtime.onMessage.addListener(function(message){
    if(message.method === "updateRand"){
      rand = message.func;
    }
  });
};
