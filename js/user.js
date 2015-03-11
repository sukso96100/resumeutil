function doWithEnterKey(num){
if (event.keyCode == 13){
    switch(num){
        case 0:
            loginTask()
            break;
        case 1:
            resetPasswordTask()
            break;
        case 2:
            newUserTask()
            break;
        case 3:
            changePasswordTask()
            break;
        default:
    }
        }
    }

function moveToLogin(){
  if(CurrentUserVar==null){
    //Unless Logged In
      location.href="login.html"
  }else{
    //If Logged In
      location.href="user.html"
  }
}

//로그인 확인 - 로그인 페이지용
function loginCheckLoginpage(){
  if(CurrentUserVar!=null){
    //If Logged In
      location.href="index.html"
  }
}

//로그인 확인 - 사용자 정보 페이지용
function loginCheckUserpage(){
  if(CurrentUserVar==null){
    //Unless Logged In
      location.href="login.html"
  }else{
  showUserInfo()
  showAllowed()
  }
}

    //새 사용자 계정 생성
function newUserTask(){
    var newusername = document.getElementById('newusername').value;
    var newpassword = document.getElementById('newpassword').value;
    var newemail = document.getElementById('newemail').value;
    if(newpassword.length<8){
        showToast("사용하고자 하시는 비밀번호는 너무 짧습니다. 8자 이상으로 해 주세요.");
    }else{
         var user = new Parse.User();
        user.set("username", newusername);
        user.set("password", newpassword);
        user.set("email", newemail);
        //user.set("emailVerified", false);
        
        
        user.signUp(null, {
            success: function(user) {
                // Hooray! Let them use the app now.
                showToast("가입해 주셔서 감사합니다. 가입 완료를 위해, 인증 메일을 확인해주세요.");
                
              
                },
            error: function(user, error) {
                // Show the error message somewhere and let the user try again.
               showToast("회원가입 오류("+error.code+")\n"+error.message);
                }
            });
    }
}
        //비밀번호 찾기 함수
function resetPasswordTask(){
    var passwordreset = document.getElementById('passwordreset').value;

    Parse.User.requestPasswordReset(passwordreset, {
        success: function() {
            // Password reset request was sent successfully
            showToast("비밀번호 복구 메일을 보냈습니다. 확인하세요."); 
        },
        error: function(error) {
            // Show the error message somewhere
            showToast("비밀번호 찾기 오류("+error.code+")\n"+error.message);
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
             showToast("로그인 오류("+error.code+")\n"+error.message);
        }
        });  
}

        //사용자 계정 정보 창 보이기 함수
function showUserInfo(){
        document.getElementById('CurrentUserName').innerHTML = CurrentUserVar.getUsername();
        document.getElementById('CurrentUserEmail').innerHTML = CurrentUserVar.getEmail();
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

if(newpass.length<8){
    showToast("입력하신 새 비밀번호는 너무 짧습니다. 8자 이상으로 해 주세요.");
}else if(newpass==newpasscheck){
   
    CurrentUserVar.set("password", newpass);  // attempt to change username
    CurrentUserVar.save(null, {
      success: function(user) {
        // This succeeds, since the user was authenticated on the device
          showToast("비밀번호 변경이 성공적으로 이뤄졌습니다.");
   
        // Get the user from a non-authenticated method
        var query = new Parse.Query(Parse.User);
        query.get(user.objectId, {
          success: function(userAgain) {
userAgain.set("username", "another_username");
userAgain.save(null, {
  error: function(userAgain, error) {
   showToast("사용자 인증 오류.");
  }
});
          }
        });
      }
    });
    }
   else{
        showToast("새 비밀번호 입력란과 확인란에 입력한 비밀번호가 다릅니다.");
   }
        
        }
  
       