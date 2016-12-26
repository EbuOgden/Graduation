Router.configure({
  notFoundTemplate: "notFound"
});

Router.route('/', {
	layoutTemplate : 'homeLayout',
	template : 'home',
	name : 'home'
});

Router.route('/intro',{
	template : 'intro',
	name : 'intro'
});

Router.route('/admin', {
	layoutTemplate : 'adminLayout',
	template : 'admin',
	name : 'admin'
})

Router.route('/school', {
	layoutTemplate : 'schoolLayout',
	template : 'school',
	name : 'school'
},);

Router.route('/consultant', {
	layoutTemplate : 'consultantLayout',
	template : 'consultant',
	name : 'consultant'
});

Router.route('/professor', {
	layoutTemplate : 'professorLayout',
	template : 'professor',
	name : 'professor'
});

Router.route('/student', {
	layoutTemplate : 'studentLayout',
	template : 'student',
	name : 'student'
});

Router.route('/student/:_id', {
	layoutTemplate : 'lectureSelectLayout',
	template : 'lectureSelect',
	name: 'lecture.select'
})
