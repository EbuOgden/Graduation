if(Meteor.isCordova || Meteor.isClient){

  Template.admin.onCreated(function(){
    document.title = 'Admin';
  })

}
