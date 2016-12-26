ProfessorNotifications.find().observeChanges({
  added : function(id, fields){

    Meteor.setTimeout(function(){
      var roomId = fields.notificationRoomId;

      var notif = ProfessorNotifications.findOne(id);

      var notifRoom = NotificationRoomsClass.findOne(roomId);
      var notifRoomInfo = notifRoom.notificationRoomInfo;
      var notifUsers = notifRoom.memberIds;
      var notifUsersToControl = notifRoom.memberIds;

      var delivered = notif.delivered;
      var deliveredIndexes = [];

      var notifRoomOwnerId = notifRoomInfo.ownerId;

      var ownerProfile = Meteor.users.findOne(notifRoomOwnerId).profile;
      var ownerName = ownerProfile.name;

      var notifTitle = Lectures.findOne(notifRoomInfo.lectureId).lectureName;

      if(delivered.length >= 1){
        /* if delivered length higher than 1 so check roomUsersIds and deliveredIds if these lengths are not equal

        pushing notification room users delivered ids indexes in notifUsers array to deliveredIndexes array and

        remove these indexes from notifUsers and remove whitespace characters and send push notifications after push

        update delivered users */

        if(notifUsersToControl.length != delivered.length){

          for(let i = 0; i < delivered.length; i++){
            deliveredIndexes.push(notifUsersToControl.indexOf(delivered[i]));
          }

          for(let i = 0; i < deliveredIndexes.length; i++){
            delete notifUsersToControl[deliveredIndexes[i]];
          }

          /* remove whitespace characters from an array */
          notifUsersToControl = notifUsersToControl.filter(function(str){
            return /\S/.test(str);
          })

          Push.send({
              from: ownerName,
              title: notifTitle,
              text: notif.notificationMessage,
              badge: 1,
              payload: {
                  title: notifTitle,
                  text: notif.notificationMessage
              },
              gcm: {
                  title: notifTitle
              },
              notId: Math.floor((Math.random() * 1000) + 5),
              query: {
                notifUsersToControl
              }
          });

          ProfessorNotifications.update({"_id" : id}, {
            $set : {
              delivered : NotificationRoomsClass.findOne(roomId).memberIds
            }
          })

        }

      }
      else{
        /* no one get notification so send push notif to all notif room users */
        Push.send({
            from: ownerName,
            title: notifTitle,
            text: notif.notificationMessage,
            badge: 1,
            payload: {
                title: notifTitle,
                text: notif.notificationMessage
            },
            gcm: {
                title: notifTitle
            },
            notId: Math.floor((Math.random() * 1000) + 5),
            query: {
              notifUsers
            }
        });

        ProfessorNotifications.update({"_id" : id}, {
          $set : {
            delivered : NotificationRoomsClass.findOne(roomId).memberIds
          }
        })

      }
    }, 10000)

  }
})

ConsultantNotifications.find().observeChanges({
  added : function(id, fields){

    // Meteor.setTimeout({
    //
    // }, 10000);
  }
})
