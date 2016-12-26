if(Meteor.isCordova || Meteor.isClient){

  Template.professorLayout.events({
    'click #homeButtoniOS' : function(e){
			e.preventDefault();
			templateRender('professorHome', '#professorMain');

		},

		'click #classesButtoniOS' : function(e){
			e.preventDefault();
      templateRender('professorClasses', '#professorMain');

		},

		'click #busButtoniOS' : function(e){
			e.preventDefault();
			templateRender('busTime', '#professorMain');
		},

		'click #foodButtoniOS' : function(e){
			e.preventDefault();
			templateRender('foodList', '#professorMain');
		},

		'click #feedBackButtoniOS' : function(e){
			e.preventDefault();
			templateRender('feedBack', '#professorMain');
		},

		'click #settingsButtoniOS' : function(e){
			e.preventDefault();
			templateRender('professorSettings', '#professorMain');
		},

    'click #logOutButtoniOS' : function(e){
			e.preventDefault();
			IonSideMenu.snapper.close();

      if(Meteor.Device.isDesktop()){

        if(LocalCollectionForProfessorLectures.find().count() > 0){
          LocalCollectionForProfessorLectures.find().map(function(eachProfLecture){
            eachProfLecture.profLec.stop();
          })

          LocalCollectionForProfessorLectures.remove({});
        }

        if(LocalCollectionForProfessorGetLectures.find().count() > 0){
          LocalCollectionForProfessorGetLectures.find().map(function(eachLecture){
            eachLecture.lec.stop();
          })

          LocalCollectionForProfessorGetLectures.remove({});
        }

        if(LocalCollectionForProfessorNotificationRooms.find().count() > 0){
          LocalCollectionForProfessorNotificationRooms.find().map(function(eachNotifRoom){
            eachNotifRoom.profNotifRoom.stop();
          })

          LocalCollectionForProfessorNotificationRooms.remove({});
        }

        if(LocalCollectionForProfessorNotifications.find().count() > 0){
          LocalCollectionForProfessorNotifications.find().map(function(eachNotifRoom){
            eachNotifRoom.profNotifs.stop();
          })

          LocalCollectionForProfessorNotifications.remove({});
        }

        if(LocalCollectionForProfessorStudentLecturesSub.find().count() > 0){
          LocalCollectionForProfessorStudentLecturesSub.find().map(function(eachProfLecture){
            eachProfLecture.studentLectureSub.stop();
          })

          LocalCollectionForProfessorStudentLecturesSub.remove({});
        }

        if(LocalCollectionForProfessorStudentIdsSub.find().count() > 0){
          LocalCollectionForProfessorStudentIdsSub.find().map(function(eachLecture){
            eachLecture.studentIdSub.stop();
          })

          LocalCollectionForProfessorStudentIdsSub.remove({});
        }

        if(LocalCollectionForProfessorLectureNotificationRoom.find().count() > 0){
          LocalCollectionForProfessorLectureNotificationRoom.find().map(function(eachProfLectureNotifRoom){
            eachProfLectureNotifRoom.profLectureNotifRoom.stop();
          })

          LocalCollectionForProfessorLectureNotificationRoom.remove({});
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
                if(LocalCollectionForProfessorLectures.find().count() > 0){
                  LocalCollectionForProfessorLectures.find().map(function(eachProfLecture){
                    eachProfLecture.profLec.stop();
                  })

                  LocalCollectionForProfessorLectures.remove({});
                }

                if(LocalCollectionForProfessorGetLectures.find().count() > 0){
                  LocalCollectionForProfessorGetLectures.find().map(function(eachLecture){
                    eachLecture.lec.stop();
                  })

                  LocalCollectionForProfessorGetLectures.remove({});
                }

                if(LocalCollectionForProfessorNotificationRooms.find().count() > 0){
                  LocalCollectionForProfessorNotificationRooms.find().map(function(eachNotifRoom){
                    eachNotifRoom.profNotifRoom.stop();
                  })

                  LocalCollectionForProfessorNotificationRooms.remove({});
                }

                if(LocalCollectionForProfessorNotifications.find().count() > 0){
                  LocalCollectionForProfessorNotifications.find().map(function(eachNotifRoom){
                    eachNotifRoom.profNotifs.stop();
                  })

                  LocalCollectionForProfessorNotifications.remove({});
                }

                if(LocalCollectionForProfessorStudentLecturesSub.find().count() > 0){
                  LocalCollectionForProfessorStudentLecturesSub.find().map(function(eachProfLecture){
                    eachProfLecture.studentLectureSub.stop();
                  })

                  LocalCollectionForProfessorStudentLecturesSub.remove({});
                }

                if(LocalCollectionForProfessorStudentIdsSub.find().count() > 0){
                  LocalCollectionForProfessorStudentIdsSub.find().map(function(eachLecture){
                    eachLecture.studentIdSub.stop();
                  })

                  LocalCollectionForProfessorStudentIdsSub.remove({});
                }

                if(LocalCollectionForProfessorLectureNotificationRoom.find().count() > 0){
                  LocalCollectionForProfessorLectureNotificationRoom.find().map(function(eachProfLectureNotifRoom){
                    eachProfLectureNotifRoom.profLectureNotifRoom.stop();
                  })

                  LocalCollectionForProfessorLectureNotificationRoom.remove({});
                }

                sendUniversityMessage.close();
        				takeUniversityMessageResponse.close();
        				sendProfessorMessage.close();
        				takeProfessorMessage.close();
        				takeProfessorMessageResponse.close();
        				sendConsultantMessage.close();
        				takeConsultantMessage.close();
        				takeConsultantMessageResponse.close();

								console.dir("LOGGED OUT!");
							}
						});
					}
				},'Warning', ['Cancel', 'OK']);

			}

		 }

  })
}
