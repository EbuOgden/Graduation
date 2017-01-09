App.accessRule("*");

App.info({
     name: 'Graduation',
     description: 'An app for initial communication between academics and students',
     version: '0.0.1',
     author : 'Ebubekir Ogden',
     email : 'ebubekirogden@gmail.com'
});

App.icons({

    //iOS
    'iphone' : 'public/icons/128.png',
    'iphone_2x' : 'public/icons/128.png',
    'iphone_3x' : 'public/icons/128.png',
    'ipad': 'public/icons/128.png',
    'ipad_2x': 'public/icons/128.png',
    //android
    'android_ldpi' : 'public/icons/36x36.png',
    'android_mdpi' : 'public/icons/48x48.png',
    'android_hdpi' : 'public/icons/72x72.png',
    'android_xhdpi' : 'public/icons/96x96.png'
});

App.launchScreens({

    //iOS
    'iphone' : 'public/splash/iphone4.png',
    'iphone_2x' : 'public/splash/iphone4.png',
    'iphone5' : 'public/splash/iphone5.png',
    'iphone6' : 'public/splash/iphone6.png',
    'iphone6p_portrait' : 'public/splash/iphone6plus.png'


    //Android


})

App.configurePlugin('phonegap-plugin-push', {
  'SENDER_ID': '526519238456'
});

App.setPreference("webviewbounce", "false");
App.setPreference("DisallowOverscroll", "true");
App.setPreference("UIWebViewBounce", "false");
App.setPreference("StatusBarOverlaysWebView", "true");
App.setPreference("StatusBarStyle", "lightcontent");
App.setPreference("orientation", "portrait");
App.setPreference("ShowSplashScreenSpinner", "false");//splash screen loading spinner close
App.setPreference("KeyboardDisplayRequiresUserAction", "false");
App.setPreference("KeyboardShrinksView", "true");// keyboard open white space decline
