const fly = require('./index')

export default {
  getbanner() {
    //轮播图
    return fly.get('/banner')
  },
  getpersonalized(){
    //每日推荐
    return fly.get('/personalized?limit=6')
  },
  gettopartists(type,area,initial,offset,limit){
    //热门歌手
    return fly.get(`/artist/list?type=${type}&area=${area}&initial=${initial}&offset=${offset}&limit=${limit}`)
  },
  // gettopplaylist(){
  //   //精选歌单
  //   return fly.get('/top/playlist?limit=10&order=new')
  // },
  getalbumnew(){
    //新碟上架
    return fly.get('/album/newest')
  },
  getplaylistdetail(id){
    //获取歌单详情
    return fly.get(`/playlist/detail?id=${id}`)
  },
  getsongdetail(ids){
    //获取歌曲详情
    return fly.get(`/song/detail?ids=${ids}`)
  },
  getpersonalizedmv(){
   //推荐 mv
    return fly.get('/personalized/mv')
  },
  getpersonalizednewsong(){
    //推荐 新音乐
     return fly.get('/personalized/newsong')
   },
   getsongurl(id){
    //音乐地址
     return fly.get(`/song/url?id=${id}`)
   },
   getlyric(id){
    //歌词
     return fly.get(`/lyric?id=${id}`)
   },
   getmvdetail(mvid){
    //mv数据
     return fly.get(`/mv/detail?mvid=${mvid}`)
   },
  getmvurl(mvid){
      //mv数据
       return fly.get(`/mv/url?id=${mvid}`)
     },
     getlogincellphone(phone,password){
      //手机登录
       return fly.get(`/login/cellphone?phone=${phone}&password=${password}`)
     },
     getsearchdefault(){
      //默认搜索关键词
       return fly.get('/search/default')
     },
     getsearchhotdetail(){
      //热搜列表(详细)
       return fly.get('/search/hot/detail')
     },
     getsearch(keywords,type){
      //搜索
       return fly.get(`/search?keywords=${keywords}&type=${type}`)
     },
     getsearchsuggest(keywords){
      ///search/suggest
       return fly.get(`/search/suggest?keywords=${keywords}&type=mobile`)
     },


}