/* Role Processes */
addNewRole = function(roleName, permissionsId){
    Roles.insert({
      'roleType' : roleName,
      'permissionsId' : permissionsId
    })
};

checkPermissionForRole = function(roleName) {
    var role = Roles.findOne({'roleType' : roleName});

    if(role == null) {
      console.log('There is no role that named : '  + roleName);
    }
    else{
      return role.permissionsId;
    }
};
