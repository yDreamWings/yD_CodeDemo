 var photoWallObj = {
    wrapUl : $('.wrapUl'),
    key : true,
    wrapW : parseInt($('.wrapUl').css('width')),
    wrapH : parseInt($('.wrapUl').css('width')),
    liW : parseInt($('.wrapUl').css('width')) / 5,
    liH : parseInt($('.wrapUl').css('width')) / 5,
    // 将图片摊开
    createDom : function (){
        var self = this;
        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 5; j++){
                $('<li><div class="box"><img src=""></div></li>')
                .css({
                    'width' : self.liW + 'px',
                    'height' : self.liH + 'px',
                    'left' : j * self.liW,
                    'top' : i * self.liH,
                    'transform' : 'scale(0.9) rotate(' + (Math.random()*40) + 'deg)' + 
                        'translateX(' + (30 * j - 60) + 'px)' +
                        'translateY(' + (30 * i - 60) + 'px)' +
                        'translateZ(' + (-Math.random() * 500) + 'px)'
                })
                .find('img').attr('src', './img/' + (5 * i + j + 1) + '.jpg')
                .end()
                .appendTo(self.wrapUl);
            }
        } 
    },
    // 点击事件
    bindEvent : function (){
        var self = this;
        self.wrapUl.find('li').on('click', function(){
            if(self.key){
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
                            'width' : self.wrapW + 'px',
                            'height' : self.wrapH + 'px',
                            'left' : -bigL,
                            'top' : -bigT
                        });
                        bigL += self.liW;
                        if(bigL >= self.wrapW){
                            bigT += self.liH;
                            bigL = 0;
                        }
                        $this.animate({'opacity' : 1}, 200)
                    })
                })
                self.key = false;
            }else{
                self.key = true;
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
    },
    init : function(){
        this.createDom();
        this.bindEvent(); 
    }
 }  

 photoWallObj.init();
