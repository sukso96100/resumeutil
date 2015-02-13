window.addEventListener('WebComponentsReady', function () {
      console.log("WebComponentsReady");
    if(CurrentUserVar!=null){
    loadFormData()
    document.getElementById("usernameitem").setAttribute("label",CurrentUserVar.getUsername());
        }
    });

function initPage(){
    console.log("onload")
    loadJson()
//    loadFormData()
//     showToast(CurrentUserVar.getUsername()+" 님, 안녕하세요.")    

}


function loadJson(){

//Json 파일 읽기
$.getJSON( "strings.json", function( data ) {
 var DataArray = data.question4;
    for(var i=0; i<DataArray.length; i++){
        var item = '<option value="'+DataArray[i]+'">'+DataArray[i]+'</option>'
        
         $('#q4select').append(item);

    }
 
});
}

function setQ4(){
    var q4select = document.getElementById("q4select");
    console.log(q4select)
    var item = q4select.options[q4select.selectedIndex].value;
    console.log(item)
    document.getElementById("q4qinput").value = item;   
}



 //양식 저장 한수
        function saveFormData(){
            console.log("saving...")
            if(CurrentUserVar==null){
                location.href="login.html"
            }else{
             showToast("저장 중");
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
                            showToast("저장 완료");
                            },
                        error: function(userIntroData, error) {
                            showToast("저장 오류 발생");
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
                            showToast("저장 완료");
                            },
                        error: function(userIntroData, error) {
                            showToast("저장 오류 발생");
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
                            showToast("저장 완료");
                            },
                        error: function(userIntroData, error) {
                            showToast("저장 오류 발생");
                              }
                            });
                        }
                    });
            }
        }

        //저장된 양식 불러오기 함수
        function loadFormData(){
            console.log("Loading Data")
            if(CurrentUserVar==null){
            }else{
             showToast("불러오는 중");
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
                    showToast("불러오기 완료");
                    setTimeout(function(){ 
                        showToast(CurrentUserVar.getUsername()+" 님, 안녕하세요.")   
                    }, 1000);
                     
                },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
            }
        }

//글자수 카운터
function textCounter(field,withspace) {         
	var cntfield = document.getElementById(withspace) 
		cntfield.value = field.value.length;
    var withspace_num = field.value.length;
    var withoutspace_num = field.value.replace(/\s/g,"").length;
    var line = "공백 포함 "+withspace_num+"자 입력됨 | 공백 비포함 "+withoutspace_num+"자 입력됨";
    cntfield.value = line;
    saveFormData()
}
        
//인쇄 함수
    function printContent(){
//    document.body.innerHTML = printArea.innerHTML;
//			window.print();
    
    var q1 = document.getElementById('q1');
    var q2 = document.getElementById('q2');
    var q3 = document.getElementById('q3');
    var q4q = document.getElementById('q4qinput');
    var q4 = document.getElementById('q4');
    
    var strFeature = "";
			strFeature += "width=800, height=800, all=no";

			var objWin = window.open('', 'print', strFeature);
			objWin.document.write("<p>");
            objWin.document.write("대학입시 자기소개서 작성 연습도구 - http://sukso96100.github.io/univ-self-intro-form");
            objWin.document.write("</p>");
            objWin.document.write("<h1>");
            objWin.document.write("2015학년도 학생부 전형 자기소개서 공통양식");
            objWin.document.write("</h1>");
	    objWin.document.write("<h3>");
	    objWin.document.write("1. 고등학교 재학기간 중 학업에 기울인 노력과 학습 경험에 대해, 배우고 느낀 점을 중심으로 기술해 주시기 바랍니다(1,000자 이내).");
	    objWin.document.write("</h3>");
            objWin.document.write("<br>");
            objWin.document.write("<p>");
            objWin.document.write(q1.value);
            objWin.document.write("</p>");
            objWin.document.write("<br>");
            objWin.document.write("<br>");
            
            objWin.document.write("<h3>");
	    objWin.document.write("2. 고등학교 재학기간 중 본인이 의미를 두고 노력했던 교내 활동을 배우고 느낀점을 중심으로 3개 이내로 기술해 주시기 바랍니다. 단, 교외 활동 중 학교장의 허락을 받고 참여한 활동은 포함됩니다(1,500자 이내).");
   	    objWin.document.write("</h3>");
            objWin.document.write("<br>");
            objWin.document.write("</p>");
            objWin.document.write(q2.value);
            objWin.document.write("</p>");
            objWin.document.write("<br>");
            objWin.document.write("<br>");
        
            objWin.document.write("<h3>");
            objWin.document.write("3. 학교 생활 중 배려, 나눔, 협력, 갈등 관리 등을 실천한 사례를 들고, 그 과정을 통해 배우고 느낀 점을 기술해 주시기 바랍니다(1,000자 이내).");
 	    objWin.document.write("</h3>");
            objWin.document.write("<br>");
            objWin.document.write("</p>");
            objWin.document.write(q3.value);
            objWin.document.write("</p>");
            objWin.document.write("<br>");
            objWin.document.write("<br>");
        
         objWin.document.write("<h3>");
            objWin.document.write(q4q.value);
 	    objWin.document.write("</h3>");
            objWin.document.write("<br>");
            objWin.document.write("</p>");
            objWin.document.write(q4.value);
            objWin.document.write("</p>");
            objWin.document.write("<br>");
            objWin.document.write("<br>");
        
			objWin.document.close();

			objWin.print();
			objWin.close();
    }
