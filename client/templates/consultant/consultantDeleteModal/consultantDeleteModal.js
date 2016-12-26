
if(Meteor.isCordova || Meteor.isClient){
  var departmentHead;
  var depLecs;

  Template.consultantDeleteModal.onRendered(function(){

    Session.set('lecturesForDelete', false);

    /*
    Modal render oldugu zaman

    IHTIYACIMIZ OLMADIGI ICIN : Departmanin Fakultesini cekebilmek icin kullandigimiz subscribei bitiriyoruz

    GEREKTIGI ZAMAN KULLANABILMEK ICIN : Daha onceden subscribe oldugumuz fakultenin professorlerini ve bu professorlerin idlerinin subscriblerini bitiriyoruz

    Daha onceden subscribe olunan lecturelarin hepsini ve bununla birlikte Sadece giren kisinin derslerini gostermemek icin daha onceden subscribe oldugu kendi derslerinin subscriblerini durduruyoruz
    */

    if(isEqual(Session.get('deleteType'), "Professor")){
      console.log("PROFESSOR DELETE!");
      departmentHead = DepartmentHeads.findOne();
      Session.set('profIdForDelete', "");

      /*

      Eger professor silinecek ise departman baskaninin departmanina ait fakultenin butun hocalarina subscribe oluyoruz

      */

      LocalCollectionForFacultyId.insert({
        facSub : Meteor.subscribe('facIdFromDep', departmentHead.departmentId, {
          onReady : function(){
              facId = FacultyDepartments.findOne();
              LocalCollectionForFacultyProfessorsId.insert({
                sub : Meteor.subscribe('facultyProfs', facId.facultyId, {
                  onReady : function(){

                    var professors = ProfessorsFaculty.find().fetch();

                    if(professors.length >= 1){
                      for(let i = 0; i < professors.length; i++){
                        LocalCollectionForFacultyProfessors.insert({
                          sub : Meteor.subscribe('forDeleteLectureProfs', professors[i].profId, {
                            onReady : function(){

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

    if(isEqual(Session.get('deleteType'), "Lecture")){
      console.log("LECTURE DELETE!");
      departmentHead = DepartmentHeads.findOne();

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

      depLecs = DepartmentLectures.find().fetch();
      Session.set('lectureIdForDelete', "");

      /*

      Eger ders silinecek ise departmana ait butun derslere subscribe oluyoruz */

      depLecs.forEach(function(eachLec){
        LocalCollectionForConsultantDeleteLectures.insert({
          profLecSub : Meteor.subscribe('Lectures', eachLec.lectureId, {
            onReady : function(){
              Session.set('lecturesForDelete', true);
            }
          })
        })
      })

    }

    /* Session Type Professor */


    /*




    */

    if(isEqual(Session.get('deleteType'), "Department")){
      $('#dataGet').addClass('toHide');
      Session.set('departmentIdForDelete', " ");
    }

    if(isEqual(Session.get('deleteType'), "DepartmentHead")){
      $('#dataGet').addClass('toHide');
      Session.set('departmentHeadIdForDelete', " ");
    }
  })

  Template.consultantDeleteModal.helpers({
    modalType : function(){
      return Session.get('deleteType');
    },

    professor : function(){
      return Professors.find();
    },

    professorCount : function(){
      return Professors.find().count();
    },

    lecture : function(){
      return Lectures.find();
    },

    lectureCount : function(){
      return Lectures.find().count();
    },

    lectureForDelete : function(){
      return Session.get('lecturesForDelete');
    },

    departmentCountControl : function(){
      if(Departments.find().count() > 0){
        return true;
      }
      else{
        false;
      }
    },

    department : function(){
      return Departments.find();
    },

    deanProcess : function(){
      return Session.get('deanProcess');
    },

    departmentHeadCountControl : function(){
      if(Professors.find().count() > 0){
        return true;
      }
      else{
        return false;
      }
    }

  })

  Template.consultantDeleteModal.events({
    'click #iOSModalClose' : function(){

      /* MODAL KAPANDIGI ZAMAN bu sayfaya ait butun subscribelari durdurup kendi derslerimize, professor tablosundan kendimize
      tekrardan subscribe oluyoruz
      */

        $('#dataGet').addClass('toHide');

        if(isEqual(Session.get('deleteType'), "Department")){
          if(LocalCollectionForDeanFacultySub.find().count() > 0){
            LocalCollectionForDeanFacultySub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanFacultySub.remove({});
          }

          if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
            LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanFacultyIdSub.remove({});
          }

          if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
            LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanFacultyDepartmentsSub.remove({});
          }

          if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
            LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
          }

          if(LocalCollectionForDeanDeleteDepartmentLectures.find().count() > 0){
            LocalCollectionForDeanDeleteDepartmentLectures.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteDepartmentLectures.remove({});
          }

          if(LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().count() > 0){
            LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.remove({});
          }

          if(LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().count() > 0){
            LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteStudentLecturesFromLectures.remove({});
          }

          if(LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().count() > 0){
            LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteProfessorLecturesFromLectures.remove({});
          }

          if(LocalCollectionForDeanDeleteProfessorNotificationRoom.find().count() > 0){
            LocalCollectionForDeanDeleteProfessorNotificationRoom.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteProfessorNotificationRoom.remove({});
          }

          if(LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().count() > 0){
            LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.remove({});
          }

          if(LocalCollectionForDeanUpdateUserProfile.find().count() > 0){
            LocalCollectionForDeanUpdateUserProfile.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanUpdateUserProfile.remove({});
          }

        }

        if(isEqual(Session.get('deleteType'), "Lecture")){
          if(LocalCollectionForProfessorLectureDelete.find().count() > 0){
            LocalCollectionForProfessorLectureDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForProfessorLectureDelete.remove({});
          }

          if(LocalCollectionForStudentLectureDelete.find().count() > 0){
            LocalCollectionForStudentLectureDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForStudentLectureDelete.remove({});
          }

          if(LocalCollectionForLectureNotificationRoomDelete.find().count() > 0){
            LocalCollectionForLectureNotificationRoomDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForLectureNotificationRoomDelete.remove({});
          }

          if(LocalCollectionForLectureNotificationsDelete.find().count() > 0){
            LocalCollectionForLectureNotificationsDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForLectureNotificationsDelete.remove({});
          }

          if(LocalCollectionForFacultyId.find().count() > 0){
            LocalCollectionForFacultyId.find().map(function(eachSub){
              eachSub.facSub.stop();
            })

            LocalCollectionForFacultyId.remove({});
          }

          if(LocalCollectionForFacultyProfessors.find().count() > 0){
            LocalCollectionForFacultyProfessors.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForFacultyProfessors.remove({});
          }

          if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
            LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForFacultyProfessorsId.remove({});
          }

          if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
            LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
              eachSub.depLecs.stop();
            })

            LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
          }

          if(LocalCollectionForConsultantDeleteLectures.find().count() > 0){
            LocalCollectionForConsultantDeleteLectures.find().map(function(eachSub){
              eachSub.profLecSub.stop();
            })

            LocalCollectionForConsultantDeleteLectures.remove({});
          }

          if(LocalCollectionForConsultantGetLecturesForDelete.find().count() > 0){
            LocalCollectionForConsultantGetLecturesForDelete.find().map(function(eachSub){
              eachSub.lecSub.stop();
            })

            LocalCollectionForConsultantGetLecturesForDelete.remove({});
          }

          if(LocalCollectionForDeleteProfessorsFaculty.find().count() > 0){
            LocalCollectionForDeleteProfessorsFaculty.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeleteProfessorsFaculty.remove({});
          }

          if(LocalCollectionForProfessorLectureDelete.find().count() > 0){
            LocalCollectionForProfessorLectureDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForProfessorLectureDelete.remove({});
          }

          if(LocalCollectionForStudentLectureDelete.find().count() > 0){
            LocalCollectionForStudentLectureDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForStudentLectureDelete.remove({});
          }

          if(LocalCollectionForLectureNotificationRoomDelete.find().count() > 0){
            LocalCollectionForLectureNotificationRoomDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForLectureNotificationRoomDelete.remove({});
          }

          if(LocalCollectionForLectureNotificationsDelete.find().count() > 0){
            LocalCollectionForLectureNotificationsDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForLectureNotificationsDelete.remove({});
          }

        }

        if(isEqual(Session.get('deleteType'), "Professor")){

          if(LocalCollectionForConsultantGetLecturesForDelete.find().count() > 0){
            LocalCollectionForConsultantGetLecturesForDelete.find().map(function(eachSub){
              eachSub.lecSub.stop();
            })

            LocalCollectionForConsultantGetLecturesForDelete.remove({});
          }

          if(LocalCollectionForDeleteProfessorsFaculty.find().count() > 0){
            LocalCollectionForDeleteProfessorsFaculty.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeleteProfessorsFaculty.remove({});
          }


          if(LocalCollectionForConsultantDeleteLectures.find().count() > 0){
            LocalCollectionForConsultantDeleteLectures.find().map(function(eachSub){
              eachSub.profLecSub.stop();
            })

            LocalCollectionForConsultantDeleteLectures.remove({});
          }


          if(LocalCollectionForFacultyId.find().count() > 0){
            LocalCollectionForFacultyId.find().map(function(eachSub){
              eachSub.facSub.stop();
            })

            LocalCollectionForFacultyId.remove({});
          }

          if(LocalCollectionForFacultyProfessors.find().count() > 0){
            LocalCollectionForFacultyProfessors.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForFacultyProfessors.remove({});
          }

          if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
            LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForFacultyProfessorsId.remove({});
          }

          if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
            LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
              eachSub.depLecs.stop();
            })

            LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
          }

          if(LocalCollectionForConsultantDeleteLectures.find().count() > 0){
            LocalCollectionForConsultantDeleteLectures.find().map(function(eachSub){
              eachSub.profLecSub.stop();
            })

            LocalCollectionForConsultantDeleteLectures.remove({});
          }

          if(LocalCollectionForDeleteProfessorsFaculty.find().count() > 0){
            LocalCollectionForDeleteProfessorsFaculty.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeleteProfessorsFaculty.remove({});
          }

          if(LocalCollectionForProfessorLectureDelete.find().count() > 0){
            LocalCollectionForProfessorLectureDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForProfessorLectureDelete.remove({});
          }

          if(LocalCollectionForStudentLectureDelete.find().count() > 0){
            LocalCollectionForStudentLectureDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForStudentLectureDelete.remove({});
          }

          if(LocalCollectionForLectureNotificationRoomDelete.find().count() > 0){
            LocalCollectionForLectureNotificationRoomDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForLectureNotificationRoomDelete.remove({});
          }

          if(LocalCollectionForLectureNotificationsDelete.find().count() > 0){
            LocalCollectionForLectureNotificationsDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForLectureNotificationsDelete.remove({});
          }

          if(LocalCollectionForConsultantGetLectures.find().count() > 0){
            LocalCollectionForConsultantGetLectures.find().map(function(eachSub){
              eachSub.lecSub.stop();


            })

            LocalCollectionForConsultantGetLectures.remove({});
          }

        }

          LocalCollectionForConsultantProfessor.insert({
            sub : Meteor.subscribe('Professors', Meteor.userId(), {
              onReady : function(){
                var professor = Professors.find().fetch();

                if(professor.length > 0){
                  LocalCollectionForConsultantLectures.insert({
                    profLecSub :  Meteor.subscribe('ProfessorLectures', professor[0]._id, {
                      onReady : function(){
                        professorLectures = ProfessorLectures.find().fetch();

                        if(professorLectures.length >= 1){
                            for(i = 0; i < professorLectures.length; i++){
                              LocalCollectionForConsultantGetLectures.insert({
                                lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                  onReady : function(){
                                    if(Lectures.find().count() > 0){
                                        Session.set('lecturesGetted', true);
                                        Session.set('deleteType', "");
                                    }

                                  }
                                })
                              })
                            }
                        }

                        else{
                          console.log("no lecture");
                          Session.set('lecturesGetted', true);
                          Session.set('deleteType', "");
                        }

                      }
                    })
                  })

                  LocalCollectionForConsultantProfessorNotificationRooms.insert({
                    consProfNotRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(), {
                      onReady : function(){
                        notificationRoomClass = NotificationRoomsClass.find().fetch();

                        for( i = 0; i < notificationRoomClass.length; i++){
                          LocalCollectionForConsultantProfessorNotifications.insert({
                            consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id)
                          })
                        }
                      }
                    })
                  })
                }
              }
            })
          })

          LocalCollectionForConsultantSub.insert({
            sub : Meteor.subscribe('Consultants', Meteor.userId(), {
              onReady : function(){
                    var consultant = Consultants.find().fetch();

                    if(consultant.length > 0){
                      LocalCollectionForConsultantStudentsSub.insert({
                              stuSub : Meteor.subscribe('ConsultantStudents', consultant._id, {
                                onReady : function(){
                                  students = ConsultantStudents.find().fetch();

                                  if(students.length >= 1){
                                    for(i = students.length; i--;){
                                      LocalCollectionForConsultantStudentsIdsSub.insert({
                                        stuIdSub : Meteor.subscribe('ProfessorStudents', students[i].studentId)
                                      })
                                    }

                                  }
                                  else{
                                    console.log("no student");
                                  }

                              }
                          })
                    })
                    LocalCollectionForConsultantNotificationRooms.insert({
                      consNotRoom : Meteor.subscribe('ConsultantsOwnedNotificationRooms', Meteor.userId())
                    })
                    }
              }
            })
          })



        if(Meteor.Device.isDesktop()){
          IonModal.close();
        }
        else{
          StatusBar.show();
          IonModal.close();
        }

        Session.set('lecturesForDelete', false);

        Session.set('profIdForDelete', "");


    },

    'click .profSelectDelete' : function(e){

      if(LocalCollectionForConsultantGetLectures.find().count() > 0){
        LocalCollectionForConsultantGetLectures.find().map(function(eachSub){
          eachSub.lecSub.stop();


        })

        LocalCollectionForConsultantGetLectures.remove({});
      }

      if(LocalCollectionForConsultantGetLecturesForDelete.find().count() > 0){
        LocalCollectionForConsultantGetLecturesForDelete.find().map(function(eachSub){
          eachSub.lecSub.stop();


        })

        LocalCollectionForConsultantGetLecturesForDelete.remove({});
      }

      if(LocalCollectionForConsultantDeleteLectures.find().count() > 0){
        LocalCollectionForConsultantDeleteLectures.find().map(function(eachSub){
          eachSub.profLecSub.stop();


        })

        LocalCollectionForConsultantDeleteLectures.remove({});
      }

      e.preventDefault();
      $('.profSelectDelete').find("a").remove();
      var target = e.currentTarget;
      var selectedProfId = target.id;

      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + selectedProfId).append(icon);

      Session.set('profIdForDelete', selectedProfId);

      var deleteProfessor = Professors.findOne({"_id" : Session.get('profIdForDelete')});

      var professorUserId = deleteProfessor.userId;

      LocalCollectionForConsultantDeleteLectures.insert({
        profLecSub :  Meteor.subscribe('ProfessorLectures', deleteProfessor._id, {
          onReady : function(){
            var professorLectures = ProfessorLectures.find().fetch();


            if(professorLectures.length >= 1){


                for(i = 0; i < professorLectures.length; i++){
                  LocalCollectionForConsultantGetLecturesForDelete.insert({
                    lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                      onReady : function(){
                        console.log(Lectures.find().fetch());
                      }
                    })
                  })
                }
            }

            else{
              console.log("no lecture");
            }

          }
        })
      })

    },

    'click #profDeleteButton' : function(e){

      /*
      Eger prof delete butonuna basilirsa professors tablosundan secilen professor degiskene atilir

      daha sonra profesorun userId sini account db sinden silmek icin baska degiskene atar ve removeUser fonksiyonunu cagirarak kullaniciyi
      server tarafinda sileriz

      profesorun verdigi dersleri bulup isimlerini bos olarak guncelliyoruz
      */

      e.preventDefault();

      if(isEqual(Session.get('profIdForDelete'), "")){
        if(Meteor.Device.isDesktop()){
            alert("Please Select Professor!");

        }
        else{
            navigator.notification.alert("Please Select Professor!");

        }
      }
      else{

        var deleteProfessor = Professors.findOne({"_id" : Session.get('profIdForDelete')});

        var professorUserId = deleteProfessor.userId;

        var professorLectures = ProfessorLectures.find().fetch();

        var lectures = Lectures.find().fetch();


        if(Meteor.Device.isDesktop()){
          if(confirm("You are deleting " + deleteProfessor.professorName + " Are you sure ? ") == true){
            if(lectures.length >= 1){
              for(i = 0; i < lectures.length; i++){
                Lectures.update({"_id" : lectures[i]._id}, {
                  $set : {
                    "profName" : " "
                  }
                })
              }
            }

            LocalCollectionForDeleteProfessorsFaculty.insert({
              sub : Meteor.subscribe('deleteProfessorsFaculty', deleteProfessor._id, {
                onReady : function(){
                    var profFaculty = ProfessorsFaculty.findOne();

                    Professors.remove({"_id" : deleteProfessor._id});

                    ProfessorsFaculty.remove({"_id" : profFaculty.id});

                    if(professorLectures.length >= 1){
                      for(i = 0; i < professorLectures.length; i++){
                        ProfessorLectures.remove({"_id" : professorLectures[i]._id});
                      }
                    }

                    Meteor.call('removeUser', professorUserId, function(error, result){
                      if(error){
                        alert("Something went wrong!");
                        return;
                      }
                      else{
                        toastr.success(deleteProfessor.professorName + " is deleted ", "SUCCESS");
                        IonModal.close();

                        if(LocalCollectionForFacultyId.find().count() > 0){
                          LocalCollectionForFacultyId.find().map(function(eachSub){
                            eachSub.facSub.stop();
                          })

                          LocalCollectionForFacultyId.remove({});
                        }

                        if(LocalCollectionForFacultyProfessors.find().count() > 0){
                          LocalCollectionForFacultyProfessors.find().map(function(eachSub){
                            eachSub.sub.stop();
                          })

                          LocalCollectionForFacultyProfessors.remove({});
                        }

                        if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
                          LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
                            eachSub.sub.stop();
                          })

                          LocalCollectionForFacultyProfessorsId.remove({});
                        }

                        if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
                          LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
                            eachSub.depLecs.stop();
                          })

                          LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
                        }

                        if(LocalCollectionForConsultantDeleteLectures.find().count() > 0){
                          LocalCollectionForConsultantDeleteLectures.find().map(function(eachSub){
                            eachSub.profLecSub.stop();
                          })

                          LocalCollectionForConsultantDeleteLectures.remove({});
                        }

                        if(LocalCollectionForConsultantGetLecturesForDelete.find().count() > 0){
                          LocalCollectionForConsultantGetLecturesForDelete.find().map(function(eachSub){
                            eachSub.lecSub.stop();
                          })

                          LocalCollectionForConsultantGetLecturesForDelete.remove({});
                        }

                        if(LocalCollectionForDeleteProfessorsFaculty.find().count() > 0){
                          LocalCollectionForDeleteProfessorsFaculty.find().map(function(eachSub){
                            eachSub.sub.stop();
                          })

                          LocalCollectionForDeleteProfessorsFaculty.remove({});
                        }

                        if(LocalCollectionForProfessorLectureDelete.find().count() > 0){
                          LocalCollectionForProfessorLectureDelete.find().map(function(eachSub){
                            eachSub.sub.stop();
                          })

                          LocalCollectionForProfessorLectureDelete.remove({});
                        }

                        if(LocalCollectionForStudentLectureDelete.find().count() > 0){
                          LocalCollectionForStudentLectureDelete.find().map(function(eachSub){
                            eachSub.sub.stop();
                          })

                          LocalCollectionForStudentLectureDelete.remove({});
                        }

                        if(LocalCollectionForLectureNotificationRoomDelete.find().count() > 0){
                          LocalCollectionForLectureNotificationRoomDelete.find().map(function(eachSub){
                            eachSub.sub.stop();
                          })

                          LocalCollectionForLectureNotificationRoomDelete.remove({});
                        }

                        if(LocalCollectionForLectureNotificationsDelete.find().count() > 0){
                          LocalCollectionForLectureNotificationsDelete.find().map(function(eachSub){
                            eachSub.sub.stop();
                          })

                          LocalCollectionForLectureNotificationsDelete.remove({});
                        }



                        LocalCollectionForConsultantProfessor.insert({
                          sub : Meteor.subscribe('Professors', Meteor.userId(), {
                            onReady : function(){

                              var professor = Professors.findOne();

                              LocalCollectionForConsultantLectures.insert({
                                profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                                  onReady : function(){
                                    professorLectures = ProfessorLectures.find().fetch();

                                    if(professorLectures.length > 1){
                                        for(i = 0; i < professorLectures.length; i++){
                                          LocalCollectionForConsultantGetLectures.insert({
                                            lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                              onReady : function(){
                                                Session.set('lecturesGetted', true);
                                                Session.set('deleteType', " ");

                                              }
                                            })
                                          })
                                        }
                                    }
                                    else if(professorLectures.length == 1){
                                      LocalCollectionForConsultantGetLectures.insert({
                                        lecSub : Meteor.subscribe('Lectures', professorLectures[0].Lecture, {
                                          onReady : function(){
                                            Session.set('lecturesGetted', true);
                                            Session.set('deleteType', " ");

                                          }
                                        })
                                      })
                                    }
                                    else{
                                      console.log("no lecture");
                                      Session.set('deleteType', " ");

                                    }

                                  }

                                })
                              })
                            }
                          })
                        })
                      }
                    })


                  }

                })
              })

          }
        }
        else{
          navigator.notification.confirm("You are deleting " + deleteProfessor.professorName + " Are you sure ? ", function(index){
            if(index == 1){
              console.dir('Cancel Clicked');
              return;
            }
            if(index == 2){
              if(lectures.length >= 1){
                for(i = 0; i < lectures.length; i++){
                  Lectures.update({"_id" : lectures[i]._id}, {
                    $set : {
                      "profName" : " "
                    }
                  })
                }
              }

              Professors.remove({"_id" : deleteProfessor._id});

              ProfessorsFaculty.remove({"_id" : profFaculty.id});

              if(professorLectures.length >= 1){
                for(i = 0; i < professorLectures.length; i++){
                  ProfessorLectures.remove({"_id" : professorLectures[i]._id});
                }
              }

              LocalCollectionForDeleteProfessorsFaculty.insert({
                sub : Meteor.subscribe('deleteProfessorsFaculty', deleteProfessor._id, {
                  onReady : function(){
                      var profFaculty = ProfessorsFaculty.findOne();

                      ProfessorsFaculty.remove({"_id" : profFaculty.id});

                      Meteor.call('removeUser', professorUserId, function(error, result){
                        if(error){
                            navigator.notification.alert("Something went wrong!");
                            return;
                        }
                        else{

                          window.plugins.toast.showWithOptions({
                              message: deleteProfessor.professorName + " is deleted ",
                              duration: "short", // 2000 ms
                              position: "bottom",
                              styling: {
                                opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                                backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                                textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                                cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                                horizontalPadding: 20, // iOS default 16, Android default 50
                                verticalPadding: 16 // iOS default 12, Android default 30
                              }
                          });

                          StatusBar.show();
                          IonModal.close();

                          if(LocalCollectionForFacultyId.find().count() > 0){
                            LocalCollectionForFacultyId.find().map(function(eachSub){
                              eachSub.facSub.stop();
                            })

                            LocalCollectionForFacultyId.remove({});
                          }

                          if(LocalCollectionForFacultyProfessors.find().count() > 0){
                            LocalCollectionForFacultyProfessors.find().map(function(eachSub){
                              eachSub.sub.stop();
                            })

                            LocalCollectionForFacultyProfessors.remove({});
                          }

                          if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
                            LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
                              eachSub.sub.stop();
                            })

                            LocalCollectionForFacultyProfessorsId.remove({});
                          }

                          if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
                            LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
                              eachSub.depLecs.stop();
                            })

                            LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
                          }

                          if(LocalCollectionForConsultantDeleteLectures.find().count() > 0){
                            LocalCollectionForConsultantDeleteLectures.find().map(function(eachSub){
                              eachSub.profLecSub.stop();
                            })

                            LocalCollectionForConsultantDeleteLectures.remove({});
                          }

                          if(LocalCollectionForConsultantGetLecturesForDelete.find().count() > 0){
                            LocalCollectionForConsultantGetLecturesForDelete.find().map(function(eachSub){
                              eachSub.lecSub.stop();
                            })

                            LocalCollectionForConsultantGetLecturesForDelete.remove({});
                          }

                          if(LocalCollectionForDeleteProfessorsFaculty.find().count() > 0){
                            LocalCollectionForDeleteProfessorsFaculty.find().map(function(eachSub){
                              eachSub.sub.stop();
                            })

                            LocalCollectionForDeleteProfessorsFaculty.remove({});
                          }

                          if(LocalCollectionForProfessorLectureDelete.find().count() > 0){
                            LocalCollectionForProfessorLectureDelete.find().map(function(eachSub){
                              eachSub.sub.stop();
                            })

                            LocalCollectionForProfessorLectureDelete.remove({});
                          }

                          if(LocalCollectionForStudentLectureDelete.find().count() > 0){
                            LocalCollectionForStudentLectureDelete.find().map(function(eachSub){
                              eachSub.sub.stop();
                            })

                            LocalCollectionForStudentLectureDelete.remove({});
                          }

                          if(LocalCollectionForLectureNotificationRoomDelete.find().count() > 0){
                            LocalCollectionForLectureNotificationRoomDelete.find().map(function(eachSub){
                              eachSub.sub.stop();
                            })

                            LocalCollectionForLectureNotificationRoomDelete.remove({});
                          }

                          if(LocalCollectionForLectureNotificationsDelete.find().count() > 0){
                            LocalCollectionForLectureNotificationsDelete.find().map(function(eachSub){
                              eachSub.sub.stop();
                            })

                            LocalCollectionForLectureNotificationsDelete.remove({});
                          }



                          LocalCollectionForConsultantProfessor.insert({
                            sub : Meteor.subscribe('Professors', Meteor.userId(), {
                              onReady : function(){

                                var professor = Professors.findOne();

                                LocalCollectionForConsultantLectures.insert({
                                  profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                                    onReady : function(){
                                      professorLectures = ProfessorLectures.find().fetch();

                                      if(professorLectures.length > 1){
                                          for(i = 0; i < professorLectures.length; i++){
                                            LocalCollectionForConsultantGetLectures.insert({
                                              lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                                onReady : function(){
                                                  Session.set('lecturesGetted', true);

                                                }
                                              })
                                            })
                                          }
                                      }
                                      else if(professorLectures.length == 1){
                                        LocalCollectionForConsultantGetLectures.insert({
                                          lecSub : Meteor.subscribe('Lectures', professorLectures[0].Lecture, {
                                            onReady : function(){
                                              Session.set('lecturesGetted', true);

                                            }
                                          })
                                        })
                                      }
                                      else{
                                        console.log("no lecture");

                                      }

                                    }

                                  })
                                })
                              }
                            })
                          })
                        }
                      })


                    }

                  })
                })

            }
          }, 'Warning', ['Cancel', 'OK'])
        }


      }

    },

    'click .lectureSelectDelete' : function(e){

      /*

      departmenthead delete lecture so delete professorslecture, departmentLectures, studentLectures, notificationRoom. notificationRoomNotifications

      */

      $('.lectureSelectDelete').find("a").remove();
      e.preventDefault();
      var target = e.currentTarget;
      var selectedLectureId = target.id;

      if(LocalCollectionForProfessorLectureDelete.find().count() > 0){
        LocalCollectionForProfessorLectureDelete.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForProfessorLectureDelete.remove({});
      }

      if(LocalCollectionForStudentLectureDelete.find().count() > 0){
        LocalCollectionForStudentLectureDelete.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForStudentLectureDelete.remove({});
      }

      if(LocalCollectionForLectureNotificationRoomDelete.find().count() > 0){
        LocalCollectionForLectureNotificationRoomDelete.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForLectureNotificationRoomDelete.remove({});
      }

      if(LocalCollectionForLectureNotificationsDelete.find().count() > 0){
        LocalCollectionForLectureNotificationsDelete.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForLectureNotificationsDelete.remove({});
      }


      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + selectedLectureId).append(icon);

      Session.set('lectureIdForDelete', selectedLectureId);

      LocalCollectionForProfessorLectureDelete.insert({
        sub : Meteor.subscribe('professorLectureForDelete', selectedLectureId, {
          onReady : function(){

          }
        })
      })

      LocalCollectionForStudentLectureDelete.insert({
        sub : Meteor.subscribe('studentLectureForDelete', selectedLectureId)
      })

      LocalCollectionForLectureNotificationRoomDelete.insert({
        sub : Meteor.subscribe('notificationClassRoomForDelete', selectedLectureId, {
          onReady : function(){
            var notificationRoom = NotificationRoomsClass.find({"notificationRoomInfo.lectureId" : selectedLectureId}).fetch();

            if(notificationRoom.length > 0){
              LocalCollectionForLectureNotificationsDelete.insert({
                sub : Meteor.subscribe('notificationClassNotificationsForDelete', notificationRoom[0]._id)
              })
            }


          },

        })
      })

      var last = $(".generalView")[0].scrollHeight

      $(".generalView").animate({
          scrollTop: last
      }, 1000);


    },

    'click #lecDeleteButton' : function(e){
      e.preventDefault();


      if(isEqual(Session.get("lectureIdForDelete"), "")){
        if(Meteor.Device.isDesktop()){
            alert("Please Select Lecture!");

        }
        else{
            navigator.notification.alert("Please Select Lecture!");

        }
      }
      else{
        var lecture = Lectures.findOne(Session.get('lectureIdForDelete'));

        if(Meteor.Device.isDesktop()){
          if(confirm("You are deleting " + lecture.lectureName + ". Are you sure ? ") == true){
            var departmentLectureForDelete = DepartmentLectures.find({"lectureId" : Session.get('lectureIdForDelete')}).fetch();

            if(departmentLectureForDelete.length > 0){
                DepartmentLectures.remove({"_id" : departmentLectureForDelete[0]._id});
            }


            var profLecture = ProfessorLectures.find({"Lecture" : Session.get('lectureIdForDelete')}).fetch();

            if(profLecture.length > 0){
              ProfessorLectures.remove({"_id" : profLecture[0]._id});
            }


            var studentLecture = StudentLectures.find().fetch();

            if(studentLecture.length > 0){
              for(i = studentLecture.length; i--;){
                StudentLectures.remove({"_id": studentLecture[i]._id})
              }
            }

            var notificationRoom = NotificationRoomsClass.find({"notificationRoomInfo.lectureId" : Session.get('lectureIdForDelete')}).fetch();

            if(notificationRoom.length > 0){
              NotificationRoomsClass.remove({"_id" : notificationRoom[0]._id});

              var notifications = ProfessorNotifications.find({"notificationRoomId" : notificationRoom[0]._id}).fetch();

              if(notifications.length > 0){

                  for(i = notifications.length; i--;){
                    ProfessorNotifications.remove({"_id" : notifications[i]._id});
                  }
              }
            }

            Lectures.remove({"_id" : lecture._id});

            if(LocalCollectionForFacultyId.find().count() > 0){
              LocalCollectionForFacultyId.find().map(function(eachSub){
                eachSub.facSub.stop();
              })

              LocalCollectionForFacultyId.remove({});
            }

            if(LocalCollectionForFacultyProfessors.find().count() > 0){
              LocalCollectionForFacultyProfessors.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForFacultyProfessors.remove({});
            }

            if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
              LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForFacultyProfessorsId.remove({});
            }

            if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
              LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
                eachSub.depLecs.stop();
              })

              LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
            }

            if(LocalCollectionForConsultantDeleteLectures.find().count() > 0){
              LocalCollectionForConsultantDeleteLectures.find().map(function(eachSub){
                eachSub.profLecSub.stop();
              })

              LocalCollectionForConsultantDeleteLectures.remove({});
            }

            if(LocalCollectionForConsultantGetLecturesForDelete.find().count() > 0){
              LocalCollectionForConsultantGetLecturesForDelete.find().map(function(eachSub){
                eachSub.lecSub.stop();
              })

              LocalCollectionForConsultantGetLecturesForDelete.remove({});
            }

            if(LocalCollectionForDeleteProfessorsFaculty.find().count() > 0){
              LocalCollectionForDeleteProfessorsFaculty.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeleteProfessorsFaculty.remove({});
            }

            if(LocalCollectionForProfessorLectureDelete.find().count() > 0){
              LocalCollectionForProfessorLectureDelete.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForProfessorLectureDelete.remove({});
            }

            if(LocalCollectionForStudentLectureDelete.find().count() > 0){
              LocalCollectionForStudentLectureDelete.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForStudentLectureDelete.remove({});
            }

            if(LocalCollectionForLectureNotificationRoomDelete.find().count() > 0){
              LocalCollectionForLectureNotificationRoomDelete.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForLectureNotificationRoomDelete.remove({});
            }

            if(LocalCollectionForLectureNotificationsDelete.find().count() > 0){
              LocalCollectionForLectureNotificationsDelete.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForLectureNotificationsDelete.remove({});
            }



            LocalCollectionForConsultantProfessor.insert({
              sub : Meteor.subscribe('Professors', Meteor.userId(), {
                onReady : function(){

                  var professor = Professors.findOne();

                  LocalCollectionForConsultantLectures.insert({
                    profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                      onReady : function(){
                        professorLectures = ProfessorLectures.find().fetch();

                        if(professorLectures.length > 1){
                            for(i = 0; i < professorLectures.length; i++){
                              LocalCollectionForConsultantGetLectures.insert({
                                lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                  onReady : function(){
                                    Session.set('lecturesGetted', true);

                                  }
                                })
                              })
                            }
                        }
                        else if(professorLectures.length == 1){
                          LocalCollectionForConsultantGetLectures.insert({
                            lecSub : Meteor.subscribe('Lectures', professorLectures[0].Lecture, {
                              onReady : function(){
                                Session.set('lecturesGetted', true);

                              }
                            })
                          })
                        }
                        else{
                          console.log("no lecture");

                        }

                      }

                    })
                  })
                }
              })
            })

            toastr.success("Deleted : " + lecture.lectureName, "Success");

            IonModal.close();
          }



        }
        else{
          navigator.notification.confirm("You are deleting " + lecture.lectureName + ". Are you sure ? ", function(index){
            if(index == 1){
              console.dir('Cancel Clicked');
            }
            if(index == 2){
              var departmentLectureForDelete = DepartmentLectures.findOne({"lectureId" : Session.get('lectureIdForDelete')});

              DepartmentLectures.remove({"_id" : departmentLectureForDelete._id});

              var profLecture = ProfessorLectures.findOne({"Lecture" : ession.get('lectureIdForDelete')})

              ProfessorLectures.remove({"_id" : profLecture._id});

              var studentLecture = StudentLectures.find().fetch();

              for(i = studentLecture.length; i--;){
                StudentLectures.remove({"_id": studentLecture[i]._id})
              }


              var notificationRoom = NotificationRoomClass.findOne({"notificationRoomInfo.lectureId" : Session.get('lectureIdForDelete')});

              NotificationRoomClass.remove({"_id" : notificationRoom._id});

              var notifications = ProfessorNotifications.find({"notificationRoomId" : notificationRoom._id}).fetch();

              for(i = notifications.length; i--;){
                ProfessorNotifications.remove({"_id" : notifications[i]._id});
              }

              Lectures.remove({"_id" : lecture._id});

              if(LocalCollectionForFacultyId.find().count() > 0){
                LocalCollectionForFacultyId.find().map(function(eachSub){
                  eachSub.facSub.stop();
                })

                LocalCollectionForFacultyId.remove({});
              }

              if(LocalCollectionForFacultyProfessors.find().count() > 0){
                LocalCollectionForFacultyProfessors.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForFacultyProfessors.remove({});
              }

              if(LocalCollectionForFacultyProfessorsId.find().count() > 0){
                LocalCollectionForFacultyProfessorsId.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForFacultyProfessorsId.remove({});
              }

              if(LocalCollectionForConsultantMatchLectureDepartmentLectures.find().count() > 0){
                LocalCollectionForConsultantMatchLectureDepartmentLectures.find().map(function(eachSub){
                  eachSub.depLecs.stop();
                })

                LocalCollectionForConsultantMatchLectureDepartmentLectures.remove({});
              }

              if(LocalCollectionForConsultantDeleteLectures.find().count() > 0){
                LocalCollectionForConsultantDeleteLectures.find().map(function(eachSub){
                  eachSub.profLecSub.stop();
                })

                LocalCollectionForConsultantDeleteLectures.remove({});
              }

              if(LocalCollectionForConsultantGetLecturesForDelete.find().count() > 0){
                LocalCollectionForConsultantGetLecturesForDelete.find().map(function(eachSub){
                  eachSub.lecSub.stop();
                })

                LocalCollectionForConsultantGetLecturesForDelete.remove({});
              }

              if(LocalCollectionForDeleteProfessorsFaculty.find().count() > 0){
                LocalCollectionForDeleteProfessorsFaculty.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeleteProfessorsFaculty.remove({});
              }

              if(LocalCollectionForProfessorLectureDelete.find().count() > 0){
                LocalCollectionForProfessorLectureDelete.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForProfessorLectureDelete.remove({});
              }

              if(LocalCollectionForStudentLectureDelete.find().count() > 0){
                LocalCollectionForStudentLectureDelete.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForStudentLectureDelete.remove({});
              }

              if(LocalCollectionForLectureNotificationRoomDelete.find().count() > 0){
                LocalCollectionForLectureNotificationRoomDelete.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForLectureNotificationRoomDelete.remove({});
              }

              if(LocalCollectionForLectureNotificationsDelete.find().count() > 0){
                LocalCollectionForLectureNotificationsDelete.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForLectureNotificationsDelete.remove({});
              }



              LocalCollectionForConsultantProfessor.insert({
                sub : Meteor.subscribe('Professors', Meteor.userId(), {
                  onReady : function(){

                    var professor = Professors.findOne();

                    LocalCollectionForConsultantLectures.insert({
                      profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                        onReady : function(){
                          professorLectures = ProfessorLectures.find().fetch();

                          if(professorLectures.length > 1){
                              for(i = 0; i < professorLectures.length; i++){
                                LocalCollectionForConsultantGetLectures.insert({
                                  lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                    onReady : function(){
                                      Session.set('lecturesGetted', true);

                                    }
                                  })
                                })
                              }
                          }
                          else if(professorLectures.length == 1){
                            LocalCollectionForConsultantGetLectures.insert({
                              lecSub : Meteor.subscribe('Lectures', professorLectures[0].Lecture, {
                                onReady : function(){
                                  Session.set('lecturesGetted', true);

                                }
                              })
                            })
                          }
                          else{
                            console.log("no lecture");

                          }

                        }

                      })
                    })
                  }
                })
              })

              window.plugins.toast.showWithOptions({
                  message: "Deleted : " + lecture.lectureName,
                  duration: "short", // 2000 ms
                  position: "bottom",
                  styling: {
                    opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                    backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                    textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                    cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                    horizontalPadding: 20, // iOS default 16, Android default 50
                    verticalPadding: 16 // iOS default 12, Android default 30
                  }
                });

              IonModal.close('consultantDeleteModal');
              StatusBar.show();

            }
          }, 'Warning', ['Cancel', 'OK'])
        }


      }

      Session.set('lecturesForDelete', false);

    },

    'click .departmentSelectDelete' : function(e){

      $('.departmentSelectDelete').find("a").remove();
      e.preventDefault();
      var target = e.currentTarget;
      var selectedDepartmentId = target.id;

      var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
      $('#' + selectedDepartmentId).append(icon);

      $('#dataGet').removeClass('toHide');
      $('.departmentSelectDelete').addClass("toBackground");

      if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
        LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
      }

      if(LocalCollectionForDeanDeleteDepartmentLectures.find().count() > 0){
        LocalCollectionForDeanDeleteDepartmentLectures.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForDeanDeleteDepartmentLectures.remove({});
      }

      if(LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().count() > 0){
        LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.remove({});
      }

      if(LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().count() > 0){
        LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForDeanDeleteStudentLecturesFromLectures.remove({});
      }

      if(LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().count() > 0){
        LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForDeanDeleteProfessorLecturesFromLectures.remove({});
      }

      if(LocalCollectionForDeanDeleteProfessorNotificationRoom.find().count() > 0){
        LocalCollectionForDeanDeleteProfessorNotificationRoom.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForDeanDeleteProfessorNotificationRoom.remove({});
      }

      if(LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().count() > 0){
        LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().map(function(eachSub){
          eachSub.sub.stop();
        })

        LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.remove({});
      }


      LocalCollectionForDeanDeleteDepartmentHeadsSub.insert({
        sub : Meteor.subscribe('departmentHeadsForDelete', selectedDepartmentId, {
          onReady : function(){

          }
        })
      })

      LocalCollectionForDeanDeleteDepartmentLectures.insert({
        sub : Meteor.subscribe('OwnedDepartmentLecs', selectedDepartmentId, {
          onReady : function(){
            var depLecs = DepartmentLectures.find().fetch();

            if(depLecs.length >= 1){
              for(let i = 0; i < depLecs.length; i++){
                LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.insert({
                  sub : Meteor.subscribe('Lectures', depLecs[i].lectureId, {
                    onReady : function(){
                      var lectures = Lectures.find().fetch();

                      if(lectures.length >= 1){
                        for(let i = 0; i < lectures.length; i++){
                          LocalCollectionForDeanDeleteStudentLecturesFromLectures.insert({
                            sub : Meteor.subscribe('ProfessorStudentLectures', lectures[i]._id, {
                              onReady : function(){
                              }
                            })
                          })

                          LocalCollectionForDeanDeleteProfessorLecturesFromLectures.insert({
                            sub : Meteor.subscribe('professorLectureForDelete', lectures[i]._id, {
                              onReady : function(){
                              }
                            })
                          })

                          LocalCollectionForDeanDeleteProfessorNotificationRoom.insert({
                            sub : Meteor.subscribe('notificationClassRoomForDelete', lectures[i]._id, {
                              onReady : function(){
                                var notifRooms = NotificationRoomsClass.find().fetch();

                                if(notifRooms.length >= 1){
                                  for(let i = 0; i < notifRooms.length; i++){
                                    LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.insert({
                                      sub : Meteor.subscribe('notificationClassNotificationsForDelete', notifRooms[i]._id, {
                                        onReady : function(){
                                          $('#dataGet').addClass('toHide');
                                          $('.departmentSelectDelete').removeClass("toBackground");
                                         }
                                      })
                                    })
                                  }
                                }
                                else{
                                  $('#dataGet').addClass('toHide');
                                  $('.departmentSelectDelete').removeClass("toBackground");
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
            else{
              $('#dataGet').addClass('toHide');
              $('.departmentSelectDelete').removeClass("toBackground");
            }
          }
        })
      })

      Session.set('departmentIdForDelete', selectedDepartmentId);

    },

    'click #depDeleteButton' : function(e){
      e.preventDefault();

      if(isEqual(Session.get('departmentIdForDelete'), "")){
        if(Meteor.Device.isDesktop()){
            alert("Please Select Department!");

        }
        else{
            navigator.notification.alert("Please Select Department!");

        }
      }
      else{
        var department = Departments.findOne(Session.get('departmentIdForDelete'));

        if(Meteor.Device.isDesktop()){

          if(confirm("You are deleting " + department.departmentName + ". Are you sure ? ") == true){
              $('.departmentSelectDelete').addClass("toBackground");

              var departmentHead = DepartmentHeads.find().fetch();

              if(departmentHead.length >= 1){
                  LocalCollectionForDeanUpdateUserProfile.insert({
                    sub : Meteor.subscribe('whoRead', departmentHead[0].headId, {
                      onReady : function(){
                        var userForUpdate = Meteor.users.findOne({"_id" : departmentHead[0].headId});
                        var departmentLectures = DepartmentLectures.find({"departmentId" : Session.get('departmentIdForDelete')}).fetch();
                        var facultyDepartments = FacultyDepartments.find({"departmentId" : Session.get('departmentIdForDelete')}).fetch();
                        var lectures = Lectures.find().fetch();
                        var professorLectures = ProfessorLectures.find().fetch();
                        var studentLectures = StudentLectures.find().fetch();
                        var notificationRoom = NotificationRoomsClass.find().fetch();
                        var notifications = ProfessorNotifications.find().fetch();

                        Meteor.call('updateUserRole', userForUpdate._id, "DepartmentHead", function(error, result){
                          if(error){
                            $('.departmentSelectDelete').removeClass("toBackground");
                            alert("Something went wrong!");
                            return;
                          }
                          else{
                            if(departmentHead.length >= 1){
                              for(let i = 0; i < departmentHead.length; i++){
                                  departmentHeadDelete = DepartmentHeads.remove({"_id" : departmentHead[0]._id});
                                  if(departmentHeadDelete){
                                      continue;
                                  }
                                  else{
                                    break;
                                    alert("Something went wrong");
                                    return;
                                  }
                              }


                            }

                            if(departmentLectures.length >= 1){
                              for(let i = 0; i < departmentLectures.length; i++){
                                departmentLecturesDelete = DepartmentLectures.remove({"_id" : departmentLectures[i]._id});
                                if(departmentLecturesDelete){
                                    continue;
                                }
                                else{
                                  break;
                                  alert("Something went wrong");
                                  return;
                                }
                              }
                            }

                            if(facultyDepartments.length >= 1){
                              for(let i = 0; i < facultyDepartments.length; i++){
                                facultyDepartmentsDelete = FacultyDepartments.remove({"_id" : facultyDepartments[i]._id});
                                if(facultyDepartmentsDelete){
                                    continue;
                                }
                                else{
                                  break;
                                  alert("Something went wrong");
                                  return;
                                }
                              }
                            }

                            if(lectures.length >= 1){
                              for(let i = 0; i < lectures.length; i++){
                                lecturesDelete = Lectures.remove({"_id" : lectures[i]._id});
                                if(lecturesDelete){
                                    continue;
                                }
                                else{
                                  break;
                                  alert("Something went wrong");
                                  return;
                                }
                              }
                            }

                            if(professorLectures.length >= 1){
                              for(let i = 0; i < professorLectures.length; i++){
                                professorLecturesDelete = ProfessorLectures.remove({"_id" : professorLectures[i]._id});
                                if(professorLecturesDelete){
                                    continue;
                                }
                                else{
                                  break;
                                  alert("Something went wrong");
                                  return;
                                }
                              }
                            }

                            if(studentLectures.length >= 1){
                              for(let i = 0; i < studentLectures.length; i++){
                                studentLecturesDelete = StudentLectures.remove({"_id" : studentLectures[i]._id});
                                if(studentLecturesDelete){
                                    continue;
                                }
                                else{
                                  break;
                                  alert("Something went wrong");
                                  return;
                                }
                              }
                            }

                            if(notificationRoom.length >= 1){
                              for(let i = 0; i < notificationRoom.length; i++){
                                notificationRoomDelete = NotificationRoomsClass.remove({"_id" : notificationRoom[i]._id});
                                if(notificationRoomDelete){
                                    continue;
                                }
                                else{
                                  break;
                                  alert("Something went wrong");
                                  return;
                                }
                              }
                            }

                            if(notifications.length >= 1){
                              for(let i = 0; i < notifications.length; i++){
                                notificationsDelete = ProfessorNotifications.remove({"_id" : notifications[i]._id});
                                if(notificationsDelete){
                                    continue;
                                }
                                else{
                                  break;
                                  alert("Something went wrong");
                                  return;
                                }
                              }
                            }


                            /* Eger notificationRoom yoksa vs olmayan seyleri dusunmek gerek */

                            departmentDelete = Departments.remove({"_id" : Session.get('departmentIdForDelete')});

                            if(departmentDelete){

                              /* Eger silme islemleri tamamlanir ise

                              Modal Acilirken abone oldugumuz :

                              FacultyDeans
                              Faculties
                              FacultyDepartments
                              Departments
                              DepartmentHeads
                              DepartmentLectures
                              Lectures
                              ProfessorLectures
                              NotificationRooms
                              Notifications
                              Aboneliklerini bitiriyoruz */

                              if(LocalCollectionForDeanFacultySub.find().count() > 0){
                                LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanFacultySub.remove({});
                              }

                              if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
                                LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanFacultyIdSub.remove({});
                              }

                              if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
                                LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanFacultyDepartmentsSub.remove({});
                              }

                              if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
                                LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
                              }

                              if(LocalCollectionForDeanDeleteDepartmentLectures.find().count() > 0){
                                LocalCollectionForDeanDeleteDepartmentLectures.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanDeleteDepartmentLectures.remove({});
                              }

                              if(LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().count() > 0){
                                LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.remove({});
                              }

                              if(LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().count() > 0){
                                LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanDeleteStudentLecturesFromLectures.remove({});
                              }

                              if(LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().count() > 0){
                                LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanDeleteProfessorLecturesFromLectures.remove({});
                              }

                              if(LocalCollectionForDeanDeleteProfessorNotificationRoom.find().count() > 0){
                                LocalCollectionForDeanDeleteProfessorNotificationRoom.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanDeleteProfessorNotificationRoom.remove({});
                              }

                              if(LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().count() > 0){
                                LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.remove({});
                              }

                              if(LocalCollectionForDeanUpdateUserProfile.find().count() > 0){
                                LocalCollectionForDeanUpdateUserProfile.find().map(function(eachSub){
                                  eachSub.sub.stop();
                                })

                                LocalCollectionForDeanUpdateUserProfile.remove({});
                              }

                              var professor = Professors.findOne();

                              LocalCollectionForConsultantLectures.insert({
                                profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                                  onReady : function(){
                                    professorLectures = ProfessorLectures.find().fetch();

                                    if(professorLectures.length >= 1){
                                        for(i = 0; i < professorLectures.length; i++){
                                          LocalCollectionForConsultantGetLectures.insert({
                                            lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                              onReady : function(){
                                                if(Lectures.find().count() > 0){
                                                    Session.set('lecturesGetted', true);
                                                }

                                              }
                                            })
                                          })
                                        }
                                    }

                                    else{
                                      console.log("no lecture");
                                      Session.set('lecturesGetted', true);
                                    }

                                  }
                                })
                              })

                              LocalCollectionForConsultantProfessorNotificationRooms.insert({
                                consProfNotRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(), {
                                  onReady : function(){
                                    notificationRoomClass = NotificationRoomsClass.find().fetch();

                                    for( i = 0; i < notificationRoomClass.length; i++){
                                      LocalCollectionForConsultantProfessorNotifications.insert({
                                        consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id)
                                      })
                                    }
                                  }
                                })
                              })

                              if(Consultants.find().count() > 0){
                                  var consultant = Consultants.findOne();

                                  LocalCollectionForConsultantStudentsSub.insert({
                                          stuSub : Meteor.subscribe('ConsultantStudents', consultant._id, {
                                            onReady : function(){
                                              students = ConsultantStudents.find().fetch();

                                              if(students.length >= 1){
                                                for(i = students.length; i--;){
                                                  LocalCollectionForConsultantStudentsIdsSub.insert({
                                                    stuIdSub : Meteor.subscribe('ProfessorStudents', students[i].studentId)
                                                  })
                                                }

                                              }
                                              else{
                                                console.log("no student");
                                              }

                                            }
                                          })
                                })

                              }

                              LocalCollectionForConsultantNotificationRooms.insert({
                                consNotRoom : Meteor.subscribe('ConsultantsOwnedNotificationRooms', Meteor.userId())
                              })

                              toastr.success(department.departmentName + " is deleted ", "Success");

                              $('.departmentSelectDelete').removeClass("toBackground");
                            }
                            else{
                              $('.departmentSelectDelete').removeClass("toBackground");
                              alert("Something went wrong!");
                              return;

                            }
                          }
                        })

                      }

                    })
                  })
              }
              else{

                var departmentLectures = DepartmentLectures.find({"departmentId" : Session.get('departmentIdForDelete')}).fetch();
                var facultyDepartments = FacultyDepartments.find({"departmentId" : Session.get('departmentIdForDelete')}).fetch();
                var lectures = Lectures.find().fetch();
                var professorLectures = ProfessorLectures.find().fetch();
                var studentLectures = StudentLectures.find().fetch();
                var notificationRoom = NotificationRoomsClass.find().fetch();
                var notifications = ProfessorNotifications.find().fetch();

                if(departmentLectures.length >= 1){
                  for(let i = 0; i < departmentLectures.length; i++){
                    departmentLecturesDelete = DepartmentLectures.remove({"_id" : departmentLectures[i]._id});
                    if(departmentLecturesDelete){
                        continue;
                    }
                    else{
                      break;
                      alert("Something went wrong");
                      return;
                    }
                  }
                }

                if(facultyDepartments.length >= 1){
                  for(let i = 0; i < facultyDepartments.length; i++){
                    facultyDepartmentsDelete = FacultyDepartments.remove({"_id" : facultyDepartments[i]._id});
                    if(facultyDepartmentsDelete){
                        continue;
                    }
                    else{
                      break;
                      alert("Something went wrong");
                      return;
                    }
                  }
                }

                if(lectures.length >= 1){
                  for(let i = 0; i < lectures.length; i++){
                    lecturesDelete = Lectures.remove({"_id" : lectures[i]._id});
                    if(lecturesDelete){
                        continue;
                    }
                    else{
                      break;
                      alert("Something went wrong");
                      return;
                    }
                  }
                }

                if(professorLectures.length >= 1){
                  for(let i = 0; i < professorLectures.length; i++){
                    professorLecturesDelete = ProfessorLectures.remove({"_id" : professorLectures[i]._id});
                    if(professorLecturesDelete){
                        continue;
                    }
                    else{
                      break;
                      alert("Something went wrong");
                      return;
                    }
                  }
                }

                if(studentLectures.length >= 1){
                  for(let i = 0; i < studentLectures.length; i++){
                    studentLecturesDelete = StudentLectures.remove({"_id" : studentLectures[i]._id});
                    if(studentLecturesDelete){
                        continue;
                    }
                    else{
                      break;
                      alert("Something went wrong");
                      return;
                    }
                  }
                }

                if(notificationRoom.length >= 1){
                  for(let i = 0; i < notificationRoom.length; i++){
                    notificationRoomDelete = NotificationRoomsClass.remove({"_id" : notificationRoom[i]._id});
                    if(notificationRoomDelete){
                        continue;
                    }
                    else{
                      break;
                      alert("Something went wrong");
                      return;
                    }
                  }
                }

                if(notifications.length >= 1){
                  for(let i = 0; i < notifications.length; i++){
                    notificationsDelete = ProfessorNotifications.remove({"_id" : notifications[i]._id});
                    if(notificationsDelete){
                        continue;
                    }
                    else{
                      break;
                      alert("Something went wrong");
                      return;
                    }
                  }
                }

                departmentDelete = Departments.remove({"_id" : Session.get('departmentIdForDelete')});

                if(departmentDelete){

                  if(LocalCollectionForDeanFacultySub.find().count() > 0){
                    LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanFacultySub.remove({});
                  }

                  if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
                    LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanFacultyIdSub.remove({});
                  }

                  if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
                    LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanFacultyDepartmentsSub.remove({});
                  }

                  if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
                    LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
                  }

                  if(LocalCollectionForDeanDeleteDepartmentLectures.find().count() > 0){
                    LocalCollectionForDeanDeleteDepartmentLectures.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanDeleteDepartmentLectures.remove({});
                  }

                  if(LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().count() > 0){
                    LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.remove({});
                  }

                  if(LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().count() > 0){
                    LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanDeleteStudentLecturesFromLectures.remove({});
                  }

                  if(LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().count() > 0){
                    LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanDeleteProfessorLecturesFromLectures.remove({});
                  }

                  if(LocalCollectionForDeanDeleteProfessorNotificationRoom.find().count() > 0){
                    LocalCollectionForDeanDeleteProfessorNotificationRoom.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanDeleteProfessorNotificationRoom.remove({});
                  }

                  if(LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().count() > 0){
                    LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.remove({});
                  }

                  if(LocalCollectionForDeanUpdateUserProfile.find().count() > 0){
                    LocalCollectionForDeanUpdateUserProfile.find().map(function(eachSub){
                      eachSub.sub.stop();
                    })

                    LocalCollectionForDeanUpdateUserProfile.remove({});
                  }

                  var professor = Professors.findOne();

                  LocalCollectionForConsultantLectures.insert({
                    profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                      onReady : function(){
                        professorLectures = ProfessorLectures.find().fetch();

                        if(professorLectures.length >= 1){
                            for(i = 0; i < professorLectures.length; i++){
                              LocalCollectionForConsultantGetLectures.insert({
                                lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                  onReady : function(){
                                    if(Lectures.find().count() > 0){
                                        Session.set('lecturesGetted', true);
                                    }

                                  }
                                })
                              })
                            }
                        }

                        else{
                          console.log("no lecture");
                          Session.set('lecturesGetted', true);
                        }

                      }
                    })
                  })

                  LocalCollectionForConsultantProfessorNotificationRooms.insert({
                    consProfNotRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(), {
                      onReady : function(){
                        notificationRoomClass = NotificationRoomsClass.find().fetch();

                        for( i = 0; i < notificationRoomClass.length; i++){
                          LocalCollectionForConsultantProfessorNotifications.insert({
                            consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id)
                          })
                        }
                      }
                    })
                  })

                  if(Consultants.find().count() > 0){
                      var consultant = Consultants.findOne();

                      LocalCollectionForConsultantStudentsSub.insert({
                              stuSub : Meteor.subscribe('ConsultantStudents', consultant._id, {
                                onReady : function(){
                                  students = ConsultantStudents.find().fetch();

                                  if(students.length >= 1){
                                    for(i = students.length; i--;){
                                      LocalCollectionForConsultantStudentsIdsSub.insert({
                                        stuIdSub : Meteor.subscribe('ProfessorStudents', students[i].studentId)
                                      })
                                    }

                                  }
                                  else{
                                    console.log("no student");
                                  }

                                }
                              })
                    })

                  }

                  LocalCollectionForConsultantNotificationRooms.insert({
                    consNotRoom : Meteor.subscribe('ConsultantsOwnedNotificationRooms', Meteor.userId())
                  })

                  toastr.success(department.departmentName + " is deleted ", "Success");

                  $('.departmentSelectDelete').removeClass("toBackground");
                }
                else{
                  $('.departmentSelectDelete').removeClass("toBackground");
                  alert("Something went wrong!");
                  return;

                }

              }

              IonModal.close('consultantDeleteModal');
          }
          else{

            if(LocalCollectionForDeanFacultySub.find().count() > 0){
              LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanFacultySub.remove({});
            }

            if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
              LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanFacultyIdSub.remove({});
            }

            if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
              LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanFacultyDepartmentsSub.remove({});
            }

            if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
              LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
            }

            if(LocalCollectionForDeanDeleteDepartmentLectures.find().count() > 0){
              LocalCollectionForDeanDeleteDepartmentLectures.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteDepartmentLectures.remove({});
            }

            if(LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().count() > 0){
              LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.remove({});
            }

            if(LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().count() > 0){
              LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteStudentLecturesFromLectures.remove({});
            }

            if(LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().count() > 0){
              LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteProfessorLecturesFromLectures.remove({});
            }

            if(LocalCollectionForDeanDeleteProfessorNotificationRoom.find().count() > 0){
              LocalCollectionForDeanDeleteProfessorNotificationRoom.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteProfessorNotificationRoom.remove({});
            }

            if(LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().count() > 0){
              LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.remove({});
            }



            var professor = Professors.findOne();

            LocalCollectionForConsultantLectures.insert({
              profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                onReady : function(){
                  professorLectures = ProfessorLectures.find().fetch();

                  if(professorLectures.length >= 1){
                      for(i = 0; i < professorLectures.length; i++){
                        LocalCollectionForConsultantGetLectures.insert({
                          lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                            onReady : function(){
                              if(Lectures.find().count() > 0){
                                  Session.set('lecturesGetted', true);
                              }

                            }
                          })
                        })
                      }
                  }

                  else{
                    console.log("no lecture");
                    Session.set('lecturesGetted', true);
                  }

                }
              })
            })

            LocalCollectionForConsultantProfessorNotificationRooms.insert({
              consProfNotRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(), {
                onReady : function(){
                  notificationRoomClass = NotificationRoomsClass.find().fetch();

                  for( i = 0; i < notificationRoomClass.length; i++){
                    LocalCollectionForConsultantProfessorNotifications.insert({
                      consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id)
                    })
                  }
                }
              })
            })

            if(Consultants.find().count() > 0){
                var consultant = Consultants.findOne();

                LocalCollectionForConsultantStudentsSub.insert({
                        stuSub : Meteor.subscribe('ConsultantStudents', consultant._id, {
                          onReady : function(){
                            students = ConsultantStudents.find().fetch();

                            if(students.length >= 1){
                              for(i = students.length; i--;){
                                LocalCollectionForConsultantStudentsIdsSub.insert({
                                  stuIdSub : Meteor.subscribe('ProfessorStudents', students[i].studentId)
                                })
                              }

                            }
                            else{
                              console.log("no student");
                            }

                          }
                        })
              })

            }

            LocalCollectionForConsultantNotificationRooms.insert({
              consNotRoom : Meteor.subscribe('ConsultantsOwnedNotificationRooms', Meteor.userId())
            })

          }

        }
        else{
          navigator.notification.confirm("You are deleting " + department.departmentName + ". Are you sure ? ", function(index){
            if(index == 1){
              console.log("Cancel Clicked");

              if(LocalCollectionForDeanFacultySub.find().count() > 0){
                LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanFacultySub.remove({});
              }

              if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
                LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanFacultyIdSub.remove({});
              }

              if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
                LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanFacultyDepartmentsSub.remove({});
              }

              if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
                LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
              }

              if(LocalCollectionForDeanDeleteDepartmentLectures.find().count() > 0){
                LocalCollectionForDeanDeleteDepartmentLectures.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanDeleteDepartmentLectures.remove({});
              }

              if(LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().count() > 0){
                LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.remove({});
              }

              if(LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().count() > 0){
                LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanDeleteStudentLecturesFromLectures.remove({});
              }

              if(LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().count() > 0){
                LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanDeleteProfessorLecturesFromLectures.remove({});
              }

              if(LocalCollectionForDeanDeleteProfessorNotificationRoom.find().count() > 0){
                LocalCollectionForDeanDeleteProfessorNotificationRoom.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanDeleteProfessorNotificationRoom.remove({});
              }

              if(LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().count() > 0){
                LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().map(function(eachSub){
                  eachSub.sub.stop();
                })

                LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.remove({});
              }

              var professor = Professors.findOne();

              LocalCollectionForConsultantLectures.insert({
                profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                  onReady : function(){
                    professorLectures = ProfessorLectures.find().fetch();

                    if(professorLectures.length >= 1){
                        for(i = 0; i < professorLectures.length; i++){
                          LocalCollectionForConsultantGetLectures.insert({
                            lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                              onReady : function(){
                                if(Lectures.find().count() > 0){
                                    Session.set('lecturesGetted', true);
                                }

                              }
                            })
                          })
                        }
                    }

                    else{
                      console.log("no lecture");
                      Session.set('lecturesGetted', true);
                    }

                  }
                })
              })

              LocalCollectionForConsultantProfessorNotificationRooms.insert({
                consProfNotRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(), {
                  onReady : function(){
                    notificationRoomClass = NotificationRoomsClass.find().fetch();

                    for( i = 0; i < notificationRoomClass.length; i++){
                      LocalCollectionForConsultantProfessorNotifications.insert({
                        consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id)
                      })
                    }
                  }
                })
              })

              if(Consultants.find().count() > 0){
                  var consultant = Consultants.findOne();

                  LocalCollectionForConsultantStudentsSub.insert({
                          stuSub : Meteor.subscribe('ConsultantStudents', consultant._id, {
                            onReady : function(){
                              students = ConsultantStudents.find().fetch();

                              if(students.length >= 1){
                                for(i = students.length; i--;){
                                  LocalCollectionForConsultantStudentsIdsSub.insert({
                                    stuIdSub : Meteor.subscribe('ProfessorStudents', students[i].studentId)
                                  })
                                }

                              }
                              else{
                                console.log("no student");
                              }

                            }
                          })
                })

              }

              LocalCollectionForConsultantNotificationRooms.insert({
                consNotRoom : Meteor.subscribe('ConsultantsOwnedNotificationRooms', Meteor.userId())
              })

              // NotificationRoomsConsultant.find().observeChanges({
              //   added : function(id, object){
              //
              //     var notificationRoomStudent = NotificationRoomsConsultant.findOne(id);
              //
              //     LocalCollectionForConsultantNotifications.insert({
              //         consNotifs : Meteor.subscribe('StudentConsultantNotification', notificationRoomStudent._id)
              //     })
              //   }
              // })
              IonModal.close('consultantDeleteModal');

            }
            if(index == 2){
              console.log("OK Clicked");
              $('.departmentSelectDelete').addClass("toBackground");

              var departmentHead = DepartmentHeads.find().fetch();

              if(departmentHead.length >= 1){
                LocalCollectionForDeanUpdateUserProfile.insert({
                  sub : Meteor.subscribe('whoRead', departmentHead[0].headId, {
                    onReady : function(){
                      var userForUpdate = Meteor.users.findOne({"_id" : departmentHead[0].headId});
                      var departmentLectures = DepartmentLectures.find({"departmentId" : Session.get('departmentIdForDelete')}).fetch();
                      var facultyDepartments = FacultyDepartments.find({"departmentId" : Session.get('departmentIdForDelete')}).fetch();
                      var lectures = Lectures.find().fetch();
                      var professorLectures = ProfessorLectures.find().fetch();
                      var studentLectures = StudentLectures.find().fetch();
                      var notificationRoom = NotificationRoomsClass.find().fetch();
                      var notifications = ProfessorNotifications.find().fetch();

                      Meteor.call('updateUserRole', userForUpdate._id, "DepartmentHead",function(error, result){
                        if(error){
                          if(Meteor.Device.isDesktop()){
                            $('.departmentSelectDelete').removeClass("toBackground");
                            alert("Something went wrong!");
                            return;
                          }
                          else{
                            $('.departmentSelectDelete').removeClass("toBackground");
                            navigator.notification.alert("Something went wrong!");
                            return;
                          }
                        }
                        else{
                          if(departmentHead.length >= 1){
                            for(let i = 0; i < departmentHead.length; i++){
                                departmentHeadDelete = DepartmentHeads.remove({"_id" : departmentHead[0]._id});
                                if(departmentHeadDelete){
                                    continue;
                                }
                                else{
                                  break;
                                  alert("Something went wrong");
                                  return;
                                }
                            }


                          }

                          if(departmentLectures.length >= 1){
                            for(let i = 0; i < departmentLectures.length; i++){
                              departmentLecturesDelete = DepartmentLectures.remove({"_id" : departmentLectures[i]._id});
                              if(departmentLecturesDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                            }
                          }

                          if(facultyDepartments.length >= 1){
                            for(let i = 0; i < facultyDepartments.length; i++){
                              facultyDepartmentsDelete = FacultyDepartments.remove({"_id" : facultyDepartments[i]._id});
                              if(facultyDepartmentsDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                            }
                          }

                          if(lectures.length >= 1){
                            for(let i = 0; i < lectures.length; i++){
                              lecturesDelete = Lectures.remove({"_id" : lectures[i]._id});
                              if(lecturesDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                            }
                          }

                          if(professorLectures.length >= 1){
                            for(let i = 0; i < professorLectures.length; i++){
                              professorLecturesDelete = ProfessorLectures.remove({"_id" : professorLectures[i]._id});
                              if(professorLecturesDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                            }
                          }

                          if(studentLectures.length >= 1){
                            for(let i = 0; i < studentLectures.length; i++){
                              studentLecturesDelete = StudentLectures.remove({"_id" : studentLectures[i]._id});
                              if(studentLecturesDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                            }
                          }

                          if(notificationRoom.length >= 1){
                            for(let i = 0; i < notificationRoom.length; i++){
                              notificationRoomDelete = NotificationRoomsClass.remove({"_id" : notificationRoom[i]._id});
                              if(notificationRoomDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                            }
                          }

                          if(notifications.length >= 1){
                            for(let i = 0; i < notifications.length; i++){
                              notificationsDelete = ProfessorNotifications.remove({"_id" : notifications[i]._id});
                              if(notificationsDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                            }
                          }

                          departmentDelete = Departments.remove({"_id" : Session.get('departmentIdForDelete')});

                          if(departmentDelete){

                            if(LocalCollectionForDeanFacultySub.find().count() > 0){
                              LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultySub.remove({});
                            }

                            if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
                              LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultyIdSub.remove({});
                            }

                            if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
                              LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultyDepartmentsSub.remove({});
                            }

                            if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
                              LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
                            }

                            if(LocalCollectionForDeanDeleteDepartmentLectures.find().count() > 0){
                              LocalCollectionForDeanDeleteDepartmentLectures.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteDepartmentLectures.remove({});
                            }

                            if(LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().count() > 0){
                              LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.remove({});
                            }

                            if(LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().count() > 0){
                              LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteStudentLecturesFromLectures.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessorLecturesFromLectures.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessorNotificationRoom.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessorNotificationRoom.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessorNotificationRoom.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.remove({});
                            }

                            if(LocalCollectionForDeanUpdateUserProfile.find().count() > 0){
                              LocalCollectionForDeanUpdateUserProfile.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanUpdateUserProfile.remove({});
                            }


                            var professor = Professors.findOne();

                            LocalCollectionForConsultantLectures.insert({
                              profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                                onReady : function(){
                                  professorLectures = ProfessorLectures.find().fetch();

                                  if(professorLectures.length >= 1){
                                      for(i = 0; i < professorLectures.length; i++){
                                        LocalCollectionForConsultantGetLectures.insert({
                                          lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                            onReady : function(){
                                              if(Lectures.find().count() > 0){
                                                  Session.set('lecturesGetted', true);
                                              }

                                            }
                                          })
                                        })
                                      }
                                  }

                                  else{
                                    console.log("no lecture");
                                    Session.set('lecturesGetted', true);
                                  }

                                }
                              })
                            })

                            LocalCollectionForConsultantProfessorNotificationRooms.insert({
                              consProfNotRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(), {
                                onReady : function(){
                                  notificationRoomClass = NotificationRoomsClass.find().fetch();

                                  for( i = 0; i < notificationRoomClass.length; i++){
                                    LocalCollectionForConsultantProfessorNotifications.insert({
                                      consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id)
                                    })
                                  }
                                }
                              })
                            })

                            if(Consultants.find().count() > 0){
                                var consultant = Consultants.findOne();

                                LocalCollectionForConsultantStudentsSub.insert({
                                        stuSub : Meteor.subscribe('ConsultantStudents', consultant._id, {
                                          onReady : function(){
                                            students = ConsultantStudents.find().fetch();

                                            if(students.length >= 1){
                                              for(i = students.length; i--;){
                                                LocalCollectionForConsultantStudentsIdsSub.insert({
                                                  stuIdSub : Meteor.subscribe('ProfessorStudents', students[i].studentId)
                                                })
                                              }

                                            }
                                            else{
                                              console.log("no student");
                                            }

                                          }
                                        })
                              })

                            }

                            LocalCollectionForConsultantNotificationRooms.insert({
                              consNotRoom : Meteor.subscribe('ConsultantsOwnedNotificationRooms', Meteor.userId())
                            })

                            // NotificationRoomsConsultant.find().observeChanges({
                            //   added : function(id, object){
                            //
                            //     var notificationRoomStudent = NotificationRoomsConsultant.findOne(id);
                            //
                            //     LocalCollectionForConsultantNotifications.insert({
                            //         consNotifs : Meteor.subscribe('StudentConsultantNotification', notificationRoomStudent._id)
                            //     })
                            //   }
                            // })

                            window.plugins.toast.showWithOptions({
                                message: "Deleted : " + department.departmentName,
                                duration: "short", // 2000 ms
                                position: "bottom",
                                styling: {
                                  opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                                  backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                                  textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                                  cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                                  horizontalPadding: 20, // iOS default 16, Android default 50
                                  verticalPadding: 16 // iOS default 12, Android default 30
                                }


                          })

                          $('.departmentSelectDelete').removeClass("toBackground");
                        }
                        else{
                          $('.departmentSelectDelete').removeClass("toBackground");
                          navigator.notification.alert("Something went wrong!");
                          return;
                        }
                      }


                    })
                  }
                })
              })
              }
              else{

                /* Eger departmentHead yok ise */
                  var departmentLectures = DepartmentLectures.find({"departmentId" : Session.get('departmentIdForDelete')}).fetch();
                  var facultyDepartments = FacultyDepartments.find({"departmentId" : Session.get('departmentIdForDelete')}).fetch();
                  var lectures = Lectures.find().fetch();
                  var professorLectures = ProfessorLectures.find().fetch();
                  var studentLectures = StudentLectures.find().fetch();
                  var notificationRoom = NotificationRoomsClass.find().fetch();
                  var notifications = ProfessorNotifications.find().fetch();

                  if(departmentLectures.length >= 1){
                    for(let i = 0; i < departmentLectures.length; i++){
                      departmentLecturesDelete = DepartmentLectures.remove({"_id" : departmentLectures[i]._id});
                      if(departmentLecturesDelete){
                          continue;
                      }
                      else{
                        break;
                        alert("Something went wrong");
                        return;
                      }
                    }
                  }

                  if(facultyDepartments.length >= 1){
                    for(let i = 0; i < facultyDepartments.length; i++){
                      facultyDepartmentsDelete = FacultyDepartments.remove({"_id" : facultyDepartments[i]._id});
                      if(facultyDepartmentsDelete){
                          continue;
                      }
                      else{
                        break;
                        alert("Something went wrong");
                        return;
                      }
                    }
                  }

                  if(lectures.length >= 1){
                    for(let i = 0; i < lectures.length; i++){
                      lecturesDelete = Lectures.remove({"_id" : lectures[i]._id});
                      if(lecturesDelete){
                          continue;
                      }
                      else{
                        break;
                        alert("Something went wrong");
                        return;
                      }
                    }
                  }

                  if(professorLectures.length >= 1){
                    for(let i = 0; i < professorLectures.length; i++){
                      professorLecturesDelete = ProfessorLectures.remove({"_id" : professorLectures[i]._id});
                      if(professorLecturesDelete){
                          continue;
                      }
                      else{
                        break;
                        alert("Something went wrong");
                        return;
                      }
                    }
                  }

                  if(studentLectures.length >= 1){
                    for(let i = 0; i < studentLectures.length; i++){
                      studentLecturesDelete = StudentLectures.remove({"_id" : studentLectures[i]._id});
                      if(studentLecturesDelete){
                          continue;
                      }
                      else{
                        break;
                        alert("Something went wrong");
                        return;
                      }
                    }
                  }

                  if(notificationRoom.length >= 1){
                    for(let i = 0; i < notificationRoom.length; i++){
                      notificationRoomDelete = NotificationRoomsClass.remove({"_id" : notificationRoom[i]._id});
                      if(notificationRoomDelete){
                          continue;
                      }
                      else{
                        break;
                        alert("Something went wrong");
                        return;
                      }
                    }
                  }

                  if(notifications.length >= 1){
                    for(let i = 0; i < notifications.length; i++){
                      notificationsDelete = ProfessorNotifications.remove({"_id" : notifications[i]._id});
                      if(notificationsDelete){
                          continue;
                      }
                      else{
                        break;
                        alert("Something went wrong");
                        return;
                      }
                    }
                  }

                  departmentDelete = Departments.remove({"_id" : Session.get('departmentIdForDelete')});

                  if(departmentDelete){

                    if(LocalCollectionForDeanFacultySub.find().count() > 0){
                      LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanFacultySub.remove({});
                    }

                    if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
                      LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanFacultyIdSub.remove({});
                    }

                    if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
                      LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanFacultyDepartmentsSub.remove({});
                    }

                    if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
                      LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
                    }

                    if(LocalCollectionForDeanDeleteDepartmentLectures.find().count() > 0){
                      LocalCollectionForDeanDeleteDepartmentLectures.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanDeleteDepartmentLectures.remove({});
                    }

                    if(LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().count() > 0){
                      LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanDeleteLecturesFromDepartmentLectures.remove({});
                    }

                    if(LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().count() > 0){
                      LocalCollectionForDeanDeleteStudentLecturesFromLectures.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanDeleteStudentLecturesFromLectures.remove({});
                    }

                    if(LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().count() > 0){
                      LocalCollectionForDeanDeleteProfessorLecturesFromLectures.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanDeleteProfessorLecturesFromLectures.remove({});
                    }

                    if(LocalCollectionForDeanDeleteProfessorNotificationRoom.find().count() > 0){
                      LocalCollectionForDeanDeleteProfessorNotificationRoom.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanDeleteProfessorNotificationRoom.remove({});
                    }

                    if(LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().count() > 0){
                      LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanDeleteProfessorNotificationsFromRoom.remove({});
                    }

                    if(LocalCollectionForDeanUpdateUserProfile.find().count() > 0){
                      LocalCollectionForDeanUpdateUserProfile.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForDeanUpdateUserProfile.remove({});
                    }

                    var professor = Professors.findOne();

                    LocalCollectionForConsultantLectures.insert({
                      profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                        onReady : function(){
                          professorLectures = ProfessorLectures.find().fetch();

                          if(professorLectures.length >= 1){
                              for(i = 0; i < professorLectures.length; i++){
                                LocalCollectionForConsultantGetLectures.insert({
                                  lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                    onReady : function(){
                                      if(Lectures.find().count() > 0){
                                          Session.set('lecturesGetted', true);
                                      }

                                    }
                                  })
                                })
                              }
                          }

                          else{
                            console.log("no lecture");
                            Session.set('lecturesGetted', true);
                          }

                        }
                      })
                    })

                    LocalCollectionForConsultantProfessorNotificationRooms.insert({
                      consProfNotRoom : Meteor.subscribe('ProfessorsOwnedNotificationRooms', Meteor.userId(), {
                        onReady : function(){
                          notificationRoomClass = NotificationRoomsClass.find().fetch();

                          for( i = 0; i < notificationRoomClass.length; i++){
                            LocalCollectionForConsultantProfessorNotifications.insert({
                              consProfNotifs : Meteor.subscribe('StudentProfessorNotification', notificationRoomClass[i]._id)
                            })
                          }
                        }
                      })
                    })

                    if(Consultants.find().count() > 0){
                        var consultant = Consultants.findOne();

                        LocalCollectionForConsultantStudentsSub.insert({
                                stuSub : Meteor.subscribe('ConsultantStudents', consultant._id, {
                                  onReady : function(){
                                    students = ConsultantStudents.find().fetch();

                                    if(students.length >= 1){
                                      for(i = students.length; i--;){
                                        LocalCollectionForConsultantStudentsIdsSub.insert({
                                          stuIdSub : Meteor.subscribe('ProfessorStudents', students[i].studentId)
                                        })
                                      }

                                    }
                                    else{
                                      console.log("no student");
                                    }

                                  }
                                })
                      })

                    }

                    LocalCollectionForConsultantNotificationRooms.insert({
                      consNotRoom : Meteor.subscribe('ConsultantsOwnedNotificationRooms', Meteor.userId())
                    })


                        window.plugins.toast.showWithOptions({
                            message: "Deleted : " + department.departmentName,
                            duration: "short", // 2000 ms
                            position: "bottom",
                            styling: {
                              opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                              backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                              textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                              cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                              horizontalPadding: 20, // iOS default 16, Android default 50
                              verticalPadding: 16 // iOS default 12, Android default 30
                            }


                      })

                      $('.departmentSelectDelete').removeClass("toBackground");
                    }
                    else{
                      $('.departmentSelectDelete').removeClass("toBackground");
                      navigator.notification.alert("Something went wrong!");
                      return;

                      }
              }


          }
        }, 'Warning', ['Cancel', 'OK']);


      }
    }
  },

  'click .departmentHeadSelectDelete' : function(e){
    e.preventDefault();

    if(LocalCollectionForDeanDeleteProfessorsFaculty.find().count() > 0){
      LocalCollectionForDeanDeleteProfessorsFaculty.find().map(function(eachSub){
        eachSub.sub.stop();
      })

      LocalCollectionForDeanDeleteProfessorsFaculty.remove({});
    }

    if(LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().count() > 0){
      LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().map(function(eachSub){
        eachSub.sub.stop();
      })

      LocalCollectionForDeanDeleteDepartmentHeadConsultant.remove({});
    }

    if(LocalCollectionForDeanDeleteProfessorLectures.find().count() > 0){
      LocalCollectionForDeanDeleteProfessorLectures.find().map(function(eachSub){
        eachSub.sub.stop();
      })

      LocalCollectionForDeanDeleteProfessorLectures.remove({});
    }

    if(LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().count() > 0){
      LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().map(function(eachSub){
        eachSub.sub.stop();
      })

      LocalCollectionForDeanDeleteLecturesFromProfessorLectures.remove({});
    }

    if(LocalCollectionForDeanDeleteConsultantStudentsDelete.find().count() > 0){
      LocalCollectionForDeanDeleteConsultantStudentsDelete.find().map(function(eachSub){
        eachSub.sub.stop();
      })

      LocalCollectionForDeanDeleteConsultantStudentsDelete.remove({});
    }

    $('.departmentHeadSelectDelete').find("a").remove();
    var target = e.currentTarget;
    var selectedDepartmentHeadId = target.id;

    var icon = '<a class="item-icon-right"><i class="icon ion-checkmark-circled lectureSelectTick"></i></a>'
    $('#' + selectedDepartmentHeadId).append(icon);

    /* have professor ID */
    $('#dataGet').removeClass('toHide');
    $('.departmentHeadSelectDelete').addClass("toBackground");

    var professor = Professors.find({"_id" : selectedDepartmentHeadId}).fetch();

    if(professor.length > 0){
      LocalCollectionForDeanDeleteProfessorsFaculty.insert({
        sub : Meteor.subscribe('deleteProfessorsFaculty', professor[0]._id)
      })

      LocalCollectionForDeanDeleteDepartmentHeadConsultant.insert({
        sub : Meteor.subscribe('Consultants', professor[0].userId, {
          onReady : function(){
            var consultant = Consultants.find({"userId" : professor[0].userId}).fetch();

            if(consultant.length > 0){
              LocalCollectionForDeanDeleteConsultantStudentsDelete.insert({
                sub : Meteor.subscribe('ConsultantStudents', consultant[0].userId)
              })

              LocalCollectionForDeanDeleteConsultantNotificationRoom.insert({
                sub : Meteor.subscribe('ConsultantsOwnedNotificationRooms', consultant[0].userId, {
                  onReady : function(){
                    var consultantNotifRoom = NotificationRoomsConsultant.find().fetch();

                    if(consultantNotifRoom.length > 0){
                      LocalCollectionForDeanDeleteConsultantNotifications.insert({
                        sub : Meteor.Subscribe('StudentConsultantNotification', consultantNotifRoom[0]._id)
                      })
                    }
                  }
                })
              })
            }

          }
        })
      })


      LocalCollectionForDeanDeleteProfessorLectures.insert({
        sub : Meteor.subscribe('ProfessorLectures', professor[0]._id, {
          onReady : function(){
            var profLectures = ProfessorLectures.find().fetch();

            if(profLectures.length > 0){
              for(let i = 0; i < profLectures.length; i++){
                LocalCollectionForDeanDeleteLecturesFromProfessorLectures.insert({
                  sub : Meteor.subscribe('Lectures', profLectures[i].Lecture, {
                    onReady : function(){

                      $('#dataGet').addClass('toHide');
                      $('.departmentSelectDelete').removeClass("toBackground");
                    }
                  })
                })
              }
            }
            else{
              console.log("prof dont have lectures");
              $('#dataGet').addClass('toHide');
              $('.departmentSelectDelete').removeClass("toBackground");
            }
          }
        })
      })

    }
    else{
      console.log("can't reach professors");
    }

    Session.set('departmentHeadIdForDelete', selectedDepartmentHeadId);



  },

  'click #depHeadDeleteButton' : function(e){
    e.preventDefault();

    if(isEqual(Session.get("departmentHeadIdForDelete"), "")){
      if(Meteor.Device.isDesktop()){
          alert("Please Select Department Head!");

      }
      else{
          navigator.notification.alert("Please Select Department Head!");

      }
    }
    else{
      var professor = Professors.find({"_id" : Session.get("departmentHeadIdForDelete")}).fetch(); /* for Delete */

      if(Meteor.Device.isDesktop()){
        if(confirm("You are deleting " + professor[0].professorName + ". Are you sure ? ") == true){

            $('.departmentHeadSelectDelete').addClass("toBackground");

            if(professor.length > 0){

              var departmentHead = DepartmentHeads.find({"headId" : professor[0].userId}).fetch();  /* for Delete */

              if(departmentHead.length > 0){
                var facultyDepartments = FacultyDepartments.find({"departmentId" : departmentHead[0].departmentId}).fetch(); /* for Update haveHead*/
              }

              var consultant = Consultants.find().fetch();  /* for Delete */
              var professorLectures = ProfessorLectures.find({"professorId" : professor[0]._id}).fetch(); /* for Delete */
              var professorsFaculty = ProfessorsFaculty.find({"profId" : professor[0]._id}).fetch(); /* for Delete */
              var lectures = Lectures.find().fetch(); /* for Update prof Name */
              var consultantStudents = ConsultantStudents.find().fetch();
              var consultantNotifRoom = NotificationRoomsConsultant.find().fetch();

              if(consultantNotifRoom.length > 0){
                var consultantNotifications = ConsultantNotifications.find().fetch();
              }


              LocalCollectionForDeanDeleteUserProfile.insert({
                sub : Meteor.subscribe('whoRead', professor[0].userId, {
                  onReady : function(){
                    Meteor.call('removeUser', professor[0].userId, function(error, result){
                      if(error){
                        $('.departmentSelectDelete').removeClass("toBackground");
                        alert("Something went wrong!");
                        return;
                      }
                      if(result){

                        if(departmentHead.length > 0){
                          departmentHeadDelete = DepartmentHeads.remove({"_id" : departmentHead[0]._id});
                          if(departmentHeadDelete){
                          }
                          else{
                            alert("Something went wrong");
                            return;
                          }

                        }

                        if(facultyDepartments.length > 0){
                          facultyDepartmentsUpdate = FacultyDepartments.update({"_id" : facultyDepartments[0]._id}, {
                            $set : {
                              "haveHead" : false
                            }
                          });
                          if(facultyDepartmentsUpdate){
                          }
                          else{
                            alert("Something went wrong");
                            return;
                          }
                        }

                        if(consultant.length > 0){

                          consultantDelete = Consultants.remove({"_id" : consultant[0]._id});
                          if(consultantDelete){

                          }
                          else{
                            alert("Something went wrong");
                            return;
                          }
                        }

                        if(professorLectures.length > 0){
                          for(let i = 0; i < professorLectures.length; i++){
                              professorLecturesDelete = ProfessorLectures.remove({"_id" : professorLectures[i]._id});
                              if(professorLecturesDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }
                        }

                        if(professorsFaculty.length > 0){
                          professorsFacultyDelete = ProfessorsFaculty.remove({"_id" : professorsFaculty[0]._id});
                          if(professorsFacultyDelete){

                          }
                          else{
                            alert("Something went wrong");
                            return;
                          }
                        }

                        if(lectures.length > 0){
                          for(let i = 0; i < lectures.length; i++){
                              lecturesUpdate = Lectures.update({"_id" : lectures[i]._id}, {
                                $set : {
                                  "profName" : " "
                                }
                              });
                              if(lecturesUpdate){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }
                        }

                        if(consultantStudents.length > 0){
                          for(let i = 0; i < consultantStudents.length; i++){
                              consultantStudentsDelete = ConsultantStudents.remove({"_id" : consultantStudents[i]._id})
                              if(consultantStudentsDelete){
                                continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }

                        }

                        if(consultantNotifRoom.length > 0){
                          for(let i = 0; i < consultantNotifRoom.length; i++){
                              consultantNotifRoomDelete = NotificationRoomsConsultant.remove({"_id" : consultantNotifRoom[i]._id})
                              if(consultantNotifRoomDelete){
                                continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }

                        }

                        if(consultantNotifications.length > 0){
                          for(let i = 0; i < consultantNotifications.length; i++){
                              consultantNotificationsDelete = NotificationRoomsConsultant.remove({"_id" : consultantNotifications[i]._id})
                              if(consultantNotificationsDelete){
                                continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }

                        }

                        professorDelete = Professors.remove({"_id" : professor[0]._id});

                        if(professorDelete){

                            if(LocalCollectionForDeanFacultySub.find().count() > 0){
                              LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultySub.remove({});
                            }

                            if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
                              LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultyIdSub.remove({});
                            }

                            if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
                              LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultyDepartmentsSub.remove({});
                            }

                            if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
                              LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDepartmentsSub.remove({});
                            }

                            if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
                              LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessor.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessor.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessor.remove({});
                            }

                            if(LocalCollectionForDeanDeleteUserProfile.find().count() > 0){
                              LocalCollectionForDeanDeleteUserProfile.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteUserProfile.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessorsFaculty.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessorsFaculty.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessorsFaculty.remove({});
                            }

                            if(LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().count() > 0){
                              LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteDepartmentHeadConsultant.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessorLectures.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessorLectures.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessorLectures.remove({});
                            }

                            if(LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().count() > 0){
                              LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteLecturesFromProfessorLectures.remove({});
                            }

                            if(LocalCollectionForDeanDeleteConsultantStudentsDelete.find().count() > 0){
                              LocalCollectionForDeanDeleteConsultantStudentsDelete.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteConsultantStudentsDelete.remove({});
                            }


                            if(LocalCollectionForDeanDeleteConsultantNotificationRoom.find().count() > 0){
                              LocalCollectionForDeanDeleteConsultantNotificationRoom.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteConsultantNotificationRoom.remove({});
                            }

                            if(LocalCollectionForDeanDeleteConsultantNotifications.find().count() > 0){
                              LocalCollectionForDeanDeleteConsultantNotifications.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteConsultantNotifications.remove({});
                            }

                            LocalCollectionForConsultantProfessor.insert({
            									sub : Meteor.subscribe('Professors', Meteor.userId(), {
            										onReady : function(){
                                  var professor = Professors.findOne();

                                  LocalCollectionForConsultantLectures.insert({
                                    profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                                      onReady : function(){
                                        professorLectures = ProfessorLectures.find().fetch();

                                        if(professorLectures.length >= 1){
                                            for(i = 0; i < professorLectures.length; i++){
                                              LocalCollectionForConsultantGetLectures.insert({
                                                lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                                  onReady : function(){
                                                    if(Lectures.find().count() > 0){
                                                        Session.set('lecturesGetted', true);
                                                    }

                                                  }
                                                })
                                              })
                                            }
                                        }

                                        else{
                                          console.log("no lecture");
                                          Session.set('lecturesGetted', true);
                                        }

                                      }
                                    })
                                  })
            										}
            									})
            								})

                            LocalCollectionForConsultantSub.insert({
            									sub : Meteor.subscribe('Consultants', Meteor.userId(), {
            										onReady : function(){
            										}
            									})
            								})

                              toastr.success(professor[0].professorName + " is deleted ", "Success");

                              $('.departmentHeadSelectDelete').removeClass("toBackground");
                        }
                        else{
                          console.log("SILME ISLEMINDE HATA OLDU");
                          $('.departmentHeadSelectDelete').removeClass("toBackground");
                          alert("Something went wrong!");
                          return;
                        }

                      }
                    })
                  }
                })
              })

              IonModal.close('consultantDeleteModal');
            }
            else{
              console.log("PROFESSOR LENGTH < 0");
            }



        }
        else{
          console.log("DONT DELETE DESKTOP!");

          if(LocalCollectionForDeanFacultySub.find().count() > 0){
            LocalCollectionForDeanFacultySub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanFacultySub.remove({});
          }

          if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
            LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanFacultyIdSub.remove({});
          }

          if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
            LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanFacultyDepartmentsSub.remove({});
          }

          if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
            LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDepartmentsSub.remove({});
          }

          if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
            LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
          }

          if(LocalCollectionForDeanDeleteProfessor.find().count() > 0){
            LocalCollectionForDeanDeleteProfessor.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteProfessor.remove({});
          }

          if(LocalCollectionForDeanDeleteUserProfile.find().count() > 0){
            LocalCollectionForDeanDeleteUserProfile.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteUserProfile.remove({});
          }

          if(LocalCollectionForDeanDeleteProfessorsFaculty.find().count() > 0){
            LocalCollectionForDeanDeleteProfessorsFaculty.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteProfessorsFaculty.remove({});
          }

          if(LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().count() > 0){
            LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteDepartmentHeadConsultant.remove({});
          }

          if(LocalCollectionForDeanDeleteProfessorLectures.find().count() > 0){
            LocalCollectionForDeanDeleteProfessorLectures.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteProfessorLectures.remove({});
          }

          if(LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().count() > 0){
            LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteLecturesFromProfessorLectures.remove({});
          }

          if(LocalCollectionForDeanDeleteConsultantStudentsDelete.find().count() > 0){
            LocalCollectionForDeanDeleteConsultantStudentsDelete.find().map(function(eachSub){
              eachSub.sub.stop();
            })

            LocalCollectionForDeanDeleteConsultantStudentsDelete.remove({});
          }

          LocalCollectionForConsultantProfessor.insert({
            sub : Meteor.subscribe('Professors', Meteor.userId(), {
              onReady : function(){
                var professor = Professors.findOne();

                LocalCollectionForConsultantLectures.insert({
                  profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                    onReady : function(){
                      professorLectures = ProfessorLectures.find().fetch();

                      if(professorLectures.length >= 1){
                          for(i = 0; i < professorLectures.length; i++){
                            LocalCollectionForConsultantGetLectures.insert({
                              lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                onReady : function(){
                                  if(Lectures.find().count() > 0){
                                      Session.set('lecturesGetted', true);
                                  }

                                }
                              })
                            })
                          }
                      }

                      else{
                        console.log("no lecture");
                        Session.set('lecturesGetted', true);
                      }

                    }
                  })
                })
              }
            })
          })

          LocalCollectionForConsultantSub.insert({
            sub : Meteor.subscribe('Consultants', Meteor.userId(), {
              onReady : function(){
              }
            })
          })

          $('.departmentHeadSelectDelete').removeClass("toBackground");

          IonModal.close('consultantDeleteModal');
        }
      }
      else{
        console.log("mobile!");
        navigator.notification.confirm("You are deleting " + professor[0].professorName + ". Are you sure ? ", function(index){
          if(index == 1){
            console.log("Cancel Clicked");

            if(LocalCollectionForDeanFacultySub.find().count() > 0){
              LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanFacultySub.remove({});
            }

            if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
              LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanFacultyIdSub.remove({});
            }

            if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
              LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanFacultyDepartmentsSub.remove({});
            }

            if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
              LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDepartmentsSub.remove({});
            }

            if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
              LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
            }

            if(LocalCollectionForDeanDeleteProfessor.find().count() > 0){
              LocalCollectionForDeanDeleteProfessor.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteProfessor.remove({});
            }

            if(LocalCollectionForDeanDeleteUserProfile.find().count() > 0){
              LocalCollectionForDeanDeleteUserProfile.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteUserProfile.remove({});
            }

            if(LocalCollectionForDeanDeleteProfessorsFaculty.find().count() > 0){
              LocalCollectionForDeanDeleteProfessorsFaculty.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteProfessorsFaculty.remove({});
            }

            if(LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().count() > 0){
              LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteDepartmentHeadConsultant.remove({});
            }

            if(LocalCollectionForDeanDeleteProfessorLectures.find().count() > 0){
              LocalCollectionForDeanDeleteProfessorLectures.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteProfessorLectures.remove({});
            }

            if(LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().count() > 0){
              LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteLecturesFromProfessorLectures.remove({});
            }

            if(LocalCollectionForDeanDeleteConsultantStudentsDelete.find().count() > 0){
              LocalCollectionForDeanDeleteConsultantStudentsDelete.find().map(function(eachSub){
                eachSub.sub.stop();
              })

              LocalCollectionForDeanDeleteConsultantStudentsDelete.remove({});
            }

            LocalCollectionForConsultantProfessor.insert({
              sub : Meteor.subscribe('Professors', Meteor.userId(), {
                onReady : function(){
                  var professor = Professors.findOne();

                  LocalCollectionForConsultantLectures.insert({
                    profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                      onReady : function(){
                        professorLectures = ProfessorLectures.find().fetch();

                        if(professorLectures.length >= 1){
                            for(i = 0; i < professorLectures.length; i++){
                              LocalCollectionForConsultantGetLectures.insert({
                                lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                  onReady : function(){
                                    if(Lectures.find().count() > 0){
                                        Session.set('lecturesGetted', true);
                                    }

                                  }
                                })
                              })
                            }
                        }

                        else{
                          console.log("no lecture");
                          Session.set('lecturesGetted', true);
                        }

                      }
                    })
                  })
                }
              })
            })

            LocalCollectionForConsultantSub.insert({
              sub : Meteor.subscribe('Consultants', Meteor.userId(), {
                onReady : function(){
                }
              })
            })

            $('.departmentHeadSelectDelete').removeClass("toBackground");

            IonModal.close('consultantDeleteModal');
          }
          if(index == 2){
            console.log("OK clicked");
            $('.departmentHeadSelectDelete').addClass("toBackground");

            if(professor.length > 0){

              var departmentHead = DepartmentHeads.find({"headId" : professor[0].userId}).fetch();  /* for Delete */

              if(departmentHead.length > 0){
                var facultyDepartments = FacultyDepartments.find({"departmentId" : departmentHead[0].departmentId}).fetch(); /* for Update haveHead*/
              }

              var consultant = Consultants.find().fetch();  /* for Delete */
              var professorLectures = ProfessorLectures.find({"professorId" : professor[0]._id}).fetch(); /* for Delete */
              var professorsFaculty = ProfessorsFaculty.find({"profId" : professor[0]._id}).fetch(); /* for Delete */
              var lectures = Lectures.find().fetch(); /* for Update prof Name */
              var consultantStudents = ConsultantStudents.find().fetch();
              var consultantNotifRoom = NotificationRoomsConsultant.find().fetch();

              if(consultantNotifRoom.length > 0){
                var consultantNotifications = ConsultantNotifications.find().fetch();
              }

              LocalCollectionForDeanDeleteUserProfile.insert({
                sub : Meteor.subscribe('whoRead', professor[0].userId, {
                  onReady : function(){
                    Meteor.call('removeUser', professor[0].userId, function(error, result){
                      if(error){
                        $('.departmentSelectDelete').removeClass("toBackground");
                        alert("Something went wrong!");
                        return;
                      }
                      else{
                        if(departmentHead.length > 0){
                          departmentHeadDelete = DepartmentHeads.remove({"_id" : departmentHead[0]._id});
                          if(departmentHeadDelete){
                          }
                          else{
                            alert("Something went wrong");
                            return;
                          }

                        }

                        if(facultyDepartments.length > 0){
                          facultyDepartmentsUpdate = FacultyDepartments.update({"_id" : facultyDepartments[0]._id}, {
                            $set : {
                              "haveHead" : false
                            }
                          });
                          if(facultyDepartmentsUpdate){
                          }
                          else{
                            alert("Something went wrong");
                            return;
                          }
                        }

                        if(consultant.length > 0){

                          consultantDelete = Consultants.remove({"_id" : consultant[0]._id});
                          if(consultantDelete){

                          }
                          else{
                            alert("Something went wrong");
                            return;
                          }
                        }

                        if(professorLectures.length > 0){
                          for(let i = 0; i < professorLectures.length; i++){
                              professorLecturesDelete = ProfessorLectures.remove({"_id" : professorLectures[i]._id});
                              if(professorLecturesDelete){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }
                        }

                        if(professorsFaculty.length > 0){
                          professorsFacultyDelete = ProfessorsFaculty.remove({"_id" : professorsFaculty[0]._id});
                          if(professorsFacultyDelete){

                          }
                          else{
                            alert("Something went wrong");
                            return;
                          }
                        }

                        if(lectures.length > 0){
                          for(let i = 0; i < lectures.length; i++){
                              lecturesUpdate = Lectures.update({"_id" : lectures[i]._id}, {
                                $set : {
                                  "profName" : " "
                                }
                              });
                              if(lecturesUpdate){
                                  continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }
                        }

                        if(consultantStudents.length > 0){
                          for(let i = 0; i < consultantStudents.length; i++){
                              consultantStudentsDelete = ConsultantStudents.remove({"_id" : consultantStudents[i]._id})
                              if(consultantStudentsDelete){
                                continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }

                        }

                        if(consultantNotifRoom.length > 0){
                          for(let i = 0; i < consultantNotifRoom.length; i++){
                              consultantNotifRoomDelete = NotificationRoomsConsultant.remove({"_id" : consultantNotifRoom[i]._id})
                              if(consultantNotifRoomDelete){
                                continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }

                        }

                        if(consultantNotifications.length > 0){
                          for(let i = 0; i < consultantNotifications.length; i++){
                              consultantNotificationsDelete = NotificationRoomsConsultant.remove({"_id" : consultantNotifications[i]._id})
                              if(consultantNotificationsDelete){
                                continue;
                              }
                              else{
                                break;
                                alert("Something went wrong");
                                return;
                              }
                          }

                        }


                        professorDelete = Professors.remove({"_id" : professor[0]._id});

                        if(professorDelete){

                            if(LocalCollectionForDeanFacultySub.find().count() > 0){
                              LocalCollectionForDeanFacultySub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultySub.remove({});
                            }

                            if(LocalCollectionForDeanFacultyIdSub.find().count() > 0){
                              LocalCollectionForDeanFacultyIdSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultyIdSub.remove({});
                            }

                            if(LocalCollectionForDeanFacultyDepartmentsSub.find().count() > 0){
                              LocalCollectionForDeanFacultyDepartmentsSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanFacultyDepartmentsSub.remove({});
                            }

                            if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
                              LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDepartmentsSub.remove({});
                            }

                            if(LocalCollectionForDeanDeleteDepartmentHeadsSub.find().count() > 0){
                              LocalCollectionForDeanDeleteDepartmentHeadsSub.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteDepartmentHeadsSub.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessor.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessor.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessor.remove({});
                            }

                            if(LocalCollectionForDeanDeleteUserProfile.find().count() > 0){
                              LocalCollectionForDeanDeleteUserProfile.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteUserProfile.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessorsFaculty.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessorsFaculty.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessorsFaculty.remove({});
                            }

                            if(LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().count() > 0){
                              LocalCollectionForDeanDeleteDepartmentHeadConsultant.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteDepartmentHeadConsultant.remove({});
                            }

                            if(LocalCollectionForDeanDeleteProfessorLectures.find().count() > 0){
                              LocalCollectionForDeanDeleteProfessorLectures.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteProfessorLectures.remove({});
                            }

                            if(LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().count() > 0){
                              LocalCollectionForDeanDeleteLecturesFromProfessorLectures.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteLecturesFromProfessorLectures.remove({});
                            }

                            if(LocalCollectionForDeanDeleteConsultantStudentsDelete.find().count() > 0){
                              LocalCollectionForDeanDeleteConsultantStudentsDelete.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteConsultantStudentsDelete.remove({});
                            }

                            if(LocalCollectionForDeanDeleteConsultantNotificationRoom.find().count() > 0){
                              LocalCollectionForDeanDeleteConsultantNotificationRoom.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteConsultantNotificationRoom.remove({});
                            }

                            if(LocalCollectionForDeanDeleteConsultantNotifications.find().count() > 0){
                              LocalCollectionForDeanDeleteConsultantNotifications.find().map(function(eachSub){
                                eachSub.sub.stop();
                              })

                              LocalCollectionForDeanDeleteConsultantNotifications.remove({});
                            }

                            LocalCollectionForConsultantProfessor.insert({
                              sub : Meteor.subscribe('Professors', Meteor.userId(), {
                                onReady : function(){
                                  var professor = Professors.findOne();

                                  LocalCollectionForConsultantLectures.insert({
                                    profLecSub :  Meteor.subscribe('ProfessorLectures', professor._id, {
                                      onReady : function(){
                                        professorLectures = ProfessorLectures.find().fetch();

                                        if(professorLectures.length >= 1){
                                            for(i = 0; i < professorLectures.length; i++){
                                              LocalCollectionForConsultantGetLectures.insert({
                                                lecSub : Meteor.subscribe('Lectures', professorLectures[i].Lecture, {
                                                  onReady : function(){
                                                    if(Lectures.find().count() > 0){
                                                        Session.set('lecturesGetted', true);
                                                    }

                                                  }
                                                })
                                              })
                                            }
                                        }

                                        else{
                                          console.log("no lecture");
                                          Session.set('lecturesGetted', true);
                                        }

                                      }
                                    })
                                  })
                                }
                              })
                            })

                            LocalCollectionForConsultantSub.insert({
                              sub : Meteor.subscribe('Consultants', Meteor.userId(), {
                                onReady : function(){
                                }
                              })
                            })

                            window.plugins.toast.showWithOptions({
                                message: professor[0].professorName + " is deleted ",
                                duration: "short", // 2000 ms
                                position: "bottom",
                                styling: {
                                  opacity: 1, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                                  backgroundColor: '#45cea2', // make sure you use #RRGGBB. Default #333333
                                  textColor: '#FFFFFF', // Ditto. Default #FFFFFF
                                  cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                                  horizontalPadding: 20, // iOS default 16, Android default 50
                                  verticalPadding: 16 // iOS default 12, Android default 30
                            }
                          })


                            $('.departmentHeadSelectDelete').removeClass("toBackground");
                        }
                        else{
                          console.log("SILME ISLEMINDE HATA OLDU");
                          $('.departmentHeadSelectDelete').removeClass("toBackground");
                          navigator.notification.alert("Something went wrong!");
                          return;
                        }

                      }
                    })
                  }
                })
              })

              IonModal.close('consultantDeleteModal');
            }
            else{
              console.log("PROFESSOR LENGTH < 0");
            }
          }
        }) /* NAVIGATOR CLOSE */
      }
    }
  }

}, 'Warning', ['Cancel', 'OK']);

}
