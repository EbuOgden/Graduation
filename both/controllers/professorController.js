ProfessorController = RouteController.extend({
	subscriptions : function(){
		return [
			Meteor.subscribe('Professors', Meteor.userId()),
			Meteor.subscribe('UniversityNotificationsRoom'),
			Meteor.subscribe('UniversityNotifications')

		]
	},

	onBeforeAction : function(){

		if(!Meteor.user() && !Meteor.loggingIn()) {
				console.log("professorcontroller if");
				Router.go('/');
		}

		else{
				console.log('professorcontroller else');
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

				if(isEqual(profile.role, "Professor")){
						console.log("it is professor");
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
