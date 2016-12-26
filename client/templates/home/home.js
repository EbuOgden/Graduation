if(Meteor.isCordova || Meteor.isClient){

  if(Meteor.Device.isDesktop()){

  }
  else{
    Push.addListener('token', function(token) {
        Session.set("token", token);
    });

    Push.addListener('startup', function(notification) {
      /* message receive on notification click */
      console.log('Startup Listener: ' + JSON.stringify(notification));
      alert('Startup Listener NOTIFICATION : ' + JSON.stringify(notification));
      alert('Startup Listener Message : ' + JSON.stringify(notification.message));
      alert('Startup Listener PAYLOAD: ' + JSON.stringify(notification.payload));

    });

  }


    Template.home.onRendered(function(){
      if(Meteor.Device.isDesktop()){
        document.title = 'Home';
      }
    })

    Template.home.events({

        'click .registeriOS': function(e){
          e.preventDefault();
          IonModal.open('signupModaliOS');
    		},

        'click .registerAndroid' : function(e){
          e.preventDefault();
          IonModal.open('signupModalAndroid');
    		},

        'click .loginButtoniOS' : function(e, tmpl){
          e.preventDefault();

          usernameLogin = tmpl.find('#usernameiOS').value;
          passwordLogin = tmpl.find('#passwordiOS').value;

          /*eger login sayfasinda girilen bilgilerden herhangi birisi bos ise*/
          if(isEmpty(usernameLogin) || isEmpty(passwordLogin)){
            /*kullaniciya bilgilendirme mesaji*/
            if(Meteor.Device.isDesktop()){
              alert('Please Fill All Boxes');
            }
            else{
              navigator.notification.confirm('Please Fill All Boxes', function(index){
                if(index == 0){
                  console.dir('Not Clicked');
                }
                if(index == 1){
                  console.dir('Ok Clicked');
                }
              },'Warning', ['OK']);
            }

          }
          else{

            /*girilen kullanici adinin user tablosunda olup olmadigini kontrol ediyoruz*/

            LocalCollectionForLogin.insert({
              sub : Meteor.subscribe('userForLogin', usernameLogin,{
  							onReady : function () {
                  searchedUser = Meteor.users.findOne({username : usernameLogin});

                  /*eger kullanici yok ise trick : searchedUser variable turu yok ve searchden de bir sey donmedigi icin undefined oluyor*/
                  if(!searchedUser){
                    if(Meteor.Device.isDesktop()){
                      alert('User does not exists');
                      LocalCollectionForLogin.find().map(function(eachSub){
                        eachSub.sub.stop();
                      })

                      LocalCollectionForLogin.remove({});
                    }
                    else{
                      navigator.notification.confirm('User Does Not Exists!', function(index){
                        if(index == 0){
                            console.dir('Not Button Clicked');
                        }
                        if(index == 1){//ok button clicked
                          LocalCollectionForLogin.find().map(function(eachSub){
                            eachSub.sub.stop();
                          })

                          LocalCollectionForLogin.remove({});
                            $('#usernameiOS').focus();
                        }
                      },'Warning', ['OK']);
                    }

                  }
                  /*eger kullanici var ise*/
                  else{

                      userProfile = searchedUser.profile;
                      /*giris yapiyoruz*/
                      Meteor.loginWithPassword(usernameLogin, passwordLogin, function(err){
                        /*giris yapamaz isek*/
                        if(err){
                          if(Meteor.Device.isDesktop()){
                            alert('Username or Password is Incorrect');
                          }
                          else{
                            navigator.notification.alert('Username or Password is Incorrect');
                          }

                        }
                        /*giris yapar isek*/
                        else{

                          if(userProfile.role == 'Student'){

                            Router.go('/student');
                          }
                          else if(userProfile.role == "School"){
                            Router.go('/school');
                          }
                          else if(userProfile.role == "Admin"){
                            Router.go('/admin');
                          }

                          if(userProfile.length >= 1){
                            for(i = userProfile.length; i--;){

                              if((userProfile.role[i] == "DepartmentHead") || (userProfile.role[i] == "Dean") || (userProfile.role[i] == "Consultant")){
                                Router.go('/consultant');
                              }

                            }

                            for(i = userProfile.length ; i--;){
                              if(userProfile.role[i] == "Professor"){
                                Router.go('/professor');
                              }
                            }
                          }
                        }

                      })
                  }
                 },
  							onError : function() { console.log("home onError", arguments);}
  						})
            })



          }



          }
    })

}
