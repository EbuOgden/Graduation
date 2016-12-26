Meteor.startup(function () {

  Push.allow({
    send : function(){
      return true;
    }
  })

  if(Permissions.find().count() > 0){

  }
  else{
    var permissionList = [

        /* Admin */
        'addDean',
        'removeDean',

        /*  School  */
        'sendNotificationToSchool',
        'sendFeedBacks',

        /* Dean */
        'addDepartment',
        'addDepartmentHead',
        'removeDepartment',
        'removeDepartmentHead',

        /*  Department Head   */
        'addTeacherAccountForDepartment',
        'addTeachersLecture',
        'seeDepartmentStudents',
        'removeTeachersLecture',
        'removeStudentsLecture',
        'removeTeacherAccountForDepartment',
        'sendFeedBacks',

        /*  Consultant  */
        'sendNotificationToStudents',
        'sendFeedBacks',

        /*  Professor  */
        'sendNotificationToClass',
        'sendFeedBacks',

        /* Student */
        'seeNotifications',
        'sendFeedBacks',

        /*  Cafeteria   */
        'sendFoodList',
        'sendFeedBacks',


      ];

    permissionList.forEach(function(permission){
      addPermission(permission);
    })
  }

  if(Roles.find().count() > 0){

  }
  else{

    var permissionOfAdmin = [
      'addDean',
      'removeDean'
    ]

    var permissionOfDean = [
      'addDepartment',
      'addDepartmentHead',
      'removeDepartment',
      'removeDepartmentHead',
    ]

    var permissionOfSchool = [
      'sendNotificationToSchool',
      'sendFeedBacks'
    ];

    var permissionsOfDepartmentHead = [
      'addTeacherAccountForDepartment',
      'addTeachersLecture',
      'seeDepartmentStudents',
      'removeTeachersLecture',
      'removeStudentsLecture',
      'removeTeacherAccountForDepartment',
      'sendFeedBacks'

    ];

    var permissionOfConsultant = [
      'sendNotificationToStudents',
      'sendFeedBacks'
    ];

    var permissionOfProfessor = [
      'sendNotificationToClass',
      'sendFeedBacks'
    ];

    var permissionOfStudent = [
      'seeNotifications',
      'sendFeedBacks',
    ]

    var permissionOfCafeteria = [
      'sendFoodList',
      'sendFeedBacks'
    ];

    /*    */

    var permissionIdForAdmin = getPermissionIdByName(permissionOfAdmin);

    if(permissionIdForAdmin == null){
      console.log('No permission for Dean');
    }

    else{
      addNewRole('Admin', permissionIdForAdmin);
    }

    var permissionIdForDean = getPermissionIdByName(permissionOfDean);

    if(permissionIdForDean == null){
      console.log('No permission for Dean');
    }

    else{
      addNewRole('Dean', permissionIdForDean);
    }


    /* Add permissions for Role : School */
    var permissionIdForSchool = getPermissionIdByName(permissionOfSchool);

    if(permissionIdForSchool == null){
      console.log('No permission for School');
    }

    else{
      addNewRole('School', permissionIdForSchool);
    }

    /*    */

    /* Add permissions for Role : Department Head */
    var permissionIdForDepartmentHead = getPermissionIdByName(permissionsOfDepartmentHead);

    if(permissionIdForDepartmentHead == null){
      console.log('No permission for Department Head');
    }

    else{
      addNewRole('DepartmentHead', permissionIdForDepartmentHead);
    }

    /*    */

    /* Add Permissions for Role : Consultant */

    var permissionIdForConsultant = getPermissionIdByName(permissionOfConsultant);

    if(permissionIdForConsultant == null){
      console.log('No permission for Consultant');
    }

    else{
      addNewRole('Consultant', permissionIdForConsultant);
    }

    /*    */

    /* Add permissions for Role : Professor */

    var permissionIdForProfessor = getPermissionIdByName(permissionOfProfessor);

    if(permissionIdForProfessor == null){
      console.log('No permission for Professor');
    }

    else{
      addNewRole('Professor', permissionIdForProfessor);
    }

    /*    */

    /* Add permissions for Role : Student */

    var permissionIdForStudent = getPermissionIdByName(permissionOfStudent);

    if(permissionIdForStudent == null){
      console.log('No permission for Student');
    }

    else{
      addNewRole('Student', permissionIdForStudent);
    }

    /*    */

    /* Add permissions for Role : Cafeteria */

    var permissionIdForCafeteria = getPermissionIdByName(permissionOfCafeteria);

    if(permissionIdForCafeteria == null){
      console.log('No permission for Cafeteria');
    }

    else{
      addNewRole('Cafeteria', permissionIdForCafeteria);
    }

  }

    if(Faculties.find().count() > 0){

    }
    else {

      facultyId = Faculties.insert({
        facultyName : 'Engineering',
        haveDean : true
      });

      facultyId1 = Faculties.insert({
        facultyName : 'Architecture',
        haveDean : false
      })

      facultyId2 = Faculties.insert({
        facultyName : 'Law',
        haveDean : false
      })

      facultyId3 = Faculties.insert({
        facultyName : 'Psychology',
        haveDean : false
      })

      facultyId4 = Faculties.insert({
        facultyName : 'Educational Science',
        haveDean : false
      })

    }

    if(Departments.find().count() > 0){

    }
    else {
      var departmentName = [
        'Software Engineering',
        'Computer Engineering',
        'Civil Engineering',
        'Electric-Electronic Engineering',
        'Industry Engineering'
      ];

      departmentId = [];

      departmentName.forEach(function(departName){
        departmentId.push(Departments.insert({
          'departmentName' : departName,
          'departmentDescription' : "Engineering"
        }))
      })



      var departmentName1 = [
        'Ic Mimar',
        'Dis Mimar'
      ];

      departmentId1 = [];

      departmentName1.forEach(function(departName){
        departmentId1.push(Departments.insert({
          'departmentName' : departName,
          'departmentDescription' : "Architecture"
        }))
      })

    }

    if(FacultyDepartments.find().count() > 0){

    }
    else{

      departmentId.forEach(function (depId){
        addDepartmentIdToFaculty(facultyId, depId);
      })

      departmentId1.forEach(function (depId){
        addDepartmentIdToFaculty(facultyId1, depId);
      })
    }

    if(Lectures.find().count() > 0){

    }
    else{

      lectureDatabase = {
        lectureName : 'Database Management',
        lectureCode : 'SE307',
        lectureCredit : 3,
        profName : 'Şenol Zafer Erdoğan'
      };

      lectureDataStructure = {
        lectureName : 'Data Structures',
        lectureCode : 'CEN235',
        lectureCredit : 3,
        profName : 'Mehmet Ali Aksoy Tüysüz'
      };

      lectureSoftValid = {
        lectureName : 'Software Validation',
        lectureCode : 'SE342',
        lectureCredit : 3,
        profName : 'Selim Bayraklı'
      }

      lectureComputerOrg = {
        lectureName : 'Computer Organization',
        lectureCode : 'CEN 221',
        lectureCredit : 3,
        profName : 'Serap Çekli'
      }

      lecturePython = {
        lectureName : 'Python Programming',
        lectureCode : 'SE 383',
        lectureCredit : 3,
        profName : 'Selim Bayraklı'
      }

      lectureJava = {
        lectureName : 'Java-Based Application Development',
        lectureCode : 'SE 472',
        lectureCredit : 3,
        profName : 'Turgay Tugay Bilgin'
      }

      lectureSignal = {
        lectureName : 'Signals and Systems',
        lectureCode : 'EE 206',
        lectureCredit : 4,
        profName : 'Fatma Sarıca'
      }

      lectureCrypto = {
        lectureName : 'Kriptoloji',
        lectureCode : 'BIL 406',
        lectureCredit : 3,
        profName : 'Ilhami Yavuz'
      }

      lecDbId = addLecture(lectureDatabase);
      lecDataStructureId = addLecture(lectureDataStructure);
      lecSoftValId = addLecture(lectureSoftValid);
      lecOrgId = addLecture(lectureComputerOrg);
      lecturePythonId = addLecture(lecturePython);
      lecJavaId = addLecture(lectureJava);
      lectureSignalId = addLecture(lectureSignal);
      lectureCryptoId = addLecture(lectureCrypto);

      if(Meteor.users.find().count() > 0){

      }
      else{

        var newAdmin = Accounts.createUser({
          username : 'admin',
          password : 'asdasd',
          profile : {
            role : ['Admin']
          }
        })

        var newSchool = Accounts.createUser({
          username : 'school',
          password : 'asdasd',
          profile : {
            role : ['School']
          }
        })

        var newDeanEngineer = Accounts.createUser({
          username : 'deanEngineer',
          password : 'asdasd',
          profile : {
            role : ['Dean', 'Professor']
          }
        })

        var newDean = Deans.insert({
          userId : newDeanEngineer,
          deanName : 'İlhami Yavuz',
          facultyId : facultyId
        })

        FacultyDeans.insert({
          facultyId : facultyId,
          deanId : newDean
        })

        var professor0 = Professors.insert({
          userId : newDeanEngineer,
          professorName : 'İlhami Yavuz',
          isConsultant : false,
          isDean : true
        })

        ProfessorsFaculty.insert({
          profId : professor0,
          facultyId : facultyId
        })

        ProfessorLectures.insert({
          professorId : professor0,
          Lecture : lectureCryptoId
        })

        var newConsultant = Accounts.createUser({
          username : 'consultant',
          password : 'asdasd',
          profile : {
            role : ['Consultant', 'Professor'],
            name : 'Mehmet Ali Aksoy Tüysüz'
          }
        })

        Consultants.insert({
          userId : newConsultant,
          consultantName : 'Mehmet Ali Aksoy Tüysüz',
          consultantDepartmentId : departmentId[0]
        })

        var professor = Professors.insert({
          userId : newConsultant,
          professorName : 'Mehmet Ali Aksoy Tüysüz',
          isConsultant : true,
          isDean : false
        })

        ProfessorsFaculty.insert({
          profId : professor,
          facultyId : facultyId
        })

        ProfessorLectures.insert({
          professorId : professor,
          Lecture : lecDataStructureId
        })

        var newConsultant1 = Accounts.createUser({
          username : 'consultant1',
          password : 'asdasd',
          profile : {
            role : ['Consultant', 'Professor', 'DepartmentHead'],
            name : 'Serap Çekli'
          }
        })

        Consultants.insert({
          userId : newConsultant1,
          consultantName : 'Serap Çekli',
          consultantDepartmentId : departmentId[1]
        })

        var facDep = FacultyDepartments.find({"departmentId" : departmentId[1]}).fetch();

        FacultyDepartments.update({"_id" : facDep[0]._id}, {
          $set : {
            haveHead : true
          }
        })

        var professor1 = Professors.insert({
          userId : newConsultant1,
          professorName : 'Serap Çekli',
          isConsultant : true,
          isDean : false
        })

        ProfessorsFaculty.insert({
          profId : professor1,
          facultyId : facultyId
        })

        ProfessorLectures.insert({
          professorId : professor1,
          Lecture : lecOrgId
        })

        DepartmentHeads.insert({
          departmentId : departmentId[1],
          headId : newConsultant1
        })

        var newConsultant2 = Accounts.createUser({
          username : 'consultant2',
          password : 'asdasd',
          profile : {
            role : ['Consultant', 'Professor', 'DepartmentHead'],
            name : 'Şenol Zafer Erdoğan'
          }
        })

        var facDep = FacultyDepartments.find({"departmentId" : departmentId[0]}).fetch();

        FacultyDepartments.update({"_id" : facDep[0]._id}, {
          $set : {
            haveHead : true
          }
        })


        Consultants.insert({
          userId : newConsultant2,
          consultantName : 'Şenol Zafer Erdoğan',
          consultantDepartmentId : departmentId[0]
        })

        var professor2 = Professors.insert({
          userId : newConsultant2,
          professorName : 'Şenol Zafer Erdoğan',
          isConsultant : true,
          isDean : false
        })

        ProfessorsFaculty.insert({
          profId : professor2,
          facultyId : facultyId
        })

        ProfessorLectures.insert({
          professorId : professor2,
          Lecture : lecDbId
        })

        DepartmentHeads.insert({
          departmentId : departmentId[0],
          headId : newConsultant2
        })

        var newProfessor = Accounts.createUser({
          username : 'professor',
          password : 'asdasd',
          profile : {
            role : ['Professor'],
            name : 'Selim Bayraklı'
          }
        })

        var professor3 = Professors.insert({
          userId : newProfessor,
          professorName : 'Selim Bayraklı',
          isConsultant : false,
          isDean : false
        })

        ProfessorsFaculty.insert({
          profId : professor3,
          facultyId : facultyId
        })

        ProfessorLectures.insert({
          professorId : professor3,
          Lecture : lecSoftValId
        })

        ProfessorLectures.insert({
          professorId : professor3,
          Lecture : lecturePythonId
        })

        var newProfessor1 = Accounts.createUser({
          username : 'professor1',
          password : 'asdasd',
          profile : {
            role : ['Professor'],
            name : 'Tugay Turgay Bilgin'
          }
        })

        var professor4 = Professors.insert({
          userId : newProfessor1,
          professorName : 'Tugay Turgay Bilgin',
          isConsultant : false,
          isDean : false
        })

        ProfessorsFaculty.insert({
          profId : professor4,
          facultyId : facultyId
        })

        ProfessorLectures.insert({
          professorId : professor4,
          Lecture : lecJavaId
        })

        var newProfessor2 = Accounts.createUser({
          username : 'professor2',
          password : 'asdasd',
          profile : {
            role : ['Professor'],
            name : 'Fatma Sarıca'
          }
        })

        var professor5 = Professors.insert({
            userId : newProfessor2,
            professorName : 'Fatma Sarıca',
            isConsultant : false,
            isDean : false
        })

        ProfessorsFaculty.insert({
          profId : professor5,
          facultyId : facultyId
        })

        ProfessorLectures.insert({
          professorId : professor5,
          Lecture : lectureSignalId
        })

      }


    }






    if(DepartmentLectures.find().count() > 0){

    }
    else{
      softDepartmentId = getDepartmentIdByName('Software Engineering');
      computerDepartmentId = getDepartmentIdByName('Computer Engineering');
      electricDepartmentId = getDepartmentIdByName('Electric-Electronic Engineering');

      addLectureIdToDepartment(lecDbId, computerDepartmentId);
      addLectureIdToDepartment(lecDataStructureId, computerDepartmentId);
      addLectureIdToDepartment(lecSoftValId, softDepartmentId);
      addLectureIdToDepartment(lecOrgId, computerDepartmentId);
      addLectureIdToDepartment(lecturePythonId, softDepartmentId);
      addLectureIdToDepartment(lecJavaId, softDepartmentId);
      addLectureIdToDepartment(lectureSignalId, electricDepartmentId);
      addLectureIdToDepartment(lectureCryptoId, computerDepartmentId);

    }


})
