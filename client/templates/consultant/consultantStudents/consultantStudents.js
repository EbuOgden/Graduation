if(Meteor.isCordova || Meteor.isClient){

    Template.consultantStudents.events({
        'click .consultantStudentNotif' : function(e) {
          e.preventDefault();
          var target = e.currentTarget;
          var studentId = target.id;

          Session.set('studentIdForModal', studentId);
          IonModal.open('consultantStudentSendNotifModal')
        }
    })

    Template.consultantStudents.helpers({
        constStudents : function(){
            return Students.find();
        },

        constStudentStatus : function(){
          if(ConsultantStudents.find().count() > 0){
            return true;
          }
          else{
            return false;
          }
        }
    })
}
