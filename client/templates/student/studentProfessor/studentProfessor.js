if(Meteor.isClient || Meteor.isCordova){
  Template.studentProfessor.helpers({
    notificationRoomsClass : function(){
      return NotificationRoomsClass.find();
    },

    notificationRoomClassCount : function(){
      if(NotificationRoomsClass.find().count() > 0){
        return true;
      }
      else{
        return false;
      }
    }
  })

  Template.studentProfessor.events({
    'click .professorNotifs' : function(e){
      e.preventDefault();
      var target = e.currentTarget;
			var selectedRoomId = target.id;

			var selectedLectureId = $('#' + selectedRoomId).attr('data-lecId');
			var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
			var selectedLecture = Lectures.find({'_id' : selectedLectureId}).fetch()[0];
			Session.set('roomType', selectedRoomType);
			Session.set('room', selectedRoomId);
			IonModal.open('studentNotificationsModal', {lectureInfo : selectedLecture});
    }
  })



}
