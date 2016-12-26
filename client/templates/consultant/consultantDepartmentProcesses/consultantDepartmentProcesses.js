if(Meteor.isCordova || Meteor.isClient){
  var consultant;
  var lectureIds = [];


  Template.consultantDepartmentProcesses.onRendered(function(){
    Session.set('addType', "empty");
    Session.set('deleteType', "empty");
    consultant = Consultants.findOne();

    /* TEMPLATE RENDER OLDUGU ZAMAN

      Daha onceden subscribe oldugumuz departmana ait derslerin subscribelarini bitiriyoruz
    */

    if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
      LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
        eachSub.depLecs.stop();
      })

      LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
    }
  })

  Template.consultantDepartmentProcesses.events({
    'click #addProfessor' : function(e){
      e.preventDefault();
      Session.set('addType', "Professor");
      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantAddModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantAddModal');
      }

    },

    'click #addLecture' : function(e){
      e.preventDefault();
      Session.set('addType', "Lecture");
      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantAddModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantAddModal');
      }

    },

    'click #matchLectureProf' : function(e){
      e.preventDefault();

      /* MODAL ACILMADAN ONCE

      Departmana ait derslere subscribe oluyoruz
      */

      LocalCollectionForConsultantMatchLectureDepartmentLectures.insert({
        depLecs : Meteor.subscribe('OwnedDepartmentLecs', consultant.consultantDepartmentId, {
          onReady : function(){
            Session.set('addType', "Match");

            if(Meteor.Device.isDesktop()){
              IonModal.open('consultantAddModal');
            }
            else{
              StatusBar.hide();
              IonModal.open('consultantAddModal');
            }
          }
        })
      })


    },

    'click #deleteProfessor' : function(e){
      e.preventDefault();

      if(LocalCollectionForConsultantLectures.find().count() > 0){
        LocalCollectionForConsultantLectures.find().map(function(eachSub){
          eachSub.profLecSub.stop();
        })

        LocalCollectionForConsultantLectures.remove({});
      }

      if(LocalCollectionForConsultantGetLectures.find().count() > 0){
        LocalCollectionForConsultantGetLectures.find().map(function(eachConsultantGetLecture){
          eachConsultantGetLecture.lecSub.stop();
        })

        LocalCollectionForConsultantGetLectures.remove({});
      }

      if(LocalCollectionForConsultantProfessor.find().count() > 0){
        LocalCollectionForConsultantProfessor.find().map(function(eachConsultantGetLecture){
          eachConsultantGetLecture.sub.stop();
        })

        LocalCollectionForConsultantProfessor.remove({});
      }


      Session.set('deleteType', "Professor");
      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantDeleteModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantDeleteModal');
      }

    },

    'click #deleteLecture' : function(e){
      e.preventDefault();

      LocalCollectionForConsultantMatchLectureDepartmentLectures.insert({
        depLecs : Meteor.subscribe('OwnedDepartmentLecs', consultant.consultantDepartmentId, {
          onReady : function(){
            Session.set('deleteType', "Lecture")
            if(Meteor.Device.isDesktop()){
              IonModal.open('consultantDeleteModal');
            }
            else{
              StatusBar.hide();
              IonModal.open('consultantDeleteModal');
            }
          }
        })
      })


    },

    'click #deleteLectureProf' : function(e){
      e.preventDefault();
      Session.set('deleteType', "LectureProf")
      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantDeleteModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantDeleteModal');
      }
    },

    'click #allDelete' : function(e){
      e.preventDefault();
    }
  })

  Template.consultantDepartmentProcesses.helpers({

  })
}
