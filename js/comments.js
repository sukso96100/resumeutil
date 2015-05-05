function toggleComments(){
    document.getElementById("collapse").toggle();
}

function closeComments(){
    document.getElementById("collapse").opened=false;
}

function updateComments(){
    if (event.keyCode == 13){
      loadComments()
        }
}

function loadComments(){
    console.log("loading comments")
 var newcomment = document.getElementById("comment-input").value;
    var CommentsDB = Parse.Object.extend("Comments");
        var query = new Parse.Query(CommentsDB);
            query.equalTo("username", USERNAME4COMMENTS);
            query.first({
                success: function(results) {
                        if(results == "" || (results == null || results == undefined)){
                            console.log("Comment is null")
                            results = new CommentsDB;
                            results.set("username", USERNAME4COMMENTS);
                        }else{}
                        var array = results.get("comments")
                        if(array == null || array == undefined){
                            array = new Array();
                        }
                        if(newcomment == "" || (newcomment == null || newcomment == undefined)){}else{
                            array.push(newcomment+"["+CurrentUserVar.getUsername()+"]");
                        }
                        results.set("comments",array)
                        results.save(null, {
                        success: function(userIntroData) {  
                            },
                        error: function(userIntroData, error) {
                              }
                            });
                        var DataArray = new Array();
                        DataArray.push({"value" : "No Comments"});
                        var comments = document.querySelector('#my-core-list');
                        comments.data = DataArray;
                        for(var i=0; i<array.length; i++){
                            DataArray.push({"value" : array[i]});
                            comments.data = DataArray;
                        }
                        
              },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
}