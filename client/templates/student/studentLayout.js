if(Meteor.isCordova || Meteor.isClient){

	Template.studentLayout.events({
		'click #homeButtoniOS' : function(e){
			e.preventDefault();
			templateRender('studentHome', '#studentMain');

		},

		'click #professorButtoniOS' : function(e){
			e.preventDefault();
			templateRender('studentProfessor', '#studentMain');

		},

		'click #consultantButtoniOS' : function(e){
			e.preventDefault();
			templateRender('studentConsultant', '#studentMain');

		},

		'click #busButtoniOS' : function(e){
			e.preventDefault();
			templateRender('busTime', '#studentMain');
		},

		'click #foodButtoniOS' : function(e){
			e.preventDefault();
			templateRender('foodList', '#studentMain');
		},

		'click #feedBackButtoniOS' : function(e){
			e.preventDefault();
			templateRender('feedBack', '#studentMain');
		},

		'click #settingsButtoniOS' : function(e){
			e.preventDefault();
			templateRender('settings', '#studentMain');
		},

		'click #logOutButtoniOS' : function(e){
			e.preventDefault();
			IonSideMenu.snapper.close();

			if(Meteor.Device.isDesktop()){
				if(LocalCollectionForStudentOwnConsultant.find().count() > 0){
					LocalCollectionForStudentOwnConsultant.find().map(function(cons){
						cons.consSub.stop();
					})

					LocalCollectionForStudentOwnConsultant.remove({});
				}

				if(LocalCollectionForStudentOwnConsultantTake.find().count() > 0){
					LocalCollectionForStudentOwnConsultantTake.find().map(function(cons){
						cons.consTakeSub.stop();
					})

					LocalCollectionForStudentOwnConsultantTake.remove({});
				}


				if(LocalCollectionForStudentProfessorNotifications.find().count() > 0){
					LocalCollectionForStudentProfessorNotifications.find().map(function(profNotSubItem){
						profNotSubItem.stuProfSub.stop();
					})

					LocalCollectionForStudentProfessorNotifications.remove({});

				}

				if(LocalCollectionForStudentConsultantNotifications.find().count() > 0){
					LocalCollectionForStudentConsultantNotifications.find().map(function(consNotSubItem){
						consNotSubItem.consNotifSub.stop();
					})

					LocalCollectionForStudentConsultantNotifications.remove({});

				}

				if(LocalCollectionForLectures.find().count() > 0){
					LocalCollectionForLectures.find().map(function(lectureSubItem){
						lectureSubItem.subLectures.stop();
					})

					LocalCollectionForLectures.remove({});

				}

				if(LocalCollectionForStudentLectures.find().count() > 0){
					LocalCollectionForStudentLectures.find().map(function(lectureSubItem){
						lectureSubItem.subStudentLectures.stop();
					})

					LocalCollectionForStudentLectures.remove({});

				}

				if(LocalCollectionForStudentProfessorNotificationRooms.find().count() > 0){
					LocalCollectionForStudentProfessorNotificationRooms.find().map(function(eachStuProfNotifRoom){
						eachStuProfNotifRoom.stuProfNotifRoom.stop();
					})

					LocalCollectionForStudentProfessorNotificationRooms.remove({});

				}

				if(LocalCollectionForStudentConsultantNotificationRooms.find().count() > 0){
					LocalCollectionForStudentConsultantNotificationRooms.find().map(function(eachStuConsNotifRoom){
						eachStuConsNotifRoom.stuConsNotifRoom.stop();
					})

					LocalCollectionForStudentConsultantNotificationRooms.remove({});

				}

				// sendUniversityMessage.close();
				// takeUniversityMessageResponse.close();
				// sendProfessorMessage.close();
				// takeProfessorMessage.close();
				// takeProfessorMessageResponse.close();
				// sendConsultantMessage.close();
				// takeConsultantMessage.close();
				// takeConsultantMessageResponse.close();

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
								if(LocalCollectionForStudentOwnConsultant.find().count() > 0){
									LocalCollectionForStudentOwnConsultant.find().map(function(cons){
										cons.consSub.stop();
									})

									LocalCollectionForStudentOwnConsultant.remove({});
								}

								if(LocalCollectionForStudentOwnConsultantTake.find().count() > 0){
									LocalCollectionForStudentOwnConsultantTake.find().map(function(cons){
										cons.consTakeSub.stop();
									})

									LocalCollectionForStudentOwnConsultantTake.remove({});
								}


								if(LocalCollectionForStudentProfessorNotifications.find().count() > 0){
									LocalCollectionForStudentProfessorNotifications.find().map(function(profNotSubItem){
										profNotSubItem.stuProfSub.stop();
									})

									LocalCollectionForStudentProfessorNotifications.remove({});

								}

								if(LocalCollectionForStudentConsultantNotifications.find().count() > 0){
									LocalCollectionForStudentConsultantNotifications.find().map(function(consNotSubItem){
										consNotSubItem.consNotifSub.stop();
									})

									LocalCollectionForStudentConsultantNotifications.remove({});

								}

								if(LocalCollectionForLectures.find().count() > 0){
									LocalCollectionForLectures.find().map(function(lectureSubItem){
										lectureSubItem.subLectures.stop();
									})

									LocalCollectionForLectures.remove({});

								}

								if(LocalCollectionForStudentLectures.find().count() > 0){
									LocalCollectionForStudentLectures.find().map(function(lectureSubItem){
										lectureSubItem.subStudentLectures.stop();
									})

									LocalCollectionForStudentLectures.remove({});

								}

								if(LocalCollectionForStudentProfessorNotificationRooms.find().count() > 0){
									LocalCollectionForStudentProfessorNotificationRooms.find().map(function(eachStuProfNotifRoom){
										eachStuProfNotifRoom.stuProfNotifRoom.stop();
									})

									LocalCollectionForStudentProfessorNotificationRooms.remove({});

								}

								if(LocalCollectionForStudentConsultantNotificationRooms.find().count() > 0){
									LocalCollectionForStudentConsultantNotificationRooms.find().map(function(eachStuConsNotifRoom){
										eachStuConsNotifRoom.stuConsNotifRoom.stop();
									})

									LocalCollectionForStudentConsultantNotificationRooms.remove({});

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
}
