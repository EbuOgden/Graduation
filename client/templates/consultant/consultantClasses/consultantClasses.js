if(Meteor.isCordova || Meteor.isClient){

    Template.consultantClasses.onRendered(function(){

      if(LocalCollectionForConsultantStudentLecturesSub.find().count() > 0){
        LocalCollectionForConsultantStudentLecturesSub.find().map(function(eachProfLecture){
          eachProfLecture.studentLectureSub.stop();
        })

        LocalCollectionForConsultantStudentLecturesSub.remove({});

      }

      if(LocalCollectionForConsultantLectureStudentIdsSub.find().count() > 0){
        LocalCollectionForConsultantLectureStudentIdsSub.find().map(function(eachLecture){
          eachLecture.studentIdSub.stop();
        })

        LocalCollectionForConsultantLectureStudentIdsSub.remove({});
      }
    })

    Template.consultantClasses.events({
      'click .profSendNotif' : function(e){
        e.preventDefault();
        var target = e.currentTarget;
        var lectureId = target.id;

        Session.set('lectureIdForModal', lectureId);
        IonModal.open('consultantClassSendNotifModal');
      }
    })

    Template.consultantClasses.helpers({
      profLectures : function(){
        return Lectures.find();
      },

      profLectureControl : function(){
        if(Lectures.find().count() > 0){
          return true;
        }
        else{
          return false;
        }
      }
    })
}
