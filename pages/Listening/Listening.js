const {
  default: api
} = require("../../http/api")

// pages/Listening/Listening.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singer: 0, //歌手下标
    hot: 0, //字母下标
    artists: [], //歌手清单
    limit: 10, //加载数
    offset: 0, //开始歌手
    typeList: [{
        name: '入驻歌手',
        type: '-1',
        area: '-1'
      },
      {
        name: '华语男歌手',
        type: '1',
        area: '7'
      },
      {
        name: '华语女歌手',
        type: '2',
        area: '7'
      },
      {
        name: '华语组合/乐队',
        type: '3',
        area: '7'
      },
      {
        name: '欧美男歌手',
        type: '1',
        area: '96'
      },
      {
        name: '欧美女歌手',
        type: '2',
        area: '96'
      },
      {
        name: '欧美组合',
        type: '3',
        area: '96'
      },
      {
        name: '日本男歌手',
        type: '1',
        area: '8'
      },
      {
        name: '日本女歌手',
        type: '2',
        area: '8'
      },
      {
        name: '日本组合/乐队',
        type: '3',
        area: '8'
      },
      {
        name: '韩国男歌手',
        type: '1',
        area: '16'
      },
      {
        name: '韩国女歌手',
        type: '2',
        area: '16'
      },
      {
        name: '韩国组合/乐队',
        type: '3',
        area: '16'
      },
      {
        name: '其他男歌手',
        type: '1',
        area: '0'
      },
      {
        name: '其他女歌手',
        type: '2',
        area: '0'
      },
      {
        name: '其他组合',
        type: '3',
        area: '0'
      },
    ],
    initials: [{
        name: '热门',
        id: ''
      },
      {
        name: 'A',
        id: 'a'
      },
      {
        name: 'B',
        id: 'b'
      },
      {
        name: 'C',
        id: 'c'
      },
      {
        name: 'D',
        id: 'd'
      },
      {
        name: 'E',
        id: 'e'
      },
      {
        name: 'F',
        id: 'f'
      },
      {
        name: 'G',
        id: 'g'
      },
      {
        name: 'H',
        id: 'h'
      },
      {
        name: 'I',
        id: 'i'
      },
      {
        name: 'J',
        id: 'j'
      },
      {
        name: 'K',
        id: 'k'
      },
      {
        name: 'L',
        id: 'l'
      },
      {
        name: 'M',
        id: 'm'
      },
      {
        name: 'N',
        id: 'n'
      },
      {
        name: 'O',
        id: 'o'
      },
      {
        name: 'P',
        id: 'p'
      },
      {
        name: 'Q',
        id: 'q'
      },
      {
        name: 'R',
        id: 'r'
      },
      {
        name: 'S',
        id: 's'
      },
      {
        name: 'T',
        id: 't'
      },
      {
        name: 'U',
        id: 'u'
      },
      {
        name: 'V',
        id: 'v'
      },
      {
        name: 'W',
        id: 'w'
      },
      {
        name: 'X',
        id: 'x'
      },
      {
        name: 'Y',
        id: 'y'
      },
      {
        name: 'Z',
        id: 'z'
      },
      {
        name: '#',
        id: '0'
      },
    ],
  },
  singer(e) {
    // console.log(e.currentTarget.dataset.index, '歌手下标')
    this.setData({
      singer: e.currentTarget.dataset.index,
      hot: 0
    })
    this.gettopartists()
  },
  hot(e) {
    // console.log(e.currentTarget.dataset.index, '歌手下标')
    this.setData({
      hot: e.currentTarget.dataset.index
    })
    this.gettopartists()
  },
  //热门歌手
  gettopartists() {
    let a = this.data.typeList[this.data.singer].type
    let b = this.data.typeList[this.data.singer].area
    let c = this.data.initials[this.data.hot].id
    let d = this.data.offset
    let e = this.data.limit
    api.gettopartists(a, b, c, d, e).then(res => {
      this.setData({
        artists: res.artists
      })
      console.log(res.artists, '歌手清单')
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gettopartists()
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
    wx.showLoading({
      title: '加载中...',
    })
    let aaa = this.data.offset
    let bbb = this.data.limit
    aaa=aaa+bbb
    this.setData({
      offset: aaa,
    })
    let a = this.data.typeList[this.data.singer].type
    let b = this.data.typeList[this.data.singer].area
    let c = this.data.initials[this.data.hot].id
    let d = this.data.offset
    let e = this.data.limit
    api.gettopartists(a, b, c, d, e).then(res => {
      let artists111 = this.data.artists
      let artists222 = res.artists
      let artists333=artists111.concat(artists222)
      this.setData({
        artists: artists333
      })
      console.log(this.data.artists, '歌手清单111')
    }).catch(err => {
      console.log(err)
    })
    setTimeout(() => {
      wx.hideLoading()
    }, 1000);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})