if(Meteor.isCordova || Meteor.isClient){

    var professorLectures = [];
    var lectureIds = [];
    var students = [];

    Template.consultant.onCreated(function(){

      Session.set('lecturesGetted', false);
      Session.set('classNotifRoomsGetted', false);
      if(Meteor.Device.isDesktop()){

        var user = Meteor.users.findOne();
        var profile = user.profile;
        var roles = profile.role;

        if(roles.length >= 1){
          for(i = roles.length; i--;){
            if(isEqual(roles[i], "Dean")){
              document.title = 'Dean';
              roles.length = 0;
            }

          }

          for(i = roles.length; i--;){
            if(isEqual(roles[i], "DepartmentHead")){
              document.title = 'Department Head';
              roles.length = 0;
            }
          }

          for(i = roles.length; i--;){
            if(isEqual(roles[i], "Consultant")){
              document.title = 'Consultant';
              roles.length = 0;
            }
          }
        }
      }

      var self = this;
      professorLectures.length = 0;
      lectureIds.length = 0;
      students.length = 0;

      if(LocalCollectionForLogin.find().count() > 0){
  			LocalCollectionForLogin.find().map(function(eachSub){
  				eachSub.sub.stop();
  			})

  			LocalCollectionForLogin.remove({});
  		}

      if(Professors.find().count() > 0){

          var professor = Professors.findOne();

          LocalCollectionForConsultantLectures.insert({
            profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
              onReady : function(){
                var professorLectures = ProfessorLectures.find().fetch();

                if(professorLectures.length >= 1){
                    for(i = 0; i < professorLectures.length; i++){
                      LocalCollectionForConsultantGetLectures.insert({
                        lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                          onReady : function(){
                            if(Lectures.find().count() > 0){
                                Session.set('lecturesGetted', true);
                            }

                          }
                        })
                      })
                    }
                }

                else{
                  console.log("no lecture");
                  Session.set('lecturesGetted', true);
                }

              }
            })
          })

          LocalCollectionForConsultantProfessorNotificationRooms.insert({
            consProfNotRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(), {
              onReady : function(){
                var notificationRoomClass = NotificationRoomsClass.find().fetch();

                if(notificationRoomClass.length >= 1) {
                  for( i = 0; i < notificationRoomClass.length; i++){
                    LocalCollectionForConsultantProfessorNotifications.insert({
                      consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id, {
                        onReady : function(){
                          Session.set('classNotifRoomsGetted', true);
                        }
                      })
                    })
                  }
                }
                else{
                  Session.set('classNotifRoomsGetted', true);
                }

              }
            })
          })

          NotificationRoomsClass.find().observeChanges({
            added : function(id, object){
              var notificationRoomClass = NotificationRoomsClass.findOne(id);

              LocalCollectionForConsultantProfessorNotifications.insert({
                consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass._id)
              })
            },
          })


          ProfessorLectures.find().observeChanges({
            added : function(id, object){
              var professorLectures = ProfessorLectures.find({"_id" : id}).fetch();

              if(professorLectures.length >= 1){
                for(let i = 0; i < professorLectures.length; i++){
                  LocalCollectionForConsultantGetLectures.insert({
                    lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                      onReady : function(){
                        Session.set('lecturesGetted', true);
                      }
                    })
                  })

                }

              }
              else{
                Session.set('lecturesGetted', true);
              }

            }
          })


      }
      else{
        Session.set('lecturesGetted', true);
      }

      if(Consultants.find().count() > 0){
          var consultant = Consultants.findOne();

          LocalCollectionForConsultantStudentsSub.insert({
                  stuSub : Meteor.subscribe('ConsultantStudents', consultant._id, {
                    onReady : function(){
                      students = ConsultantStudents.find().fetch();

                      if(students.length >= 1){
                        for(i = students.length; i--;){
                          LocalCollectionForConsultantStudentsIdsSub.insert({
                            stuIdSub : Meteor.subscribe('ProfessorStudents', students[i].studentId)
                          })
                        }

                      }
                      else{
                        console.log("no student");
                      }

                    }
                  })
        })

        ConsultantStudents.find().observeChanges({
          added : function(id, object){

            students = ConsultantStudents.findOne(id);

            LocalCollectionForConsultantStudentsIdsSub.insert({
              stuIdSub : Meteor.subscribe('ProfessorStudents', students.studentId, {
              })
            })


          }
        })
      }

      LocalCollectionForConsultantNotificationRooms.insert({
        consNotRoom : Meteor.subscribe('ConsultantsOwnedNotificationRooms', Meteor.userId())
      })

      NotificationRoomsConsultant.find().observeChanges({
        added : function(id, object){

          var notificationRoomStudent = NotificationRoomsConsultant.findOne(id);

          LocalCollectionForConsultantNotifications.insert({
              consNotifs : Meteor.subscribe('StudentConsultantNotification', notificationRoomStudent._id)
          })
        }
      })


  })
}
