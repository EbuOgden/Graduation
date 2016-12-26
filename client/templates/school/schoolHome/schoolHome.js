if(Meteor.isClient || Meteor.isCordova){

    Template.schoolHome.events({
      'click #schoolNewNotif' : function(e){
        IonModal.open('schoolNewNotifSendModal');
      }
    })

}
