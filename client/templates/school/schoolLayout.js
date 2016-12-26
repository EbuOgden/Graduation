if(Meteor.isCordova || Meteor.isClient){

	Template.schoolLayout.events({
		'click #homeButtoniOS' : function(e){
			e.preventDefault();
			templateRender('schoolHome', '#schoolMain');

		},

		'click #feedBackButtoniOS' : function(e){
			e.preventDefault();
			templateRender('feedBack', '#schoolMain');
		},

		'click #logOutButtoniOS' : function(e){
			e.preventDefault();
			IonSideMenu.snapper.close();

			if(Meteor.Device.isDesktop()){
					Meteor.logout();
			}
			else{
				navigator.notification.confirm('Are you sure log out the system?', function(index){
					if(index == 1){
						console.dir('Cancel Clicked');
					}
					if(index == 2){
						console.dir('Ok Clicked');
						Meteor.logout(function(err){

							if(err){
								console.dir("LOGOUT ERROR APPEARED : " + err);
							}
							else{
								console.dir("LOGGED OUT!");
							}
						});
					}
				},'Warning', ['Cancel', 'OK']);


			}


		}
	})
}
