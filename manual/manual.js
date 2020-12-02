// manual/manual.js
const app = getApp();
Page({
  data: {
    date: '2010/01/01',
    show: true,
    gender: 0,
    name: '',
    province_list: null,
    province_name: null,
    city_list: null,
    city_name: null,
    area_list: null,
    area_name: null,
    addressCity: null,
    multiArray: [],  // 三维数组数据
    multiIndex: [0, 0, 0], // 默认的下标,
    selectProvinceId: null,
    selectCityId: null,
    selectAreaId: null,
    prevRoute: '',
    flag: false,
    reminShow: true
  },
  onShow() {
    let pages = getCurrentPages();//页面对象
    let prevpage = pages[pages.length - 2];//上一个页面对象
    this.setData({
      prevRoute: prevpage.route
    })
  },
  hideRemin() {
    this.setData({
      reminShow: false
    })
  },
  showRemin() {
    this.setData({
      reminShow: true
    })
  },
  handleNameInput(e){
    this.setData({
      name:e.detail.value 
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
      show: false
    })
    var dateOld = this.data.date;
    var  dateNew  =  dateOld.replace(/-/g,  '/');
    this.setData({
      date: dateNew
    })
  },
  selectSex(e) {
    this.setData({
      gender: e.currentTarget.dataset.type
    })
  },
  saveStudent() {
    if(!this.data.flag) {
      this.setData({
        flag: true
      })
    let that = this;
    let url = app.globalData.URL + "addOrSaveChildren", 
    data = {
    openId: wx.getStorageSync('openId'),
    name: this.data.name,
    birthday: this.data.date,
    gender: this.data.gender
    };
    wx.setStorageSync('studentName', this.data.name);
    wx.setStorageSync('gender', this.data.gender);
    app.wxRequest(url, data, (res) => {
      wx.setStorageSync('studentId', res.data.data.id)
      if(res.data.status == 200) {
        if (that.data.prevRoute == 'page/tabBar/index/index') {
          wx.switchTab({
            url: '/page/tabBar/index/index'
          })
        }else if(that.data.prevRoute == 'page/tabBar/my/my') {
          wx.switchTab({
            url: '/page/tabBar/my/my'
          })
        } 
      } 
    })
    }
  }
})