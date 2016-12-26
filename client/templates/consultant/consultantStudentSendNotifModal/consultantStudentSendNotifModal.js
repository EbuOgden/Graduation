if(Meteor.isCordova || Meteor.isClient){

  var notificationRoom;
  var student;
  var consultant;

  Template.consultantStudentSendNotifModal.onRendered(function(){
      studentObj = Students.findOne(Session.get('studentIdForModal'));
      notificationRoom = NotificationRoomsConsultant.find({'memberId' : studentObj.userId});
      consultant = Consultants.findOne();
  })

  Template.consultantStudentSendNotifModal.helpers({
      student : function(){
        return Students.findOne({'_id' : Session.get('studentIdForModal')}).student;
      },
  })

  Template.consultantStudentSendNotifModal.events({
    'click #iOSModalClose' : function(e){
      e.preventDefault();
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
      var userId = studentObj.userId;
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
          notificationRoomFetch = notificationRoom.fetch();

          ConsultantNotifications.insert({
            notificationMessage : messageFrom,
            notificationRoomId : notificationRoomFetch[0]._id,
            sendAt : new Date(),
            readedBy : " "
          })

          message = {
            title : consultant.consultantName,
            msg : messageFrom,
            roomId : notificationRoom.fetch()[0]._id,
            roomType : "Consultant",
            user : userId,
          }

        }
        else{
          var newConstRoom = NotificationRoomsConsultant.insert({
            createdAt : new Date(),
            memberId : userId,
            notificationRoomInfo : {
              ownerId : Meteor.userId()
            }
          })

          ConsultantNotifications.insert({
            notificationMessage : messageFrom,
            notificationRoomId : newConstRoom,
            sendAt : new Date(),
            readedBy : " "
          })

          message = {
            title : consultant.consultantName,
            msg : messageFrom,
            roomId : newConstRoom,
            roomType : "Consultant",
            user : userId,
          }
        }

        sendConsultantMessage.emit('sendConsultantMessage', message);

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

        IonModal.close('consultantStudentSendNotifModal');
      }

    }
  })


}
