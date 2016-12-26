if(Meteor.isClient || Meteor.isCordova){

  Template.professor.onCreated(function(){

    if(LocalCollectionForLogin.find().count() > 0){
			LocalCollectionForLogin.find().map(function(eachSub){
				eachSub.sub.stop();
			})

			LocalCollectionForLogin.remove({});
		}

    var lectureSub = [];
    var lectureIds = [];

    var professor = Professors.findOne();

    this.autorun(function(){
      LocalCollectionForProfessorNotificationRooms.insert({
        profNotifRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(),)
      })

          notificationRoom = NotificationRoomsClass.find().fetch();

          for( i = 0; i < notificationRoom.length; i++){
            LocalCollectionForProfessorNotifications.insert({
              profNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoom[i]._id)
            })

          }



    })

    LocalCollectionForProfessorLectures.insert({
      profLec : Meteor.subscribe('ProfessorLectures', professor._id, {
        onReady : function(){
          profLectures = ProfessorLectures.find().fetch();

          if(profLectures.length >= 1){
            for(i = 0; i < profLectures.length; i++){
              LocalCollectionForProfessorGetLectures.insert({
                lec : Meteor.subscribe('Lectures', profLectures[i].Lecture, {
                  onReady : function(){
                    Session.set('lecturesGetted', true);
                  }
                })
              })
            }
          }

          Session.set('lecturesGetted', true);
        }
      })
    })



  })

}
