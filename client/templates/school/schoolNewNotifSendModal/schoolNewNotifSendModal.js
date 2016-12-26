if(Meteor.isClient || Meteor.isCordova){

  var notificationRoom;

  Template.schoolNewNotifSendModal.onRendered(function(){
    notificationRoom = NotificationRoomUniversity.find();

    if(Meteor.Device.isDesktop()){

		}
		else{
      StatusBar.hide();
		}


  })

  Template.schoolNewNotifSendModal.events({
    'click #newNotifSend' : function(e, tmpl){
      e.preventDefault();

      var messageFrom = trimInput(tmpl.find('#newMessage').value);
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
          var notificationRoomFetch = notificationRoom.fetch();

          UniversityNotifications.insert({
            notificationMessage : messageFrom,
            sendAt : new Date(),
            notificationRoomId : notificationRoomFetch[0]._id
          })

          message = {
            title : "Maltepe University",
            msg : messageFrom,
            roomId : notificationRoomFetch[0]._id,
            roomType : "University",
          }
        }
        else{
          var newUniRoom = NotificationRoomUniversity.insert({
            createdAt : new Date(),
            notificationRoomInfo : {
              ownerId : Meteor.userId()
            }
          })

          UniversityNotifications.insert({
            notificationMessage : messageFrom,
            sendAt : new Date(),
            notificationRoomId : newUniRoom
          })

          message = {
            title : "Maltepe University",
            msg : messageFrom,
            roomId : newUniRoom,
            roomType : "University",
          }
        }

        sendUniversityMessage.emit('sendUniversityMessage', message);

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

        IonModal.close('schoolNewNotifSendModal');
      }
    },

    'click #iOSModalClose' : function(){
      if(Meteor.Device.isDesktop()){
        IonModal.close('schoolNewNotifSendModal');
      }
      else{
        IonModal.close('schoolNewNotifSendModal');
        StatusBar.show();
      }

    }
  })
}
