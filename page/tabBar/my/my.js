// my.js
const app = getApp();
Page({
  data:{
    phone: false,
    phoneNum: '',
    avatarUrl: '',
    nickName: '',
    code: '',
    tabbar: {},
    height: app.globalData.navHeight,
    selectArray:[],
    studentName: '无',
    gender: 2,
    balance: '',
    show: false,
    tempFlag: 2
  },
  onLoad() {
    app.hidetabbar();
    app.editTabbar();
    this.getChildrenList();
    this.setData({
      phone: wx.getStorageSync('phone')
    })
  
  },
  gotoCode() {
    wx.navigateTo({
      url: '/page/myCollection/pages/studentCode/studentCode?studentId=' + this.data.studentId,
    })
  },
  gotoAdd() {
    if (this.data.phone) {
      this.hideview()
    } else {

      wx.navigateTo({
        url: '/nicheng/nicheng',
      })
    }
  },
  
  onShow() {
    this.setData({
      phone: wx.getStorageSync('phone'),
      studentId: wx.getStorageSync('studentId')
    })
      if (this.data.studentId) {
        this.setData({
          studentName: wx.getStorageSync('studentName'),
          gender: wx.getStorageSync('gender'),
        })
      } else {
        this.setData({
          studentName: "暂无绑定",
          gender: 2
        })
      }
      this.setData({
        avatarUrl: wx.getStorageSync('avatarUrl'),
        nickName: wx.getStorageSync('nickName')
      })
      this.getChildrenList()
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenList", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    if (this.data.phone) {
      wx.showLoading({
        title: '加载中...'
      })
      app.wxRequest(url, data, (res) => {
        
        if (res.data.data) {
          res.data.data.push({
            name: '添加孩子'
          })
        }
        if (res.data.status == 200) {
          that.setData({
            selectArray: res.data.data
          })
          wx.setStorageSync('studentName', that.data.selectArray[0].name);
          wx.setStorageSync('studentId', that.data.selectArray[0].id);
          wx.setStorageSync('gender', that.data.selectArray[0].gender)
        }else if(res.data.status == 10220) {
          let arr = [];
          arr.push({
            name: '添加孩子' 
          })
          that.setData({
            selectArray:arr
          })
        }
      })
    }
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params,
      gender: e.detail.gender
    })
  },
  newchildrenlist(e) {
    let curStudent = e.detail.newChildrenList;
    this.setData({
      selectArray: e.detail.newChildrenList
    })
    this.setData({
      studentId: curStudent[0].id,
      studentName: curStudent[0].name,
      birthday: curStudent[0].birthday,
      gender: curStudent[0].gender,
      balance: curStudent[0].balance,
      ranking: curStudent[0].rankings

    })
    wx.setStorageSync('studentName', curStudent[0].name);
    wx.setStorageSync('studentId', curStudent[0].id);
    wx.setStorageSync('gender', curStudent[0].gender)
  },
  goToQu() {
    if (this.data.phone) {
      wx.navigateTo({
        url: '/page/myCollection/pages/diopter/diopter'
      })
    } else {
      this.gotoLogin();
    }
  },
  gotoMyChild() {
    if(this.data.phone) {
      wx.navigateTo({
        url: '/page/component/childrenManage/childrenManage'
      })
    }else {
     this.gotoLogin()
    }
  },
  checkLogin() {
    let that = this;
    let url = app.globalData.URL + 'chkState';
    let data = {
      openId: wx.getStorageSync('openId')
    }
    wx.showLoading({
      title: '加载中...',
    })
    app.wxRequest(url, data, (res) => {
      console.log(res)
      if (res.data.status == 200) {
        wx.switchTab({
          url: '/survey/survey'
        })
        that.setData({
          isLogin: true
        })
      }
    }, (err) => {
      console.log(err)
    })
  },
  
  goClert() {
    if (this.data.phone) {
      let that = this;
      let url = app.globalData.URL + 'chkClert';
      let data = {
        openId: wx.getStorageSync('openId')
      }
      wx.showLoading({
        title: '加载中...',
      })
      app.wxRequest(url, data, (res) => {
        if (res.data.status == 200) {
          wx.navigateTo({
            url: '/page/myCollection/pages/clertMain/clertMain'
          })
        } else if (res.data.status == 10227) {
          wx.navigateTo({
            url: '/page/myCollection/pages/clertLogin/clertLogin'
          })
        }
      }, (err) => {
        console.log(err)
      })
    } else {
      this.gotoLogin();
    }
  },
  hideview() {
    this.setData({
      show: true
    })
  },
  hide() {
    this.setData({
      show: false
    })
  },
  
})