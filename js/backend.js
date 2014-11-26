 //Parse 초기화
    Parse.initialize("VfbdwjDu0SrnwEo1P4kdgZAKAlUhzdFUjV05fRKk", "3LDL1LlOf5BHtnQGkosGltIluvVxYWxhbUTdeBqQ");
    
    var CurrentUserVar = Parse.User.current();
    var SessionToken = CurrentUserVar.getSessionToken();

        //새 사용자 계정 생성
        function newUserTask(){
            var newusername = document.getElementById('newusername').value;
            var newpassword = document.getElementById('newpassword').value;
            var newemail = document.getElementById('newemail').value;
            
            var user = new Parse.User();
            user.set("username", newusername);
            user.set("password", newpassword);
            user.set("email", newemail);
            //user.set("emailVerified", false);
 
            user.signUp(null, {
                success: function(user) {
                    // Hooray! Let them use the app now.
                   document.getElementById('SignUpResult').innerHTML = "가입해 주셔서 감사합니다. 가입 완료를 위해, 인증 메일을 확인해주세요.";
                },
                error: function(user, error) {
                    // Show the error message somewhere and let the user try again.
                    document.getElementById('SignUpResult').innerHTML = "회원가입 오류("+error.code+")\n"+error.message;
                }
                            });
                        }
        //비밀번호 찿기 함수
        function resetPasswordTask(){
            var passwordreset = document.getElementById('passwordreset').value;
            
            Parse.User.requestPasswordReset(passwordreset, {
                success: function() {
                    // Password reset request was sent successfully
                    document.getElementById('PasswordResetResult').innerHTML = "비밀번호 복구 메일을 보냈습니다. 확인하세요.";
                                    },
                error: function(error) {
                    // Show the error message somewhere
                    document.getElementById('PasswordResetResult').innerHTML = "비밀번호 찿기 오류("+error.code+")\n"+error.message;
                                        }
                                                            });
                                    }
        //사용자 로그인 함수
        function loginTask(){
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            //사용자 로그인 동작
            Parse.User.logIn(username, password, {
                success: function(user) {
                    // Do stuff after successful login.
                    CurrentUserVar = Parse.User.current();
                    location.reload();
                                        },
                error: function(user, error) {
                    // The login failed. Check error to see why.
                     document.getElementById('LogInResult').innerHTML = "로그인 오류("+error.code+")\n"+error.message;
                                                }
                                                    });
           
                                }

        //사용자 계정 정보 창 보이기 함수
        function openUserModal(){
            if(CurrentUserVar==null){
                $('#LogInModal').modal('show')
            }else{
                $('#UserInfoModal').modal('show')
                document.getElementById('CurrentUserName').innerHTML = CurrentUserVar.getUsername();
                document.getElementById('CurrentUserEmail').innerHTML = CurrentUserVar.getEmail();
            }
        }
     
        //사용자 로그아웃 함수
        function logoutTask(){
            Parse.User.logOut();
            CurrentUserVar = Parse.User.current();
            location.reload();
        }

        //사용자 비밀번호 변경 함수
        function changePasswordTask(){
            var newpass = document.getElementById('newpass').value;
            var newpasscheck = document.getElementById('newpasscheck').value;
            
            if(newpass==newpasscheck){
               
                CurrentUserVar.set("password", newpass);  // attempt to change username
    CurrentUserVar.save(null, {
      success: function(user) {
        // This succeeds, since the user was authenticated on the device
          document.getElementById('ChangePasswordResult').innerHTML = "비밀번호 변경이 성공적으로 이뤄졌습니다.";
               
        // Get the user from a non-authenticated method
        var query = new Parse.Query(Parse.User);
        query.get(user.objectId, {
          success: function(userAgain) {
            userAgain.set("username", "another_username");
            userAgain.save(null, {
              error: function(userAgain, error) {
               document.getElementById('ChangePasswordResult').innerHTML = "사용자 인증 오류.";
              }
            });
          }
        });
      }
    });
                }
               else{
                    document.getElementById('ChangePasswordResult').innerHTML = "새 비밀번호 입력란과 확인란에 입력한 비밀번호가 다릅니다.";
               }
        
        }
              
        //양식 저장 한수
        function saveFormData(){
            if(CurrentUserVar==null){
                $('#LogInModal').modal('show')
            }else{
             document.getElementById('statemsg').innerHTML = "저장 중";
            var q1data = document.getElementById('q1').value;
            var q2data = document.getElementById('q2').value;
            var q3data = document.getElementById('q3').value;
            var q4data = document.getElementById('q4').value;
            var q4qinputdata = document.getElementById('q4qinput').value;
            
            
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
                    userIntroData.set("q1",q1data);
                    userIntroData.set("q2",q2data);
                    userIntroData.set("q3",q3data);
                    userIntroData.set("q4",q4data);
                    userIntroData.set("q4qinput",q4qinputdata);
                    
                    userIntroData.save(null, {
                        success: function(userIntroData) {  
                            document.getElementById('statemsg').innerHTML = "저장 완료";
                            },
                        error: function(userIntroData, error) {
                            document.getElementById('statemsg').innerHTML = "저장 오류 발생";
                              }
                            });
                    }else{
                        object.set("q1",q1data);
                        object.set("q2",q2data);
                        object.set("q3",q3data);
                        object.set("q4",q4data);
                        object.set("q4qinput",q4qinputdata);
                        object.save(null, {
                        success: function(userIntroData) {  
                            document.getElementById('statemsg').innerHTML = "저장 완료";
                            },
                        error: function(userIntroData, error) {
                            document.getElementById('statemsg').innerHTML = "저장 오류 발생";
                              }
                            });
                    }
                    
                },
                error: function(error) {
                    //Data Not Exist, Create New One
                    var userIntroData = new UserIntroData();
                    userIntroData.set("username", CurrentUserVar.getUsername());
                    userIntroData.set("q1",q1data);
                    userIntroData.set("q2",q2data);
                    userIntroData.set("q3",q3data);
                    userIntroData.set("q4",q4data);
                    userIntroData.set("q4qinput",q4qinutdata);
                    
                    userIntroData.save(null, {
                        success: function(userIntroData) {  
                            document.getElementById('statemsg').innerHTML = "저장 완료";
                            },
                        error: function(userIntroData, error) {
                            document.getElementById('statemsg').innerHTML = "저장 오류 발생";
                              }
                            });
                        }
                    });
            }
        }

        //저장된 양식 불러오기 함수
        function loadFormData(){
            if(CurrentUserVar==null){
            }else{
             document.getElementById('statemsg').innerHTML = "불러오는 중";
            var UserIntroData = Parse.Object.extend("UserIntroData");
            var query = new Parse.Query(UserIntroData);
            query.equalTo("username", CurrentUserVar.getUsername());
            query.first({
                success: function(results) {
                    //Load Data
                    document.getElementById('q1').value = results.get("q1");
                    document.getElementById('q2').value = results.get("q2");
                    document.getElementById('q3').value = results.get("q3");
                    document.getElementById('q4').value = results.get("q4");
                    document.getElementById('q4qinput').value = results.get("q4qinput");
                    document.getElementById('statemsg').innerHTML = "불러오기 완료";
                },
                error: function(error) {
                    //Data Not Exist
                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
            }
        }