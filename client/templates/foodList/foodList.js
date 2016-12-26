if(Meteor.isClient || Meteor.isCordova){
  Template.foodList.events({
    'click .foodListOpen' : function(e){
      e.preventDefault();

      if(Meteor.Device.isDesktop()){
        window.open("");
      }
      else{
          cordova.InAppBrowser.open('', '_blank', 'location=yes');
      }

    }
  })
}
