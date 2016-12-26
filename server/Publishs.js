Meteor.publish('users', function(){

  if(this.userId){
      return Meteor.users.find(this.userId);
  }

  else {
      return Meteor.users.find({}, {fields : {
        username : 1,
        profile : 1
      }});
  }

});

Meteor.publish('userForLogin', function(usernameLogin){
  return Meteor.users.find({"username" : usernameLogin});
})

Meteor.publish('Lectures', function(lecId){
  if(lecId){
      return Lectures.find(lecId);
  }
  else{
    this.stop();
  }

});

Meteor.publish('Faculties', function(){
  return Faculties.find();
});

Meteor.publish('FacultyDepartments', function(){
  return FacultyDepartments.find({});
})

Meteor.publish('Departments', function(depId){

  if(depId){
    return Departments.find(depId);
  }
  else{
    this.stop();
  }

});

Meteor.publish('DepartmentLectures', function(){
  return DepartmentLectures.find({});
})

/* ADMIN */

Meteor.publish('ProfessorFaculty', function(){

  var user = Meteor.users.findOne(this.userId);
  var profile = user.profile;
  var roles = profile.role;

  if(isEqual(roles[0], "Admin")){
    return ProfessorsFaculty.find({});
  }

})


/* DEAN */

Meteor.publish('Dean', function(userId){
  return Deans.find({"userId" : userId});
})

Meteor.publish("Faculty", function(facId){
  return Faculties.find(facId);
})

Meteor.publish('FacultyDepartmentsById', function(facId){
  return FacultyDepartments.find({"facultyId" : facId});
})

Meteor.publish("FacultyDeparmentsByIdForAddDepHead", function(facId){

  return FacultyDepartments.find({"facultyId" : facId, "haveHead" : false}, {
    fields : {
      "departmentId" : 1
    }
  });
})

Meteor.publish('DepartmentsforAddDepHead', function(depId){
  return Departments.find({"_id" : depId});
})

Meteor.publish('FacultyDean', function(deanId){
  return FacultyDeans.find({"deanId" : deanId});
})

Meteor.publish('forAddDepHeadProfs', function(profId, depId){

  var professor =  Professors.find({"_id" : profId}).fetch();

  if(professor.length >= 1){
    var dean = Deans.find({"userId" : professor[0].userId}).fetch();
    var depHead = DepartmentHeads.find({"headId" : professor[0].userId}).fetch(); //eger dephead Degilse

    if((dean.length == 0) && (depHead.length == 0) && (professor[0].userId != this.userId)){
        return Professors.find({"_id" : profId}, {
          fields : {
            "professorName" : 1,
            "userId" : 1
          }
        });
    }
  }


})

Meteor.publish('departmentHeadsForDelete', function(depId){
  return DepartmentHeads.find({"departmentId" : depId});
})

/*      */




/* PROFESSORS */

Meteor.publish('Professors', function(currentUserId){
  return Professors.find({'userId' : currentUserId});
})


Meteor.publish('ProfessorLectures', function(profId){
  return ProfessorLectures.find({'professorId' : profId});
})

Meteor.publish('ProfessorStudentLectures', function(lectureId){
  return StudentLectures.find({'lecturesId' : lectureId});
})

Meteor.publish('ProfessorStudents', function(studentId){
  return Students.find({"_id" : studentId});
})

Meteor.publish('ProfessorNotificationRoom', function(lecId){
  return NotificationRoomsClass.find({'notificationRoomInfo.lectureId' : lecId});
})

Meteor.publish('ProfessorsOwnedNotificationRooms', function(userId){
  return NotificationRoomsClass.find({'notificationRoomInfo.ownerId' : userId})
})

Meteor.publish('whoRead', function(userId){
  return Meteor.users.find({"_id" : userId} , {fields : {
    "profile.name" : 1
  }})
})

/*          */





/* CONSULTANTS */

Meteor.publish('Consultants', function(constuserId){
  return Consultants.find({'userId': constuserId});
})

Meteor.publish('ConsultantsOwnedNotificationRooms', function(userId){
  return NotificationRoomsConsultant.find({'notificationRoomInfo.ownerId' : userId})
})

Meteor.publish('ConsultantStudents', function(constId){

  return ConsultantStudents.find({'consultantId' : constId});
});

Meteor.publish('ConsultantsLectureSelect', function(departmentId){
  return Consultants.find({'consultantDepartmentId' : departmentId});
})

Meteor.publish('DepartmentHead', function(userId){
  return DepartmentHeads.find({'headId' : userId});
})


Meteor.publish('consultantsGet', function(depId){
  return Consultants.find({"consultantDepartmentId" : depId});
})

/*          */

/* DEPARTMENT HEAD */


Meteor.publish('deleteProfessorsFaculty', function(delProfId){
  return ProfessorsFaculty.find({"profId" : delProfId});
})

Meteor.publish('OwnedDepartmentLecs', function(depId){
  return DepartmentLectures.find({'departmentId' : depId});
})

Meteor.publish('NonMatchedLectures' , function(lecId){

  return Lectures.find({"_id" : lecId, "profName" : ""})
})

Meteor.publish('facIdFromDep' , function(depId){
  return FacultyDepartments.find({'departmentId' : depId});
})

Meteor.publish('facultyProfs', function(facId){
  return ProfessorsFaculty.find({'facultyId' : facId});
})

Meteor.publish('forMatchLectureProfs', function(profId){

  var professor =  Professors.find({"_id" : profId}).fetch();

  if(professor.length >=1 ){

    return Professors.find({"_id" : profId});
  }


})


Meteor.publish('forDeleteLectureProfs', function(profId){

  var professor =  Professors.find({"_id" : profId}).fetch();


  if(professor.length > 0){
      var dean = Deans.find({"userId" : professor[0].userId}).fetch();
      var departmentHeads = DepartmentHeads.find({"headId" : professor[0].userId}).fetch();

      if((dean.length == 0) && (professor[0].userId != this.userId) && (departmentHeads.length == 0)){
          return Professors.find({"_id" : profId, "isConsultant" : false});
      }
  }




})

Meteor.publish('forAddProftoCons', function(profId){
  return Professors.find({"_id" : profId, "isConsultant" : false});
})

Meteor.publish('professorLectureForDelete', function(lecId){
  return ProfessorLectures.find({"Lecture" : lecId});
})

Meteor.publish('studentLectureForDelete', function(lecId){
  return StudentLectures.find({"lecturesId" : lecId});
})

Meteor.publish('notificationClassRoomForDelete', function(lecId){
  return NotificationRoomsClass.find({"notificationRoomInfo.lectureId" : lecId});
})

Meteor.publish('notificationClassNotificationsForDelete', function(roomId){
  return ProfessorNotifications.find({"notificationRoomId" : roomId});
})


/* STUDENTS */

Meteor.publish('Students', function(studentUserId){
  if(studentUserId){
      return Students.find({userId : studentUserId});
  }

});

Meteor.publish('StudentOwnConsultant', function(curStudentId){
  return ConsultantStudents.find({'studentId' : curStudentId});
})

Meteor.publish('StudentConsultant', function(constId){
  return Consultants.find({'_id' : constId});
})

Meteor.publish('StudentProfessorNotificationRoom', function(userId){
  return NotificationRoomsClass.find({'memberIds' : userId}, {fields : {
    'memberIds' : 0
  }})
})

Meteor.publish('StudentLectures', function(stuId){
  return StudentLectures.find({'studentId' : stuId});
})

Meteor.publish('StudentConsultantNotificationRoom', function(userId){
  return NotificationRoomsConsultant.find({'memberId' : userId});
})

Meteor.publish('StudentProfessorNotification', function(roomId){
  return ProfessorNotifications.find({'notificationRoomId' : roomId});
})

Meteor.publish('StudentConsultantNotification', function(roomId){
  return ConsultantNotifications.find({'notificationRoomId' : roomId});
})

/*          */

/* ADMIN */

Meteor.publish('facultiesAbsentDean', function(){
    return Faculties.find({"haveDean" : false});

})

Meteor.publish('professorsnotDean', function(){
    return Professors.find({"isDean" : false});
})

Meteor.publish('deansForDelete', function(){
    return Deans.find();
})

Meteor.publish('facultyDeansForDelete', function(facId){
    return FacultyDeans.find({"facultyId" : facId});
})


/*          */





/* UNIVERSITIES */

Meteor.publish('UniversityNotificationsRoom', function(){
  return NotificationRoomUniversity.find({});
})

Meteor.publish('UniversityNotifications', function(){
  return UniversityNotifications.find({});
})

/*          */
