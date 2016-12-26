LectureSelectController = RouteController.extend({
  subscriptions : function(){
    return [
      Meteor.subscribe('Faculties'),
      Meteor.subscribe('FacultyDepartments'),
      Meteor.subscribe('DepartmentLectures'),
      Meteor.subscribe('Students', Meteor.userId())
    ]
  },

  onBeforeAction : function(){

    if(!Meteor.user() && !Meteor.loggingIn()) {
				console.log("lectureselectaction if");
				this.redirect('/');

		}

		else{
        this.next();
		}


  },

  action : function(){
    if(this.ready()){

      if(Meteor.user()){

        var user = Meteor.users.findOne();
				var profile = user.profile;

				if(isEqual(profile.role, "Student")){
						console.log("it is student");
						var isFirst = Students.find().fetch();

            if(isFirst.length > 0){
              Meteor.subscribe('StudentLectures', isFirst[0]._id, {
                onReady : function() {
                  if(StudentLectures.find().count() > 0){
                    Router.go('/student');
                  }}
                });

            }

            else{
              this.render();
            }

			}
      else{

          console.log("non authorized login");
          Meteor.logout();
          Router.go('/');
      }
      }


    }
    else{
      console.log("not ready");
    }
  }



})
