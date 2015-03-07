function setPublicToggleState(){
    var toggle = document.getElementById("public-toggle");
    var reviewEnabled = false;
    var userIntroACL = new Parse.ACL(Parse.User.current());
    
            console.log("Setting Public Toggle Button")
            if(CurrentUserVar==null){
            }else{
            var UserIntroData = Parse.Object.extend("UserIntroData");
            var query = new Parse.Query(UserIntroData);
            query.equalTo("username", CurrentUserVar.getUsername());
            query.first({
                success: function(results) {
                    //set Radio Toggle State
                    reviewEnabled = results.get("reviewEnabled");
                    if(reviewEnabled==true){
                        toggle.checked=true;
                        userIntroACL.setPublicReadAccess(true);
                        results.setACL(userIntroACL);
                        results.save();
                    }else{
                        toggle.checked=false;
                        userIntroACL.setPublicReadAccess(false);
                        results.setACL(userIntroACL);
                        results.save();
                    }
                     
                },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
            }
}

        function setPublic(){
            var toggle = document.getElementById("public-toggle");
             var PublicBoolean = false;
    if (toggle.checked) {
    // do something if when checked
        PublicBoolean = true;
  } else {
    // do something if not checked
      PublicBoolean = false;
  }
    
    
            var userIntroACL = new Parse.ACL(Parse.User.current());
            console.log("Toggle State:"+PublicBoolean);
            console.log("saving...")
            if(CurrentUserVar==null){
                location.href="login.html"
            }else{
             showToast("설정 저장 중");
            
            //Find Existing Data First
            var UserIntroData = Parse.Object.extend("UserIntroData");
            var query = new Parse.Query(UserIntroData);
            query.equalTo("username", CurrentUserVar.getUsername());
            query.first({
                success: function(object) {
                    //Update Existing Data
                    if(object==null){
                    console.log("No Data Found");
                         //Data Not Exist, Create New One
                    var userIntroData = new UserIntroData();
                    userIntroData.set("username", CurrentUserVar.getUsername());
                    userIntroData.set("reviewEnabled",PublicBoolean);
                    userIntroACL.setPublicReadAccess(PublicBoolean);
                    userIntroData.setACL(userIntroACL);
                    userIntroData.save(null, {
                        success: function(userIntroData) {  
                            showToast("설정 저장 완료");
                            },
                        error: function(userIntroData, error) {
                            showToast("설정 저장 오류 발생");
                              }
                            });
                    }else{
                        object.set("reviewEnabled",PublicBoolean);
                        userIntroACL.setPublicReadAccess(PublicBoolean);
                        object.setACL(userIntroACL);
                        object.save(null, {
                        success: function(userIntroData) {  
                            showToast("설정 저장 완료");
                            },
                        error: function(userIntroData, error) {
                            showToast("설정 저장 오류 발생");
                              }
                            });
                    }
                },
                error: function(error) {
                    //Data Not Exist, Create New One
                    var userIntroData = new UserIntroData();
                    userIntroData.set("username", CurrentUserVar.getUsername());
                    userIntroData.set("reviewEnabled",PublicBoolean);
                    userIntroACL.setPublicReadAccess(PublicBoolean);
                    userIntroData.setACL(userIntroACL);
                    userIntroData.save(null, {
                        success: function(userIntroData) {  
                            showToast("설정 저장 완료");
                            },
                        error: function(userIntroData, error) {
                            showToast("설정 저장 오류 발생");
                              }
                            });
                        }
                    });
            }
        }

//function showAllowed(){
//    
//            //Find Existing Data First
//            var UserIntroData = Parse.Object.extend("UserIntroData");
//            var query = new Parse.Query(UserIntroData);
//            query.equalTo("username", CurrentUserVar.getUsername());
//            query.first({
//                success: function(object) {
//                    var ACL = object.getACL()
//                    
//                },
//                error: function(error) {
//                        }
//                    });
//}
//
//function allowNewPerson(){
//    
//            //Find Existing Data First
//            var UserIntroData = Parse.Object.extend("UserIntroData");
//            var query = new Parse.Query(UserIntroData);
//            query.equalTo("username", CurrentUserVar.getUsername());
//            query.first({
//                success: function(object) {
//                    
//                },
//                error: function(error) {
//                        }
//                    });
//}
//
//function removeAllowed(){
//}