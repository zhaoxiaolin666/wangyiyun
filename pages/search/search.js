// pages/search/search.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showKeyword: '', //默认搜索关键词
    hotdetail: [], //热搜
    songs: [], //搜索内容
    value: '', //ipt值
  },
  //默认搜索关键词
  getsearchdefault() {
    api.getsearchdefault().then(res => {
      this.setData({
        showKeyword: res.data.showKeyword
      })
      console.log(res, '默认搜索关键词')
    }).catch(err => {
      console.log(err)
    })
  },
  //热搜列表(详细)
  getsearchhotdetail() {
    api.getsearchhotdetail().then(res => {
      this.setData({
        hotdetail: res.data
      })
      console.log(res, '热搜列表(详细)')
    }).catch(err => {
      console.log(err)
    })
  },
  //搜索
  bindconfirm(e) {
    console.log(e.detail.value, 'value的值')
    let value = e.detail.value
    wx.navigateTo({
      url: `/pages/searchdetail/searchdetail?value=${value}`,
    })
   

  },
  //输入事件
  bindinput(e) {
    console.log(e, "输入事件")
    this.setData({
      value: e.detail.value
    })
    let value = e.detail.value
    api.getsearchsuggest(value).then(res => {

      let allMatch111 = res.result.allMatch
      allMatch111.map(item => {
        item.keyword = item.keyword.replace(value, `<span style="color:skyblue">${value}</span>`)
      })
      this.setData({
        allMatch: allMatch111
      })
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  //搜索歌名
  nodes(e) {
    console.log(e.currentTarget.dataset.name,"e的value值")
    let name = e.currentTarget.dataset.name
    name = name.replace(`<span style="color:skyblue">${this.data.value}</span>`,this.data.value)
    console.log(name,'name')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getsearchdefault()
    this.getsearchhotdetail()
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