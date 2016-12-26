if(Meteor.isClient || Meteor.isCordova){

  Template.adminAddModal.onRendered(function(){
    Session.set('facultyIdForAddDean', "");
    Session.set('profIdForAddDean', "");

    if(Meteor.Device.isDesktop()){

    }
    else{
      StatusBar.hide();
    }
  })

  Template.adminAddModal.helpers({
    modalType : function(){
      return Session.get('addType');
    },

    professor : function(){
      return Professors.find();
    },

    faculty : function(){
      return Faculties.find();
    }
  })

  Template.adminAddModal.events({
    'click #iOSModalClose' : function(e){
      e.preventDefault();
      if(LocalCollectionForAdminGetProfessorsForSelectDean.find().count() > 0){
        LocalCollectionForAdminGetProfessorsForSelectDean.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForAdminGetProfessorsForSelectDean.remove({});
      }

      if(LocalCollectionForAdminGetFaculties.find().count() > 0){
        LocalCollectionForAdminGetFaculties.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForAdminGetFaculties.remove({});
      }
      Session.set('addType', "");

      IonModal.close('adminAddModal');
    },

    'click .facultyAddDean' : function(e){
        e.preventDefault();
        $('.facultyAddDean').find("a").remove();

        var target = e.currentTarget;
        var facultyId = target.id;

        var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
        $('#' + facultyId).append(icon);

        Session.set('facultyIdForAddDean', facultyId);
    },

    'click .profAddDean' : function(e){
        e.preventDefault();
        $('.profAddDean').find("a").remove();

        var target = e.currentTarget;
        var professorId = target.id;

        var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
        $('#' + professorId).append(icon);

        Session.set('profIdForAddDean', professorId);

        if(isEqual(Session.get('facultyIdForAddDean'), "")){

        }
        else{
          var last = $(".generalView")[0].scrollHeight;

          $(".generalView").animate({
              scrollTop: last
          }, 1000);
        }


    },

    'click #addDeanButton' : function(e){
      e.preventDefault();

      if((isEmpty(Session.get('facultyIdForAddDean'))) || (isEmpty(Session.get('profIdForAddDean')))){
        if(Meteor.Device.isDesktop()){
            alert("Please Select Faculty and Professor!");
            return;
        }
        else{
            navigator.notification.alert("Please Select Faculty and Professor!");
            return;
        }

      }
      else{

        var professor = Professors.findOne(Session.get('profIdForAddDean'));
        var faculty = Faculties.findOne(Session.get('facultyIdForAddDean'));

        Meteor.call('updateUser', professor.userId, "Dean", function(error, result){
          if(error){
            if(Meteor.Device.isDesktop()){
              toastr.error("Something went wrong!", "Warning");
              return;
            }
            else{
              navigator.notification.alert("Something went wrong!");
              return;
            }
          }
          else{

            deanInsert = Deans.insert({
              userId : professor.userId,
              deanName : professor.professorName,
              facultyId : Session.get('facultyIdForAddDean')
            })

            facultyDeanInsert = FacultyDeans.insert({
              facultyId : Session.get('facultyIdForAddDean'),
              deanId : deanInsert
            })

            professorUpdate = Professors.update({"_id" : professor._id}, {
              $set : {
                isDean : true
              }
            })

            facultyUpdate = Faculties.update({"_id" : faculty._id}, {
              $set : {
                haveDean : true
              }
            })

            if(deanInsert && facultyDeanInsert && professorUpdate && facultyUpdate){
              if(LocalCollectionForAdminGetProfessorsForSelectDean.find().count() > 0){
                LocalCollectionForAdminGetProfessorsForSelectDean.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForAdminGetProfessorsForSelectDean.remove({});
              }

              if(LocalCollectionForAdminGetFaculties.find().count() > 0){
                LocalCollectionForAdminGetFaculties.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForAdminGetFaculties.remove({});
              }

              if(Meteor.Device.isDesktop()){
                toastr.success(professor.professorName + " is now Dean of : " + faculty.facultyName, "Success");
              }
              else{
                window.plugins.toast.showWithOptions({
                    message: professor.professorName + " is now Dean of : " + faculty.facultyName,
                    duration: "short", // 2000 ms
                    position: "bottom",
                    styling: {
                      opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                      backgroundColor: '#30ba8f', // make sure you use #RRGGBB. Default #333333
                      textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                      //cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                      //horizontalPadding: 20, // iOS default 16, Android default 50
                      //verticalPadding: 16 // iOS default 12, Android default 30
                    }
                  });
                  StatusBar.show();
              }

              IonModal.close('adminAddModal');

            }
            else{
              if(Meteor.Device.isDesktop()){
                alert("Something went wrong!");
                return;
              }
              else{
                navigator.notification.alert("Something went wrong!");
                return;
              }
            }

          }
        })

      }
    },

    'click #addFacultyButton' : function(e, tmpl){
      e.preventDefault();
      var newFacultyName = trimInput(tmpl.find('#facultyName').value);

      if(isEmpty(newFacultyName)){
        if(Meteor.Device.isDesktop()){
          alert("Please Enter a Faculty Name!");
          return;
        }
        else{
          navigator.notification.alert("Please Enter a Faculty Name!");
          return;
        }
      }
      else{
        facultyInsert = Faculties.insert({
          facultyName : newFacultyName,
          haveDean : false
        })

        if(facultyInsert){
          if(Meteor.Device.isDesktop()){
            toastr.success(newFacultyName + " is Added", "Success");
          }
          else{
            window.plugins.toast.showWithOptions({
                message: newFacultyName + " is Added",
                duration: "short", // 2000 ms
                position: "bottom",
                styling: {
                  opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                  backgroundColor: '#30ba8f', // make sure you use #RRGGBB. Default #333333
                  textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                  cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                  horizontalPadding: 20, // iOS default 16, Android default 50
                  verticalPadding: 16 // iOS default 12, Android default 30
                }
              });
              StatusBar.show();
          }

          IonModal.close('adminAddModal');

        }
      }

    }
  })
}
