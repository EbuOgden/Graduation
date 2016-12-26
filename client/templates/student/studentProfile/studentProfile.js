if(Meteor.isCordova){
	Template.studentProfile.rendered = function(){
		Session.set('studentProfileHome', true);
		Session.set('studentProfileCheck', false);
	};
	
	Template.studentProfile.helpers({
		profile : function(){
			return Meteor.users.findOne({_id : Meteor.userId()}).profile;
		},
		
		email : function(){
			return Meteor.users.findOne({_id : Meteor.userId()}).emails;
		},
		
		studentProfileHome : function(){
			return Session.get('studentProfileHome');
		},
		
		studentProfileCheck : function(){
			return Session.get('studentProfileCheck');
		}
	});
	
	Template.studentProfile.events({
		'keyup #studentProfile' : function(){
			if(!isEmpty($('#studentName').val()) || !isEmpty($('#studentSurname').val()) || !isEmpty($('#studentEmail').val()) || !isEmpty($('#password').val())){
				Session.set('studentProfileHome', false);
				Session.set('studentProfileCheck', true);
				
			}
			else{
				Session.set('studentProfileCheck', false);
				Session.set('studentProfileHome', true);
				
				
			}
		},
		
		'click #studentProfileHome' : function(e){
			e.preventDefault();
			Session.set('studentProfile', false);
			Session.set('studentSettings', false);
			Session.set('studentHome', true);
			
		},
		
		'click #studentProfileCheck' : function(e){
			e.preventDefault();
			console.log("check ticked");
		}
	})
}