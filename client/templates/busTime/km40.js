if(Meteor.isCordova || Meteor.isClient){

  Template.busKm40.onRendered(function(){
    Session.set('meslek', true);
    Session.set('maltepe', false);
  })

  Template.busKm40.events({
    'click #changeDirectionKm' : function(e){
      e.preventDefault();
      if(Session.get('meslek')){
        Session.set('meslek', false);
        Session.set('maltepe', true);
      }
      else{
        Session.set('maltepe', false);
        Session.set('meslek', true);
      }
    }
  })

  Template.busKm40.helpers({
    meslek : function(){
      return Session.get('meslek');
    },

    maltepe : function(){
      return Session.get('maltepe');
    }
  })
}
