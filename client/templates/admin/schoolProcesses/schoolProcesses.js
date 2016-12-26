if(Meteor.isClient || Meteor.isCordova){

  Template.schoolProcesses.onRendered(function(){
    Session.set('addType', "");
    Session.set('deleteType', "");
  })


  Template.schoolProcesses.events({
    'click #addDean' : function(e){

      e.preventDefault();
      LocalCollectionForAdminGetFaculties.insert({
        sub : Meteor.subscribe('facultiesAbsentDean', {
          onReady : function(){

            if(Faculties.find().count() > 0){
              LocalCollectionForAdminGetProfessorsForSelectDean.insert({
                sub : Meteor.subscribe('professorsnotDean', {
                  onReady : function(){
                    if(Professors.find().count() > 0){
                      Session.set('addType', "Dean")
                      IonModal.open('adminAddModal');
                    }
                    else{
                      if(Meteor.Device.isDesktop()){
                        alert("Don't Have Enough Professor");
                      }
                      else{
                        navigator.notification.alert("Don't Have Enough Professor");
                      }
                    }

                  }
                })
              })
            }
            else{
              if(Meteor.Device.isDesktop()){
                alert("All Faculties Have Dean");
              }
              else{
                navigator.notification.alert('All Faculties Have Dean');
              }
            }

          }
        })
      })

    },

    'click #addFaculty' : function(e){
        e.preventDefault();
        Session.set('addType', "Faculty");
        IonModal.open('adminAddModal');
    },

    'click #deleteDean' : function(e){
      e.preventDefault();
    }
  })
}
