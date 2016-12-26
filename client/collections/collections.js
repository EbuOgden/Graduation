LocalCollectionForLogin = new Meteor.Collection(null);

LocalCollectionForLectures = new Meteor.Collection(null);
LocalCollectionForStudentLectures = new Meteor.Collection(null);
LocalCollectionForLectureSelects = new Meteor.Collection(null);
LocalCollectionForDepartments = new Meteor.Collection(null);
LocalCollectionForConsultants = new Meteor.Collection(null);
LocalCollectionForStudentOwnConsultant = new Meteor.Collection(null);
LocalCollectionForStudentProfessorNotificationRooms = new Meteor.Collection(null);
LocalCollectionForStudentConsultantNotificationRooms = new Meteor.Collection(null);
LocalCollectionForStudentProfessorNotifications = new Meteor.Collection(null);
LocalCollectionForStudentConsultantNotifications = new Meteor.Collection(null);
LocalCollectionForStudentOwnConsultantTake = new Meteor.Collection(null);


LocalCollectionForProfessorLectures = new Meteor.Collection(null);
LocalCollectionForProfessorGetLectures = new Meteor.Collection(null);
LocalCollectionForProfessorStudentLecturesSub = new Meteor.Collection(null);
LocalCollectionForProfessorStudentIdsSub = new Meteor.Collection(null);
LocalCollectionForProfessorNotificationRooms = new Meteor.Collection(null);
LocalCollectionForProfessorNotifications = new Meteor.Collection(null);
LocalCollectionForProfessorLectureNotificationRoom = new Meteor.Collection(null);


LocalCollectionForConsultantSub = new Meteor.Collection(null);
LocalCollectionForConsultantLectures = new Meteor.Collection(null);
LocalCollectionForConsultantGetLectures = new Meteor.Collection(null);
LocalCollectionForConsultantStudentLecturesSub = new Meteor.Collection(null);
LocalCollectionForConsultantLectureStudentIdsSub = new Meteor.Collection(null);
LocalCollectionForConsultantStudentsSub = new Meteor.Collection(null);
LocalCollectionForConsultantStudentsIdsSub = new Meteor.Collection(null);
LocalCollectionForConsultantProfessorNotificationRooms = new Meteor.Collection(null);
LocalCollectionForConsultantNotificationRooms = new Meteor.Collection(null);
LocalCollectionForConsultantProfessorNotifications = new Meteor.Collection(null);
LocalCollectionForConsultantNotifications = new Meteor.Collection(null);
LocalCollectionForConsultantProfessorLectureNotificationRoom = new Meteor.Collection(null);
LocalCollectionForDepartmentHeadsSub = new Meteor.Collection(null);
LocalCollectionForConsultantDepartmentsSub = new Meteor.Collection(null);
LocalCollectionForConsultantMatchLectureDepartmentLectures = new Meteor.Collection(null);
LocalCollectionForConsultantMatchLectureLectures = new Meteor.Collection(null);
LocalCollectionForConsultantProfessor = new Meteor.Collection(null);
LocalCollectionForFacultyId = new Meteor.Collection(null);
LocalCollectionForFacultyProfessorsId = new Meteor.Collection(null);
LocalCollectionForFacultyProfessors = new Meteor.Collection(null);
LocalCollectionForAddProfessorsToCons = new Meteor.Collection(null);

LocalCollectionForConsultantDeleteLectures = new Meteor.Collection(null);
LocalCollectionForConsultantGetLecturesForDelete = new Meteor.Collection(null);
LocalCollectionForDeleteProfessorsFaculty = new Meteor.Collection(null);

LocalCollectionForProfessorLectureDelete = new Meteor.Collection(null);
LocalCollectionForStudentLectureDelete = new Meteor.Collection(null);
LocalCollectionForLectureNotificationRoomDelete = new Meteor.Collection(null);
LocalCollectionForLectureNotificationsDelete = new Meteor.Collection(null);

LocalCollectionForViewedUsers = new Meteor.Collection(null);

/* DEAN */
LocalCollectionForDeanSub = new Meteor.Collection(null);
LocalCollectionForDeanFacultySub = new Meteor.Collection(null);
LocalCollectionForDeanFacultyIdSub = new Meteor.Collection(null);
LocalCollectionForDeanFacultyDepartmentsSub = new Meteor.Collection(null);
LocalCollectionForDeanDepartmentsSub = new Meteor.Collection(null);
LocalCollectionForAddDeanDepartmentHead = new Meteor.Collection(null);

/* DEAN DELETE DEPARTMENT */

LocalCollectionForDeanDeleteDepartmentHeadsSub = new Meteor.Collection(null);
LocalCollectionForDeanDeleteDepartmentLectures = new Meteor.Collection(null);
LocalCollectionForDeanDeleteLecturesFromDepartmentLectures = new Meteor.Collection(null);
LocalCollectionForDeanDeleteProfessorLecturesFromLectures = new Meteor.Collection(null);
LocalCollectionForDeanDeleteStudentLecturesFromLectures = new Meteor.Collection(null);
LocalCollectionForDeanDeleteProfessorNotificationRoom = new Meteor.Collection(null);
LocalCollectionForDeanDeleteProfessorNotificationsFromRoom = new Meteor.Collection(null);
LocalCollectionForDeanUpdateUserProfile = new Meteor.Collection(null);

/* DEAN DELETE DEPARTMENT HEAD */

LocalCollectionForDeanDeleteProfessor = new Meteor.Collection(null);
LocalCollectionForDeanDeleteProfessorLectures = new Meteor.Collection(null);
LocalCollectionForDeanDeleteLecturesFromProfessorLectures = new Meteor.Collection(null);
LocalCollectionForDeanDeleteProfessorsFaculty = new Meteor.Collection(null);
LocalCollectionForDeanDeleteDepartmentHeadConsultant = new Meteor.Collection(null);
LocalCollectionForDeanDeleteUserProfile = new Meteor.Collection(null);
LocalCollectionForDeanDeleteConsultantStudentsDelete = new Meteor.Collection(null);
LocalCollectionForDeanDeleteConsultantNotificationRoom = new Meteor.Collection(null);
LocalCollectionForDeanDeleteConsultantNotifications = new Meteor.Collection(null);

/* ADMIN ADD DEAN */

LocalCollectionForAdminGetFaculties = new Meteor.Collection(null);
LocalCollectionForAdminGetProfessorsForSelectDean = new Meteor.Collection(null);

/* ADMIN DELETE DEAN */

LocalCollectionForAdminDeleteDeanGetDeans = new Meteor.Collection(null); /* delete */
LocalCollectionForAdminDeleteDeanGetFaculties = new Meteor.Collection(null); /* update haveDean */
LocalCollectionForAdminDeleteDeanGetFacultyDeans = new Meteor.Collection(null); /* delete */
LocalCollectionForAdminDeleteDeanGetProfessors = new Meteor.Collection(null); /* delete */
LocalCollectionForAdminDeleteDeanGetFacultyProfessors = new Meteor.Collection(null); /* delete */
LocalCollectionForAdminDeleteDeanGetConsultants = new Meteor.Collection(null); /* if consultant so delete */
LocalCollectionForAdminDeleteDeanGetStudentConsultants = new Meteor.Collection(null); /* update consultant id null */ 
LocalCollectionForAdminDeleteDeanGetProfessorLectures = new Meteor.Collection(null); /* delete */
LocalCollectionForAdminDeleteDeanGetLectures = new Meteor.Collection(null); /* update prof name */
