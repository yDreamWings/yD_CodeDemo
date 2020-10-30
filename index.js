 var canvas = document.getElementById('code'); 
 var ctx = canvas.getContext('2d');  //画笔
 var verImg = new Image();
 var vercode = '';
 //设置字母数字数组
 var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
 for(var i = 65; i < 122; i++){
     if(i > 90 && i < 97){
         continue;
     }else{
         arr.push(String.fromCharCode(i));
     }
 }

 //验证码
 function verificationCode(){
     var veriStr = '';
     vercode = '';
     for(var i = 0; i < 6; i++){
         var a = arr[Math.floor(Math.random() * arr.length)];  //生成验证码
         veriStr += a + ' ';
         vercode += a; 
     }
     verImg.src = './img/3.png';
     //画布填充
     verImg.onload = function(){
         var pattern = ctx.createPattern(verImg, 'repeat');  //在水平和垂直方向重复
         ctx.fillStyle = pattern;
         ctx.fillRect(0, 0, canvas.width, canvas.height);
         ctx.textAlign = 'center';
         ctx.fillStyle = '#ccc';
         ctx.font = '46px Roboto Slab';
         ctx.setTransform(1, -0.12, 0.3, 1, 0, 12); 
         //水平缩放 水平旋转 垂直旋转 垂直缩放 水平移动 垂直移动
         ctx.fillText(veriStr, canvas.width/2, 60)

         
     }
 }

 //重置验证码
 function reVerCode(){
     canvas.width = canvas.width; //清空画布
     verificationCode();
 }

 verificationCode();
 
 //点击事件
 function onClick(){
     $('.submit').on('click', function(){
        showResult();
     });

     $('.refresh').on('click', function(){
        reVerCode();
     });
 }

 onClick();

 //匹配验证码
 function showResult(){
     var inputValue = $('.inputbox input').val();
     console.log(inputValue);
     console.log(vercode);
     console.log(vercode == inputValue);
     if(vercode == inputValue){
         $('.inputbox span').css({
             'background' : 'url("./img/1.png")',
             'display' : 'inline-block'
         });
         $('.error').css('display', 'none')
         reVerCode();
     }else{
         $('.inputbox span').css({
            'background' : 'url("./img/4.png")',
            'display' : 'inline-block'
         });
         $('.error').css('display', 'block').html('验证码错误，请重新输入');
         reVerCode();
     }
 }