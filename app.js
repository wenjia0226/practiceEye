//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let that = this;
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        var appId = 'wx9051126db3e08515'
        var secret = '0f445f594ddc02b123c1cb422a442efb';
        wx.setStorageSync('code', code);
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
              wx.setStorageSync("nickName", res.userInfo.nickName);
              wx.setStorageSync("encryptedData", res.encryptedData);
              wx.setStorageSync("iv", res.iv);
              // 可以将 res 发送给后台解码出 unionId
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
      let menuButtonObject = wx.getMenuButtonBoundingClientRect();
      wx.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top,//胶囊按钮与顶部的距离            
          navHeight = statusBarHeight + menuButtonObject.height;//导航高度
          this.globalData.navHeight = navHeight
        },
        fail(err) {
          console.log(err);
        }
      }) 
  },
  globalData: {
    userInfo: null,
    navHeight: '',
    //URL: 'https://www.guangliangkongjian.com/lightspace/train/',
    URL: 'http://192.168.100.199:8080/lightspace/train/',
  },
  wxRequest(url, data, callback, errFun) {
    wx.request({
      url: url,
      method: 'post',
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        callback(res)
      },
      fail: function (err) {
        errFun(err)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
})