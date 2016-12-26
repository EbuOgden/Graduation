/* Permission Processes */
addPermission = function(permissionName) {
  Permissions.insert({
    'permissionName' : permissionName
  })
};

getPermissionIdByName = function(permissionName) {
  var permissionIdList = [];

  permissionName.forEach(function(permissionItem){
      var permission = Permissions.findOne({'permissionName' : permissionItem});
      if(permission == null){
          console.log('There is no permission that named : ' + permissionName);
      }
      else{
          permissionIdList.push(permission._id);
        }
      })

  return permissionIdList;
};

/* using App-in processes for edit, send etc. */
getPermissionNameById = function(permissionId){
  var permissionNameList = [];

  permissionId.forEach(function(permissionItem){
      var permission = Permissions.findOne({'_id' : permissionItem});
      if(permission == null){
          console.log('There is no permission that named : ' + permissionName);
      }
      else{
          permissionNameList.push(permission.permissionName);
        }
      })

  return permissionNameList;
};

/*      */
