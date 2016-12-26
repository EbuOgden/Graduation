isEmpty = function(message){
	if(message === "" || message == "" || message === "undefined" || message == "undefined"){
		return true;
	}
	else
		return false;
}

isEqual = function(message1, message2){
	if((message1 == message2) || (message1 === message2)){
		return true;
	}
	else{
		return false;
	}

}

templateRender = function(templateName, whereToRender){

	dynamic = new Iron.DynamicTemplate();

	dynamic.clear();

  //console.log('dynamic clear');
  dynamic.insert({
    el : whereToRender
  })

  dynamic.template(templateName);

  IonSideMenu.snapper.close();

}

cookieControl = function(cookieName){
	if(Cookie.get(cookieName))
		return true;
	else {
		return false;
	}

}

trimInput = function(value){
	return value.replace(/^\s*$/g, '');
}

isEmail = function(email){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(filter.test(email))
			return true;

	else{
			navigator.notification.alert("E-mail is not valid!");
			return false;
	}
}

isValidPassword = function(password){
	if(password.length < 6){
		return false;
	}

	else {
		return true;
	}
}

areValidPassword = function(password, rePassword){

	if(password !== rePassword){
		return false;
	}

	return true;
}

addUser = function(userInfo){
	userProfile = userInfo.profile
	Accounts.createUser({
		username : userInfo.username,
		password : userInfo.password,
		profile : {
			role : userProfile.role
		}
	}, function(err){
		if(err){
			console.log("ERROR : " + err);
			return false;
		}
		else{
			console.log("Successfull");
			return true;
		}
	});



};

addStudent = function(studentInfo){
	Students.insert({
		userId : studentInfo.userId,
		student : {
			uniId : studentInfo.uniId,
			facultyId : studentInfo.facultyId,
			departmentId : studentInfo.departmentId
		}
	})
}

getDepartmentIdByFacId = function(facId){
	var facultyDepartment;
	var departmentId = [];

	facultyDepartment = FacultyDepartments.find({facultyId : facId}).fetch();


	facultyDepartment.forEach(function(item){
		departmentId.push(item.departmentId);
	})

	return departmentId;

}

getLectureIdsFromDepartmentId = function(depId){

	var lectures = [];

	depId.forEach(function(item){
			DepartmentLectures.find({departmentId : item}).map(function(lectureItem){
				lectures.push(lectureItem.lectureId);
			});
	})

	if(!lectures){
		return false;
	}
	else{
		return lectures;
	}

}
