if(Meteor.isClient || Meteor.isCordova){
  Template.foodList.events({
    'click .foodListOpen' : function(e){
      e.preventDefault();

      if(Meteor.Device.isDesktop()){
        window.open("https://www.mek.k12.tr/ilkogretim-okullarimiz/detay/Yemek-Listesi/1473/2135/0");
      }
      else{
          cordova.InAppBrowser.open('https://www.mek.k12.tr/ilkogretim-okullarimiz/detay/Yemek-Listesi/1473/2135/0', '_blank', 'location=yes');
      }

    }
  })
}
