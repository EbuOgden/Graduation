if(Meteor.isClient || Meteor.isCordova){
  var dean;

  Template.consultantFacultyProcesses.onCreated(function(){
    Session.set('deanProcess', false);
    dean = Deans.findOne();

  })

  Template.consultantFacultyProcesses.events({
    'click #addDepartment' : function(e){
      e.preventDefault();
      Session.set('addType', "Department");
      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantAddModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantAddModal');
      }
    },

    'click #addDepartmentHead' : function(e){
      e.preventDefault();
      Session.set('addType', "DepartmentHead");
      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantAddModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantAddModal');
      }
    },

    'click #addConsultant' : function(e){
      e.preventDefault();
      Session.set('addType', "Consultant");
      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantAddModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantAddModal');
      }

    },

    'click #deleteDepartment' : function(e){
      e.preventDefault();

      Session.set('deleteType', "Department");

      if(LocalCollectionForConsultantGetLectures.find().count() > 0){
        LocalCollectionForConsultantGetLectures.find().map(function(eachSub){
          eachSub.lecSub.stop();
        })

        LocalCollectionForConsultantGetLectures.remove({});
      }

      if(LocalCollectionForConsultantLectures.find().count() > 0){
        LocalCollectionForConsultantLectures.find().map(function(eachSub){
          eachSub.profLecSub.stop();
        })

        LocalCollectionForConsultantLectures.remove({});
      }

      if(LocalCollectionForConsultantProfessorNotifications.find().count() > 0){
        LocalCollectionForConsultantProfessorNotifications.find().map(function(eachSub){
          eachSub.consProfNotifs.stop();
        })

        LocalCollectionForConsultantProfessorNotifications.remove({});
      }

      if(LocalCollectionForConsultantProfessorNotificationRooms.find().count() > 0){
        LocalCollectionForConsultantProfessorNotificationRooms.find().map(function(eachSub){
          eachSub.consProfNotRoom.stop();
        })

        LocalCollectionForConsultantProfessorNotificationRooms.remove({});
      }

      if(LocalCollectionForConsultantStudentsIdsSub.find().count() > 0){
        LocalCollectionForConsultantStudentsIdsSub.find().map(function(eachSub){
          eachSub.stuIdSub.stop();
        })

        LocalCollectionForConsultantStudentsIdsSub.remove({});
      }

      if(LocalCollectionForConsultantStudentsSub.find().count() > 0){
        LocalCollectionForConsultantStudentsSub.find().map(function(eachSub){
          eachSub.stuSub.stop();
        })

        LocalCollectionForConsultantStudentsSub.remove({});
      }

      if(LocalCollectionForConsultantNotifications.find().count() > 0){
        LocalCollectionForConsultantNotifications.find().map(function(eachSub){
          eachSub.consNotifs.stop();
        })

        LocalCollectionForConsultantNotifications.remove({});
      }

      if(LocalCollectionForConsultantNotificationRooms.find().count() > 0){
        LocalCollectionForConsultantNotificationRooms.find().map(function(eachSub){
          eachSub.consNotRoom.stop();
        })

        LocalCollectionForConsultantNotificationRooms.remove({});
      }

      LocalCollectionForDeanFacultySub.insert({
        sub : Meteor.subscribe('FacultyDean', dean._id, {
          onReady : function(){

            var facDean = FacultyDeans.findOne();

            LocalCollectionForDeanFacultyIdSub.insert({
              sub : Meteor.subscribe('Faculty', facDean.facultyId, {
                onReady : function(){

                  var faculty = Faculties.findOne();

                  LocalCollectionForDeanFacultyDepartmentsSub.insert({
                    sub : Meteor.subscribe('FacultyDepartmentsById', faculty._id, {
                      onReady : function(){
                        var facDeps = FacultyDepartments.find().fetch();

                        if(facDeps.length > 0){
                          for(i = 0; i < facDeps.length; i++){
                            LocalCollectionForDeanDepartmentsSub.insert({
                              sub : Meteor.subscribe('Departments', facDeps[i].departmentId, {
                                onReady : function(){
                                  Session.set('deanProcess', true);
                                }
                              })
                            })
                          }
                        }

                      }
                    })
                  })
                }
              })
            })
          }
        })
      })

      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantDeleteModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantDeleteModal');
      }

    },

    'click #deleteDepartmentHead' : function(e){
      e.preventDefault();

      Session.set('deleteType', "DepartmentHead");

      /* Stop consultant and prof and other subs for delete department Head documents in db */

      if(LocalCollectionForConsultantSub.find().count() > 0){
        LocalCollectionForConsultantSub.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForConsultantSub.remove({});
      }


      if(LocalCollectionForConsultantProfessor.find().count() > 0){
        LocalCollectionForConsultantProfessor.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForConsultantProfessor.remove({});
      }

      if(LocalCollectionForConsultantGetLectures.find().count() > 0){
        LocalCollectionForConsultantGetLectures.find().map(function(eachSub){
          eachSub.lecSub.stop();
        })

        LocalCollectionForConsultantGetLectures.remove({});
      }

      if(LocalCollectionForConsultantLectures.find().count() > 0){
        LocalCollectionForConsultantLectures.find().map(function(eachSub){
          eachSub.profLecSub.stop();
        })

        LocalCollectionForConsultantLectures.remove({});
      }

      if(LocalCollectionForConsultantProfessorNotifications.find().count() > 0){
        LocalCollectionForConsultantProfessorNotifications.find().map(function(eachSub){
          eachSub.consProfNotifs.stop();
        })

        LocalCollectionForConsultantProfessorNotifications.remove({});
      }

      if(LocalCollectionForConsultantProfessorNotificationRooms.find().count() > 0){
        LocalCollectionForConsultantProfessorNotificationRooms.find().map(function(eachSub){
          eachSub.consProfNotRoom.stop();
        })

        LocalCollectionForConsultantProfessorNotificationRooms.remove({});
      }

      if(LocalCollectionForConsultantStudentsIdsSub.find().count() > 0){
        LocalCollectionForConsultantStudentsIdsSub.find().map(function(eachSub){
          eachSub.stuIdSub.stop();
        })

        LocalCollectionForConsultantStudentsIdsSub.remove({});
      }

      if(LocalCollectionForConsultantStudentsSub.find().count() > 0){
        LocalCollectionForConsultantStudentsSub.find().map(function(eachSub){
          eachSub.stuSub.stop();
        })

        LocalCollectionForConsultantStudentsSub.remove({});
      }

      if(LocalCollectionForConsultantNotifications.find().count() > 0){
        LocalCollectionForConsultantNotifications.find().map(function(eachSub){
          eachSub.consNotifs.stop();
        })

        LocalCollectionForConsultantNotifications.remove({});
      }

      if(LocalCollectionForConsultantNotificationRooms.find().count() > 0){
        LocalCollectionForConsultantNotificationRooms.find().map(function(eachSub){
          eachSub.consNotRoom.stop();
        })

        LocalCollectionForConsultantNotificationRooms.remove({});
      }


      LocalCollectionForDeanFacultySub.insert({
        sub : Meteor.subscribe('FacultyDean', dean._id, {
          onReady : function(){

            var facDean = FacultyDeans.findOne();

            LocalCollectionForDeanFacultyIdSub.insert({
              sub : Meteor.subscribe('Faculty', facDean.facultyId, {
                onReady : function(){

                  var faculty = Faculties.findOne();

                  LocalCollectionForDeanFacultyDepartmentsSub.insert({
                    sub : Meteor.subscribe('FacultyDepartmentsById', faculty._id, {
                      onReady : function(){

                        var facDeps = FacultyDepartments.find().fetch();

                        if(facDeps.length > 0){
                          for(i = 0; i < facDeps.length; i++){
                            LocalCollectionForDeanDepartmentsSub.insert({
                              sub : Meteor.subscribe('Departments', facDeps[i].departmentId, {
                                onReady : function(){

                                  var departments = Departments.find().fetch();

                                  if(departments.length > 0){
                                    for(i = 0; i < departments.length; i++){
                                      LocalCollectionForDeanDeleteDepartmentHeadsSub.insert({
                                        sub : Meteor.subscribe('departmentHeadsForDelete', departments[i]._id, {
                                          onReady : function(){

                                            var departmentHeads = DepartmentHeads.find().fetch();

                                            if(departmentHeads.length > 0){
                                              for(i = 0; i < departmentHeads.length; i++){
                                                LocalCollectionForDeanDeleteProfessor.insert({
                                                  sub : Meteor.subscribe('Professors', departmentHeads[i].headId, {
                                                    onReady : function(){
                                                      Session.set('deanProcess', true);
                                                    }
                                                  })
                                                })


                                              }
                                            }

                                          }
                                        })
                                      })
                                    }

                                  }
                                }
                              })
                            })
                          }
                        }
                      }
                    })
                  })
                }
              })
            })
          }
        })
      })

      if(Meteor.Device.isDesktop()){
        IonModal.open('consultantDeleteModal');
      }
      else{
        StatusBar.hide();
        IonModal.open('consultantDeleteModal');
      }

    }
  })

  Template.consultantFacultyProcesses.helpers({
  })
}
