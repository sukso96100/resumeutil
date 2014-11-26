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