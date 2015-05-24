function showShared(){
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
    loadFormData()
    closeLoaderPage()
}

function openLoaderPage(){
var pages = document.querySelector('core-pages');
pages.selected = 1
}
function closeLoaderPage(){
var pages = document.querySelector('core-pages');
pages.selected = 0
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