ConsultantController = RouteController.extend({
	subscriptions : function(){
		return [
			Meteor.subscribe('UniversityNotificationsRoom'),
			Meteor.subscribe('UniversityNotifications')

		]
	},

	onBeforeAction : function(){


		if(!Meteor.user() && !Meteor.loggingIn()){
				console.log("consultantcontroller if");
				Router.go('/');
		}
		else{
				console.log("consultantcontroller else");
				this.next();
		}

	},

	action : function(){
		var self = this;
		if(this.ready()){

			/* route onbeforeaction client not connected to server
			until page loaded so we use controls on action phase
			*/
			if(Meteor.user()){

				var user = Meteor.users.findOne();
				var profile = user.profile;
				var roles = profile.role;

				if(roles.length >= 1){

					for(i = 0; i < roles.length; i++){
						if(isEqual(roles[i], "Dean")){

								LocalCollectionForDeanSub.insert({
									sub : Meteor.subscribe('Dean', Meteor.userId(), {
										onReady : function(){
										}
									})
								})

								LocalCollectionForConsultantSub.insert({
									sub : Meteor.subscribe('Consultants', Meteor.userId(), {
										onReady : function(){

										}
									})
								})

								LocalCollectionForConsultantProfessor.insert({
									sub : Meteor.subscribe('Professors', Meteor.userId(), {
										onReady : function(){
											self.render();
										}
									})
								})
								return;
						}

					}

					for(i = 0; i < roles.length; i++){

						if(isEqual(roles[i], "DepartmentHead")){

								LocalCollectionForDepartmentHeadsSub.insert({
									depHeadSub : Meteor.subscribe('DepartmentHead', Meteor.userId(), {
										onReady : function(){
											var depHead = DepartmentHeads.findOne();

											LocalCollectionForConsultantDepartmentsSub.insert({
												depSub : Meteor.subscribe('Departments', depHead.departmentId)
											})

											LocalCollectionForConsultantSub.insert({
												sub : Meteor.subscribe('Consultants', Meteor.userId(), {
													onReady : function(){

													}
												})
											})

											LocalCollectionForConsultantProfessor.insert({
								        sub : Meteor.subscribe('Professors', Meteor.userId(), {
								          onReady : function(){
															self.render();
								          }
								        })
								      })


										}
									})
								})

							return;

						}

					}

					for(i = 0; i < roles.length; i++){
						if(isEqual(roles[i], "Consultant")){

								LocalCollectionForConsultantSub.insert({
									sub : Meteor.subscribe('Consultants', Meteor.userId(), {
										onReady : function(){

										}
									})
								})

								LocalCollectionForConsultantProfessor.insert({
									sub : Meteor.subscribe('Professors', Meteor.userId(), {
										onReady : function(){
											self.render();
										}
									})
								})
								return;
						}

					}

				}else{
					console.log('non authorized login');
					Meteor.logout();
					Router.go('/');
				}


			}

		}

		else{

		}
	}
})
