if(Meteor.isCordova || Meteor.isClient){

  Template.consultantHome.onRendered(function(){

  })

  document.addEventListener('resume', function () {
    setTimeout(function () {
      if(Session.get('uniNotifClicked')){
        IonModal.open('studentNotificationsModal');
        Session.set('uniNotifClicked', false);
      }
    }, 50);
  }, false);

  Template.consultantHome.events({
    'click .ownedClassNotifRoom' : function(e){
      e.preventDefault();
      var target = e.currentTarget;
			var selectedRoomId = target.id;

			var selectedLectureId = $('#' + selectedRoomId).attr('data-lecId');
			var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
			var selectedLecture = Lectures.find({'_id' : selectedLectureId}).fetch()[0];
			Session.set('roomType', selectedRoomType);
			Session.set('room', selectedRoomId);
			IonModal.open('consultantNotificationsModal', {lecture : selectedLecture});

    },

    'click .universityNotifRoom' : function(e){
      e.preventDefault();
      var target = e.currentTarget;
      var selectedRoomId = target.id;

      var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
      Session.set('roomType', selectedRoomType);
      Session.set('room', selectedRoomId);
      IonModal.open('consultantNotificationsModal');
    },

    'click .ownedStudentsNotifRoom' : function(e){
			e.preventDefault();
			var target = e.currentTarget;
			var selectedRoomId = target.id;

			var studentId = $('#' + selectedRoomId).attr('data-memberId');
      var student = Students.findOne({'userId' : studentId}).student;
      var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
			Session.set('roomType', selectedRoomType);
			Session.set('room', selectedRoomId);
			IonModal.open('consultantNotificationsModal', {studentInfo : student});
		},
  })

  Template.consultantHome.helpers({
    notificationRoomsClass : function(){
        return NotificationRoomsClass.find();
    },

    schoolNotificationRoom : function(){
			return NotificationRoomUniversity.find();
		},

    notificationRoomsConsultant : function(){
      return NotificationRoomsConsultant.find();
    },

    notificationRoomsClassCount : function(){

      return NotificationRoomsClass.find().count();
    },

    notificationRoomsClassNotifCount : function(){
      return ProfessorNotifications.find().count();
    },

    notificationRoomsConsultantCount : function(){
      return NotificationRoomsConsultant.find().count();
    },

    notificationRoomsConsultantNotifCount : function(){
      return ConsultantNotifications.find().count();
    },

    lectureGetted : function(){
      return Session.get('lecturesGetted');
    },

    haveNotificationRoom : function(){
      if((NotificationRoomUniversity.find().count() > 0) || (NotificationRoomsConsultant.find().count() > 0) || (NotificationRoomsClass.find().count() > 0)){
        if(isEqual(Session.get('addType'), "Match") || isEqual(Session.get('deleteType'), "Lecture") || isEqual(Session.get('deleteType'), "Professor") || Session.get('sendLectureNotif') || isEqual(Session.get('deleteType'), "Department") || isEqual(Session.get('deleteType'), "DepartmentHead") || isEqual(Session.get('deleteType'), "Consultant")){
            return false;
        }
        else{
            return true;
        }

			}
			else{
				return false;
			}
		},

    notSendLectureNotif : function(){
      return Session.get('notSendLectureNotif');
    },

    classNotifRoomsGetted : function(){
      return Session.get('classNotifRoomsGetted');
    }
  })

  Template.consultantHome.onCreated(function(){

    var user = Meteor.users.findOne();
    var profile = user.profile;
    var role = profile.role;

    if(Meteor.Device.isDesktop()){

      role.forEach(function(eachRole){
        if(isEqual(eachRole, "Consultant")){

          sendUniversityMessage.on(Meteor.userId(), function(message){
            toastr.warning(message.msg, "University New Message");
          })


        }
      })

    }
    else{

      role.forEach(function(eachRole){
        if(isEqual(eachRole, "Consultant") || isEqual("DepartmentHead") || isEqual("Dean")){
          sendUniversityMessage.on(Meteor.userId(), function(msg){
            scheduleUni(msg);
          })
        }
      })


    }

    // if(NotificationRoomsConsultant.find().count() > 0){
    //   notificationRoomStudent = NotificationRoomsConsultant.find().fetch();
    //
    //   for( i = 0; i < notificationRoomStudent.length; i++){
    //     LocalCollectionForConsultantNotifications.insert({
    //       consNotifs : Meteor.subscribe('StudentConsultantNotification', notificationRoomStudent[i]._id)
    //     })
    //
    //   }
    //
    // }

    this.autorun(function(){

      // if(NotificationRoomsClass.find().count() > 0){
      //   notificationRoomClass = NotificationRoomsClass.find().fetch();
      //
      //   for( i = 0; i < notificationRoomClass.length; i++){
          // LocalCollectionForConsultantProfessorNotifications.insert({
          //   consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id)
          // })
      //   }
      //
      // }
      //
      // if(NotificationRoomsConsultant.find().count() > 0){
      //   notificationRoomStudent = NotificationRoomsConsultant.find().fetch();
      //
      //   for( i = 0; i < notificationRoomStudent.length; i++){
      //     LocalCollectionForConsultantNotifications.insert({
      //       consNotifs : Meteor.subscribe('StudentConsultantNotification', notificationRoomStudent[i]._id)
      //     })
      //
      //   }
      //
      // }

    })


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
			Router.go('/consultant');

	});


}
