function showShared(){}
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