if(Meteor.isCordova || Meteor.isClient){

  Template.signupModaliOS.onRendered(function(){
    if(Meteor.Device.isDesktop()){

    }
    else{
      StatusBar.hide();
    }


  })
  Template.signupModaliOS.events({
    'click #iOSModalClose': function(){
      if(Meteor.Device.isDesktop()){
        IonModal.close('signupModaliOS');
      }
      else{
        IonModal.close('signupModaliOS');
        StatusBar.show();
      }

    },

    'click .iOSModalSignup' : function(e, tmpl){
      e.preventDefault();
      var nameUser, usernameUser, passwordUser, rePasswordUser;

      usernameUser = trimInput(tmpl.find('#username').value);
      nameUser = trimInput(tmpl.find('#name').value)
      passwordUser = tmpl.find('#password').value;
      rePasswordUser = tmpl.find('#rPassword').value;

      if((isEmpty(usernameUser) || isEmpty(passwordUser) || isEmpty(rePasswordUser) || isEmpty(nameUser))){
        if(Meteor.Device.isDesktop()){
            alert("Please Fill All Boxes!");
            return;
        }
        else{
            navigator.notification.alert("Please Fill All Boxes!");
            return;
        }

      }
      else{

        if((9 < usernameUser.length) || (usernameUser.length < 9)){
          if(Meteor.Device.isDesktop()){
              alert("Username must be 9 number!");
              return;
          }
          else{
              navigator.notification.alert("Username must be 9 number!");
              return;
          }

        }

        if(isValidPassword(passwordUser)){
          if(areValidPassword(passwordUser, rePasswordUser)){
            Accounts.createUser({
              username : usernameUser,
              password : rePasswordUser,
              profile : {
                role : ['Student'],
                name : nameUser
              }
            }, function(err){
              if(err){
                if(Meteor.Device.isDesktop()){
                    alert("This user is already exists!");
                }
                else{
                    navigator.notification.alert("This user is already exists!");
                }
              }
              else{
                Meteor.loginWithPassword(usernameUser, rePasswordUser, function(err){
                  /*Eger login islemi fail olur ise log tutulur*/
                  if(err){
                    if(Meteor.Device.isDesktop()){
                        alert("Cannot login the system");
                    }
                    else{
                        navigator.notification.alert("Cannot login the system");
                    }

                  }
                  /*Eger login islemi success olur ise kullanici route edilir*/
                  else{

                    if(Meteor.Device.isDesktop()){
                        IonModal.close();
                        Router.go('/student');
                    }
                    else{
                        IonModal.close();
                        StatusBar.show();
                        Router.go('/student');
                    }


                  }
                })
              }
            });
          }
          else{
            if(Meteor.Device.isDesktop()){
                alert("Passwords are not equal!");
            }
            else{
                navigator.notification.alert("Passwords are not equal!");
            }

          }
        }
        else{
          if(Meteor.Device.isDesktop()){
              alert("Password must be at least 6 characters");
          }
          else{
              navigator.notification.alert("Password must be at least 6 characters");
          }
        }

      }
    }

  })

}
