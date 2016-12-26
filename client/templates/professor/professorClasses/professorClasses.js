if(Meteor.isClient || Meteor.isCordova){

  Template.professorClasses.onRendered(function(){
    
  })

  Template.professorClasses.helpers({
    profLectures : function(){
      return Lectures.find()
    }
  })

  Template.professorClasses.events({
    'click .profSendNotif' : function(e){
      e.preventDefault();
      var target = e.currentTarget;
      selectedLectureId = target.id;

      Session.set('lectureIdForModal', selectedLectureId);
      IonModal.open('professorSendNotificationsModal');


    }
  })
}
