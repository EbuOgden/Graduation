Schema = {};

Permissions = new Mongo.Collection('Permissions');

Schema.Permission = new SimpleSchema({
  permissionName : {
    type : String
  }
})

Permissions.attachSchema(Schema.Permission);

Roles = new Mongo.Collection('Roles');

Schema.Role = new SimpleSchema({
  roleType : {
    type : String
  },

  permissionsId : {
    type : [String]
  }
})

Roles.attachSchema(Schema.Role);

Faculties = new Mongo.Collection('Faculties');

Schema.Faculty = new SimpleSchema({

  facultyName : {
    type : String
  },

  haveDean : {
    type : Boolean
  }
})

Faculties.attachSchema(Schema.Faculty);

Departments = new Mongo.Collection('Departments');

Schema.Department = new SimpleSchema({
  departmentName : {
    type : String
  },

  departmentDescription : {
    type : String
  }
})

Departments.attachSchema(Schema.Department);

FacultyDepartments = new Mongo.Collection('FacultyDepartments');

Schema.FacultyDepartment = new SimpleSchema({
  /* from Faculties table */
  facultyId : {
    type : String
  },

  /* from Departments table */
  departmentId : {
    type : String
  },

  haveHead : {
    type : Boolean,
    optional : false
  }

})

FacultyDepartments.attachSchema(Schema.FacultyDepartment, {replace : true});

FacultyDeans = new Mongo.Collection('FacultyDeans');

Schema.FacultyDean = new SimpleSchema({
  /* From Faculty Table */

  facultyId : {
    type : String
  },

  /* From Dean Table */

  deanId : {
    type : String
  }
})

FacultyDeans.attachSchema(Schema.FacultyDean);

Lectures = new Mongo.Collection('Lectures');

Schema.Lecture = new SimpleSchema({

  lectureName : {
    type : String
  },

  lectureCode : {
    type : String
  },

  lectureCredit : {
    type : Number
  },

  profName : {
    type : String
  }

})

Lectures.attachSchema(Schema.Lecture);

DepartmentLectures = new Mongo.Collection('DepartmentLectures');

Schema.DepartmentLecture = new SimpleSchema({
  /* from Departments table */
  departmentId : {
    type : String
  },

  /* from Lectures table */
  lectureId : {
    type : String
  },

})

DepartmentLectures.attachSchema(Schema.DepartmentLecture, {replace : true});

Deans = new Mongo.Collection('Deans');

Schema.Dean = new SimpleSchema({

  userId : {
    type : String
  },

  deanName : {
    type : String
  },

  facultyId : {
    type : String
  }
})

Deans.attachSchema(Schema.Dean, {replace : true});

DepartmentHeads = new Mongo.Collection('DepartmentHeads');

Schema.DepartmentHead = new SimpleSchema({

  /* from Departments table */
  departmentId : {
    type : String
  },

  /* from User table */
  headId : {
    type : String
  }

})

DepartmentHeads.attachSchema(Schema.DepartmentHead);

Consultants = new Mongo.Collection('Consultants');

Schema.Consultant = new SimpleSchema({

  /* from User table */
  userId : {
    type : String
  },

  consultantName : {
    type : String,
    optional : true
  },

  consultantDegree : {
    type : String,
    optional : true
  },

  /* from Departments table */
  consultantDepartmentId : {
    type : String
  }

})

Consultants.attachSchema(Schema.Consultant, {replace : true});

Professors = new Mongo.Collection('Professors');

Schema.Professor = new SimpleSchema({

  /* from User table */
  userId : {
    type : String
  },

  professorName : {
    type : String
  },

  professorDegree : {
    type : String,
    optional : true
  },

  isConsultant : {
    type : Boolean,
    optional : false
  },

  isDean : {
    type : Boolean,
    optional : false
  }

})

Professors.attachSchema(Schema.Professor, {replace : true});

ProfessorsFaculty = new Mongo.Collection('ProfessorsFaculty');

Schema.ProfessorFaculty = new SimpleSchema({

  /* from Prof Table */

  profId : {
    type : String
  },

  facultyId : {
    type : String
  }
})

ProfessorsFaculty.attachSchema(Schema.ProfessorFaculty, {replace : true});

ProfessorLectures = new Mongo.Collection('ProfessorLectures');

Schema.ProfessorLectures = new SimpleSchema({

  /* from Professor table */
  professorId : {
    type : String,
    optional : false
  },

  /* from Lectures table */
  Lecture : {
    type : String
  }

})

ProfessorLectures.attachSchema(Schema.ProfessorLectures);

Students = new Mongo.Collection('Students');

Schema.Student = new SimpleSchema({

  /* from User table */
  userId : {
    type : String,
    optional : false
  },

  student : {
    type : Object,
  },

  /* from Faculties table */
  "student.facultyId" : {
    type : String,
    optional : false
  },

  /*from Departments table */
  "student.departmentId" : {
    type : String,
    optional : false
  },

  "student.name" : {
    type : String,
    optional : false
  }
})

Students.attachSchema(Schema.Student, {replace : true});

StudentLectures = new Mongo.Collection('StudentLectures');

Schema.StudentsLecture = new SimpleSchema({

  /* from Student table */

  studentId : {
    type : String,
    optional : false
  },

  period : {
    type : String,
    optional : true
  },

  /* from Lectures table */
  lecturesId : {
    type : String
  }
})

StudentLectures.attachSchema(Schema.StudentsLecture, {replace : true});

ConsultantStudents = new Mongo.Collection('ConsultantStudents');

Schema.ConsultantStudent = new SimpleSchema({

  /* from Consultants table*/
  consultantId : {
    type : String,
    optional : false
  },

  studentId : {
    type : String
  },

  period : {
    type : String,
    optional : true
  }
})

ConsultantStudents.attachSchema(Schema.ConsultantStudent, {replace : true});

NotificationRoomsClass = new Mongo.Collection('NotificationRoomsClass');

Schema.NotificationRoomClass = new SimpleSchema({
  createdAt : {
    type : Date
  },

  memberIds : {
    type : [String],
    optional : false
  },

  notificationRoomInfo : {
    type : Object
  },

  "notificationRoomInfo.lectureId" : {
    type : String,
    optional : false
  },

  "notificationRoomInfo.type" : {
    type : String,
    autoValue : function(){
      if(this.isInsert){
        return "Class";
      }
    }
  },

  /* from Professor or Consultant table */
  "notificationRoomInfo.ownerId" : {
    type : String,
    optional : false
  }

})

NotificationRoomsClass.attachSchema(Schema.NotificationRoomClass, {replace : true});

NotificationRoomsConsultant = new Mongo.Collection('NotificationRoomsConsultant');

Schema.NotificationRoomsConsultant = new SimpleSchema({
  createdAt : {
    type : Date
  },

  memberId : {
    type : String,
    optional : false
  },

  notificationRoomInfo : {
    type : Object
  },

  "notificationRoomInfo.ownerId" : {
    type : String,
    optional : false
  },

  "notificationRoomInfo.type" : {
    type : String,
    autoValue : function(){
      if(this.isInsert){
        return "Consultant"
      }
    }
  }

})

NotificationRoomsConsultant.attachSchema(Schema.NotificationRoomsConsultant, {replace : true});

NotificationRoomUniversity = new Mongo.Collection('NotificationRoomUniversity');

Schema.NotificationRoomUniversity = new SimpleSchema({
  createdAt : {
    type : Date
  },

  notificationRoomInfo : {
    type : Object
  },

  "notificationRoomInfo.ownerId" : {
    type : String,
    optional : false
  },

  "notificationRoomInfo.type" : {
    type : String,
    autoValue : function(){
      if(this.isInsert){
        return "University";
      }
    }
  }

})

NotificationRoomUniversity.attachSchema(Schema.NotificationRoomUniversity, {replace : true});


ProfessorNotifications = new Mongo.Collection('ProfessorNotifications');

Schema.ProfessorNotification = new SimpleSchema({
  notificationMessage : {
    type : String
  },

  /* from NotificationRooms table */
  notificationRoomId : {
    type : String,
    optional : false
  },

  sendAt : {
    type : Date
  },

  delivered : {
    type : [String]
  },

  readedBy : {
    type : [String]
  }

})

ProfessorNotifications.attachSchema(Schema.ProfessorNotification, {replace : true});

ConsultantNotifications = new Mongo.Collection('ConsultantNotifications');

Schema.ConsultantNotification = new SimpleSchema({
  notificationMessage : {
    type : String
  },

  /* from NotificationRooms table */
  notificationRoomId : {
    type : String,
    optional : false
  },

  sendAt : {
    type : Date
  },

  readedBy : {
    type : String
  }

})

ConsultantNotifications.attachSchema(Schema.ConsultantNotification, {replace : true});

UniversityNotifications = new Mongo.Collection('UniversityNotifications');

Schema.UniversityNotification = new SimpleSchema({
  notificationMessage : {
    type : String
  },

  sendAt : {
    type : Date
  },

  notificationRoomId : {
    type : String
  }

})

UniversityNotifications.attachSchema(Schema.UniversityNotification, {replace : true});

FeedBacks = new Mongo.Collection('FeedBacks');

Schema.FeedBack = new SimpleSchema({
  feedbackMessage : {
    type : String,
  },

  sendAt : {
    type : Date,
  },

  senderId : {
    type : String,
    optional : false
  }
})

FeedBacks.attachSchema(Schema.FeedBack);

Schema.UserProfile = new SimpleSchema({
  name : {
    type : String,
    optional : true
  },

  surname : {
    type : String,
    optional : true
  },

  role : {
    type : [String],
    optional : false
  }
})

Schema.Users = new SimpleSchema({
  username : {
    type : String
  },

  emails : {
    type : Array,
    optional : true
  },

  "emails.$" : {
    type : Object
  },

  "emails.$.address" : {
    type : String
  },

  "emails.$.verified" : {
    type : Boolean,
    optional : true

  },

  createdAt : {
    type : Date
  },

  profile : {
    type : Schema.UserProfile
  },

  services : {
    type : Object,
    optional : true,
    blackbox : true
  }

})

Meteor.users.attachSchema(Schema.Users);
