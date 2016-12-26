if(Meteor.isCordova || Meteor.isClient){

  Template.professorHome.onRendered(function(){
    if(Meteor.Device.isDesktop()){
      document.title = 'Professor';
    }
  })

  document.addEventListener('resume', function () {
    setTimeout(function () {
      if(Session.get('uniNotifClicked')){
        IonModal.open('studentNotificationsModal');
        Session.set('uniNotifClicked', false);
      }
    }, 50);
  }, false);

  Template.professorHome.onCreated(function(){
    var user = Meteor.users.findOne();
    var profile = user.profile;

    if(Meteor.Device.isDesktop()){


      if(isEqual(profile.role, "Professor")){

        sendUniversityMessage.on(Meteor.userId(), function(message){
          toastr.warning(message.msg, "University New Message");
        })
      }

    }
    else{

      if(isEqual(profile.role, "Professor")){
        sendUniversityMessage.on(Meteor.userId(), function(msg){
          scheduleUni(msg);
        })
      }



    }



  })

  Template.professorHome.events({
    'click .ownedNotifRoom' : function(e){
      e.preventDefault();
      var target = e.currentTarget;
			var selectedRoomId = target.id;

			var selectedLectureId = $('#' + selectedRoomId).attr('data-lecId');
			var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
			var selectedLecture = Lectures.find({'_id' : selectedLectureId}).fetch()[0];
			Session.set('roomType', selectedRoomType);
			Session.set('room', selectedRoomId);
			IonModal.open('professorNotificationsModal', {lecture : selectedLecture});

    },

    'click .universityNotifRoom' : function(e){
      e.preventDefault();
      var target = e.currentTarget;
      var selectedRoomId = target.id;

      var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
      Session.set('roomType', selectedRoomType);
      Session.set('room', selectedRoomId);
      IonModal.open('professorNotificationsModal');
    }
  })

  Template.professorHome.helpers({
    lectureGetted : function(){
      return Session.get('lecturesGetted');
    },

    notificationRoomsClass : function(){
      if(NotificationRoomsClass.find().count() > 0){
        return NotificationRoomsClass.find();
      }

    },

    schoolNotificationRoom : function(){
			return NotificationRoomUniversity.find();
		},

    notificationRoomsClassCount : function(){
      return NotificationRoomsClass.find().count();
    },

    notificationRoomsClassNotifCount : function(){
      return ProfessorNotifications.find().count();
    },

    haveNotificationRoom : function(){
			if((NotificationRoomUniversity.find().count() > 0) || (NotificationRoomsClass.find().count() > 0)){
				return true;
			}
			else{
				return false;
			}
		}
  })


}

function scheduleUni(msg){
	var options = {
		id: Math.floor((Math.random() * 1000) + 5),
		text: msg.msg,
		title: msg.title,
		data : msg.roomId + './' + msg.roomType
	}

	cordova.plugins.notification.local.schedule(options);
	cordova.plugins.notification.badge.increase(1);
	cordova.plugins.notification.local.on("click", function (notification, state) {

			var data = notification.data;
			var splitData = data.split('./');
			var roomId = splitData[0];
			var roomTypeSt = splitData[1];

			Session.set('room', roomId);
			Session.set('roomType', roomTypeSt);

			Session.set('uniNotifClicked', true);
			Router.go('/professor');

	});


}
