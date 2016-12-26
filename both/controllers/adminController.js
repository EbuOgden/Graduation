AdminController = RouteController.extend({
  subscriptions : function(){
    return [
      Meteor.subscribe('UniversityNotificationsRoom'),
			Meteor.subscribe('UniversityNotifications')
    ]
  },

  onBeforeAction : function(){

    if(!Meteor.user() && !Meteor.loggingIn()){
				console.log("admincontroller if");
				Router.go('/');
		}
		else{
				console.log("admincontroller else");
				this.next();
		}

	},

  action : function(){
    if(this.ready()){
      if(Meteor.user()){
        var user = Meteor.users.findOne();
				var profile = user.profile;
				var roles = profile.role;

        if(roles.length == 1){
          if(isEqual(roles[0], "Admin")){
            this.render();
          }
          else{
            console.log('non authorized login');
            Meteor.logout();
            Router.go('/');
          }
        }
      }
    }
  }
})
