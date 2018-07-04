var url = 'http://139.199.24.235:80/';

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
                $('#NavText1').text('个人中心');
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
            console.log(data.data.user_type);
            user_type = data.data.user_type;
        }
    })
}

$('#CountConNumBar').mouseover(function () {
    $('#CountConNumBar').addClass("animated tada");
    setTimeout(function () {
        $('#CountConNumBar').removeClass("animated tada");
    }, 5000);
});

function GetActiveConferenceNum() {
    $.ajax({
        type: 'GET',
        url: url + 'conference/num_not_over/',
        async: 'false',
        success: function (data) {
            console.log(data.data);
            var ActiveConferenceNum = data.data;
            $('#CountConNumBar').text("有" + ActiveConferenceNum + "个会议正等待您的参与");
        }
    })
};

var HotSpotConferenceList = [];
var HotSpotConferenceListVue = new Vue({
    el: '#HotSpotConference',
    data: {
        HotSpotConferenceList: HotSpotConferenceList
    }
});

function GetHotConferenceList() {
    $.ajax({
        type: 'GET',
        async: 'false',
        url: url + 'conference/top10_hot_references/',
        success: function (data) {
            console.log(data.message);
            HotSpotConferenceList = data.data;
            for (con in data.data) {
                HotSpotConferenceListVue.$data.HotSpotConferenceList.push(data.data[con]);
            }

        }
    })
}

function GoToSearch(){
    var Keyword = $("#SearchBarText").val();
    window.location.href = "SearchResult.html?Keyword="+Keyword;
}
$(document).ready(function () {
        GetUserType();
        GetActiveConferenceNum();
        GetHotConferenceList();
        if (user_type != "normal_user") {
            $("#CreateConButton").removeClass("hidden");
        }
        else {
            $('#CountNumBar').removeClass('hidden');
        }
    }
);

