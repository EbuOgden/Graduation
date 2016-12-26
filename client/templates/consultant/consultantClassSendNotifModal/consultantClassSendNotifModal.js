if(Meteor.isCordova || Meteor.isClient){

  var studentLectures = [];
  var students = [];
  var userIds = [];
  var studentCounter;

  var notificationRoom;

  Template.consultantClassSendNotifModal.onRendered(function(){
    Session.set('sendLectureNotif', true);

    if(LocalCollectionForConsultantStudentsIdsSub.find().count() > 0){
      LocalCollectionForConsultantStudentsIdsSub.find().map(function(eachProfLecture){
        eachProfLecture.stuIdSub.stop();
      })

      LocalCollectionForConsultantStudentsIdsSub.remove({});

    }

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

    LocalCollectionForConsultantProfessorLectureNotificationRoom.insert({
      consultantProfLectureNotifRoom : Meteor.subscribe('ProfessorNotificationRoom', Session.get('lectureIdForModal') ,{
        onReady : function(){
          notificationRoom = NotificationRoomsClass.find({'notificationRoomInfo.lectureId' : Session.get('lectureIdForModal')});

            LocalCollectionForConsultantStudentLecturesSub.insert({
              studentLectureSub : Meteor.subscribe('ProfessorStudentLectures', Session.get('lectureIdForModal'), {
                onReady : function(){ studentLectures = StudentLectures.find().fetch();

                                      if(studentLectures.length > 1){
                                        for(var i = 0; i < studentLectures.length; i++){
                                          LocalCollectionForConsultantLectureStudentIdsSub.insert({
                                            studentIdSub : Meteor.subscribe('ProfessorStudents', studentLectures[i].studentId, {
                                              onReady : function(){
                                                students = Students.find().fetch();
                                                if(students.length >= 1){
                                                  userIds.push(students[studentCounter].userId);
                                                  studentCounter++;
                                                }

                                              }
                                            })
                                          })
                                        }

                                        Session.set('idsGetted', true);
                                        $('#newTitle').focus();
                                      }


                                      else if(studentLectures.length == 1){
                                        LocalCollectionForConsultantLectureStudentIdsSub.insert({
                                          studentIdSub : Meteor.subscribe('ProfessorStudents', studentLectures[0].studentId, {
                                            onReady : function(){
                                              students = Students.find().fetch();
                                              userIds.push(students[0].userId);
                                            }
                                          })
                                        })

                                        Session.set('idsGetted', true);
                                        $('#newTitle').focus();
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
})

  Template.consultantClassSendNotifModal.helpers({
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

  Template.consultantClassSendNotifModal.events({
    'click #iOSModalClose' : function(e){
      e.preventDefault();

      if(LocalCollectionForConsultantStudentLecturesSub.find().count() > 0){
        LocalCollectionForConsultantStudentLecturesSub.find().map(function(eachProfLecture){
          eachProfLecture.studentLectureSub.stop();
        })

        LocalCollectionForConsultantStudentLecturesSub.remove({});

      }

      if(LocalCollectionForConsultantLectureStudentIdsSub.find().count() > 0){
        LocalCollectionForConsultantLectureStudentIdsSub.find().map(function(eachLecture){
          eachLecture.studentIdSub.stop();
        })

        LocalCollectionForConsultantLectureStudentIdsSub.remove({});
      }

      var consStudents = ConsultantStudents.find().fetch();

      if(consStudents.length >= 1){
        for(i = consStudents.length; i--;){
          LocalCollectionForConsultantStudentsIdsSub.insert({
            stuIdSub : Meteor.subscribe('ProfessorStudents', consStudents[i].studentId, {
              onReady : function(){
                var students = Students.find().fetch();
                if(students.length >= 1){
                  Session.set('sendLectureNotif', false);
                }

              }
            })
          })
        }



      }
      else{
        console.log("no student");
        Session.set('sendLectureNotif', false);
      }

      if(Meteor.Device.isDesktop()){
        IonModal.close();
      }
      else{
        StatusBar.show();
        IonModal.close();
      }

    },

    'click #newNotifSend' : function(e, tmpl){
      e.preventDefault();
      var messageFrom = trimInput(tmpl.find('#newMessage').value);
      var lecture = Lectures.findOne(Session.get('lectureIdForModal'));
      var message;


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
          var roomFetch = notificationRoom.fetch();
          roomUsers = roomFetch[0].memberIds;

          if(roomUsers.length == userIds.length){
            console.log("roomUser ile userIds equal");
            ProfessorNotifications.insert({
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

            ProfessorNotifications.insert({
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

          ProfessorNotifications.insert({
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
          }

        }


        sendProfessorMessage.emit('sendProfessorMessage', message);

        if(LocalCollectionForConsultantStudentLecturesSub.find().count() > 0){
          LocalCollectionForConsultantStudentLecturesSub.find().map(function(eachProfLecture){
            eachProfLecture.studentLectureSub.stop();
          })

          LocalCollectionForConsultantStudentLecturesSub.remove({});

        }

        if(LocalCollectionForConsultantLectureStudentIdsSub.find().count() > 0){
          LocalCollectionForConsultantLectureStudentIdsSub.find().map(function(eachLecture){
            eachLecture.studentIdSub.stop();
          })

          LocalCollectionForConsultantLectureStudentIdsSub.remove({});
        }

        var consStudents = ConsultantStudents.find().fetch();

        if(consStudents.length >= 1){
          for(i = consStudents.length; i--;){
            LocalCollectionForConsultantStudentsIdsSub.insert({
              stuIdSub : Meteor.subscribe('ProfessorStudents', consStudents[i].studentId, {
                onReady : function(){
                  if(students.length >= 1){
                    Session.set('sendLectureNotif', false);
                  }

                }
              })
            })
          }

        }
        else{
          console.log("no student");
          Session.set('sendLectureNotif', false);
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



        IonModal.close('consultantClassSendNotifModal');

      }


    }
  })

}
