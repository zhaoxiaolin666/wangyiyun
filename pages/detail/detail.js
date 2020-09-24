import api from '../../http/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //歌单详情id
    playlist: {}, //歌单详情
    creator: '', //详情图片
    trackIds: [], //歌曲id
    songs: [], //歌曲详情
  },
  //获取歌单详情
  getplaylistdetail() {
    let a = this.data.id
    api.getplaylistdetail(a).then(res => {
      let a = res.playlist.trackIds
      let b = []
      a.map(item => {
        b.push(item.id)
        this.setData({
          trackIds: b
        })
      })
      // console.log(this.data.trackIds,"ids")
      this.getsongdetail()
      this.setData({
        playlist: res.playlist,
        creator: res.playlist.creator,
      })
      console.log(res.playlist, '歌单详情')
    }).catch(err => {
      console.log(err)
    })
  },
  //获取歌曲详情
  getsongdetail() {
    let a = this.data.trackIds
    console.log(a, 'id')
    api.getsongdetail(a).then(res => {
      this.setData({
        songs: res.songs
      })
      console.log(res, '歌曲详情')
    }).catch(err => {
      console.log(err)
    })
  },
  //跳转播放页面
  palymusic(e) {
    console.log(e.currentTarget.dataset.index, '播放')
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/playmusic/playmusic?index=${index}&id=${this.data.trackIds}`,
    })
  },
  //播放全部
  palymusic111() {
    let index = 0
    wx.navigateTo({
      url: `/pages/playmusic/playmusic?index=${index}&id=${this.data.trackIds}`,
    })
  },
  //跳转MV详情
  gotomv(e){
    console.log(e.currentTarget.dataset.mvid,'mv的mvid下标')
    let a = e.currentTarget.dataset.mvid
    let mvid = this.data.songs[a].mv
    console.log(mvid,'mvid')
    wx.navigateTo({
      url: `/pages/mvdetail/mvdetail?mvid=${mvid}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, "歌单详情id")
    let a = options.id
    this.setData({
      id: a
    })
    this.getplaylistdetail()
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