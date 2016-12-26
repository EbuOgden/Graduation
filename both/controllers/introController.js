IntroController = RouteController.extend({
	onBeforeAction : function(){
		Cookie.set('introSaw', 1, {
			expires : 9999
		});
		this.next();

	}

})
