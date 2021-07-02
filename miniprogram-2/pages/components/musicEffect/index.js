const bgMusic = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicInfo:{
      type:"Object",
      value:{},
      observer(newVal){
        if(JSON.stringify(newVal) != "{}"){
          bgMusic.src = newVal.list.musicUrl;
          bgMusic.epname = newVal.list.musicName;
          bgMusic.title = newVal.list.musicName;
          this.listenerButtonPlay()
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isOpen: false, //播放开关
    isPlay: false, // 是否播放了
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    listenerButtonPlay() {
      if (!this.data.isPlay) {
        // ！！！ ios 播放时必须加title 不然会报错导致音乐不播放
        // 这块的值需要自己替换哦

        bgMusic.coverImgUrl = '我是一个音频背景图'
      }
  
      // 监听播放结束
      bgMusic.onEnded(() => {
        this.triggerEvent('changeMusic')
      })
      // bgMusic.play()
      // that.setData({
      //   isOpen: true,
      //   isPlay: true
      // })
    },
    //暂停播放
    listenerButtonPause() {
      console.log(this.data.isOpen)
      if(!this.data.isOpen){
        bgMusic.pause()
        this.setData({isOpen:true})
      }else{
        bgMusic.play()
        this.setData({isOpen:false})
      }
    },

}
})
