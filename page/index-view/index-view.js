const { images, comments, product  } = require('./resource/index.js');
const citySelect = require('../../component/citySelect/citySelect.js')

Page({
    data: {
        toView: 'top',
        comments: comments,
        product: product,
        images: images,
        dp: 1,
        titleTop: '130px',
        imageStyleData: {}, //图片样式数据
        countDownText: ''
    },
    //图片加载事件:全屏宽度750rpx减去padding值80rpx;计算出比率得到高度,用图片的URL作为key来设置data
    imageLoad: function(e){
        let imageStyle, imageStyleData,
            id = e.currentTarget.dataset.id,
            index = e.currentTarget.dataset.index,
            img_w = e.detail.width,
            img_h = e.detail.height,
            ratio = 750/img_w;

        if ((img_w/this.dp)>=750){
            imageStyle = 'display: block; width: '+750+'rpx; height:'+ img_h*ratio +'rpx;';
            if (index === 0) {
                this.setData({ titleTop: img_h * 0.3 + 'rpx' })
            }
        } else {
            imageStyle = 'display: block; width: '+img_w+'px; height:'+ img_h +'px;';
            if (index === 0) {
                this.setData({ titleTop: img_h * 0.3 + 'px' })
            }
        }
        imageStyleData = this.data.imageStyleData;
        imageStyleData[id] = imageStyle;
        this.setData({ imageStyleData: imageStyleData });
    },

    showCountDown: function (year, month, day) {
        var now = new Date();
        var endDate = new Date(year, month, day + 1);
        var leftTime = endDate.getTime() - now.getTime();
        var leftsecond = parseInt(leftTime / 1000);
        var day1 = Math.floor(leftsecond / (60 * 60 * 24));
        var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        var countDownText = minute + "分" + second + "秒";
        this.setData({countDownText: countDownText})
    },

    radioChange: function (e) {
        console.log(e)
    },

    scrollToTop: function () {
        this.setData({
            toView: 'top'
        })
    },

    scrollToComment: function () {
        this.setData({
            toView: 'comment'
        })
    },
    navigateToPayView: function() {
      wx.navigateTo({
        url: '../pay-view/pay-view'
      })
    },
    scrollToQuery: function () {
       
    },
    scrollToOrderNow: function () {
        this.setData({
            toView: 'order-now'
        })
    },

    contactUs: function() {
        wx.makePhoneCall({
            phoneNumber: '10086'
        })
    },

    //获取图片
    onLoad: function () {
        let self = this;
        let winWidth = null;
        let dp = 1;
        try {
            winWidth = wx.getSystemInfoSync().windowWidth;
        } catch (e) {};
        if (winWidth){
            dp = winWidth/750;
        }
        this.dp = dp;
        var interval = 1000;
        var myDate = new Date();
        var y = myDate.getFullYear();
        var m = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        var d = myDate.getDate(); //获取当前日(1-31)
        setInterval(() => this.showCountDown(y, m, d), interval);
        citySelect.init(self)
    }
})