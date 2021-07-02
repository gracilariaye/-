App({
	onLaunch: function () {
		var n = this,
			e = wx.getStorageSync('logs') || []
		// e.unshift(Date.now()),
		// wx.setStorageSync('logs', e),
		wx.cloud.init({
			env: 'yml2017491471-9g68d25i0a6ba35a',
			traceUser: true,
		}),
			wx.login({
				success: function (n) {},
			}),
			wx.getSetting({
				success: function (e) {
					if (e.authSetting['scope.userInfo']) {
						wx.getUserInfo({
							success: function (e) {
								n.globalData.userInfo = e.userInfo
                                // if (this.userInfoReadyCallback) {
                                //     this.userInfoReadyCallback(e)
                                //  }
							},
						})
					}
				},
			})
	},
	globalData: {
		userInfo: null,
	},
})
