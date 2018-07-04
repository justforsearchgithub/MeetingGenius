function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var keyword = null;
    if (url.indexOf("?") != -1) {
        keyword = location.search.substr(1).split('&')[0].split('=')[1];
    }
    return keyword;
}
$(document).ready(function(){
    if(GetRequest()!=null){
        var keyword = GetRequest();
        document.getElementById('SearchResultText').value  = keyword;
    }
});