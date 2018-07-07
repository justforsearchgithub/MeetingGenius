var keyword = null;
var type = null;
var url = 'http://139.199.24.235:80/';
var currentIndex = 0;
var tempSearchList = [];
var ActuallyShowList = [];
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    keyword = null;
    type = null;
    if (url.indexOf("?") != -1) {
        keyword = location.search.substr(1).split('&')[1].split('=')[1];
        console.log(keyword);
        type = location.search.substr(1).split('&')[0].split('=')[1];
        console.log(type);
    }
    return keyword;
}

var ConSearchList = [];
new Vue({
    el: '#ConSearch',
    data: {
        ConSearchList: ActuallyShowList
    }
});

function GetTime(Timestr) {
    console.log(Timestr);
    var ymd = Timestr.split(' ')[0];
    var hm = Timestr.split(' ')[1];
    var year = ymd.split('-')[0];
    var month = ymd.split('-')[1];
    var day = ymd.split('-')[2];
    var hour = hm.split(':')[0];
    var minute = hm.split(':')[1];
    var date = new Date();
    date.setFullYear(parseInt(year), parseInt(month), parseInt(day));
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
    return date;
}

function GetCurrentUser() {
    var user;
    var type;
    $.ajax({
        type: 'GET',
        async: false,
        url: url + 'account/username/',
        //headers:{'X-CSRFToken',Token},
        success: function (data) {
            console.log(data);
            user = data.username;
            if (user == "anonymous user") {
                console.log(0);
                type = 0;
                $('#NavText1').attr('href', 'userRegister.html');
                $('#NavText1').text('免费注册');
                $('#NavText2').remove('onclick', 'LogOut()');
                $('#NavText2').attr('href', 'login.html');
                $('#NavText2').text('登录');
            }
            else {
                console.log(1);
                type = 1;
                $('#NavText1').attr('href', 'person_center.html');
                $('#NavText2').removeAttr('href');
                $('#NavText1').text(user);
                $('#NavText2').text('登出');
                $('#NavText2').attr('onclick', 'LogOut()');
                var str = "";
            }
        }
    });
    return type;
}

var user_type;

function GetUserType() {
    $.ajax({
        type: 'GET',
        async: false,
        url: url + 'account/user_type/',
        success: function (data) {
            // console.log(data.data.user_type);
            user_type = data.data.user_type;
        }
    })
}

function changeSearchKey(e) {
    $("[role='presentation']").removeClass('active');
    /*$('#SearchBar').find('li').each(function(){
        console.log("1");
        $(this).removeClass("active");
    })*/
    $(e).addClass("active");
}



function ProcessTwo() {
    if(currentIndex>=tempSearchList.length){
        console.log('finish');
        for (iitem in ConSearchList) {
            // if (ConSearchList[iitem].statue == select_text) {
            ActuallyShowList.push(ConSearchList[iitem]);
            // }
        }
        document.getElementById('StateSelectText').innerText = "选择筛选状态";
        return ;
    }
   // console.log(tempSearchList[currentIndex].pk);
    $.ajax({
        type: 'GET',
        async: 'false',
        url: url + 'conference/conference/' + tempSearchList[currentIndex].pk + '/information/',
        success: function (data) {
            //console.log(currentIndex);
            var pk = tempSearchList[currentIndex].pk;
            //console.log(pk);
            var statueNo = tempSearchList[currentIndex].status;
            var statue;
            //console.log('状态吗' + statueNo);
            var color;
            switch (statueNo) {
                case 2:
                    statue = '征稿中';
                    color = 'background-color:#3000d2';
                    break;
                case 3:
                    statue = '投稿结束';
                    color = 'background-color:#b44400';
                    break;
                case 4:
                    statue = '评审中';
                    color = 'background-color:#ff5587';
                    break;
                case 5:
                    statue = '注册中';
                    color = 'background-color:#07Ae00';
                    break;
                case 6:
                    statue = '注册结束';
                    color = 'background-color:#b5351d';
                    break;
                case 7:
                    statue = '会议开始';
                    color = 'background-color:#ffc82e';
                    break;
                case 8:
                    statue = '会议结束';
                    color = 'background-color:#464646';
                    break;

            }
            //console.log(statue);
            var title = data.data.title;
            var time = data.data.conference_start.split('T')[0] + " " + data.data.conference_start.split('T')[1];
            var json_temp = {
                title: title,
                time: time,
                statue: statue,
                color: color,
                pk: pk
            };
            console.log(json_temp);
            ConSearchList.push(json_temp);
            currentIndex++;
            ProcessTwo();
        }
    });
}
function GoToSearch(){
    var Searchword = $("#SearchResultText").val();
    Searchword = encodeURI(Searchword);
    console.log(Searchword);

    var SearchType = $("[role='presentation'][class='active']").text();
    console.log(SearchType);
    var SearchUrl = "";
    switch(SearchType) {
        case '会议名称':
            SearchUrl = 'keywords';
            break;
        case '机构':
            SearchUrl = 'organization';
            break;
        case '分类':
            SearchUrl = 'subject';
            break;
    }
    window.location.href = "SearchResult.html?type="+SearchUrl+'&keyword='+Searchword;
}
function SelectState(e){
    console.log('----StartClear----');
    var length = ActuallyShowList.length;
    for(var a =0;a<length;a++) {
        ActuallyShowList.pop();
    }
    console.log('----Clear----');
    var select_text = $(e).text();
    $('#SearchResultText').text=select_text;
    document.getElementById('StateSelectText').innerText = select_text;
    if(select_text!='选择筛选状态') {
        for (iitem in ConSearchList) {
            if (ConSearchList[iitem].statue == select_text) {
                ActuallyShowList.push(ConSearchList[iitem]);
            }
        }
    }else{
        for (iitem in ConSearchList) {
            // if (ConSearchList[iitem].statue == select_text) {
                ActuallyShowList.push(ConSearchList[iitem]);
            // }
        }
    }
}
$(document).ready(function () {
    if (GetRequest() != null) {
        var keyword = GetRequest();
        document.getElementById('SearchResultText').value = decodeURI(keyword);
        console.log(keyword);
        console.log(decodeURI(keyword));
        var DecodeKeyword = decodeURI(keyword);
        $('#sel_1').removeClass('active');
        $('#sel_2').removeClass('active');
        $('#sel_3').removeClass('active');
        switch (type) {
            case 'keywords':
                $('#sel_1').addClass('active');
                break;
            case 'subject':
                $('#sel_3').addClass('active');
                break;
            case 'organization':
                $('#sel_2').addClass('active');
                break;
        }
    }
    $.ajax({
        type: 'GET',
        async: 'false',
        url: url + 'search/?' + type + '=' + DecodeKeyword,
        success: function (data) {


            for (Con in data.data) {
                tempSearchList.push(data.data[Con]);
            }

            console.log('ajax1finished');
            ProcessTwo();
        }
    });

});