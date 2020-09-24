// pages/mine/mine.js
import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: 0, //登录方式标记
    num: '', //手机号
    password: '', //密码
    mail: '', //邮箱
  },
  //手机登录
  Mobilelogin() {
    this.setData({
      flag: 0
    })
  },
  //邮箱登录
  Emaillogin() {
    this.setData({
      flag: 1
    })
  },
  //登录
  login() {
    let num= this.data.num
    let password=this.data.password
    api.getlogincellphone(num,password).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  //注册
  register() {
    // api.getlogincellphone().then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  value1(e) {
    this.setData({
      num: e.detail.value
    })
    console.log(e.detail.value, '手机号')
  },
  value2(e) {
    this.setData({
      password: e.detail.value
    })
    console.log(e.detail.value, '密码')
  },
  value3(e) {
    this.setData({
      mail: e.detail.value
    })
    console.log(e.detail.value, '邮箱')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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