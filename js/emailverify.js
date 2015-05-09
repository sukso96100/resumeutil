var EmailCheckDialog = document.getElementById("emailcheck")
var UnVerifiedEmail = document.getElementById("unverifiedemail")

document.addEventListener('polymer-ready', function() {
  EmailCheckDialog = document.getElementById("emailcheck")
  UnVerifiedEmail = document.getElementById("unverifiedemail")
  checkEmailVerified()
});

function checkEmailVerified(){
    CurrentUserVar.fetch()
    EmailCheckDialog = document.getElementById("emailcheck")
    UnVerifiedEmail = document.getElementById("unverifiedemail")
    var emailVerified = CurrentUserVar.get("emailVerified")
    if(emailVerified != true){
        EmailCheckDialog.opened = true
        UnVerifiedEmail.innerHTML = CurrentUserVar.getEmail()
    }
}

function resendVerificationEmail(){
    var useremail = CurrentUserVar.getEmail()
    CurrentUserVar.setEmail("example@example.com")
    CurrentUserVar.save()
    CurrentUserVar.setEmail(useremail)
    CurrentUserVar.save()
    showToast("인증 메일을 다시 보내드렸습니다. 회원님의 이메일 받은편지함을 확인하세요.")
}

function closeDialog(){
    EmailCheckDialog.opened = false
}