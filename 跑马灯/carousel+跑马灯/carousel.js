var Carousel = function (argument){
	//默认参数
	this.default = {
		el:"#carousel",			//当前元素
		direction:"verticality",	//滚动方向，horizontal水平，verticality垂直，默认垂直
		speed:20,			//滚动速度时间，默认3000,
	}
	//初始化
	this._init(argument)
}
//对象初始化
Carousel.prototype._init = function(argument){	//对象初始化
	this.default = Object.assign(this.default,argument);    //默认参数与传参对象合并
	this.el = document.querySelector(this.default.el);		//当前元素
	this.first = this.el.innerHTML                   		//获取滚动内容
	this.firstWH = 0;										//内容高度，用于判断循环滚动
	this.top = 0;											//移动距离
	this.isOverflowing = false;								//判断是否溢出

	//添加内容父节点后
	this._element()
	//启动定时器
	this._setInterval();
	//默认事件
	this._defaultEvent()
}
//添加内容父节点
Carousel.prototype._parentElement = function(){
	var div = document.createElement("div");
		div.innerHTML = this.first
	return div;
}
//添加内容父节点后
Carousel.prototype._element = function(){
	//添加内容父节点后重新初始化
	this.el.innerHTML = null;								//当前清空内容
	this.el.appendChild(this._parentElement())				//重新添加内容
	this.first = this.el.firstChild;						//重新获取滚动内容
	if (this.default.direction === "verticality") {	//水平方向
		this.firstWH = this.first.offsetHeight			//内容高度，用于判断循环滚动
		this.isOverflowing = this.el.parentNode.clientHeight < this.el.parentNode.scrollHeight
	}else{
		this.el.firstChild.style.width = this.el.firstChild.children.length * this.el.firstChild.children[0].clientWidth + "px";
		this.firstWH = this.first.offsetWidth			//内容高度，用于判断循环滚动
		if(this.el.parentNode.clientWidth < this.el.firstChild.children.length * this.el.firstChild.children[0].clientWidth){
			this.el.style.width = this.el.firstChild.children.length * this.el.firstChild.children[0].clientWidth*2 + "px";
		}		
		this.isOverflowing = this.el.parentNode.clientWidth < this.el.parentNode.scrollWidth;  
	}
	this.html = this.first.cloneNode(true);  //复制多一个  
}
//启动定时器
Carousel.prototype._setInterval = function(){
	if(this.isOverflowing){ 
        this.el.appendChild(this.html);
        this.Interval = setInterval(function(){
            this.top --;     
            if(Math.abs(this.top) >= this.firstWH){    
                this.top = 0;
            }
            if(this.default.direction === "verticality"){
                this.el.style.transform = "translate3d(0,"+this.top+"px,0)";
            }else{
                this.el.style.transform = "translate3d("+this.top+"px,0,0)";
            }
        }.bind(this),this.default.speed) 
    }
}
//清除定时器
Carousel.prototype._clearInterval = function(){
	clearInterval(this.Interval)
}
//默认鼠标移入移出事件
Carousel.prototype._defaultEvent = function(){
    //鼠标移入移出
    this.el.onmouseover = function(){  //鼠标移入恢复偏移量
        this._clearInterval()
    }.bind(this)
    this.el.onmouseout = function(){
        this._clearInterval()
        this._setInterval()
    }.bind(this)
}