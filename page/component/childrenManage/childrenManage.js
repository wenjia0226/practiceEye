// pages/childrenManage/childrenManage.js
const app = getApp();
Page({
  data: {
    childrenList: [],
    show: false,
    show3: false,
    removeStuId: ''
  },
  onShow: function (options) { 
    wx.showLoading({
      title: '加载中...',
    })
    this.getChildrenList();
  },
  getChildrenList() {
    let that = this;
    let url = app.globalData.URL + 'childrenList', data = {
      openId: wx.getStorageSync('openId')
    };
    app.wxRequest(url, data, (res) => {
      // console.log(res)
      that.setData({
        childrenList: res.data.data
      })
      if(res.data.status == 200) {
        let childrenList = res.data.data;
        childrenList.forEach((item) => {
          if (item.myIntegral == null) {
            item.myIntegral = 0
          }
        })
        that.setData({
          childrenList: childrenList
        })
        wx.setStorageSync('studentId', childrenList[0].id);
        wx.setStorageSync('selectRankStu', childrenList[0].id);
        wx.setStorageSync('gender', childrenList[0].gender)
        wx.setStorageSync('studentName', childrenList[0].name)
      }
    }, (err) => {
      console.log(err)
    })
  },
  //孩子详情
  gotoChildrenDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/page/myCollection/pages/mychildren/mychildren?id=' + id,
    })
  },
  //删除孩子
  deleteChild(e){
    let childrenId = e.currentTarget.dataset.del;
    let that = this;
    wx.showModal({
      title: '删除孩子',
      content: '您确定要删除孩子？',
      success(res) {
        if (res.confirm) {
          let url = app.globalData.URL + 'deleteChildren', data = {
            openId: wx.getStorageSync('openId'),
            childrenId
          };
          wx.showLoading({
            title: '加载中...',
          })
          app.wxRequest(url,data, (res) => {
            let childCollection = res.data.data;
            if (childCollection.length == 1) {
              let student = res.data.data;
              wx.setStorageSync('studentId', student[0].id)
              wx.setStorageSync('gender', student[0].gender);
              wx.setStorageSync('studentName', student[0].name)
              that.setData({
                childrenList: res.data.data
              })
            } else if (childCollection.length > 1) {
                that.setData({
                  childrenList: res.data.data
                })
                wx.setStorageSync('studentId', that.data.childrenList[0].id);
                wx.setStorageSync('gender', that.data.childrenList[0].gender);
                wx.setStorageSync('studentName', that.data.childrenList[0].studentName)
              this.getChildrenList()
            }else {
              that.setData({
                childrenList: []
              })
              wx.setStorageSync('studentId', '')
              wx.setStorageSync('gender', 2);
              wx.setStorageSync('studentName', '')
            }
          }, (err) => {
            console.log(err)
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  addChild() {

  }
})