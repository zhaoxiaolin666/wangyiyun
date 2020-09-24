// pages/searchdetail/searchdetail.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idflag: 0,
    list: [{
        name: '单曲',
        type:1
      },
      {
        name: '专辑',
        type:10
      },
      {
        name: '歌手',
        type:100
      },
      {
        name: '歌单',
        type:1000
      },
      {
        name: '歌单',
        type:1002
      },
      {
        name: '用户',
        type:1004
      },
      {
        name: 'MV',
        type:1006
      },
      {
        name: '电台',
        type:1009
      },
      {
        name: '视频',
        type:1014
      },
      {
        name: '综合',
        type:1018
      },
    ]
  },
  tab(e) {
    console.log(e, '下标')
    this.setData({
      idflag: e.currentTarget.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.value, 'options的value')
    this.setData({
      value: options.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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