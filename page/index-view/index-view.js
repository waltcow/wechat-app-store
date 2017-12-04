const product_image = require("./resource/imageSource.js");

Page({
    data: {
        images: product_image,
        imageStyleData: {} //图片样式数据
    },
    //图片加载事件:全屏宽度750rpx减去padding值80rpx;计算出比率得到高度,用图片的URL作为key来设置data
    imageLoad: function(e){
        var id = e.currentTarget.dataset.id,
            img_w = e.detail.width,
            img_h = e.detail.height,
            ratio = (750-5)/img_w;
        console.log(id, img_w, img_h, ratio)

        if((img_w/this.dp)>=(750-5)){
            var imageStyle = 'width: '+(750-5)+'rpx; height:'+ img_h*ratio +'rpx;';
        }else{
            var imageStyle = 'width: '+img_w+'px; height:'+ img_h +'px;';
        }
        var imageStyleData = this.data.imageStyleData;
        imageStyleData[id] = imageStyle;
        this.setData({
            imageStyleData: imageStyleData
        });
    },
    //获取图片
    onLoad: function () {
        var winWidth = null, dp = 1;
        try {
            var winWidth = wx.getSystemInfoSync().windowWidth;
        } catch (e) {

        };
        if(winWidth){
            dp = winWidth/750;
        }
        this.dp = dp;
    }
})