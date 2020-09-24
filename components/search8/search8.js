// components/search1/search1.js
import api from '../../http/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String
    },
    type:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    songs: '', //单曲
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getdata() {
      api.getsearch(this.data.value,this.data.type).then(res => {
        this.setData({
          songs: res.result.songs
        })
        console.log(res,"电台")
      }).catch(err => {
        console.log(err)
      })
    }
  },
  /**
   * 组件生命周期函数-在组件布局完成后执行
   */
  ready() {
    this.getdata()
  }
})