var per = 0;
var timer = setInterval(function(){
    $('.bar').css('width', per + '%');
    per += 1;
    if(per > 100){
        $('.pageLoading').addClass('complete');
        setTimeout(function(){ //延时器,延迟执行一次
            $('.monsterText').html('<h2>害 <p>怕</p> 吗</h2>')
        },3000)
        clearInterval(timer);
    }
},30)