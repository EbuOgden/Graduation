SchoolController = RouteController.extend({
  subscriptions : function(){
    return [
      Meteor.subscribe('UniversityNotificationsRoom'),
      Meteor.subscribe('UniversityNotifications')
    ]
  },

  onBeforeAction : function(){

		if(!Meteor.userId() && !Meteor.loggingIn()){
				console.log("schoolcontroller if");
				Router.go('/');
		}
		else{
          this.next();
		}



	},

  action : function(){
    if(this.ready()){
      /* route onbeforeaction client not connected to server
      until page loaded so we use controls on action phase
      */
      if(Meteor.user()){

        var user = Meteor.users.find(Meteor.userId()).fetch();
        var profile = user[0].profile;

        if(isEqual(profile.role, "School")){
            console.log("it is school");
            this.render();

        }
        else{
            console.log("non authorized login");
            Meteor.logout();
            Router.go('/');
        }
      }

    }
    else{

    }
  }
})
