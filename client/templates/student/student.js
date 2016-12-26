if(Meteor.isCordova || Meteor.isClient){


	var lectureIds = [];
	var studentLectureSub = [];
	var lectureSub = [];
	var studentLecture;
	var student;

	Template.student.onCreated(function(){

		/*Student template i create oldugu zaman

		Students tablosundan kendimize subscribe oluyoruz

		Stream uzerinden mesajlari alabilmek icin eventlerimizi aktif hale getiriyoruz

		Eger ogrencinin ilk girisi ise fakulte, departman, ders ve danisman secimi sayfasina yonlendiriyoruz

		Eger ogrenci daha once kayit oldu ise kendisini ilgilendiren classNotificationRoomlarina ve ConsultantNotificationRoomlarina subscribe ediyoruz

		Surekli fonksiyona bu odalari kontrol etmesini eger yeni bir oda olusur ise de bu odaya ait notificationa subscribe olmasini soyluyoruz

		Ogrencinin danismanina subscribe oluyoruz

		Ogrencinin kendisine ait derslerine subscribe oluyoruz

		*/


		if(LocalCollectionForLogin.find().count() > 0){
			LocalCollectionForLogin.find().map(function(eachSub){
				eachSub.sub.stop();
			})

			LocalCollectionForLogin.remove({});
		}

		student = Students.findOne();
		Session.set('lecturesGetted', false);


		if(Meteor.user()){
			var isFirst = Students.find().fetch();
			if(isFirst.length == 0){
					/* route go for lecture select */
					Router.go('/student/' + Meteor.userId());
			}

			/* else so student selected lectures we take Student's lecture id from StudentLectures table
			and when taked datas again take lectures from Lectures table by studentLecture lecturesId array
			and insert subscription datas to local database for if user logout the system cannot access to
			server database*/

			else{

				if(Meteor.Device.isDesktop()){

					sendUniversityMessage.on(Meteor.userId(), function(message){
							toastr.warning(message.msg, "University New Message");

					})

					takeConsultantMessage.on(Meteor.userId(), function(message){
							toastr.warning(message.message, "Consultant New Message");

					})

					takeProfessorMessage.on(Meteor.userId(), function(message){

						ProfessorNotifications.update({"_id" : message.notifId}, {
							$addToSet : {
								delivered : Meteor.userId()
							}
						})

						toastr.warning(message.message, "Professor New Message");

					})

				}
				else{
					sendUniversityMessage.on(Meteor.userId(), function(message){
							scheduleUni(message);
					})

					takeConsultantMessage.on(Meteor.userId(), function(message){
							scheduleCons(message);

					})

					takeProfessorMessage.on(Meteor.userId(), function(message){
						ProfessorNotifications.update({"_id" : message.notifId}, {
							$addToSet : {
								delivered : Meteor.userId()
							}
						})

						scheduleProf(message);

					})

				}

				this.autorun(function(){

						LocalCollectionForStudentProfessorNotificationRooms.insert({
							stuProfNotifRoom : Meteor.subscribe('StudentProfessorNotificationRoom', Meteor.userId())
						})

						LocalCollectionForStudentConsultantNotificationRooms.insert({
							stuConsNotifRoom : Meteor.subscribe('StudentConsultantNotificationRoom', Meteor.userId())
						})

						var notificationRoomsClass = NotificationRoomsClass.find().fetch();

						if(notificationRoomsClass.length > 0){
							for( i = 0; i < notificationRoomsClass.length; i++){
									LocalCollectionForStudentProfessorNotifications.insert({
										stuProfSub : Meteor.subscribe('StudentProfessorNotification', notificationRoomsClass[i]._id)
									})
							}
						}



						var consultantRoom = NotificationRoomsConsultant.find().fetch();

						if(consultantRoom.length > 0){
							LocalCollectionForStudentConsultantNotifications.insert({
				        consNotifSub : Meteor.subscribe('StudentConsultantNotification', consultantRoom[0]._id)
				      })
						}




				})


				LocalCollectionForStudentOwnConsultant.insert({
		      consSub : Meteor.subscribe('StudentOwnConsultant', student._id, {
		        onReady : function(){
		          consultant = ConsultantStudents.findOne();
		          LocalCollectionForStudentOwnConsultantTake.insert({
								consTakeSub : Meteor.subscribe('StudentConsultant', consultant.consultantId)
							})
		        }
		      })
		    })

				LocalCollectionForStudentLectures.insert({
					subStudentLectures : Meteor.subscribe('StudentLectures', isFirst[0]._id,{
					onReady : function () { studentLecture = StudentLectures.find().fetch();

																	if(studentLecture.length >= 1){
																		studentLecture.forEach(function(stuLec){
																			lectureIds.push(stuLec.lecturesId);
																		})
																	}

																	if(lectureIds.length >= 1){
																		lectureIds.forEach(function(lectureId){
																			LocalCollectionForLectures.insert({
																				subLectures : Meteor.subscribe('Lectures', lectureId, {
																					onReady : function() { Session.set('lecturesGetted', true);}
																				})
																			})
																		})
																	}

																},
					onError : function() { console.log("student onError", arguments);}
				})
			})
			}

		}
	})

}

function scheduleUni(msg){
	var options = {
		id: Math.floor((Math.random() * 1000) + 5),
		text: msg.msg,
		title: msg.title,
		data : msg.roomId + './' + msg.roomType
	}

	cordova.plugins.notification.local.schedule(options, function(){
		cordova.plugins.notification.badge.increase(1);
		cordova.plugins.notification.local.on("click", function (notification, state) {
				Session.set('uniNotifClicked', true);
				var data = notification.data;
				var splitData = data.split('./');
				var roomId = splitData[0];
				var roomTypeSt = splitData[1];

				Session.set('room', roomId);
				Session.set('roomType', roomTypeSt);


				Router.go('/student');

		});

	});


}

function scheduleProf(msg){
	var options = {};

	options = {
		id: Math.floor((Math.random() * 1000) + 5),
		text: msg.message,
		title: msg.title,
		data : msg.lectureId + './' + msg.roomId + './' + msg.roomType
	}

	cordova.plugins.notification.local.schedule(options, function(){
		cordova.plugins.notification.badge.increase(1);
		cordova.plugins.notification.local.on("click", function (notification, state) {
				Session.set('profNotifClicked', true);
				var data = notification.data;
				var splitData = data.split('./');
				var lectureId = splitData[0];
				var roomId = splitData[1];
				var roomTypeSt = splitData[2];
				var notifs = [];

				Session.set('room', roomId);
				Session.set('roomType', roomTypeSt);

				var lecture = Lectures.find({'_id' : lectureId}).fetch()[0];

				Session.set('lectureForModal', lecture);



				Router.go('/student');

		})
	});



}


function scheduleCons(msg){
	var options = {
		id: Math.floor((Math.random() * 1000) + 5),
		text: msg.message,
		title: msg.title,
		data : msg.roomType + './' + msg.roomId
	}

	cordova.plugins.notification.local.schedule(options, function(){

		cordova.plugins.notification.badge.increase(1);
		cordova.plugins.notification.local.on("click", function (notification, state) {

				Session.set('consNotifClicked', true);
				var data = notification.data;
				var splitData = data.split('./');
				var roomTypeSt = splitData[0];
				var roomId = splitData[1];

				var consultant = Consultants.findOne();

				Session.set('roomType', roomTypeSt);
				Session.set('room', roomId);

				Session.set('consultantForModal', consultant);



				Router.go('/student');

		});

	});



}
