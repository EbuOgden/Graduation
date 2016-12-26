if(Meteor.isClient || Meteor.isCordova){
  var facId;
  var consultant;

  Template.consultantAddModal.onRendered(function(){
    Session.set('consSelectedLectureId', "");
    Session.set('consSelectedProfId', "");
    Session.set('profAddCons', "");
    Session.set('lectureAndProfGetted', false);

    /* MODAL RENDER OLDUGU ZAMAN




    */


    consultant = Consultants.findOne();

    if(isEqual(Session.get('addType'), "Professor")){

      var departmentHead = DepartmentHeads.findOne();

      LocalCollectionForFacultyId.insert({
        facSub : Meteor.subscribe('facIdFromDep', departmentHead.departmentId, {
          onReady : function(){}
        })
      })
    }

    if(isEqual(Session.get('addType'), "Match")){

      var departmentHead = DepartmentHeads.findOne();

      if(LocalCollectionForConsultantGetLectures.find().count() > 0){
        LocalCollectionForConsultantGetLectures.find().map(function(eachSub){
          eachSub.lecSub.stop();
        })

        LocalCollectionForConsultantGetLectures.remove({});
      }

      if(LocalCollectionForConsultantProfessor.find().count() > 0){
        LocalCollectionForConsultantProfessor.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForConsultantProfessor.remove({});
      }


      var depLecs = DepartmentLectures.find().fetch();

      if(depLecs.length >=1){
        for(let i = 0; i < depLecs.length; i++){
          LocalCollectionForConsultantMatchLectureLectures.insert({
            sub : Meteor.subscribe('NonMatchedLectures', depLecs[i].lectureId)
          })
        }
      }

      /*

      Departman baskaninin departmaninin bagli oldugu fakultenin butun professorlerine subscribe oluyoruz

      */

      LocalCollectionForFacultyId.insert({
        facSub : Meteor.subscribe('facIdFromDep', departmentHead.departmentId, {
          onReady : function(){
              facId = FacultyDepartments.findOne();
              LocalCollectionForFacultyProfessorsId.insert({
                sub : Meteor.subscribe('facultyProfs', facId.facultyId, {
                  onReady : function(){

                    var professors = ProfessorsFaculty.find().fetch();

                    professors.forEach(function(eachProf){
                      LocalCollectionForFacultyProfessors.insert({
                        sub : Meteor.subscribe('forMatchLectureProfs', eachProf.profId, {
                          onReady : function(){
                            Session.set('lectureAndProfGetted', true);
                          }
                        })
                      })
                    })


                  }
                })
              })
            }
        })
      })

    }

    if(isEqual(Session.get('addType'), "Consultant")){

      /* TODO  DEKANA GORE AYARLA! */

      /* Eger dekan yeni consultant eklemek istiyorsa bunu sadece varolan professorlerden yapabilir

      Oncelikle department basinin departmaninin bagli oldugu fakulteye subscribe oluyoruz

      Bu fakultenin id sine bagli olarak bu fakulteye ait professorlere subscribe oluyoruz

      Departman baskaninin departmanina ait consultantlara subscribe oluyoruz

      Karsilastirma yaparak daha onceden danisman olarak secilmis professorleri eliyoruz

      Professorlerin idlerini eledikten sonra Professorlere subscribe olup professors degiskenine bu professorleri atiyoruz

      */

      Session.set('depAddCons', "");

      if(LocalCollectionForConsultantProfessor.find().count() > 0){
        LocalCollectionForConsultantProfessor.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForConsultantProfessor.remove({});
      }

      var dean = Deans.findOne();

      LocalCollectionForDeanDepartmentsSub.insert({
        sub : Meteor.subscribe('FacultyDepartmentsById', dean.facultyId, {
          onReady : function(){
            var facDeps = FacultyDepartments.find().fetch();

            if(facDeps.length >= 1){
              for(i = facDeps.length; i--;){
                LocalCollectionForAddDeanDepartmentHead.insert({
                  sub : Meteor.subscribe('DepartmentsforAddDepHead', facDeps[i].departmentId)
                })
              }

            }
          }
        })
      })

      LocalCollectionForFacultyProfessorsId.insert({
        sub : Meteor.subscribe('facultyProfs', dean.facultyId, {
          onReady : function(){

            var professors = ProfessorsFaculty.find().fetch();

            professors.forEach(function(eachProf){
              LocalCollectionForAddProfessorsToCons.insert({

                sub : Meteor.subscribe('forAddProftoCons', eachProf.profId, {
                  onReady : function(){

                  }
                })
              })

            })

          }
        })
      })


    }

    if(isEqual(Session.get('addType'), "DepartmentHead")){
      if(LocalCollectionForConsultantProfessor.find().count() > 0){
        LocalCollectionForConsultantProfessor.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForConsultantProfessor.remove({});
      }

      var dean = Deans.findOne();

      LocalCollectionForDeanDepartmentsSub.insert({
        sub : Meteor.subscribe('FacultyDeparmentsByIdForAddDepHead', dean.facultyId, {
          onReady : function(){
            var facDeps = FacultyDepartments.find().fetch();

            if(facDeps.length >= 1){
              for(i = facDeps.length; i--;){
                LocalCollectionForAddDeanDepartmentHead.insert({
                  sub : Meteor.subscribe('DepartmentsforAddDepHead', facDeps[i].departmentId)
                })
              }

            }

          }
        })
      })

      LocalCollectionForFacultyProfessorsId.insert({
        sub : Meteor.subscribe('facultyProfs', dean.facultyId, {
          onReady : function(){

            var professors = ProfessorsFaculty.find().fetch();

            professors.forEach(function(eachProf){
              LocalCollectionForFacultyProfessors.insert({
                sub : Meteor.subscribe('forAddDepHeadProfs', eachProf.profId, {
                  onReady : function(){
                  }
                })
              })
            })


          }
        })
      })


    }


  })
  Template.consultantAddModal.events({
    'click #iOSModalClose' : function(e){
      e.preventDefault();

      if(LocalCollectionForConsultantMatchLectureLectures.find().count() > 0){
        LocalCollectionForConsultantMatchLectureLectures.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForConsultantMatchLectureLectures.remove({});
      }

      if(LocalCollectionForFacultyId.find().count() > 0){
        LocalCollectionForFacultyId.find().map(function(eachSub){
          eachSub.facSub.stop();
        })

        LocalCollectionForFacultyId.remove({});
      }

      if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
        LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForFacultyProfessorsId.remove({});
      }

      if(LocalCollectionForFacultyProfessors.find().count() > 0){
        LocalCollectionForFacultyProfessors.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForFacultyProfessors.remove({});
      }

      if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
        LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
          eachSub.depLecs.stop();
        })

        LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
      }

      if(LocalCollectionForAddProfessorsToCons.find().count() > 0){
        LocalCollectionForAddProfessorsToCons.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForAddProfessorsToCons.remove({});
      }

      if(LocalCollectionForAddDeanDepartmentHead.find().count() > 0){
        LocalCollectionForAddDeanDepartmentHead.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForAddDeanDepartmentHead.remove({});
      }

      if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
        LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForDeanDepartmentsSub.remove({});
      }

      LocalCollectionForConsultantProfessor.insert({
        sub : Meteor.subscribe('Professors', Meteor.userId(), {
          onReady : function(){
          }
        })
      })

      professorLectures = ProfessorLectures.find().fetch();

      if(professorLectures.length >= 1){
          for(i = 0; i < professorLectures.length; i++){
            LocalCollectionForConsultantGetLectures.insert({
              lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                onReady : function(){
                  Session.set('addType', "");

                }
              })
            })
          }
      }

      if(Meteor.Device.isDesktop()){
      }
      else{
          StatusBar.show();
      }

      IonModal.close('consultantAddModal');

    },

    'click #addProfButton' : function(e, tmpl){
      e.preventDefault();
      var profUsername = trimInput(tmpl.find('#usernameProf').value);
      var profName = trimInput(tmpl.find('#nameProf').value);
      var passwordProf = tmpl.find('#passwordProf').value;
      var rPasswordProf = tmpl.find('#rPasswordProf').value;

      if((isEmpty(profUsername) || isEmpty(profName) || isEmpty(passwordProf) ) || isEmpty(rPasswordProf)){
        if(Meteor.Device.isDesktop()){
            alert("Please Fill All Boxes!");
        }
        else{
            navigator.notification.alert("Please Fill All Boxes!");
        }

      }
      else{

        if(isValidPassword(passwordProf) && areValidPassword(passwordProf, rPasswordProf)){

          var facId = FacultyDepartments.findOne();

          var user = {
            username : profUsername,
            password : rPasswordProf,
            profile : {
              name : profName,
              role : ['Professor'],
            }
          }
          Meteor.call('addUser', user, function(error, result){
            if(error){
              if(Meteor.Device.isDesktop()){
                  alert("User Does Exist!");

              }
              else{
                  navigator.notification.alert("User Does Exist!");
              }
            }
            else{
              var newProfAccount = result;
              newProf = Professors.insert({
                userId : newProfAccount,
                professorName : profName,
                isConsultant : false,
                isDean : false
              })

              newprofFac = ProfessorsFaculty.insert({
                profId : newProf,
                facultyId : facId.facultyId
              })

              if(newProf && newprofFac){

                if(Meteor.Device.isDesktop()){
                    toastr.success(profName + " is Added", "Success");
                }
                else{
                  window.plugins.toast.showWithOptions({
                      message: profName + " is Added",
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

                if(LocalCollectionForFacultyId.find().count() > 0){
                  LocalCollectionForFacultyId.find().map(function(eachSub){
                    eachSub.facSub.stop();
                  })

                  LocalCollectionForFacultyId.remove({});
                }

                IonModal.close('consultantAddModal');
              }
              else{
                if(Meteor.Device.isDesktop()){
                  alert("Something wents wrong");
                  return;
                }
                else{
                  navigator.notification.alert("Something wents wrong");
                  return;
                }
              }


            }

          })

        }


      }

    },

    'click .profAddConsSelect' : function(e, tmpl){
        /* Secilen professorun id sini aliyoruz */

        $('.profAddConsSelect').find("a").remove();

        e.preventDefault();
        var target = e.currentTarget;
        var professorId = target.id;

        var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
        $('#' + professorId).append(icon);

        Session.set('profAddCons', professorId);

    },

    'click .depAddConsSelect' : function(e){
      $('.depAddConsSelect').find("a").remove();

      e.preventDefault();

      var target = e.currentTarget;
      var departmentId = target.id;

      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + departmentId).append(icon);

      Session.set('depAddCons', departmentId);

      var last = $(".generalView")[0].scrollHeight;

      $(".generalView").animate({
          scrollTop: last
      }, 1000);


    },

    'click #addConsButton' : function(e, tmpl){
      e.preventDefault();

      /* Alinan professor id si ile Var olan professorler icinden danisman olarak atamak istedigimizi secip bilgilerini guncelliyoruz */


      var professor = Professors.findOne({"_id" : Session.get('profAddCons')});
      var department = Departments.findOne({"_id" : Session.get('depAddCons')});

      if((isEmpty(Session.get('profAddCons'))) || (isEmpty(Session.get('depAddCons')))){
        if(Meteor.Device.isDesktop()){
            alert("Please Select Professor and Department!");
            return;
        }
        else{
            navigator.notification.alert("Please Select Professor and Department!");
            return;
        }

      }

      else{

          Meteor.call('updateUser', professor.userId, 'Consultant', function(error, result){
            if(error){

            }
            else{
              var newCons = Consultants.insert({
                userId : professor.userId,
                consultantName : professor.professorName,
                consultantDepartmentId : department._id
              })

              var updateProf = Professors.update({"_id" : Session.get('profAddCons')}, {
                $set : {
                  isConsultant : true
                }
              })


              if(newCons && (updateProf == 1)){

                if(LocalCollectionForAddProfessorsToCons.find().count() > 0){
                  LocalCollectionForAddProfessorsToCons.find().map(function(eachSub){
                    eachSub.sub.stop();
                  })

                  LocalCollectionForAddProfessorsToCons.remove({});
                }

                if(LocalCollectionForAddDeanDepartmentHead.find().count() > 0){
                  LocalCollectionForAddDeanDepartmentHead.find().map(function(eachSub){
                    eachSub.sub.stop();
                  })

                  LocalCollectionForAddDeanDepartmentHead.remove({});
                }

                if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
                  LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
                    eachSub.sub.stop();
                  })

                  LocalCollectionForDeanDepartmentsSub.remove({});
                }

                if(Meteor.Device.isDesktop()){
                    toastr.success(professor.professorName + " is now consultant", "Success");
                }
                else{
                  window.plugins.toast.showWithOptions({
                      message: professor.professorName + " is now consultant",
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

                IonModal.close('consultantAddModal');
              }
              else{
                if(Meteor.Device.isDesktop()){
                  alert("Something wents wrong");
                  return;
                }
                else{
                  navigator.notification.alert("Something wents wrong");
                  return;
                }
              }
            }
          })

    }

    },

    'click #addLecButton' : function(e, tmpl){
      e.preventDefault();
      var lectureName = trimInput(tmpl.find('#lectureName').value);
      var lectureCode = trimInput(tmpl.find('#lectureCode').value);
      var lectureCredit = tmpl.find('#lectureCredit').value;

      if((isEmpty(lectureName) || isEmpty(lectureCode) || isEmpty(lectureCredit))){
        if(Meteor.Device.isDesktop()){
            alert("Please Fill All Boxes!");
            return;
        }
        else{
            navigator.notification.alert("Please Fill All Boxes!");
            return;
        }

      }
      else if(!($.isNumeric(lectureCredit))){
        if(Meteor.Device.isDesktop()){
            alert("Lecture Credit Must Be Number");
            return;
        }
        else{
            navigator.notification.alert("Lecture Credit Must Be Number");
            return;
        }

      }
      else{
        newLectureId = Lectures.insert({
            'lectureName' : lectureName,
            'lectureCode' : lectureCode,
            'lectureCredit' : lectureCredit,
            'profName' : " "
        })

        newdepLec = DepartmentLectures.insert({
          departmentId : consultant.consultantDepartmentId,
          lectureId : newLectureId
        })

        if(newLectureId && newdepLec){

          if(Meteor.Device.isDesktop()){
            toastr.success(lectureName + " is Added", "Success");
          }
          else{
              window.plugins.toast.showWithOptions({
                  message: lectureName + " is Added",
                  duration: "short", // 2000 ms
                  position: "bottom",
                  styling: {
                    opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                    backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                    textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                    //cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                    //horizontalPadding: 20, // iOS default 16, Android default 50
                    //verticalPadding: 16 // iOS default 12, Android default 30
                  }
                });
              StatusBar.show();
          }

          IonModal.close('consultantAddModal');

        }
        else{
          if(Meteor.Device.isDesktop()){
            alert("Something wents wrong");
            return;
          }
          else{
            navigator.notification.alert("Something wents wrong");
            return;
          }
        }
      }

    },

    'click .lectureSelect' : function(e){
      $('.lectureSelect').find("a").remove();
      e.preventDefault();

      var target = e.currentTarget;
      var selectedLectureId = target.id;

      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + selectedLectureId).append(icon);

      Session.set('consSelectedLectureId', selectedLectureId);
    },

    'click .profSelect' : function(e){
      $('.profSelect').find("a").remove();
      e.preventDefault();


      var target = e.currentTarget;
      var selectedProfId = target.id;

      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + selectedProfId).append(icon);

      Session.set('consSelectedProfId', selectedProfId);

      if(isEmpty(Session.get('consSelectedLectureId'))){

      }
      else{
        var last = $(".generalView")[0].scrollHeight

        $(".generalView").animate({
            scrollTop: last
        }, 1000);
      }


    },

    'click #matchLecButton' : function(e){
      e.preventDefault();


      if((isEmpty(Session.get('consSelectedLectureId')) || isEmpty(Session.get('consSelectedProfId')))){
        if(Meteor.Device.isDesktop()){
            alert("Please Select Lecture And Professor");
        }
        else{
            navigator.notification.alert("Please Select Lecture And Professor");
        }

      }
      else{
        var professor = Professors.findOne(Session.get('consSelectedProfId'));
        var lecture = Lectures.findOne(Session.get('consSelectedLectureId'));

        var profLectureInsert = ProfessorLectures.insert({
          professorId : Session.get('consSelectedProfId'),
          Lecture : Session.get('consSelectedLectureId')
        })

        var lectureUpdate = Lectures.update({'_id' : Session.get('consSelectedLectureId')}, {
          $set : {
            'profName' : professor.professorName
          }
        })

        if(profLectureInsert && (lectureUpdate == 1)){

          if(LocalCollectionForConsultantLectures.find().count() > 0){
            LocalCollectionForConsultantLectures.find().map(function(eachSub){
              eachSub.profLecSub.stop();
            })

            LocalCollectionForConsultantLectures.remove({});
          }

          if(LocalCollectionForConsultantGetLectures.find().count() > 0){
            LocalCollectionForConsultantGetLectures.find().map(function(eachSub){
              eachSub.lecSub.stop();
            })

            LocalCollectionForConsultantGetLectures.remove({});
          }

          if(LocalCollectionForConsultantMatchLectureLectures.find().count() > 0){
            LocalCollectionForConsultantMatchLectureLectures.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForConsultantMatchLectureLectures.remove({});
          }

          if(LocalCollectionForFacultyId.find().count() > 0){
            LocalCollectionForFacultyId.find().map(function(eachSub){
              eachSub.facSub.stop();
            })

            LocalCollectionForFacultyId.remove({});
          }

          if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
            LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForFacultyProfessorsId.remove({});
          }

          if(LocalCollectionForFacultyProfessors.find().count() > 0){
            LocalCollectionForFacultyProfessors.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForFacultyProfessors.remove({});
          }

          if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
            LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
              eachSub.depLecs.stop();
            })

            LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
          }

          LocalCollectionForConsultantProfessor.insert({
            sub : Meteor.subscribe('Professors', Meteor.userId(), {
              onReady : function(){
                var professor = Professors.findOne();

                LocalCollectionForConsultantLectures.insert({
                  profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                    onReady : function(){
                      var professorLectures = ProfessorLectures.find().fetch();

                      if(professorLectures.length >= 1){
                          for(i = 0; i < professorLectures.length; i++){
                            LocalCollectionForConsultantGetLectures.insert({
                              lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                onReady : function(){
                                    Session.set('addType', "");
                                }
                              })
                            })
                          }
                      }
                      else{
                        console.log("No Lecture");
                        Session.set('addType', "");
                      }

                    }
                  })
              })
            }
          })
        })

          if(Meteor.Device.isDesktop()){
            toastr.success(lecture.lectureName + " is now giving by " + professor.professorName, "Success");
          }
          else{

            window.plugins.toast.showWithOptions({
                message: lecture.lectureName + " is now giving by " + professor.professorName,
                duration: "short", // 2000 ms
                position: "bottom",
                styling: {
                  opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                  backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                  textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                  //cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                  //horizontalPadding: 20, // iOS default 16, Android default 50
                  //verticalPadding: 16 // iOS default 12, Android default 30
                }
              });
              StatusBar.show();
          }


          console.log(Meteor.default_connection._subscriptions);

          IonModal.close('consultantAddModal');

        }
        else{
          if(Meteor.Device.isDesktop()){
            alert("Something wents wrong");
            return;
          }
          else{
            navigator.notification.alert("Something wents wrong");
            return;
          }
        }

      }


    },

    'click #addDepartmentButton' : function(e, tmpl){
      e.preventDefault();
      var newDepartmentName = trimInput(tmpl.find('#departmentName').value);
      var newDepartmentDescription = tmpl.find('#departmentDescription').value;

      if(isEqual(newDepartmentName, "") || isEqual(newDepartmentDescription, "")){
        if(Meteor.Device.isDesktop()){
          alert("Please fill all boxes!");
          return;
        }
        else{
          navigator.notification.alert("Please fill all boxes!");
          return;
        }
      }
      else{
        var dean = Deans.findOne();

        var facId = dean.facultyId;

        newDep = Departments.insert({
          departmentName : newDepartmentName,
          departmentDescription : newDepartmentDescription
        })

        facDep = FacultyDepartments.insert({
          facultyId : facId,
          departmentId : newDep,
          haveHead : false
        })

        if(newDep && facDep){
          if(Meteor.Device.isDesktop()){
            toastr.success(newDepartmentName + ' is added', "Success");
          }
          else{

            window.plugins.toast.showWithOptions({
                message: newDepartmentName + ' is added',
                duration: "short", // 2000 ms
                position: "bottom",
                styling: {
                  opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                  backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                  textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                  //cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                  //horizontalPadding: 20, // iOS default 16, Android default 50
                  //verticalPadding: 16 // iOS default 12, Android default 30
                }
              });
              StatusBar.show();
          }
          IonModal.close('consultantAddModal');
        }

        else{
          if(Meteor.Device.isDesktop()){
            alert("Something went wrong");
            return;
          }
          else{
            navigator.notification.alert("Something went wrong");
            return;
          }
        }

      }

      Session.set('addType', "");

    },

    'click .departmentSelect' : function(e){
      e.preventDefault();

      $('.departmentSelect').find("a").remove();

      var target = e.currentTarget;
      var selectedDepartmentId = target.id;

      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + selectedDepartmentId).append(icon);

      Session.set('deanSelectedDepartmentId', selectedDepartmentId);

    },

    'click .depHeadSelect' : function(e){
      e.preventDefault();

      $('.depHeadSelect').find("a").remove();

      var target = e.currentTarget;
      var selectedProfessortId = target.id;

      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + selectedProfessortId).append(icon);

      Session.set('deanSelectedProfessorId', selectedProfessortId);

      var last = $(".generalView")[0].scrollHeight

      $(".generalView").animate({
          scrollTop: last
      }, 1000);
    },

    'click #addDepartmentHeadButton' : function(e){
      e.preventDefault();

      if((isEmpty(Session.get('deanSelectedDepartmentId')) || isEmpty(Session.get('deanSelectedProfessorId')))){
        if(Meteor.Device.isDesktop()){
            alert("Please Select Department And Professor");
        }
        else{
            navigator.notification.alert("Please Select Department And Professor");
        }

      }
      else{
        var facDepartment = FacultyDepartments.findOne({"departmentId" : Session.get('deanSelectedDepartmentId')});
        var department = Departments.findOne(Session.get('deanSelectedDepartmentId'));
        var professor = Professors.findOne(Session.get('deanSelectedProfessorId'));


        Meteor.call('updateUser', professor.userId, 'DepartmentHead', function(error, result){
          if(error){
            if(Meteor.Device.isDesktop()){
                alert("Something went wrong");
                return;
            }
            else{
                navigator.notification.alert("Something went wrong");
                return;
            }
          }
          else{
            newDeapHead = DepartmentHeads.insert({
              departmentId : Session.get('deanSelectedDepartmentId'),
              headId : professor.userId

            })

            facDepartmentUpdate = FacultyDepartments.update({"_id" : facDepartment._id}, {
                $set : {
                  haveHead : true
                }
            })

            if(newDeapHead && facDepartmentUpdate){
              if(LocalCollectionForAddDeanDepartmentHead.find().count() > 0){
                LocalCollectionForAddDeanDepartmentHead.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForAddDeanDepartmentHead.remove({});
              }

              if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
                LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanDepartmentsSub.remove({});
              }

              if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
                LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForFacultyProfessorsId.remove({});
              }

              if(LocalCollectionForFacultyProfessors.find().count() > 0){
                LocalCollectionForFacultyProfessors.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForFacultyProfessors.remove({});
              }

              if(Meteor.Device.isDesktop()){
                toastr.success(professor.professorName + ' is now department head of ' + department.departmentName , "Success");
              }
              else{

                window.plugins.toast.showWithOptions({
                    message: professor.professorName + ' is now department head of ' + department.departmentName,
                    duration: "short", // 2000 ms
                    position: "bottom",
                    styling: {
                      opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                      backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                      textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                      //cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                      //horizontalPadding: 20, // iOS default 16, Android default 50
                      //verticalPadding: 16 // iOS default 12, Android default 30
                    }
                  });
                  StatusBar.show();
              }
              IonModal.close('consultantAddModal');

            }

          }
        })

      }
    }


  })

  Template.consultantAddModal.helpers({
    modalType : function(){
      return Session.get('addType');
    },

    lectures : function(){
      return Lectures.find();
    },

    lectureCount : function(){
      return Lectures.find().count();
    },

    professor : function(){
      return Professors.find();
    },

    professorCount : function(){
      return Professors.find().count();
    },

    lectureAndProfGetted : function(){
      return Session.get('lectureAndProfGetted');
    },

    department : function(){
      return Departments.find();
    },

    departmentCount : function(){
      return Departments.find().count();
    }


  })

}
