
function setHashWithEnterKey(event){
if (event.keyCode == 13){
    setHash()
        }
    }

function setHash(){
window.location.hash="!"+document.getElementById("usernameinput").value;
    }

document.addEventListener('polymer-ready', function() {
  setPublicToggleState()
  });
    





function loadPublicUserForm(){
    showToast("찾는 중")
    var userName = getHash()
    userName.replace(/\s/g,"")
//    userName.replace("!","")  
    
    console.log(userName)
    console.log("Loading Data")
           changeThread(userName)
             showToast("불러오는 중");
            var UserIntroData = Parse.Object.extend("UserIntroData");
            var query = new Parse.Query(UserIntroData);
            query.equalTo("username", userName);
            query.first({
                success: function(results) {
                    try{
                        var contentarea = document.getElementById("content");
                    contentarea.innerHTML = "";
                    //Load Data
                    var line = userName + " 님의 양식<br>마지막 수정시각 - " + results.updatedAt + "<br>";
                    line = line + "<br>2015학년도 학생부 전형 자기소개서 공통양식<br><br>";
                    line = line + "<h3>1. 고등학교 재학기간 중 학업에 기울인 노력과 학습 경험에 대해, 배우고 느낀 점을 중심으로 기술해 주시기 바랍니다(1,000자 이내).</h3><br><p>"
                    line = line + results.get("q1");
                    line = line + "</p><br><h3>2. 고등학교 재학기간 중 본인이 의미를 두고 노력했던 교내 활동을 배우고 느낀점을 중심으로 3개 이내로 기술해 주시기 바랍니다. 단, 교외 활동 중 학교장의 허락을 받고 참여한 활동은 포함됩니다(1,500자 이내).</h3><br><p>"
                     line = line + results.get("q2");
                    line = line + "</p><br><h3>3. 학교 생활 중 배려, 나눔, 협력, 갈등 관리 등을 실천한 사례를 들고, 그 과정을 통해 배우고 느낀 점을 기술해 주시기 바랍니다(1,000자 이내).</h3><br><p>"
                    line = line + results.get("q3");
                    line = line + "</p><br><h3>"+results.get("q4qinput")+"</h3><br><p>"
                    line = line + results.get("q4");
                    line = line + "</p>";
                    contentarea.innerHTML = line;
                     showToast(userName+" 님의 양식을 불러왔습니다.")
                    }catch(e){
                    showToast("해당 사용자의 양식이 비공개 이거나, 존재하지 않는 사용자 입니다.")
                     var contentarea = document.getElementById("content");
                    contentarea.innerHTML = "해당 사용자의 양식이 비공개 이거나, 존재하지 않는 사용자 입니다.";
                    }
                    
                     
                     
                },
                error: function(error) {
                    showToast("양식을 불러오지 못했습니다.")
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
    
     
           
}

function getHash() {
    var hash = location.hash.replace("#!","")
    console.log(hash)
  return hash;
}



