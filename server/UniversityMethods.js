/* University Processes */

/* FOR DEMO !!! */
getUniIdByName = function(uniName){
  var uni = Universities.findOne({'uniName' : uniName});

  if(uni == null){
    console.log('There is not uni like that name : ' + uniName);
  }
  else
    return uni._id;

};

getFacultyIdByName = function(facultyName){
  var faculty = Faculties.findOne({'facultyName' : facultyName});

  if(faculty == null){
    console.log('There is not faculty like that name : ' + facultyName);
  }
  else
    return faculty._id;
};

getDepartmentIdByName = function(departmentName){
  var department = Departments.findOne({'departmentName' : departmentName});

  if(department == null){
    console.log('There is not department like that name : ' + departmentName);
  }
  else
    return department._id;

}
/* FOR DEMO !!! */


addFaculty = function(facultyInfo){
  var facultyId = Faculties.insert({
    'facultyName' : facultyInfo.facultyName
  })

  if(facultyId == null){
    console.log("Cannot add faculty at this moment");
  }
  else{
    return facultyId;
  }
}

addFacultyToUniversity = function(uniId, facultyInfo){
  var facultyId = addFaculty(facultyInfo);

}
addFacultiesToUniversity = function(uniId, facultyId){
  UniFaculties.insert({
    'universityId' : uniId,
    'facultyId' : facultyId
  })
};

addDepartment = function(departmentInfo){
  var depId = Departments.insert({
    'departmentName' : departmentInfo.departmentName,
    'departmentDescription' : departmentInfo.departmentDescription
  })

  if(depId == null){
    console.log('Cannot add department at this moment');
  }
  else{
    return depId;
  }
}

/* This is actual function but addDepartmentsIdToFaculty is for demo */
addDepartmentsToFaculty = function(facultyId, departmentInfo){
    var departmentId = addDepartment(departmentInfo);

    FacultyDepartments.insert({
      'facultyId' : facultyId,
      'departmentId' : departmentId
    })
}

addDepartmentIdToFaculty = function(facultyId, departmentId){
  FacultyDepartments.insert({
    'facultyId' : facultyId,
    'departmentId' : departmentId,
    haveHead : false
  })
};

getDepartmentIdByName = function(departmentName){
  var department = Departments.findOne({
    'departmentName' : departmentName
  })

  if(department == null){
    console.dir('There is no department like that name : ' + departmentName)
  }

  else
    return department._id;
};

addLecture = function(lectureInfo){

  var lectureId = Lectures.insert({
      'lectureName' : lectureInfo.lectureName,
      'lectureCode' : lectureInfo.lectureCode,
      'lectureCredit' : lectureInfo.lectureCredit,
      'profName' : lectureInfo.profName
  })

  if(lectureId == null){
    console.log('Cannot add lecture at this moment');
  }
  else{
    return lectureId;
  }


  // var lectureArray = [];
  //
  // /* lectureInfo object convert to lectureArray Array */
  // lectureArray = Object.keys(lectureInfo).map(function(key){
  //   return lectureInfo[key]
  // })


};

/* This is actual function but addLectureIdToDepartment is for demo */
addLectureToDepartment = function(lectureInfo, departmentId){
  var lectureId = addLecture(lectureInfo);

  if(lectureId == null){
    console.log("Cannot add lecture at this moment");
  }
  else{
    DepartmentLectures.insert({
      'departmentId' : departmentId,
      'lectureId' : lectureId
    })
  }


};

/* FOR DEMO ! */
addLectureIdToDepartment = function(lectureId, departmentId){
  DepartmentLectures.insert({
    'departmentId' : departmentId,
    'lectureId' : lectureId
  })
};

/* This is actual function addDepartmentHeadIdToDepartment is for demo */
addDepartmentHeadToDepartment = function(departmentHeadId, department){
  var departmentId = addDepartment(department);

  DepartmentHeads.insert({
    'departmentId' : departmentId,
    'headId' : departmentHeadId
  })
};

/* FOR DEMO */
addDepartmentHeadIdToDepartment = function(departmentHead, departmentId){

  DepartmentHeads.insert({
    'departmentId' : departmentId,
    'headId' : departmentHead
  })
}

getLectureIdByName = function(lectureName){
  var lectureId = Lectures.findOne({'lectureName' : lectureName});

  if(lectureId == null){
    console.log('There is no lecture like that named : ' + lectureName);
  }
  else {
    return lectureId._id;
  }
};

getLectureIdsFromDepartmentName = function(departmentName){
  var departmentId = getDepartmentIdByName(departmentName);

  if(departmentId == null){
    console.log('There is no department like that named : ' + departmentName);
  }

  var faculty = FacultyDepartments.findOne(departmentId);

  var departmentId = [];

  departmentId.push(getDepartmentsFromFaculty(faculty.facultyId));

  var lectureId = [];

  lectureId.push(departmentId.forEach(function(id){
    DepartmentLectures.findOne(id).lectureId;
  } ));

  return lectureId;
}
/* */



getDepartmentsFromFaculty = function(facultyId){
    departmentId = [];

    departmentId.push(FacultyDepartments.find(facultyId).departmentId);

    if(departmentId == null){
      console.log('There is no departments in that faculty : ' + facultyId);
    }

    else {
      return departmentId;
    }
};

getFacultyFromUniversity = function(uniId){

}

/*    */
