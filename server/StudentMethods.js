/* Student Processes */

addUserToStudentTable = function(userId, uniId, studentInfo){
  Students.insert({
    'userId' : userId,
    'studentInfo' : {
      'uniId' : studentInfo.uniId,
      'facultyId' : studentInfo.facultyId,
      'departmentId' : studentInfo.departmentId
    }
  })
};

getStudentId = function(userId){
  var studentId = Students.findOne(userId);

  if(studentId == null){
    console.log('There is no student like that ');
  }
  else {
    return studentId._id;
  }
}
