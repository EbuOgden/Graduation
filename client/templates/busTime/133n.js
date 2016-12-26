if(Meteor.isCordova || Meteor.isClient){

  Template.bus133n.onRendered(function(){
    Session.set('meslek', true);
    Session.set('kartal', false);
  })

  Template.bus133n.events({
    'click #changeDirectionN' : function(e){
      e.preventDefault();
      if(Session.get('meslek')){
        Session.set('meslek', false);
        Session.set('kartal', true);
      }
      else{
        Session.set('kartal', false);
        Session.set('meslek', true);
      }
    }
  })

  Template.bus133n.helpers({
    meslek : function(){
      return Session.get('meslek');
    },

    kartal : function(){
      return Session.get('kartal');
    }
  })
}
