/** @type {HTMLCanvasElement} */
var darwingLineObj = {
    cavs : $('.cavs'),
    context : $('.cavs').get(0).getContext('2d'),
    ipt1 : $('.ipt1'), 
    ipt5 : $('.ipt5'),
    key : false,
    imgArr : [],
    init : function(){
        this.context.lineCap = 'round'; //线条起始和结尾样式
        this.context.lineJoin = 'round'; //转弯
        this.draw();
        this.butn();
    },
    draw : function(){
        var cavs = this.cavs;
        var self = this;
        var cX = cavs.offset().left;
        var cY = cavs.offset().top;
        cavs.mousedown(function(e){
            e = e || window.event;
            self.key = true;
            //鼠标相对画布的坐标
            var mX = e.pageX - cX;
            var mY = e.pageY - cY;
            self.context.beginPath();
            console.log(self.context);
            self.context.moveTo(mX, mY);  //画笔跟随鼠标按下的坐标
            cavs.mousemove(function(e){
                var e = e || window.event;
                if(self.key){
                    self.context.lineTo(e.pageX - cX, e.pageY - cY);
                    self.context.stroke();
                }
            });
            cavs.mouseup(function(){
                self.context.closePath();
                self.key = false; 
            });
            var imgData = self.context.getImageData(0, 0, self.cavs[0].width, self.cavs[0].height);
            self.imgArr.push(imgData);
            console.log(self.imgArr);
        });
    },
    butn : function(){
        var self = this;
        $('.btn-list').on('click', function(e){
            e = e || window.event;
            switch(e.target.className){
                case 'ipt2' : 
                    self.context.clearRect(0, 0, self.cavs[0].width, self.cavs[0].height);
                    break;
                case 'ipt3' :
                     self.context.strokeStyle = $('body').css('background-color');
                     break;
                case 'ipt4' :
                    if(self.imgArr.length > 0) 
                        self.context.putImageData(self.imgArr.pop(), 0, 0);
            }
        });
        this.ipt1.change(function(e){  //当前画笔颜色
            self.context.strokeStyle = $(this).val();
        });
        this.ipt5.change(function(e){
            self.context.lineWidth = $(this).val();
        });
    }
}

darwingLineObj.init();