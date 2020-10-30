 var  verificationCodeObj = {
    canvas : document.getElementById('code'), 
    ctx : document.getElementById('code').getContext('2d'),  //画笔
    verImg : new Image(),
    vercode : '',
    arr : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    //设置字母数字数组
    setArr : function(){
        for(var i = 65; i < 122; i++){
            if(i > 90 && i < 97){
                continue;
            }else{
                this.arr.push(String.fromCharCode(i));
            }
        }
    },
    //验证码
    verificationCode : function (){
        var self = this;
        var veriStr = '';
        self.vercode = '';
        for(var i = 0; i < 6; i++){
            var a = self.arr[Math.floor(Math.random() * this.arr.length)];  //生成验证码
            veriStr += a + ' ';
            self.vercode += a; 
        }
        self.verImg.src = './img/3.png';
        //画布填充
        self.verImg.onload = function(){
            var pattern = self.ctx.createPattern(self.verImg, 'repeat');  //在水平和垂直方向重复
            self.ctx.fillStyle = pattern;
            self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
            self.ctx.textAlign = 'center';
            self.ctx.fillStyle = '#ccc';
            self.ctx.font = '46px Roboto Slab';
            self.ctx.setTransform(1, -0.12, 0.3, 1, 0, 12); 
            //水平缩放 水平旋转 垂直旋转 垂直缩放 水平移动 垂直移动
            self.ctx.fillText(veriStr, self.canvas.width/2, 60)   
        }
    },
    //重置验证码
    reVerCode : function (){
        this.canvas.width = this.canvas.width; //清空画布
        this.verificationCode();
    },
    //点击事件
    onClick : function (){
        var self = this;
        $('.submit').on('click', function(){
            self.showResult();
        });
   
        $('.refresh').on('click', function(){
            self.reVerCode();
        });
    },
    //匹配验证码
    showResult : function (){
        var self = this;
        var inputValue = $('.inputbox input').val();
        if(self.vercode == inputValue){
            $('.inputbox span').css({
                'background' : 'url("./img/1.png")',
                'display' : 'inline-block'
            });
            $('.error').css('display', 'none')
            self.reVerCode();
        }else{
            $('.inputbox span').css({
               'background' : 'url("./img/4.png")',
               'display' : 'inline-block'
            });
            $('.error').css('display', 'block').html('验证码错误，请重新输入');
            self.reVerCode();
        }
    },
    init : function(){
        this.setArr();
        this.verificationCode();
        this.onClick();
    }
}

verificationCodeObj.init();
