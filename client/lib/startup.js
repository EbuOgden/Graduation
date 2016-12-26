Meteor.startup(function(){
  if(Meteor.isCordova){

    Reload._onMigrate(function (retry) {
        return [false];
    });

    cordova.plugins.backgroundMode.enable();

    cordova.plugins.notification.local.registerPermission(function (granted) {
        console.log('Permission has been granted: ' + granted);
    });

    Push.enabled(true);

    cordova.plugins.notification.badge.configure({ autoClear: true });

    Push.Configure({
        gcm: {
            // Required for Android and Chrome OS
            projectNumber: '526519238456'
        },
        bagde: true,
        sound: true,
        alert: true
    });

    if(cordova.platformId == "android"){
      StatusBar.backgroundColorByHexString('#1565C0');//if platform is android StatusBar background select
    }

    cordova.plugins.Keyboard.disableScroll(true);
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);/*ios accessorybar close*/
  }

})
