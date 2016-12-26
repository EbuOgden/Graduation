if(Meteor.isCordova || Meteor.isClient){

  Template.busTime.onRendered(function(){
    Session.set('km40', true);
    Session.set('19h', false);
    Session.set('133n', false);

  })

  Template.busTime.events({
    'click #19h' : function(e){
      e.preventDefault();

      $('#km40').removeClass('active');
      $('#km40').find('i').removeClass('busTimes');

      $('#133n').removeClass('active');
      $('#133n').find('i').removeClass('busTimes');

      $('#19h').addClass('active');
      $('#19h').find('i').addClass('busTimes');

      //templateRender('19h', '#busTimePics');
      Session.set('km40', false);
      Session.set('133n', false);
      Session.set('19h', true);
    },

    'click #km40' : function(e){
      e.preventDefault();

      $('#19h').removeClass('active');
      $('#19h').find('i').removeClass('busTimes');

      $('#133n').removeClass('active');
      $('#133n').find('i').removeClass('busTimes');

      $('#km40').addClass('active');
      $('#km40').find('i').addClass('busTimes');

      //templateRender('km40', '#busTimePics');
      Session.set('133n', false);
      Session.set('19h', false);
      Session.set('km40', true);
    },

    'click #133n' : function(e){
      e.preventDefault();

      $('#19h').removeClass('active');
      $('#19h').find('i').removeClass('busTimes');

      $('#km40').removeClass('active');
      $('#km40').find('i').removeClass('busTimes');

      $('#133n').addClass('active');
      $('#133n').find('i').addClass('busTimes');

      //templateRender('133n', '#busTimePics');
      Session.set('19h', false);
      Session.set('km40', false);
      Session.set('133n', true);
    }
  }),

  Template.busTime.helpers({
    Bus19 : function(){
      return Session.get('19h');
    },

    Buskm40 : function(){
      return Session.get('km40');
    },

    Bus133n : function(){
      return Session.get('133n');
    }
  })
}
