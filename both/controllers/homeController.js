HomeController = RouteController.extend({

		onBeforeAction : function(){
			if(Meteor.Device.isDesktop()){

			}
			else{
				if(!cookieControl('introSaw')){
					Router.go('/intro');
				}
			}

			if(!Meteor.user() && !Meteor.loggingIn()) {
					this.render();
			}

			else{
					this.next();

			}

		},

		/* eger sayfa hazirsa ve route a gelen kisi kullanici ise reactive fonksiyon olan
		trackeri kullaniyoruz */
		/* tracker sayesinde reactive olarak users tablosundan veri cekiyoruz */
		action : function(){
			if(this.ready()){

				if(Meteor.user()){

					var user = Meteor.users.find({_id : Meteor.userId()}).fetch();
					var profile = user[0].profile;
					var roles = profile.role;

					if(roles.length >= 1){
						roles.forEach(function(eachRole){
							if((isEqual(eachRole, "DepartmentHead")) || (isEqual(eachRole, "Consultant")) || (isEqual(eachRole, "Dean"))){
								Router.go('/consultant');
							}
						})

						if(isEqual(roles, "Admin")){
							Router.go('/admin');
						}
						else if(isEqual(roles, "Student")){
							Router.go('/student');
						}

						else if(isEqual(roles, "Professor")){
							Router.go('/professor');
						}
						else if(isEqual(roles, "School")){
							Router.go('/school');
						}
					}
				}


			}
		}


})
