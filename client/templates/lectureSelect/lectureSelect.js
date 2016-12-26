if(Meteor.isCordova || Meteor.isClient){

  var lectureIdArray = [];
  Template.lectureSelect.onRendered(function(){

    document.title = 'Lecture Select';

    if(LocalCollectionForDepartments.find().count() > 0){
        LocalCollectionForDepartments.find().map(function(eachDepartmentSub){
          eachDepartmentSub.sub.stop();
    })

        LocalCollectionForDepartments.remove({});
    }

    if(LocalCollectionForLectureSelects.find().count() > 0){
      LocalCollectionForLectureSelects.find().map(function(eachLectureSub){
        eachLectureSub.sub.stop();
      })

      LocalCollectionForLectureSelects.remove({});
    }

    if(LocalCollectionForConsultants.find().count() > 0){
      LocalCollectionForConsultants.find().map(function(eachConst){
        eachConst.sub.stop();
      })

      LocalCollectionForConsultants.remove({});
    }

    Session.set('facultyId', "");
    Session.set('departmentId', "");
    Session.set('consultantId', "");
    Session.set('facultySelected', false);
    Session.set('departmentSelected', false);
    Session.set('lectureFinish', false);
    Session.set('consultantSelect', false);
    Session.set('consultantFinish', false);


  })

  Template.lectureSelect.helpers({
      faculty : function(){
        return Faculties.find();
      },

      department : function(){
        return Departments.find();

      },

      lectures : function(){
        return Lectures.find()
      },

      departmentSelect : function(){
        return Session.get('departmentSelected');
      },

      facultySelect : function(){
        return Session.get('facultySelected');
      },

      lectureFinish : function(){
        return Session.get('lectureFinish');
      },

      consultants : function(){
        return Consultants.find();
      },

      consultantSelect : function(){
        return Session.get('consultantSelect');
      },

      consultantFinish : function(){
        return Session.get('consultantFinish');
      }


  });

  Template.lectureSelect.events({
    'click .facultyId' : function(e){
      e.preventDefault();

      var subs = Meteor.default_connection._subscriptions; /* active subscriptions until this time  */

      var last = $(".generalView")[0].scrollHeight
      //console.log(last);
      $(".generalView").animate({
          scrollTop: last
      }, 1000);

      /* faculty clicked faculty id tick icon display none  */
      $('.facultyId').find("a").remove();

      /*selected faculty id */
      var target = e.currentTarget;
      selectedFaculty = target.id;
      Session.set('facultyId', selectedFaculty);

      /*          */

      /* for iOS add Android */

      /*  adding tick icon */
      var icon = '<a class="item-icon-right"><i class="icon ion-arrow-left-a lectureSelectTick"></i></a>'
      $('#' + selectedFaculty).append(icon);

      /*          */

      /* selectedFaculty Department Ids */
      departmentId = getDepartmentIdByFacId(selectedFaculty);

      /*          */

      /* department subscription objects control and if have subscription
      stop it for reactive department listing and remove all object from local collection*/
      if(LocalCollectionForDepartments.find().count() > 0){
          LocalCollectionForDepartments.find().map(function(eachDepartmentSub){
            eachDepartmentSub.sub.stop();
      })

          LocalCollectionForDepartments.remove({});
      }

      if(LocalCollectionForLectureSelects.find().count() > 0){
        LocalCollectionForLectureSelects.find().map(function(eachLectureSub){
          eachLectureSub.sub.stop();
        })

        LocalCollectionForLectureSelects.remove({});
      }

      if(LocalCollectionForConsultants.find().count() > 0){
        LocalCollectionForConsultants.find().map(function(eachConsSub){
          eachConsSub.sub.stop();
        })

        LocalCollectionForConsultants.remove({});
      }

      lectureIdArray.length = 0;

      Session.set('facultySelected', true);
      Session.set('departmentSelected', false);
      Session.set('lectureFinish', false);
      /*          */

      /* departmentId reactive control for subscribe datas */
      Tracker.autorun(function(){

        departmentId.forEach(function(depId){
          LocalCollectionForDepartments.insert({
            sub : Meteor.subscribe('Departments', depId)
          })
        })

      })

      /*          */

      /* if dont have department */
      if(departmentId.length == 0){
        console.log("no department");
      }

      /*          */

    },

    'click .departmentId' : function(e){
      e.preventDefault();
      $('.departmentId').find("a").remove();
      $('.lectureId').find("a").remove();

      var last = $(".generalView")[0].scrollHeight
      //console.log(last);
      $(".generalView").animate({
          scrollTop: last
      }, 2500);

      var target = e.currentTarget;
      departmentIdForStudent = target.id;

      if(LocalCollectionForConsultants.find().count() > 0){
        var sub = LocalCollectionForConsultants.find().map(function(subItem){
          subItem.sub.stop();
        });

        LocalCollectionForConsultants.remove({});
      }

      lectureIdArray.length = 0;

      Session.set('departmentId', departmentIdForStudent);

      var icon = '<a class="item-icon-right"><i class="icon ion-arrow-left-a lectureSelectTick"></i></a>'
      $('#' + departmentIdForStudent).append(icon);

      departmentId = getDepartmentIdByFacId(Session.get('facultyId'));

      lectureId = getLectureIdsFromDepartmentId(departmentId);

      Tracker.autorun(function(){
        lectureId.forEach(function(lecId){
          //var prof = ProfessorLectures.find({Lecture : lecId});

          LocalCollectionForLectureSelects.insert({
            sub : Meteor.subscribe('Lectures', lecId)
          })
        })

        Session.set('departmentSelected', true);
        Session.set('consultantSelect', false);
        Session.set('consultantFinish', false);
        Session.set('lectureFinish', false);

      })

    },

    'click .lectureId' : function(e){
      e.preventDefault();
      var target = e.currentTarget;
      lectureIdForStudent = target.id;

      if($('#' + lectureIdForStudent).find("a").length == 0){
        lectureIdArray.push(lectureIdForStudent);
        var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
        $('#' + lectureIdForStudent).find('#profName').before(icon);
      }
      else{
        var indexId = lectureIdArray.indexOf(lectureIdForStudent);
        lectureIdArray.splice(indexId, 1);
        $('#' + lectureIdForStudent).find("a").remove();

      }

      Tracker.autorun(function(){
        if(lectureIdArray.length == 0){
          Session.set('lectureFinish', false);
          Session.set('consultantFinish', false);
        }
        else{
          Session.set('lectureFinish', true);
        }

        if(Session.get('lectureFinish')){
          Session.set('consultantSelect', true);
        }
        else{
          Session.set('consultantSelect', false);
        }
      })


    },

    'click #lectureFinish' : function(e){
      e.preventDefault();

      Session.set('lectureFinish', true);

      LocalCollectionForConsultants.insert({
        sub : Meteor.subscribe('ConsultantsLectureSelect', Session.get('departmentId'))
      })

      var last = $(".generalView")[0].scrollHeight
      //console.log(last);
      $(".generalView").animate({
          scrollTop: last
      }, 1000);
    },

    'click .consultantId' : function(e){
      e.preventDefault();
      $('.consultantId').find("a").remove();
      var target = e.currentTarget;
      selectedConsultantId = target.id;

      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + selectedConsultantId).append(icon);

      Session.set('consultantId', selectedConsultantId);

      Session.set('consultantFinish', true);

      var last = $(".generalView")[0].scrollHeight
      //console.log(last);
      $(".generalView").animate({
          scrollTop: last
      }, 1000);

    },

    'click #finish' : function(e){
      e.preventDefault();

      var user = Meteor.users.findOne();
      newStudentId = Students.insert({
        userId : Meteor.userId(),
        student : {
          facultyId : Session.get('facultyId'),
          departmentId : Session.get('departmentId'),
          name : user.profile.name
        }
      })

      lectureIdArray.forEach(function(lectureId){
        StudentLectures.insert({
          studentId : newStudentId,
          lecturesId : lectureId
        })
      })

      ConsultantStudents.insert({
        'consultantId' : Session.get('consultantId'),
        'studentId' : newStudentId
      })

      if(LocalCollectionForDepartments.find().count() > 0){
          LocalCollectionForDepartments.find().map(function(eachDepartmentSub){
            eachDepartmentSub.sub.stop();
      })

          LocalCollectionForDepartments.remove({});
      }

      if(LocalCollectionForLectureSelects.find().count() > 0){
        LocalCollectionForLectureSelects.find().map(function(eachLectureSub){
          eachLectureSub.sub.stop();
        })

        LocalCollectionForLectureSelects.remove({});
      }

      if(LocalCollectionForConsultants.find().count() > 0){
        LocalCollectionForConsultants.find().map(function(eachConst){
          eachConst.sub.stop();
        })

        LocalCollectionForConsultants.remove({});
      }

      Session.set('lectureFinish', false);

      if(Meteor.Device.isDesktop()){
        toastr.success("Completed Lecture Select", "SUCCESS");
        Router.go('/student');
      }
      else{
        window.plugins.toast.showWithOptions({
            message: "Completed Lecture Select",
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
      }

    }

  });


}
