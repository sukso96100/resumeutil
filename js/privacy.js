function setPublicToggleState(){
    var toggle = document.getElementById("public-toggle");
    var reviewEnabled = false;
    var userIntroACL;
    
            console.log("Setting Public Toggle Button")
            if(CurrentUserVar==null){
            }else{
            var UserIntroData = Parse.Object.extend("UserIntroData");
            var query = new Parse.Query(UserIntroData);
            query.equalTo("username", CurrentUserVar.getUsername());
            query.first({
                success: function(results) {
                    userIntroACL = results.getACL;
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
    
    
            var userIntroACL;
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
                    userIntroACL = object.getACL();
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
var JSONACL;
function showAllowed(){
   var UserIntroData = Parse.Object.extend("UserIntroData");
            var query = new Parse.Query(UserIntroData);
            query.equalTo("username", CurrentUserVar.getUsername());
            query.first({
                success: function(results) {
                    //Load Data
                    var Acl = results.getACL();
                    var JsonAcl = Acl.toJSON();
                    JSONACL = JsonAcl;
                    console.log(JsonAcl);
                    document.getElementById("watchers").innerHTML = "";
                    for(var key in JsonAcl){
                        console.log(key, JsonAcl[key]);
                        if(key == CurrentUserVar.id){
                            console.log("skip adding to the list:"+key);
                        }else{
                            console.log("adding to the list:"+key);
                            var username;
                            var query = new Parse.Query(Parse.User);
            query.equalTo("objectId", key);
            query.first({
                success: function(object) {
                   username = object.get("username");
                   console.log(username)
                   var item = '<paper-item onclick="unallowPerson(this)" id="'+username+'">'+username+'</paper-item>';
                    $('#watchers').append(item);
                },
                error: function(error) {
                        }
                    });
                        }
                    }
                     
                },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
}

function allowWithEnterKey(){
    if (event.keyCode == 13){
        allowNewPerson()}
}

function allowNewPerson(){
        var newwatcher = document.getElementById("newwatcher").value;
        var newwatcherobj 
         var query = new Parse.Query(Parse.User);
            query.equalTo("username", newwatcher);
            query.first({
                success: function(object) {
                    if(object==undefined){
                        showToast("추가 하고자 하시는 사용자는 존재하지 않습니다.:"+newwatcher);
                    }
                    console.log("GOT IT:"+object.id);
                    newwatcherobj = object.id;
                    
                      var UserIntroData = Parse.Object.extend("UserIntroData");
                        var query = new Parse.Query(UserIntroData);
                        query.equalTo("username", CurrentUserVar.getUsername());
                        query.first({
                            success: function(results) {
                                console.log("GOT IT");
                                var currentacl = results.getACL();
                                currentacl.setReadAccess(newwatcherobj, true);
                                results.setACL(currentacl);
                                results.save({
                success: function(object) {
                    console.log("New Watcher Added");
                    showToast("이제, "+newwatcher+"님 께서 회원님의 양식을 보실 수 있습니다.");
                    showAllowed();
                },
                error: function(error) {
                    console.log("ERROR");
                        }
                    });
                                
                            },
                            error: function(error) {
                                    }
                                });
                },
                error: function(error) {
                        }
                    });
}

function unallowPerson(element){
        var watcher = element.id;
        var watcherobj 
         var query = new Parse.Query(Parse.User);
            query.equalTo("username", watcher);
            query.first({
                success: function(object) {
                    console.log("GOT IT:"+object.id);
                    watcherobj = object.id;
                    
                      var UserIntroData = Parse.Object.extend("UserIntroData");
                        var query = new Parse.Query(UserIntroData);
                        query.equalTo("username", CurrentUserVar.getUsername());
                        query.first({
                            success: function(results) {
                                console.log("GOT IT");
                                var currentacl = results.getACL();
                                currentacl.setReadAccess(watcherobj, false);
                                results.setACL(currentacl);
                                results.save({
                success: function(object) {
                    console.log("New Watcher Added");
                    showToast("지금부터는, "+watcher+"님 께서 회원님의 양식을 보실 수 없습니다.");
                    showAllowed();
                },
                error: function(error) {
                    console.log("ERROR");
                        }
                    });
                                
                            },
                            error: function(error) {
                                    }
                                });
                },
                error: function(error) {
                        }
                    });
}
