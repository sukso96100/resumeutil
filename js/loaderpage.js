 var pages;
 var opener = document.getElementById('loader-opener');
document.addEventListener('WebComponentsReady', function() {
//      pages._removeListener(pages.activateEvent);
    opener = document.getElementById('loader-opener');
    pages = document.querySelector('iron-pages');
    var loader_menu_toggle = document.getElementById('loader-menu-toggle');
    var loader_menu = document.getElementById('loader-menu');
    var loader_closer = document.getElementById('loader-closer');
    
    
  loader_menu_toggle.addEventListener('click', function() {
    loader_menu.togglePanel();
  });
    loader_closer.addEventListener('click', function() {
    opener.click();
  });
    
    
    
});

function showShared(){
    var loader_menu = document.getElementById('loader-menu');
    loader_menu.closeDrawer();
       var UserIntroData = Parse.Object.extend("UserIntroData");
            var query = new Parse.Query(UserIntroData);
            query.startsWith("username", "");
            query.find({
                success: function(results) {
                   showResults(results)
                },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    }); 
}
function loadMyForm(){
    closeLoaderPage()
    loadFormData()
}

function openLoaderPage(){
    document.getElementById('formloader').opened = true
    var layout = document.getElementById('loader-layout');
    if(layout.innerHTML==""){
  showLayout(0)
    }
  
}

function closeLoaderPage(){
   document.getElementById('formloader').opened = false
}

  function searchUser(element){
    var searchtext = element.value;
       var UserIntroData = Parse.Object.extend("UserIntroData");
            var query = new Parse.Query(UserIntroData);
            query.startsWith("username", searchtext);
            query.find({
                success: function(results) {
                   showResults(results)
                },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    }); 
      }
      
      function showResults(vresults){
            showToast(vresults.length+"개의 양식을 찾았습니다!")
             document.getElementById("results").innerHTML = ""
                    for (var i = 0; i < vresults.length; i++) {
                        var object = vresults[i];
                        var usernameitem = object.get('username');
                        var element = '<paper-item id="'+usernameitem+'" onclick="loadUserFormData(this.id)">'+usernameitem+'</paper-item>'
                        $('#results').append(element);
                    }
      }

function showLayout(num){
    var layout = document.getElementById('loader-layout');
    switch(num){
        case 0:
            layout.innerHTML = "<paper-button raised onclick='loadMyForm()'>내 양식 불러오기</paper-button>"
            break;
        case 1:
            layout.innerHTML = "준비중인 기능입니다."
            break;
        case 2:
            layout.innerHTML = '<br><paper-menu id="results"></paper-menu>'
            showShared()
            break;
        case 3:
            layout.innerHTML = '<paper-input-container> <label>사용자 검색</label><input type="text" id="search-input" onKeyUp="searchUser(this)"> </paper-input-container><br><paper-menu id="results"></paper-menu>'
             
    }
}