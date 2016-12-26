if(Meteor.isCordova || Meteor.isClient){

  Template.consultantLayout.events({
    'click #homeButtoniOS' : function(e){
			e.preventDefault();
			templateRender('consultantHome', '#consultantMain');

		},

		'click #classesButtoniOS' : function(e){
			e.preventDefault();
			templateRender('consultantClasses', '#consultantMain');

		},

		'click #studentsButtoniOS' : function(e){
			e.preventDefault();
			templateRender('consultantStudents', '#consultantMain');

		},

    'click #depProcessButtoniOS' : function(e){
      e.preventDefault();
      templateRender('consultantDepartmentProcesses', '#consultantMain');
    },

    'click #facProcessButtoniOS' : function(e){
      e.preventDefault();
      templateRender('consultantFacultyProcesses', '#consultantMain');
    },

		'click #busButtoniOS' : function(e){
			e.preventDefault();
			templateRender('busTime', '#consultantMain');
		},

		'click #foodButtoniOS' : function(e){
			e.preventDefault();
			templateRender('foodList', '#consultantMain');
		},

		'click #feedBackButtoniOS' : function(e){
			e.preventDefault();
			templateRender('feedBack', '#consultantMain');
		},

		'click #settingsButtoniOS' : function(e){
			e.preventDefault();
			templateRender('consultantSettings', '#consultantMain');
		},

    'click #logOutButtoniOS' : function(e){
			e.preventDefault();
			IonSideMenu.snapper.close();

      if(Meteor.Device.isDesktop()){
        if(LocalCollectionForConsultantLectures.find().count() > 0){
          LocalCollectionForConsultantLectures.find().map(function(eachConsultantLecture){
            eachConsultantLecture.profLecSub.stop();
          })

          LocalCollectionForConsultantLectures.remove({});
        }

        if(LocalCollectionForConsultantGetLectures.find().count() > 0){
          LocalCollectionForConsultantGetLectures.find().map(function(eachConsultantGetLecture){
            eachConsultantGetLecture.lecSub.stop();
          })

          LocalCollectionForConsultantGetLectures.remove({});
        }

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

        if(LocalCollectionForConsultantStudentsSub.find().count() > 0){
          LocalCollectionForConsultantStudentsSub.find().map(function(eachProfLecture){
            eachProfLecture.stuSub.stop();
          })

          LocalCollectionForConsultantStudentsSub.remove({});
        }

        if(LocalCollectionForConsultantStudentsIdsSub.find().count() > 0){
          LocalCollectionForConsultantStudentsIdsSub.find().map(function(eachProfLecture){
            eachProfLecture.stuIdSub.stop();
          })

          LocalCollectionForConsultantStudentsIdsSub.remove({});
        }


        if(LocalCollectionForConsultantProfessorNotificationRooms.find().count() > 0){
          LocalCollectionForConsultantProfessorNotificationRooms.find().map(function(eachConsultantProfNotifRoom){
            eachConsultantProfNotifRoom.consProfNotRoom.stop();
          })

          LocalCollectionForConsultantProfessorNotificationRooms.remove({});
        }

        if(LocalCollectionForConsultantNotificationRooms.find().count() > 0){
          LocalCollectionForConsultantNotificationRooms.find().map(function(eachConsultantfNotifRoom){
            eachConsultantfNotifRoom.consNotRoom.stop();
          })

          LocalCollectionForConsultantNotificationRooms.remove({});
        }

        if(LocalCollectionForConsultantProfessorNotifications.find().count() > 0){
          LocalCollectionForConsultantProfessorNotifications.find().map(function(eachConsProfNotifs){
            eachConsProfNotifs.consProfNotifs.stop();
          })

          LocalCollectionForConsultantProfessorNotifications.remove({});
        }


        if(LocalCollectionForConsultantNotifications.find().count() > 0){
          LocalCollectionForConsultantNotifications.find().map(function(eachConsNotif){
            eachConsNotif.consNotifs.stop();
          })

          LocalCollectionForConsultantNotifications.remove({});
        }

        if(LocalCollectionForConsultantProfessorLectureNotificationRoom.find().count() > 0){
          LocalCollectionForConsultantProfessorLectureNotificationRoom.find().map(function(eachConsProfNotifRoom){
            eachConsProfNotifRoom.consultantProfLectureNotifRoom.stop();
          })

          LocalCollectionForConsultantProfessorLectureNotificationRoom.remove({});
        }

        if(LocalCollectionForDepartmentHeadsSub.find().count() > 0){
          LocalCollectionForDepartmentHeadsSub.find().map(function(eachDepHeadSub){
            eachDepHeadSub.depHeadSub.stop();
          })

          LocalCollectionForDepartmentHeadsSub.remove({});
        }

        if(LocalCollectionForConsultantDepartmentsSub.find().count() > 0){
          LocalCollectionForConsultantDepartmentsSub.find().map(function(eachDepSub){
            eachDepSub.depSub.stop();
          })

          LocalCollectionForConsultantDepartmentsSub.remove({});
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

        if(LocalCollectionForConsultantProfessor.find().count() > 0){
          LocalCollectionForConsultantProfessor.find().map(function(eachSub){
            eachSub.sub.stop();
          })

          LocalCollectionForConsultantProfessor.remove({});
        }

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

        if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
          LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
            eachSub.sub.stop();
          })

          LocalCollectionForDeanDepartmentsSub.remove({});
        }

        if(LocalCollectionForConsultantSub.find().count() > 0){
          LocalCollectionForConsultantSub.find().map(function(eachSub){
            eachSub.sub.stop();
          })

          LocalCollectionForConsultantSub.remove({});
        }


        // sendUniversityMessage.close();
				// takeUniversityMessageResponse.close();
				// sendProfessorMessage.close();
				// takeProfessorMessage.close();
				// takeProfessorMessageResponse.close();
				// sendConsultantMessage.close();
				// takeConsultantMessage.close();
				// takeConsultantMessageResponse.close();

        Session.set('lecturesGetted', false);
        Session.set('consultantStudentStatus', false);
        Meteor.logout();
      }
      else{
        navigator.notification.confirm('Are you sure log out the system?', function(index){
          if(index == 1){
            console.dir('Cancel Clicked');
          }
          if(index == 2){
            console.dir('Ok Clicked');
            Meteor.logout(function(err){

              if(err){
                console.dir("LOGOUT ERROR APPEARED : " + err);
              }
              else{
                if(LocalCollectionForConsultantLectures.find().count() > 0){
                  LocalCollectionForConsultantLectures.find().map(function(eachConsultantLecture){
                    eachConsultantLecture.profLecSub.stop();
                  })

                  LocalCollectionForConsultantLectures.remove({});
                }

                if(LocalCollectionForConsultantGetLectures.find().count() > 0){
                  LocalCollectionForConsultantGetLectures.find().map(function(eachConsultantGetLecture){
                    eachConsultantGetLecture.lecSub.stop();
                  })

                  LocalCollectionForConsultantGetLectures.remove({});
                }

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

                if(LocalCollectionForConsultantStudentsSub.find().count() > 0){
                  LocalCollectionForConsultantStudentsSub.find().map(function(eachProfLecture){
                    eachProfLecture.stuSub.stop();
                  })

                  LocalCollectionForConsultantStudentsSub.remove({});
                }

                if(LocalCollectionForConsultantStudentsIdsSub.find().count() > 0){
                  LocalCollectionForConsultantStudentsIdsSub.find().map(function(eachProfLecture){
                    eachProfLecture.stuIdSub.stop();
                  })

                  LocalCollectionForConsultantStudentsIdsSub.remove({});
                }


                if(LocalCollectionForConsultantProfessorNotificationRooms.find().count() > 0){
                  LocalCollectionForConsultantProfessorNotificationRooms.find().map(function(eachConsultantProfNotifRoom){
                    eachConsultantProfNotifRoom.consProfNotRoom.stop();
                  })

                  LocalCollectionForConsultantProfessorNotificationRooms.remove({});
                }

                if(LocalCollectionForConsultantNotificationRooms.find().count() > 0){
                  LocalCollectionForConsultantNotificationRooms.find().map(function(eachConsultantfNotifRoom){
                    eachConsultantfNotifRoom.consNotRoom.stop();
                  })

                  LocalCollectionForConsultantNotificationRooms.remove({});
                }

                if(LocalCollectionForConsultantProfessorNotifications.find().count() > 0){
                  LocalCollectionForConsultantProfessorNotifications.find().map(function(eachConsProfNotifs){
                    eachConsProfNotifs.consProfNotifs.stop();
                  })

                  LocalCollectionForConsultantProfessorNotifications.remove({});
                }


                if(LocalCollectionForConsultantNotifications.find().count() > 0){
                  LocalCollectionForConsultantNotifications.find().map(function(eachConsNotif){
                    eachConsNotif.consNotifs.stop();
                  })

                  LocalCollectionForConsultantNotifications.remove({});
                }

                if(LocalCollectionForConsultantProfessorLectureNotificationRoom.find().count() > 0){
                  LocalCollectionForConsultantProfessorLectureNotificationRoom.find().map(function(eachConsProfNotifRoom){
                    eachConsProfNotifRoom.consultantProfLectureNotifRoom.stop();
                  })

                  LocalCollectionForConsultantProfessorLectureNotificationRoom.remove({});
                }

                if(LocalCollectionForDepartmentHeadsSub.find().count() > 0){
                  LocalCollectionForDepartmentHeadsSub.find().map(function(eachDepHeadSub){
                    eachDepHeadSub.depHeadSub.stop();
                  })

                  LocalCollectionForDepartmentHeadsSub.remove({});
                }

                if(LocalCollectionForConsultantDepartmentsSub.find().count() > 0){
                  LocalCollectionForConsultantDepartmentsSub.find().map(function(eachDepSub){
                    eachDepSub.depSub.stop();
                  })

                  LocalCollectionForConsultantDepartmentsSub.remove({});
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

                if(LocalCollectionForConsultantProfessor.find().count() > 0){
                  LocalCollectionForConsultantProfessor.find().map(function(eachSub){
                    eachSub.sub.stop();
                  })

                  LocalCollectionForConsultantProfessor.remove({});
                }

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

                if(LocalCollectionForDeanDepartmentsSub.find().count() > 0){
                  LocalCollectionForDeanDepartmentsSub.find().map(function(eachSub){
                    eachSub.sub.stop();
                  })

                  LocalCollectionForDeanDepartmentsSub.remove({});
                }

                if(LocalCollectionForConsultantSub.find().count() > 0){
                  LocalCollectionForConsultantSub.find().map(function(eachSub){
                    eachSub.sub.stop();
                  })

                  LocalCollectionForConsultantSub.remove({});
                }

                // sendUniversityMessage.close();
        				// takeUniversityMessageResponse.close();
        				// sendProfessorMessage.close();
        				// takeProfessorMessage.close();
        				// takeProfessorMessageResponse.close();
        				// sendConsultantMessage.close();
        				// takeConsultantMessage.close();
        				// takeConsultantMessageResponse.close();

              }
            });
          }
        },'Warning', ['Cancel', 'OK']);

      }


		}

  })

  Template.consultantLayout.helpers({
    professor : function(){
      if(Professors.find().count() > 0){
        return true;
      }
      else{
        return false;
      }
    },

    departmentHead : function(){

      if(DepartmentHeads.find().count() > 0){
        return true;
      }
      else{
        return false;
      }

    },

    consultant : function(){
      if(Consultants.find().count() > 0){
        return true;
      }
      else{
        return false;
      }
    },

    dean : function(){
      if(Deans.find().count() > 0){
        return true;
      }
      else{
        return false;
      }
    }
  })
}
