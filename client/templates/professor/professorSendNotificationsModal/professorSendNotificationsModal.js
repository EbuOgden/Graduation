if(Meteor.isClient || Meteor.isCordova){

  var studentLectures = [];
  var students = [];
  var userIds = [];
  var studentCounter;

  var notificationRoom;

  Template.professorSendNotificationsModal.rendered = function(){
    if(Meteor.Device.isDesktop()){

    }
    else{
      StatusBar.hide();
    }

    studentLectures.length = 0;
    students.length = 0;
    userIds.length = 0;
    studentCounter = 0;

    Session.set('idsGetted', false);
    Session.set('noneStudent', false);

    LocalCollectionForProfessorLectureNotificationRoom.insert({
      profLectureNotifRoom : Meteor.subscribe('ProfessorNotificationRoom', Session.get('lectureIdForModal') ,{
        onReady : function(){
          notificationRoom = NotificationRoomsClass.find({'notificationRoomInfo.lectureId' : Session.get('lectureIdForModal')});

            LocalCollectionForProfessorStudentLecturesSub.insert({
              studentLectureSub : Meteor.subscribe('ProfessorStudentLectures', Session.get('lectureIdForModal'), {
                onReady : function(){ studentLectures = StudentLectures.find().fetch();

                                      if(studentLectures.length > 1){
                                        for(i = 0; i < studentLectures.length; i++){
                                          console.log(studentLectures[i].studentId);
                                          LocalCollectionForProfessorStudentIdsSub.insert({
                                            studentIdSub : Meteor.subscribe('ProfessorStudents', studentLectures[i].studentId, {
                                              onReady : function(){
                                                students = Students.find().fetch();
                                                userIds.push(students[studentCounter].userId);
                                                studentCounter++;
                                              }
                                            })
                                          })
                                        }


                                        Session.set('idsGetted', true);
                                      }


                                      else if(studentLectures.length == 1){
                                        LocalCollectionForProfessorStudentIdsSub.insert({
                                          studentIdSub : Meteor.subscribe('ProfessorStudents', studentLectures[0].studentId, {
                                            onReady : function(){
                                              students = Students.find().fetch();
                                              userIds.push(students[0].userId);
                                            }
                                          })
                                        })

                                        Session.set('idsGetted', true);
                                      }
                                      else{
                                        Session.set('noneStudent', true);
                                        Session.set('idsGetted', false);
                                      }
              }
            })

            })
          }

      })
    })




}

  Template.professorSendNotificationsModal.events({
    'click #iOSModalClose' : function(e){
      e.preventDefault();

      if(LocalCollectionForProfessorStudentLecturesSub.find().count() > 0){
        LocalCollectionForProfessorStudentLecturesSub.find().map(function(eachProfLecture){
          eachProfLecture.studentLectureSub.stop();
        })

        LocalCollectionForProfessorStudentLecturesSub.remove({});
      }

      if(LocalCollectionForProfessorStudentIdsSub.find().count() > 0){
        LocalCollectionForProfessorStudentIdsSub.find().map(function(eachLecture){
          eachLecture.studentIdSub.stop();
        })

        LocalCollectionForProfessorStudentIdsSub.remove({});
      }

      if(Meteor.Device.isDesktop()){
        IonModal.close('professorSendNotificationsModal');
      }
      else{
        StatusBar.show();
        IonModal.close('professorSendNotificationsModal');
      }

    },

    'click #newNotifSend' : function(e, tmpl){
      e.preventDefault();
      var messageFrom = trimInput(tmpl.find('#newMessage').value);
      var lecture = Lectures.findOne(Session.get('lectureIdForModal'));
      var message;
      var newProfNotif;

      if(notificationRoom.count() > 0){
        var roomFetch = notificationRoom.fetch();
        roomUsers = roomFetch[0].memberIds;
      }

      if(isEmpty(messageFrom)){

        if(Meteor.Device.isDesktop()){
          alert("Please Fill Box");
        }
        else{
          navigator.notification.alert('Please Fill Box');
        }


      }
      else{
        if(notificationRoom.count() > 0){

          if(roomUsers.length == userIds.length){
              newProfNotif = ProfessorNotifications.insert({
                notificationMessage : messageFrom,
                notificationRoomId : notificationRoom.fetch()[0]._id,
                sendAt : new Date(),
                delivered : [],
                readedBy : []
              })
          }
          else{
            NotificationRoomsClass.update({
              '_id' : roomFetch[0]._id
            }, {
              $set : {
                memberIds : userIds
              }
            })

            newProfNotif = ProfessorNotifications.insert({
              notificationMessage : messageFrom,
              notificationRoomId : notificationRoom.fetch()[0]._id,
              sendAt : new Date(),
              delivered : [],
              readedBy : []
            })

          }
          message = {
            title : lecture.lectureName,
            msg : messageFrom,
            lectureId : Session.get('lectureIdForModal'),
            roomId : notificationRoom.fetch()[0]._id,
            roomType : "Class",
            users : userIds,
            notifId : newProfNotif
          }

        }
        else {
          var newRoomId = NotificationRoomsClass.insert({
            createdAt : new Date(),
            memberIds : userIds,
            notificationRoomInfo : {
              lectureId : Session.get('lectureIdForModal'),
              ownerId : Meteor.userId()
            }
          })

          newProfNotif = ProfessorNotifications.insert({
            notificationMessage : messageFrom,
            notificationRoomId : newRoomId,
            sendAt : new Date(),
            delivered : [],
            readedBy : []
          })

          message = {
            title : lecture.lectureName,
            msg : messageFrom,
            lectureId : Session.get('lectureIdForModal'),
            roomId : newRoomId,
            roomType : "Class",
            users : userIds,
            notifId : newProfNotif
          }

        }

        sendProfessorMessage.emit('sendProfessorMessage', message);

        if(LocalCollectionForProfessorStudentLecturesSub.find().count() > 0){
          LocalCollectionForProfessorStudentLecturesSub.find().map(function(eachProfLecture){
            eachProfLecture.studentLectureSub.stop();
          })

          LocalCollectionForProfessorStudentLecturesSub.remove({});
        }

        if(LocalCollectionForProfessorStudentIdsSub.find().count() > 0){
          LocalCollectionForProfessorStudentIdsSub.find().map(function(eachLecture){
            eachLecture.studentIdSub.stop();
          })

          LocalCollectionForProfessorStudentIdsSub.remove({});
        }

        if(Meteor.Device.isDesktop()){
          toastr.success("Notification Sent", "Success");
        }
        else{
          window.plugins.toast.showWithOptions({
              message: "Notification Sent",
              duration: "short", // 2000 ms
              position: "bottom",
              styling: {
                opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                backgroundColor: '#30ba8f', // make sure you use #RRGGBB. Default #333333
                textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                horizontalPadding: 20, // iOS default 16, Android default 50
                verticalPadding: 16 // iOS default 12, Android default 30
              }
            });
          StatusBar.show();
        }

        IonModal.close('professorSendNotificationsModal');
      }


    }
  })
  Template.professorSendNotificationsModal.helpers({
    idsGetted : function(){
      return Session.get('idsGetted');
    },

    noneStudent : function(){
      return Session.get('noneStudent');
    },

    lecture : function(){
      return Lectures.findOne(Session.get('lectureIdForModal'));
    }
  })
}
