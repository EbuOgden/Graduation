if(Meteor.isCordova || Meteor.isClient){

  Template.bus19h.onRendered(function(){
    Session.set('meslek', true);
    Session.set('kadikoy', false);
  })

  Template.bus19h.events({
    'click #changeDirectionH' : function(e){
      e.preventDefault();
      if(Session.get('meslek')){
        Session.set('meslek', false);
        Session.set('kadikoy', true);
      }
      else{
        Session.set('kadikoy', false);
        Session.set('meslek', true);
      }
    }
  })

  Template.bus19h.helpers({
    meslek : function(){
      return Session.get('meslek');
    },

    kadikoy : function(){
      return Session.get('kadikoy');
    }
  })
}
