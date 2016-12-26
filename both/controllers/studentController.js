StudentController = RouteController.extend({
	subscriptions : function(){
		if(Meteor.user()){
			return [
				Meteor.subscribe('Students', Meteor.userId()),
				Meteor.subscribe('UniversityNotificationsRoom'),
				Meteor.subscribe('UniversityNotifications'),

			]
		}

	},
	onBeforeAction : function(){

		if(!Meteor.user() && !Meteor.loggingIn()) {
				console.log("student onbefore if");
				this.redirect('/');
		}

		else{
				console.log('student else');
				this.next();

		}



	},

	action : function(){
		if(this.ready()){
			/* route onbeforeaction client not connected to server
			until page loaded so we use controls on action phase
			*/
			if(Meteor.user()){


				var user = Meteor.users.findOne();
				var profile = user.profile;

				if(isEqual(profile.role, "Student")){
						console.log("it is student");
						this.render();

				}

				else{

						console.log("non authorized login");
						Meteor.logout();
						Router.go('/');
				}
			}
		}
	}

})
