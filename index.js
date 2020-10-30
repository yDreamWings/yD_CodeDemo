    var wrapUl = $('.wrapUl');
    var key = true;
    var wrapW = parseInt(wrapUl.css('width'));
    var wrapH = parseInt(wrapUl.css('height'));
    var liW = wrapW / 5;
    var liH = wrapH / 5;

// 将图片摊开
function createDom(){
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 5; j++){
            $('<li><div class="box"><img src=""></div></li>')
            .css({
                'width' : liW + 'px',
                'height' : liH + 'px',
                'left' : j * liW,
                'top' : i * liH,
                'transform' : 'scale(0.9) rotate(' + (Math.random()*40) + 'deg)' + 
                    'translateX(' + (30 * j - 60) + 'px)' +
                    'translateY(' + (30 * i - 60) + 'px)' +
                    'translateZ(' + (-Math.random() * 500) + 'px)'
            })
            .find('img').attr('src', './img/' + (5 * i + j + 1) + '.jpg')
            .end()
            .appendTo(wrapUl);
        }
    } 
}

// 点击事件
function bindEvent(){
    wrapUl.find('li').on('click', function(){
        if(key){
            var bigL = 0;
            var bigT = 0;
            var bigImg = $(this).find('img').attr('src');
            $('li').each(function(index){
                var $this = $(this);
                $this.delay(10*index).animate({'opacity' : 0}, 200, function(){
                    $this.css({
                        'transform' : 'rotate(0deg)' + 
                        'translateX(0px)' +
                        'translateY(0px)' +
                        'translateZ(0px)'
                    })
                    $this.find('.box').css({
                        'transform' : 'scale(1)'
                    })
                    $this.find('img').attr('src', bigImg).css({
                        'position' : 'absolute',
                        'width' : wrapW + 'px',
                        'height' : wrapH + 'px',
                        'left' : -bigL,
                        'top' : -bigT
                    });
                    bigL += liW;
                    if(bigL >= wrapW){
                        bigT += liH;
                        bigL = 0;
                    }
                    $this.animate({'opacity' : 1}, 200)
                })
            })
            key = false;
        }else{
            key = true;

            // 将大图收缩，重排
            $('li').each(function(index){
                var j = index % 5;
                var i = Math.floor(index / 5)
                var $this = $(this);
                $(this).animate({'opacity' : 1}, 200, function(){
                    // 重置宽高位置
                    $(this).find('img').css({
                        'position' : 'absolute',
                        'width' : '100%',
                        'height' : '100%',
                        'left' : 0,
                        'top' : 0
                    })
                    $this.find('img').attr('src', './img/' + (index + 1) + '.jpg');
                    $(this).css({
                        'transform' : 'scale(0.9) rotate(' + (Math.random()*40) + 'deg)' + 
                        'translateX(' + (30 * j - 60) + 'px)' +
                        'translateY(' + (30 * i - 60) + 'px)' +
                        'translateZ(' + (-Math.random() * 500) + 'px)'
                    });
                })
            })
        }
    })  
}

createDom();
bindEvent();
