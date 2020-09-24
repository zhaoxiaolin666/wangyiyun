// pages/mvdetail/mvdetail.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvid: '' ,//mv数据id
    mvurl:'',//mv地址url
    inputValue: '',
  },
  //mv数据
  getmvdetail() {
    let mvid = this.data.mvid
    api.getmvdetail(mvid).then(res => {
      wx.setNavigationBarTitle({ //标题
        title: res.data.name
      })
      console.log(res, 'mv数据')
    }).catch(err => {
      console.log(err)
    })
  },
  //mv地址
  getmvurl() {
    let mvid = this.data.mvid
    api.getmvurl(mvid).then(res => {
      this.setData({
        mvurl:res.data.url
      })
      console.log(res.data.url, 'mv地址')
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 'mv的options')
    this.setData({
      mvid: options.mvid
    })
    this.getmvdetail() //mv数据
    this.getmvurl() //mv地址
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})