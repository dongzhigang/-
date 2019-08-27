var digitalChange = function(argument){
	this.default = {
        el:'#count',                         //当前元素
        speed:20,                            //数字变化速度，默认20
        multiple:1,                          //增加倍数，默认5
    }
    this._init(argument)
}

//初始化
digitalChange.prototype._init = function(argument){
    this.default = Object.assign(this.default, argument);		//传参参数
    this.el = document.querySelectorAll(this.default.el);		//当前元素
    //循环元素
    for(var i=0; i < this.el.length;i++){
        this._setInterval(this.el[i])
    }
}
//启动定时器
digitalChange.prototype._setInterval = function(el){
	var val = el.getAttribute("data");		//获取元素值
    var addNUm = val.length>1?(val.length - 1)*this.default.multiple:1;        //根据数字长度给增加的数
    var num = 0;				//计算数值
    var speed = Math.ceil(this.default.speed/(val.length)); 		//根据数字长度计算增加速度				
    var Interval = setInterval(function(){     
        num+=addNUm;
        if(num > Number(val) || Number(val) == 0){
            num = val;
            clearInterval(Interval)
        }
        if(val) el.innerHTML = num;
        if(val) el.value = num;
    }.bind(this),speed)
}