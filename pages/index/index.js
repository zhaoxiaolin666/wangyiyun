import store from '../../store/index'
import create from '../../utils/create'
import dayjs from '../../lib/dayjs.min.js'
import api from '../../http/api'
create.Page(store, {
  use: ['msg'],
  /**
   * 页面的初始数据
   */
  data: {
    msg: '我是组件的数据',
    banners: [], //轮播图
    indicatorDots: true, //是否有指示灯
    vertical: true, //是否间隔
    autoplay: true, //是否自动播放
    interval: 2000, //切换时长
    duration: 500, //延时时长
    result: [], //推荐歌单
    albums: [], //新碟
    resultmv: [], //推荐MV
    resultmusic: [], //推荐新音乐
  },
  // updata(){
  // this.store.data.msg='改变之后的值'
  // },
  //跳转搜索
  gotosearch() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //听歌识曲
  Music() {
    wx.showToast({
      title: '暂无听歌识曲功能',
      icon: 'none',
      duration: 2000
    })
  },
  //轮播图
  getbanner() {
    api.getbanner().then(res => {
      this.setData({
        banners: res.banners
      })
      console.log(res, "轮播图数据")
    }).catch(err => {
      console.log(err)
    })
  },
  //推荐歌单
  getpersonalized() {
    api.getpersonalized().then(res => {
      this.setData({
        result: res.result
      })
      console.log(res.result, "推荐歌单")
    }).catch(err => {
      console.log(err)
    })
  },
  //精选歌单
  // gettopplaylist() {
  //   api.gettopplaylist().then(res => {
  //     console.log(res)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },
  //新碟
  getalbumnew() {
    api.getalbumnew().then(res => {
      this.setData({
        albums: res.albums
      })
      console.log(res.albums, '新碟')
    }).catch(err => {
      console.log(err)
    })
  },
  //推荐 mv
  getpersonalizedmv() {
    api.getpersonalizedmv().then(res => {
      this.setData({
        resultmv: res.result
      })
      console.log(res.result, '推荐mv')
    }).catch(err => {
      console.log(err)
    })
  },
  //推荐 新音乐
  getpersonalizednewsong() {
    api.getpersonalizednewsong().then(res => {
      this.setData({
        resultmusic: res.result
      })
      console.log(res.result, '推荐新音乐')
    }).catch(err => {
      console.log(err)
    })
  },
  //推荐歌单详情
  recommend(e) {
    console.log(e.currentTarget.dataset.id, "歌单详情")
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`,
    })
  },
  //跳转MV详情
  gotomv(e){
    console.log(e.currentTarget.dataset.id,'mv的mvid')
    let mvid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/mvdetail/mvdetail?mvid=${mvid}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let time = dayjs(Date.now()).format('YYYY-HH-DD hh:mm:ss')
    console.log(time, "现在时间")
    this.getbanner()
    this.getpersonalized()
    this.getpersonalizedmv()
    // this.gettopplaylist()
    this.getalbumnew()
    this.getpersonalizednewsong()
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