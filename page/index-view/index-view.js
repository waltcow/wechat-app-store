const { images, comments, product  } = require('./resource/index.js');
const citySelect = require('../../component/citySelect/citySelect.js')

Page({
    data: {
        toView: 'top',
        comments: comments,
        product: product,
        images: images,
        titleTop: '130px',
        countDownText: ''
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
        let winWidth = null;
        let dp = 1;
        try {
            winWidth = wx.getSystemInfoSync().windowWidth;
        } catch (e) {};
        if (winWidth){
            dp = winWidth/750;
        }
        this.setData({
            titleTop: dp * 320 + 'px'
        })

        var myDate = new Date();
        var self = this;
        var y = myDate.getFullYear();
        var m = myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        var d = myDate.getDate(); //获取当前日(1-31)
        setInterval(function () {
            self.showCountDown(y, m, d)
        }, 500)
        citySelect.init(self);
    }
})