sendProfessorMessage.on('sendProfessorMessage', function(message){

  var messageToClient = {
    title : message.title,
    message : message.msg,
    lectureId : message.lectureId,
    roomId : message.roomId,
    roomType : message.roomType,
    notifId : message.notifId
  }

  userList = message.users;

  if(userList.length >= 1){
    for(let i = 0; i < userList.length; i++){
      takeProfessorMessage.emit(userList[i], messageToClient);
    }
  }

})

sendConsultantMessage.on('sendConsultantMessage', function(message){

  var messageToClient = {
    title : message.title,
    message : message.msg,
    roomId : message.roomId,
    roomType : message.roomType
  }

  takeConsultantMessage.emit(message.user, messageToClient);
})

sendUniversityMessage.on('sendUniversityMessage', function(message){

  var users = Meteor.users.find().fetch();

  if(users.length >= 1){
    for(let i = 0; i < users.length; i++){
      sendUniversityMessage.emit(users[i]._id, message);
    }
  }

})
