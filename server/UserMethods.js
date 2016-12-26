  /* User Processes */
  Meteor.methods({
    addUser : function(userInfo){
      this.unblock();
      var userId = Meteor.users.insert({
        username : userInfo.username,
        profile : {
          name : userInfo.profile.name,
          role : userInfo.profile.role
        },
        createdAt : new Date()
      })
      if(userId){
        Accounts.setPassword(userId, userInfo.password);
        return userId;
      }
      else{
        console.log("This user is already exist");
      }
    },

    updateUser : function(userId, newRole){
      this.unblock();
      var updateUserResult = Meteor.users.update({"_id" : userId}, {
        $addToSet : {
          "profile.role" : newRole
        }
      })

      return updateUserResult;
    },

    updateUserRole : function(userId, deleteRole){
      this.unblock();
      var updateUserRoleResult = Meteor.users.update({"_id" : userId}, {
        $pull : {
          "profile.role" : deleteRole
        }
      })

      return updateUserRoleResult;
    },

    removeUser : function(userId){
      this.unblock();
      var removeResult = Meteor.users.remove({"_id" : userId});

      if(removeResult){
          return true;
      }
      else{
        return false;
      }

    }
  })
  /*addUser = function(userInfo){
    var userId = Accounts.createUser({
      username : userInfo.username,
      email : userInfo.email,
      profile : {
        name : userInfo.profile.name,
        surname : userInfo.profile.surname,
        dateOfBirth : userInfo.profile.birth,
        role : userInfo.profile.role
      }
    }, function(err){
      if(err){
        console.log("This user is already exist!");
      }
      else{
        Accounts.setPassword(userId, userInfo.password);
        return userId;
      }
    });

  };*/

  setRoleForNewUser = function(userId, roleName){ /*role name must be array */
      Meteor.users.update(userId,
        {
          $set : {
            profile : {
              role : roleName
            }
          }
        }
      )
  };

  updateRoleUser = function(userId, roleName){
    Meteor.users.update(userId,
    {
      $push : {
        profile : {
          role : roleName
        }
      }
    })
  };

  getRoleForUser = function(userId){
    var user = Meteor.users.findOne(userId);

    return user.profile;
    if(roleName == null){
      console.log("There is no user like that");
    }
    else{
      console.dir(roleName.profile.role);
    }
  };

  /*    */
