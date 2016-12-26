Template.registerHelper('lectureNameReg', function(id){

  if(Lectures.find().count() > 0){
    var lecture = Lectures.find(id).fetch();

    return lecture[0].lectureName;
  }

})

Template.registerHelper('lectureProfNameReg', function(id){

  if(Lectures.find().count() > 0){
    var lecture = Lectures.find(id).fetch();

    return lecture[0].profName;
  }

})

Template.registerHelper('lectureLastNotifReg', function(id){

  if(ProfessorNotifications.find().count() > 0){
    var notif = ProfessorNotifications.find({'notificationRoomId' : id}, {sort : {sendAt : -1}}).fetch();

    return notif[0].notificationMessage;
  }


})

Template.registerHelper('lectureLastNotifTimeReg', function(id){

  if(ProfessorNotifications.find().count () > 0){
    var notif = ProfessorNotifications.find({'notificationRoomId' : id}, {sort : {sendAt : -1}}).fetch();

    return moment(notif[0].sendAt).fromNow();
  }


})

Template.registerHelper('studentNameReg', function(id){

  if(Students.find().count() > 0){
    var student = Students.findOne({'userId' : id}).student;

    return student.name;
  }

})

Template.registerHelper('unreadedProfessorNotificationsStudentControl', function(userId){
  /* Ogrencinin professorlerden gelen bildirimlerde okumadigi var ise */

  if(ProfessorNotifications.find({'readedBy' : {$not : userId}}).count() > 0){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('unreadedProfessorNotificationsStudent', function(userId){

    return ProfessorNotifications.find({'readedBy' : {$not : userId}}, {sort : {sendAt : -1}});

})

Template.registerHelper('notificationRoomTypeClassControl', function(type){
  if(isEqual(type, "Class")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('notificationRoomTypeConsultantControl', function(type){
  if(isEqual(type, "Consultant")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('notificationRoomTypeUniversityControl', function(type){
  if(isEqual(type, "University")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('unreadedNotificationRoomsClassStudent' , function(id){

  return NotificationRoomsClass.find(id);

})

Template.registerHelper('printLecturesById', function(lecId){
  return Lectures.find(lecId);
})

Template.registerHelper('consultantNameReg', function(ownId){
  if(Consultants.find().count() > 0){
    var consultant =  Consultants.find({'userId' : ownId}).fetch();

    return consultant[0].consultantName;
  }

})

Template.registerHelper('consultantLastNotifReg', function(id){
  if(ConsultantNotifications.find().count() > 0){
    var notif = ConsultantNotifications.find({'notificationRoomId' : id}, {sort : {sendAt : -1}}).fetch();

    return notif[0].notificationMessage;
  }
})

Template.registerHelper('consultantLastNotifTimeReg', function(id){
  if(ConsultantNotifications.find().count() > 0){
    var notif = ConsultantNotifications.find({'notificationRoomId' : id}, {sort : {sendAt : -1}}).fetch();

    return moment(notif[0].sendAt).fromNow();
  }

})

Template.registerHelper('studentLastNotifReg', function(id){
  if(ConsultantNotifications.find().count() > 0){
    var notif = ConsultantNotifications.find({'notificationRoomId' : id}, {sort : {sendAt : -1}}).fetch();

    return notif[0].notificationMessage;
  }


})

Template.registerHelper('studentLastNotifTimeReg', function(id){
  if(ConsultantNotifications.find().count() > 0){
    var notif = ConsultantNotifications.find({'notificationRoomId' : id}, {sort : {sendAt : -1}}).fetch();

    return moment(notif[0].sendAt).fromNow();
  }


})

Template.registerHelper('unreadedConsultantNotificationsStudentControl', function(userId){
  if(ConsultantNotifications.find({'readedBy' : {$not : userId}}).count() > 0){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('unreadedNotificationRoomsConsultantStudent', function(roomId){
  return NotificationRoomsConsultant.find(roomId);
})

Template.registerHelper('unreadedConsultantNotificationsStudent', function(userId){
  return ConsultantNotifications.find({'readedBy' : {$not : userId}}, {sort : {sendAt : -1}});
})

Template.registerHelper('schoolNotificationRoomControl', function(){
  if(NotificationRoomUniversity.find().count() > 0){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('schoolLastNotifReg', function(id){
  if(UniversityNotifications.find().count() > 0){
    var notif = UniversityNotifications.find({'notificationRoomId' : id}, {sort : {sendAt : -1}}).fetch();

    return notif[0].notificationMessage;
  }

})

Template.registerHelper('schoolLastNotifTimeReg', function(id){
  if(UniversityNotifications.find().count() > 0){
    var notif = UniversityNotifications.find({'notificationRoomId' : id}, {sort : {sendAt : -1}}).fetch();

    return moment(notif[0].sendAt).fromNow();
  }

})

Template.registerHelper('typeControlAdd', function(typeStr){
  if(isEqual(typeStr, "Professor")){
    return "Add Professor";
  }
  else if(isEqual(typeStr, "Consultant")){
    return "Add Consultant"
  }
  else if(isEqual(typeStr, "Lecture")){
    return "Add Lecture";
  }
  else if(isEqual(typeStr, "Match")){
    return "Match Lecture's Professor";
  }
  else if(isEqual(typeStr, "Department")){
    return "Add Department";
  }
  else if(isEqual(typeStr, "DepartmentHead")){
    return "Match Department's Head";
  }
  else if(isEqual(typeStr, "Dean")){
    return "Add Dean"
  }
  else if(isEqual(typeStr, "Faculty")){
    return "Add Faculty";
  }
})

Template.registerHelper('typeControlDelete', function(typeStr){
  if(isEqual(typeStr, "Professor")){
    return "Delete Professor";
  }
  else if(isEqual(typeStr, "Lecture")){
    return "Delete Lecture";
  }
  else if(isEqual(typeStr, "LectureProf")){
    return "Delete Lecture's Professor";
  }
  else if(isEqual(typeStr, "Department")){
    return "Delete Department";
  }
  else if(isEqual(typeStr, "DepartmentHead")){
    return "Delete Department Head";
  }
  else if(isEqual(typeStr, "Consultant")){
    return "Delete Consultant";
  }

})


Template.registerHelper('addTypeConsultantControl', function(type){
  if(isEqual(type, "Consultant")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('addTypeProfessorControl', function(type){
  if(isEqual(type, "Professor")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('addTypeLectureControl', function(type){
  if(isEqual(type, "Lecture")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('addTypeMatchControl', function(type){
  if(isEqual(type, "Match")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('addTypeDepartmentControl', function(type){
  if(isEqual(type, "Department")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('addTypeDepartmentHeadControl', function(type){
  if(isEqual(type, "DepartmentHead")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('addTypeDeanControl', function(type){
  if(isEqual(type, "Dean")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('addTypeFacultyControl', function(type){
  if(isEqual(type, "Faculty")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('countControl', function(count){
  if(count > 0){
    return true;
  }
  else{
    return false;
  }
})


Template.registerHelper('deleteTypeLectureProfControl', function(type){
  if(isEqual(type, "LectureProf")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('deleteTypeDepartmentControl', function(type){
  if(isEqual(type, "Department")){
    return true;
  }
  else{
    return false;
  }
})

Template.registerHelper('deleteTypeDepartmentHeadControl', function(type){
  if(isEqual(type, "DepartmentHead")){
    return true;
  }
  else{
    return false;
  }
})
