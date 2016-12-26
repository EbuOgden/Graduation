if(Meteor.isClient || Meteor.isCordova){

    Template.adminHome.helpers({
      haveNotificationRoom : function(){
        if((NotificationRoomUniversity.find().count() > 0)){
          return true;
        }
        else{
          return false;
        }
      }
    })
}
