function Img(){
    this.el_img = document.getElementsByTagName("img");                         //img列表
    this.doc_h = window.innerWidth;    //可视窗口高度
    //初始化
    this._init();
    this._srcoll();
}

Img.prototype._init = function (arguments) {
    this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;     //滚动距离
    //获取img元素
    for(var i=0; i < this.el_img.length; i++){
        var el = this.el_img[i];
        var offsetTop = el.offsetTop;
        var src = el.getAttribute("data-src");
        //判断图片是否在可视范围
        if(offsetTop < this.scrollTop + this.doc_h && src){
            el.setAttribute("src",src)
        }
    }
}
//滚动事件
Img.prototype._srcoll = function () {
    window.onscroll = function () {
        this._init()
    }.bind(this)
}