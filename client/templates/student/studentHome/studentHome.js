if(Meteor.isCordova || Meteor.isClient){

	document.addEventListener('resume', function () {
		setTimeout(function () {

			if(Session.get('profNotifClicked')){

				IonModal.open('studentNotificationsModal', {lectureInfo : Session.get('lectureForModal')});

				Session.set('profNotifClicked', false);
			}

			if(Session.get('consNotifClicked')){

				IonModal.open('studentNotificationsModal', {consultantInfo : Session.get('consultantForModal')});
				Session.set('consNotifClicked', false);
			}

			if(Session.get('uniNotifClicked')){

				IonModal.open('studentNotificationsModal');
				Session.set('uniNotifClicked', false);
			}
		}, 50);
	}, false);


	Template.studentHome.onCreated(function(){
		if(Meteor.Device.isDesktop()){
			document.title = 'Student';
		}

	})

	Template.studentHome.events({
		'click .unreadedProfessorNotifs' : function(e){
			e.preventDefault();
			var target = e.currentTarget;
			var selectedRoomId = target.id;

			var selectedLectureId = $('#' + selectedRoomId).attr('data-lecId');
			var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
			var selectedLecture = Lectures.find({'_id' : selectedLectureId}).fetch()[0];
			Session.set('roomType', selectedRoomType);
			Session.set('room', selectedRoomId);
			IonModal.open('studentNotificationsModal', {lectureInfo : selectedLecture});
		},

		'click .unreadedConsultantNotifs' : function(e){
			e.preventDefault();
			var target = e.currentTarget;
			var selectedRoomId = target.id;

			var consultant = Consultants.findOne();
			var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
			Session.set('roomType', selectedRoomType);
			Session.set('room', selectedRoomId);
			IonModal.open('studentNotificationsModal', {consultantInfo : consultant});
		},

		'click .universityNotifRoom' : function(e){
			e.preventDefault();
			var target = e.currentTarget;
			var selectedRoomId = target.id;


			var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
			Session.set('roomType', selectedRoomType);
			Session.set('room', selectedRoomId);
			IonModal.open('studentNotificationsModal');
		}


	});

	Template.studentHome.helpers({
		random : function(){
			return Random.id();
		},

		time : function(){
			return moment().format();
		},

		lectures : function(){
			return Lectures.find();
		},

		lectureGetted : function(){
			return Session.get('lecturesGetted');
		},

		userId : function(){
			return Meteor.userId();
		},

		schoolNotificationRoom : function(){
			return NotificationRoomUniversity.find();
		},

		haveNotificationRoom : function(){
			if((NotificationRoomUniversity.find().count() > 0) || (NotificationRoomsConsultant.find().count() > 0) || (NotificationRoomsClass.find().count() > 0)){
				return true;
			}
			else{
				return false;
			}
		}
	})


}
