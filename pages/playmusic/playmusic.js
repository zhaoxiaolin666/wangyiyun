// pages/playmusic/playmusic.js
import api from '../../http/api'
import dayjs from '../../lib/dayjs.min.js'
let bg = wx.getBackgroundAudioManager();
let timer = '' //定时器
let lineTimeId = ''; //水平线定时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '', //音乐地址
    index111: -1, //歌曲id 下标
    songs: [], //歌单歌曲
    trackIds: [], //歌曲id  
    flag: 0, //标记播放状态
    paly: true, //开始结束播放
    duration: '00:00', //总时长
    showTime: '00:00', //当前时间
    audioTime: '', //滚动条长度
    long: 0, //总时长秒数
    scrollbar: false, //拖动滚动条，暂停开始，用于结束定时器的重新加载效果
    Collection: false, //收藏
    lyric: [], //歌词
    lyrictime: [], //歌词时间
    Jump: false, //切换歌词
    scrollTop: 1, //竖向滚动条位置
    nowtime: '00:00', //此时你播放时间
    show: false, //歌词展示时间
    timenext: 0, //定位播放时间秒数
    timedifference: 0, //时间差
  },
  //获取歌曲详情
  getsongdetail() {
    let id = this.data.trackIds
    api.getsongdetail(id).then(res => {
      wx.setNavigationBarTitle({ //标题
        title: res.songs[this.data.index111].name
      })
      bg.epname = res.songs[this.data.index111].al.name
      bg.title = res.songs[this.data.index111].name
      bg.singer = res.songs[this.data.index111].ar[0].name
      bg.coverImgUrl = res.songs[this.data.index111].al.picUrl
      this.setData({
        songs: res.songs
      })
      console.log(res, '歌曲详情')
    }).catch(err => {
      console.log(err)
    })
  },
  //播放方式
  playing1() {
    this.setData({
      flag: 1 //单曲播放
    })
  },
  playing2() {
    this.setData({
      flag: 2 //随机播放
    })
  },
  playing3() {
    this.setData({
      flag: 0 //顺序播放
    })
  },
  //播放状态
  playorder1() {
    this.setData({
      paly: false, //暂停播放
      scrollbar: true
    })
    let bg = wx.getBackgroundAudioManager();
    bg.pause()
  },
  playorder2() {
    this.setData({
      paly: true,
      scrollbar: false //开始播放
    })
    let bg = wx.getBackgroundAudioManager();
    bg.play()
  },
  //拖动滚动条
  sliderChange(e) {
    this.setData({
      scrollbar: false
    })
    console.log(e.detail.value, '进度条')
    let a = e.detail.value
    bg.seek(a)
  },
  //拖动过程
  draging(e) {
    console.log(e.detail.value, '进度条ing')
    let a = e.detail.value
    let time = dayjs((a) * 1000).format('mm:ss')
    this.setData({
      showTime: time,
      scrollbar: true
    })
  },
  // 手指触摸开始
  bindtouchstart(e) {
    this.setData({
      show: true,
    })
    console.log(e, '开始')
    if (lineTimeId) {
      clearInterval(lineTimeId)
      lineTimeId = ''
    }
  },
  // 手指触摸结束
  bindtouchend(e) {
    console.log(e, '结束')
    lineTimeId = setInterval(() => {
      this.setData({
        show: false,
      });
      clearTimeout(lineTimeId);
    }, 5000);
  },
  //播放现在时间
  playnowtime() {
    let a = this.data.timenext
    bg.seek(a)
  },
  //滚动时间
  bindscroll(e) {
    // console.log(e.detail.scrollTop, "距顶部距离")
    let index111 = parseInt(e.detail.scrollTop / 28)
    // console.log(index111)
    let a = this.data.lyrictime[index111]
    // console.log(a)
    let c = dayjs(a * 1000).format('mm:ss')
    this.setData({
      nowtime: c,
      timenext: a
    })
    // console.log(this.data.nowtime, 'aaaaaaa')
  },
  //上一曲
  Lastsong() {
    this.data.lyric = []
    this.data.lyrictime = []
    if (this.data.flag === 0) {
      this.getsongdetail() //歌单
      let index = this.data.index111
      if (index === 0) {
        index = this.data.trackIds.length - 1
        this.setData({
          index111: index,
          paly: true
        })
        this.getsongurl()
        this.gotolyric() //歌词
      } else {
        this.setData({
          index111: index - 1,
          paly: true
        })
        this.getsongurl()
        this.gotolyric() //歌词
      }
    } else if (this.data.flag === 1) {
      bg.stop() //停止音乐
      this.Singleplay()
    } else if (this.data.flag === 2) {
      this.Randomplay()
    }
  },
  //下一曲
  Nextsong() {
    this.data.lyric = []
    this.data.lyrictime = []
    if (this.data.flag === 0) {
      this.getsongdetail() //歌单
      let index = Number(this.data.index111)
      let long = this.data.trackIds.length - 1
      console.log(long, 'long')
      if (index !== long) {
        this.setData({
          index111: index + 1,
          paly: true
        })
        this.getsongurl()
        this.gotolyric() //歌词
      }
      // console.log(index ,long)
      // console.log(typeof(index),typeof(long))
      else {
        index = 0
        this.setData({
          index111: index,
          paly: true
        })
        this.getsongurl()
        this.gotolyric() //歌词
      }
    } else if (this.data.flag === 1) {
      bg.stop() //停止音乐
      this.Singleplay()
    } else if (this.data.flag === 2) {
      this.Randomplay()
    }
  },
  //单曲播放
  Singleplay() {
    this.getsongdetail()
    this.getsongurl()
  },
  //随机播放
  Randomplay() {
    this.data.lyric = []
    this.data.lyrictime = []
    let a = this.data.trackIds.length
    let num = Math.ceil(Math.random() * (a - 1) + 0)
    this.setData({
      index111: num,
      paly: true
    })
    console.log(num, '随机下标')
    this.getsongdetail()
    this.setData({
      showTime: '00:00' //重置当前时间
    })
    this.getsongurl()
    this.gotolyric() //歌词
  },
  //音乐地址
  getsongurl() {
    let id = this.data.trackIds[this.data.index111]
    console.log(id, '歌曲播放id')
    api.getsongurl(id).then(res => {
      this.setData({
        url: res.data[0].url,
      })
      bg.src = res.data[0].url
      // 设置了 src 之后会自动播放
      bg.play()
      console.log(res.data[0].url, '音乐地址')
    }).catch(err => {
      console.log(err)
    })
  },
  //收藏
  Collection1() {
    this.setData({
      Collection: true
    })
  },
  //取消收藏
  Collection2() {
    this.setData({
      Collection: false
    })
  },
  //歌词
  gotolyric() {
    let id = this.data.trackIds[this.data.index111]
    api.getlyric(id).then(res => {
      let a = res.lrc.lyric.split('\n')
      let lyric111 = this.data.lyric
      let lyric222 = []
      // a.map(item => {
      //   let patt1 = new RegExp('\\[(.*)\\]', 'g')
      //   item = item.replace(item.match(patt1), '')
      //   if (item) {
      //     lyric111.push(item)
      //   }
      // })
      a.map(item => {
        let patt1 = new RegExp('\\[(.*)\\]', 'g') //new RegExp('\\[[0-9]*:[0-9]*.[0-9]*\\]', 'g')
        let i = item.match(patt1)
        let j = item.replace(i, '')
        if (i) {
          i = i[0].replace('[', '').replace(']', '')
          let time = i.split(':')[0] * 60 + i.split(':')[1].split('.')[0] * 1 //播放秒数
          if (i && j) {
            lyric222.push(time)
            lyric111.push(j)
          }
        }
      })
      this.setData({
        lyrictime: lyric222,
        lyric: lyric111,
        Jump: true
      })
      console.log(this.data.lyrictime, '歌词时间')
      console.log(this.data.lyric, '歌词')
    }).catch(err => {
      console.log(err)
    })
  },
  //歌手写真
  gotoPhoto() {
    this.setData({
      Jump: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let arr = options.id.split(',')
    this.setData({
      index111: options.index, //选中歌曲下标
      trackIds: arr, //歌单id数组
      showTime: '00:00' //重置当前时间
    })
    console.log(arr, 'id数组')
    this.getsongdetail() //歌单
    this.getsongurl(); //歌曲地址 
    timer = setInterval(() => {
      if (this.data.scrollbar === false) {
        let time1 = dayjs((bg.duration) * 1000).format('mm:ss')
        let time2 = dayjs((bg.currentTime) * 1000).format('mm:ss')
        let long111 = parseInt(bg.duration)
        if (this.data.show === false) {
          for (let i = 0; i < this.data.lyrictime.length; i++) {
            let audioTime111 = parseInt(bg.currentTime)
            if (audioTime111 < this.data.lyrictime[i + 1] && audioTime111 > this.data.lyrictime[i]) {
              let aaa=this.data.lyrictime[i+1]-this.data.lyrictime[i]
              this.setData({
                scrollTop: i,
                timedifference:aaa
              })
              break
            } else if (audioTime111 > this.data.lyrictime[this.data.lyrictime.length - 1]) {
              let bbb=this.data.lyrictime[this.data.lyrictime.length - 1]
              this.setData({
                scrollTop: this.data.lyrictime.length - 1,
                timedifference:bbb
              })
              break
            }
          }
        }
       
        // let time3 = dayjs( Number(this.data.lyrictime[this.data.scrollTop])* 1000).format('mm:ss')
        this.setData({
          showTime: time2, //当前时间
          long: long111, //进度条最大长度
          duration: time1, //总时长
          audioTime: parseInt(bg.currentTime), //当前秒数
          // nowtime:time3
        })
      }
      //当播放时长和总时长相等时 清除定时器
    }, 1000)
    bg.onEnded(() => {
      if (this.data.flag === 0) {
        this.Nextsong()
        this.gotolyric() //歌词
      } else if (this.data.flag === 1) {
        this.Singleplay()
        this.gotolyric() //歌词
      } else if (this.data.flag === 2) {
        this.Randomplay()
        this.gotolyric() //歌词
      }
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
    clearInterval(timer) //退出页面清除定时器
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