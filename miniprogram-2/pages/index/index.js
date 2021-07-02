// pages/index/index.js
const collection = wx.cloud.database().collection("collection")
const DB = wx.cloud.database().collection("allList");
const getMusic = wx.cloud.database().collection("musicList");
Page({
  //add向云数据库bgImage 中添加数据
  // addData(){
  //   DB.add({
  //     data:{
  //       name:"石头老师1",
  //       age:23
  //     },
  //     success(res){
  //       console.log("添加成功",res)
  //     },
  //     fail(res){
  //       console.log(res,"打印失败")
  //     }
  //   })
  // },
  toBack: function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  //get查询数据
  getData() {
    const that = this;
    DB.get({
      success(res) {
        res.data.sort((a, b) => {
          return Math.random() > 0.5 ? 1 : -1;
        })
        that.setData({
          proList: res.data
        })
      }
    });
    getMusic.get({
      success(res) {
        that.setData({
          musicList: res.data,
          musicInfo: res.data[0]
        })
      }
    })
  },
  collectionFn() {
    const that = this;
    collection.get({
      success(res) {
        that.setData({
          collectList: res.data
        })
      }
    })
  },


  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    swiperIndex: 0,
    proList: [],
    currentIndex: 0,
    num: 0,
    collectList: [],
    musicList: [],
    musicInfo: {},
    readyStatus: false,
    showPage: true,
    backStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.collectionFn();
    // 跳转到普通页面
    setTimeout(() => {
      this.setData({
        showPage: false
      })
    }, 3000);
    if (!options.currentindex) {
      this.getData()
      this.setData({
        backStatus: false
      })
    } else {
      const that = this
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.on('objtArry', function (data) {
    
        that.setData({
          proList: data.data.filter(item=>{return item}),
          currentIndex: Number(options.currentindex),
          readyStatus: true,
          backStatus: true,
          showPage:false
        })

      })
    }
  },
  changeBgImg(e) {
    this.setData({
      currentIndex: e.detail.current,
      musicInfo: this.data.musicList[e.detail.current]
    })
  },
  startFn1() {
    this.setData({
      readyStatus: true
    })
  },
  methods: {

    changeMusic() {
      this.setData({
        musicInfo: this.data.musicList[this.data.this.data.musicLis + 1],
        num: this.data.num + 1
      })
    }
  }
})