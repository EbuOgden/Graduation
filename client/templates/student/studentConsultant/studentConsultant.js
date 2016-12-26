if(Meteor.isClient || Meteor.isCordova){

  Template.studentConsultant.helpers({
    notificationConsultantRoom : function(){
      return NotificationRoomsConsultant.find();
    }
  })

  Template.studentConsultant.events({
    'click .consultantNotifs' : function(e){
      e.preventDefault();

      var target = e.currentTarget;
			var selectedRoomId = target.id;

      var consultant = Consultants.findOne();
			var selectedRoomType = $('#' + selectedRoomId).attr('data-type');
			Session.set('roomType', selectedRoomType);
			Session.set('room', selectedRoomId);
			IonModal.open('studentNotificationsModal', {consultantInfo : consultant});
    }
  })
}
