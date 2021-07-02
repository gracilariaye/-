const db = wx.cloud.database()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    loveStatus:false,
    list:[],
    collectId:"",
    simpleShareImg:"../../assist/images/logo.png"
  },
  properties:{
    collectList:{
      type:Array,
      value:[]
    },
    currentIndex:{
      type:Number,
      value:10,
      observer:function(newval){
        console.log(this.data.collectList)
          const loveStatus=this.data.collectList.some(item=>{
            if(this.data.proList[newval]._id ===item._id){
              this.setData({collectId:item._id})
            }
            // console.log(this.data.collectList[newval]._id,item._id)
              return this.data.proList[newval]._id ===item._id
          })
      this.setData({loveStatus:loveStatus}) 
      }
    },
    proList:{
      type:Array,
      value:[],
      observer:function(newVal){
         this.setData({list:newVal})
      }
    }
  },

 methods:{
  toCollection(){
    wx.navigateTo({
      url: '/pages/collect/index',
    })
  },
  changeLove(){
    if(this.data.loveStatus===true){
      db.collection('collection').doc(this.data.collectId).remove()
    }else{
      db.collection('collection').add({data:this.data.list[this.data.currentIndex]})
    }
    this.triggerEvent("collectionFn")
    this.setData({loveStatus:!this.data.loveStatus});
  },
  //自定义按钮分享
  onShareAppMessage() {
    return {
      title: "送你一杯热鸡汤！",
      path: `pages/index/index`,
      desc: "",
      imageUrl: this.data.simpleShareImg
    };
  }
 },

})