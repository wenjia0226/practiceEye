// page/tabBar/index/index.js
const app = getApp();
Page({
  data: {
    loginFlag: false,
    height: app.globalData.navHeight,
    childrenList: [],
    studentId: '',
    selectArray: [],
    show: false
  },
  onShow: function () {
    this.setData({
      phone: wx.getStorageSync('phone'),
      studentId: wx.getStorageSync('studentId'),
      gender: wx.getStorageSync('gender'),
      studentName: wx.getStorageSync('studentName')
    })
    this.getChildrenList();
  },
  gotoLogin() {
    wx.navigateTo({
      url: '/nicheng/nicheng',
    })
  },
  myevent(e) {
    this.setData({
      studentName: e.detail.params,
      gender: e.detail.gender,
      studentId: e.detail.studentId
    })
    wx.setStorageSync('studentId', e.detail.studentId);
  },
  newchildrenlist(e) {
    let curStudent = e.detail.newChildrenList;
    this.setData({
      selectArray: e.detail.newChildrenList,
      childrenList: e.detail.newChildrenList
    })
    this.setData({
      studentId: curStudent[0].id,
      studentName: curStudent[0].name,
      birthday: curStudent[0].birthday,
      gender: curStudent[0].gender
    })
    wx.setStorageSync('studentName', curStudent[0].name);
    wx.setStorageSync('studentId', curStudent[0].id);
    wx.setStorageSync('gender', curStudent[0].gender);
    wx.setStorageSync('birthday', curStudent[0].birthday);
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + "childrenList", data = { openId: wx.getStorageSync('openId') };
    //如果已经授权过
    wx.showLoading({
      title: '加载中...'
    })
    app.wxRequest(url, data, (res) => {
       console.log(res)
      if (res.data.data) {
        res.data.data.push({
          name: '添加孩子'
        })
      }
      if (res.data.status == 200) {
        that.setData({
          selectArray: res.data.data,
          childrenList: res.data.data
        }) 
        // 如果本地没有孩子
        if (!this.data.studentId) {
        // 临时绑定的孩子后孩子设置
        that.setData({
          studentId: res.data.data[0].id,
          gender: res.data.data[0].gender,
          studentName: res.data.data[0].name
        })
        wx.setStorageSync('studentId', res.data.data[0].id);
        wx.setStorageSync('gender', res.data.data[0].gender);
        wx.setStorageSync('studentName', res.data.data[0].name);
        }
      } else if (res.data.status == 10220) {
        that.setData({
          childrenList: [],
          gender: 2
        })
        let arr = [];
        arr.push({
          name: '添加孩子'
        })
        that.setData({
          selectArray: arr
        })
      }
    })
  },
  addChild() {
    let that = this;
    wx.showModal({
      title: '温馨提示',
      content: '请先绑定孩子',
      confirmText: "去绑定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          that.hideview()
          wx.navigateTo({
            url: '/manual/manual'
          })
        }
      }
    })
  },
  // 添加孩子按钮
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