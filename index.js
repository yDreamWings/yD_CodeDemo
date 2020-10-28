var numSelectObj = {
    interval : ["1-10", "11-20", "21-30", "31-40", "41-50", "51-60", "61-70", "71-80", "81-90", "91-100"],
    numerical : {
        0 : [["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"], ["8"], ["9"],["10"]],
        1 : [["11"], ["12"], ["13"], ["14"], ["15"], ["16"], ["17"], ["18"], ["19"],["20"]],
        2 : [["21"], ["22"], ["23"], ["24"], ["25"], ["26"], ["27"], ["28"], ["29"],["30"]],
        3 : [["31"], ["32"], ["33"], ["34"], ["35"], ["36"], ["37"], ["38"], ["39"],["40"]],
        4 : [["41"], ["42"], ["43"], ["44"], ["45"], ["46"], ["47"], ["48"], ["49"],["50"]],
        5 : [["51"], ["52"], ["53"], ["54"], ["55"], ["56"], ["57"], ["58"], ["59"],["60"]],
        6 : [["61"], ["62"], ["63"], ["64"], ["65"], ["66"], ["67"], ["68"], ["69"],["70"]],
        7 : [["71"], ["72"], ["73"], ["74"], ["75"], ["76"], ["77"], ["78"], ["79"],["80"]],
        8 : [["81"], ["82"], ["83"], ["84"], ["85"], ["86"], ["87"], ["88"], ["89"],["90"]],
        9 : [["91"], ["92"], ["93"], ["94"], ["95"], ["96"], ["97"], ["98"], ["99"],["100"]],
    },
    fontStrNode : document.getElementsByClassName('fontStr')[0],
    dragDownNode : document.getElementsByClassName('dragDown')[0],
    intervalNode : document.getElementsByClassName('interval')[0],
    numericalNode : document.getElementsByClassName('numerical')[0],
    li_interval : null,
    li_numerical : null,
    key : true,
    init : function(){
        this.showNum();
        this.showInte();
    },
    showNum : function(){
        this.intervalNode.innerHTML = '';
        var len = this.interval.length;
        var inteStr = '';
        for(var i = 0; i < len; i++){
           inteStr += '<li>' + this.interval[i] + '</li>';
        }
        this.intervalNode.innerHTML = inteStr;
        this.li_interval = this.intervalNode.getElementsByTagName('li');
        for(var j = 0; j < len; j++){
            this.li_interval[j].index = j;
            this.li_interval[j].addEventListener('mouseenter', this.numMouseEnter.bind(this), false);
            //用bind()改变numMouseEnter()的this指向
        }
    },
    numMouseEnter : function(e){
        var li_inte_len = this.li_interval.length;
        for(var l = 0; l < li_inte_len; l++){
            this.li_interval[l].style.backgroundColor = '#fff';
        }
        e.target.style.backgroundColor = '#f1f3f6';
        this.numericalNode.innerHTML = '';
        var e = e || window.event;
        var nums = this.numerical[e.target.index];
        var len = nums.length;
        var numStr = '';
        for(var k = 0; k < len; k++){
            numStr += '<li>' + nums[k] + '</li>'
        }
        this.numericalNode.innerHTML = numStr;

        this.li_numerical =this.numericalNode.getElementsByTagName('li');
        var li_num_len = this.li_numerical.length;
        for(var li = 0; li < li_num_len; li++){
            this.li_numerical[li].addEventListener('click', this.numMouseDown.bind(this), false);
        }
        
    },
    numMouseDown : function(e){
        var e = e||window.event;
        this.fontStrNode.innerHTML = '';
        var str = e.target.innerHTML;
        this.fontStrNode.innerHTML = str;
        this.dragDownNode.style.display = 'none';
        this.key = true;
    },
    showInte : function(){
        var self = this;
        this.fontStrNode.addEventListener('click', function(){
            if(self.key){
                self.key = false;
                self.dragDownNode.style.display = 'block';
            }else{
                self.key = true;
                self.dragDownNode.style.display = 'none';
            }
        }, false);
    }
}

numSelectObj.init();