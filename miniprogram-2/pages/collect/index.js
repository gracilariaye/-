// pages/collect/index.js
const DB = wx.cloud.database().collection("collection")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: []
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
    this.getCollectList()
  },
  toBack:function(){
    wx.navigateBack({
      delta: 1,
    })
  },
  getCollectList() {
    const that = this
    DB.get({
      success(res) {
        if(res.data.length===1){
          res.data.length =3
        }else if (res.data.length <= 3) {
          res.data.length = 3 % res.data.length + res.data.length
        } else {
          res.data.length = res.data.length % 3 + res.data.length
        }
        that.setData({
          collectList: res.data
        })
      }
    })
  },
  toindex(details) {
    console.log(details.currentTarget.dataset.currentindex)
    if(this.data.collectList[details.currentTarget.dataset.currentindex]){
      wx.navigateTo({
        url: '/pages/index/index?currentindex='+details.currentTarget.dataset.currentindex,
        success: (res) => {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('objtArry', {
            data: this.data.collectList, //传过去的参数，可直接对象.数组不在需要使用decodeURIComponent
          })
        },
      })
    }
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