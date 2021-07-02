// pages/components/textEffect/index.js
const DB = wx.cloud.database().collection("chickenSoup");
Component({
  /**
   * 组件的属性列表
   */
  data: {
    showText: [],
    markIndex:0,
  },
  properties: {
    proList:{
      type:Array,
      value:[],
      observer:function(newVal){
         this.setData({showText:newVal})
      }
    },
    currentIndex: {
      type: Number,
      value: 0,
      observer: function (newVal) {
         this.setData({markIndex:newVal})

      }
    }
  },
  lifetimes: {
  },


  /**
   * 组件的方法列表
   */
  methods: {

  }

})