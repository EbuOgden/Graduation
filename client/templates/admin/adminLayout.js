if(Meteor.isCordova || Meteor.isClient){
    Template.adminLayout.events({
      'click #homeButtoniOS' : function(e){
  			e.preventDefault();
  			templateRender('adminHome', '#adminMain');

  		},

  		'click #schoolButtoniOS' : function(e){
  			e.preventDefault();
        templateRender('schoolProcesses', '#adminMain');

  		},

  		'click #busButtoniOS' : function(e){
  			e.preventDefault();
  			templateRender('busTime', '#adminMain');
  		},

  		'click #foodButtoniOS' : function(e){
  			e.preventDefault();
  			templateRender('foodList', '#adminMain');
  		},

  		'click #feedBackButtoniOS' : function(e){
  			e.preventDefault();
  			templateRender('feedBack', '#adminMain');
  		},

  		'click #settingsButtoniOS' : function(e){
  			e.preventDefault();
  			templateRender('adminSettings', '#adminMain');
  		},

      'click #logOutButtoniOS' : function(e){
        e.preventDefault();
        Meteor.logout();
      }
    })
}
