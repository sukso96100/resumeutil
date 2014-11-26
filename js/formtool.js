//글자수 카운터
function textCounter(field,withspace,withoutspace) {         
	var cntfield = document.getElementById(withspace) //With Spaces
    var cnt2field = document.getElementById(withoutspace)
		cntfield.value = field.value.length;
        cnt2field.value = field.value.replace(/\s/g,"").length; //Without Spaces
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
