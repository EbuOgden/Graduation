if(Meteor.isCordova || Meteor.isClient){
	Template.studentNotificationsModal.events({
		'click #iOSModalClose' : function(e){
      e.preventDefault();
      if(Meteor.Device.isDesktop()){
        IonModal.close('studentNotificationsModal');
      }
      else{
				IonModal.close('studentNotificationsModal');
				StatusBar.show();
      }

    },

		'click .notificationClick' : function(e){
			e.preventDefault();
			var target = e.currentTarget;
			var notificationId = target.id;

			if(Session.get('roomType') == "Consultant"){
				 	var notification = ConsultantNotifications.findOne({'_id' : notificationId});
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
			else if(Session.get('roomType') == "Class"){
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

		}
	})

	Template.studentNotificationsModal.helpers({
			notifications : function(){
				if(Session.get('roomType') == "Consultant"){
						return ConsultantNotifications.find({'notificationRoomId' : Session.get('room')}, {sort : {sendAt : -1}});
				}
				else if(Session.get('roomType') == "Class"){
						return ProfessorNotifications.find({'notificationRoomId' : Session.get('room')}, {sort : {sendAt : -1}});
				}
				else if(Session.get('roomType') == "University"){
						return UniversityNotifications.find({'notificationRoomId' : Session.get('room')}, {sort : {sendAt : -1}});
				}

			},

			roomType : function(){
				return Session.get('roomType');
			}

	})

	Template.studentNotificationsModal.onRendered(function(){

		if(Session.get('roomType') == "Consultant"){
			var notification = ConsultantNotifications.find({'notificationRoomId' : Session.get('room')}).fetch();

			notification.forEach(function(eachNotif){
				ConsultantNotifications.update({'_id' : eachNotif._id}, {
					$set :{
						readedBy : Meteor.userId()
					}
				})
			})
		}
		else if(Session.get('roomType') == "Class"){
			var notification = ProfessorNotifications.find({'notificationRoomId' : Session.get('room')}).fetch();

			notification.forEach(function(eachNotif){
				ProfessorNotifications.update({'_id' : eachNotif._id}, {
					$addToSet :{
						readedBy : Meteor.userId()
					}
				})
			})
		}

		if(Meteor.Device.isDesktop()){

		}
		else{
      cordova.plugins.notification.badge.clear();
			StatusBar.hide();
		}

	})
}
