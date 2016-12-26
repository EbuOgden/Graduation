if(Meteor.isCordova || Meteor.isClient){

  var notificationRoom;

  Template.professorNotificationsModal.onRendered(function(){

    if(LocalCollectionForViewedUsers.find().count() > 0){
      LocalCollectionForViewedUsers.find().map(function(eachSub){
        eachSub.sub.stop();
      })

      LocalCollectionForViewedUsers.remove({});
    }

    if(Meteor.Device.isDesktop()){

		}
		else{
      cordova.plugins.notification.badge.clear();
			StatusBar.hide();
		}

    if(isEqual(Session.get('roomType'), "Class")){
      notificationRoom = NotificationRoomsClass.findOne({"_id" : Session.get('room')}).memberIds;

      for(i = 0; i < notificationRoom.length; i++){
        LocalCollectionForViewedUsers.insert({
          sub : Meteor.subscribe('whoRead', notificationRoom[i])
        })

      }


    }

  })

  Template.professorNotificationsModal.helpers({
    notifications : function(){

      if(Session.get('roomType') == "Class"){
          return ProfessorNotifications.find({'notificationRoomId' : Session.get('room')}, {sort : {sendAt : -1}});
      }
      else{
          return UniversityNotifications.find({'notificationRoomId' : Session.get('room')}, {sort : {sendAt : -1}});
      }

    },

    roomType : function(){
      return Session.get('roomType');
    }
  })

  Template.professorNotificationsModal.events({
    'click #iOSModalClose' : function(e){
      e.preventDefault();

      if(LocalCollectionForViewedUsers.find().count() > 0){
        LocalCollectionForViewedUsers.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForViewedUsers.remove({});
      }

      if(Meteor.Device.isDesktop()){

        IonModal.close('professorNotificationsModal');
      }
      else{
        IonModal.close('professorNotificationsModal');
        StatusBar.show();
      }
		},

    'click .notificationClick' : function(e){
      e.preventDefault();
			var target = e.currentTarget;
			var notificationId = target.id;

      if(Session.get('roomType') == "Class"){
					var notification = ProfessorNotifications.findOne({"_id" : notificationId});
					IonPopup.show({
			      title: 'Notification',
			      template: '<h5 style="text-align:center;"> ' + notification.notificationMessage + '</h5>',
			      buttons: [{
			        text: 'Close',
			        type: 'popupButonColoriOS',
			        onTap: function() {
			          IonPopup.close();
			        }
			      }]
			    });
			}
			else if(Session.get('roomType') == "University"){
				 	var notification = UniversityNotifications.findOne({"_id" : notificationId});
					IonPopup.show({
			      title: 'Notification',
			      template: '<h5 style="text-align:center;"> ' + notification.notificationMessage + '</h5>',
			      buttons: [{
			        text: 'Close',
			        type: 'popupButonColoriOS',
			        onTap: function() {
			          IonPopup.close();
			        }
			      }]
			    });

			}

    },

    'click .whoSeePopUpProf' : function(e){
      e.preventDefault();
      var target = e.currentTarget;
      var notifId = target.id;
      var users = [];
      var usersName = "";
      users.length = 0

      var notif = ProfessorNotifications.find({"_id" : notifId}).fetch();

      var notifReaded = notif[0].readedBy;

      if(notifReaded.length > 0){
        for(i = 0; i < notifReaded.length; i++){
          users.push(Meteor.users.findOne(notifReaded[i]).profile.name + '<br>');
        }

        for(i = 0; i < users.length; i++){
          usersName += users[i];
        }

        IonPopup.show({
          title: 'Viewed By',
          template: '<h5 style="text-align:center;"> ' + usersName + '</h5>',
          buttons: [{
            text: 'Close',
            type: 'popupButonColoriOS',
            onTap: function() {
              IonPopup.close();
            }
          }]
        });
      }
      else{
        IonPopup.show({
          title: 'Sorry',
          template: '<h5 style="text-align:center;"> No One Viewed </h5>',
          buttons: [{
            text: 'Close',
            type: 'popupButonColoriOS',
            onTap: function() {
              IonPopup.close();
            }
          }]
        });
      }


    }
  })
}
