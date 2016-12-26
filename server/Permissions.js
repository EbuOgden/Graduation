sendProfessorMessage.permissions.write(function(eventName){
  return eventName == 'sendProfessorMessage';
})

takeProfessorMessage.permissions.read(function(eventName){
  return this.userId == eventName;
}, false /* for close caching because server overload! */)

sendConsultantMessage.permissions.write(function(eventName){
  return eventName == 'sendConsultantMessage';
})

takeConsultantMessage.permissions.read(function(eventName){
  return this.userId == eventName;
}, false)

sendUniversityMessage.permissions.write(function(eventName){
  return eventName == 'sendUniversityMessage';

})

sendUniversityMessage.permissions.read(function(eventName){

  return this.userId == eventName;
}, false);

/*Permissions.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Roles.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Universities.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Faculties.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Departments.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Lectures.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Consultants.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Professors.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

ProfessorLectures.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Students.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

StudentLectures.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

ConsultantStudents.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

NotificationRooms.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

Notifications.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

SchoolNotifications.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

FoodList.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})

FeedBacks.allow({
  insert : function(){
    return true;
  },

  update : function(){
    return true;
  },

  remove : function(){
    return true;
  }
})
*/
