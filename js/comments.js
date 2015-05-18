function updateComments(){
    if (event.keyCode == 13){
      loadComments()
        }
}

function reloadComments(){
    var comment_input = document.getElementById("comment-input");
    if(comment_input.disabled == false){
        loadComments()
    }
}

function loadComments(){
     var comments = document.getElementById("comments");
     comments.innerHTML = "";
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
                        var comments = document.getElementById("comments");
                        comments.innerHTML = "";
                        for(var i=0; i<array.length; i++){
                            var element = "<p>"+array[i]+"</p>";	
                            $('#comments').append(element);
                        }
                        
              },
                error: function(error) {
                    //Data Not Exist
//                     document.getElementById('statemsg').innerHTML = "";
                        }
                    });
}