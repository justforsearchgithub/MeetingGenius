var url = 'http://139.199.24.235:80/';
var conference_id = '0';
var usertype = 'anonymous user';
var is_collected = false;
var map_location = '北京市_1&北京市辖区_1&天安门';
var meeting = new Vue({
    el: '#info',
    data: {
        title: '会议模板（这里是标题）',
        subject: '这里是学科',
        organization: '会议主办方XXX',
        contact: '联系人ABC',
        phonenum: '1234567890',
        email: '123456@789.com',
        introduction: '这里是会议简介部分',
        soliciting_requirement: '这里是投稿要求',
        register_requirement: '这里是注册会议要求',
        accept_start: '2018-05-15 12:00:00',
        accept_due: '2018-10-01 12:00:00',
        modify_due: '2018-10-05 12:00:00',
        register_start: '2018-10-10 12:00:00',
        register_due: '2018-10-20 12:00:00',
        conference_start: '2018-10-25 12:00:00',
        conference_due: '2018-10-30 12:00:00',
        cur_state: 0,
        activities: [
            {
                start_time: '2018-10-25 12:00:00',
                end_time: '2018-10-25 18:00:00',
                place: '地点A',
                activity_name: '会议开始'
            },
            {
                start_time: '2018-10-27 12:00:00',
                end_time: '2018-10-27 18:00:00',
                place: '地点B',
                activity_name: '会议进行'
            },
            {
                start_time: '2018-10-27 12:00:00',
                end_time: '2018-10-27 18:00:00',
                place: '地点B',
                activity_name: '会议进行'
            },
            {
                start_time: '2018-10-27 12:00:00',
                end_time: '2018-10-27 18:00:00',
                place: '地点B',
                activity_name: '会议进行'
            },
            {
                start_time: '2018-10-27 12:00:00',
                end_time: '2018-10-27 18:00:00',
                place: '地点B',
                activity_name: '会议进行'
            },
            {
                start_time: '2018-12-30 12:00:00',
                end_time: '2018-12-30 18:00:00',
                place: '地点C',
                activity_name: '会议结束'
            }
        ],
        paper_template: null
    },
    computed: {
        state: function() {
            var today = new Date();
            var date0 = new Date(this.accept_start);
            var date1 = new Date(this.accept_due);
            var date2 = new Date(this.modify_due);
            var date3 = new Date(this.register_start);
            var date4 = new Date(this.register_due);
            var date5 = new Date(this.conference_start);
            var date6 = new Date(this.conference_due);
            if (today < date0) {
                this.cur_state = 0;
                return '<span style="color: #000000;">征稿未开始</span>';
            }
            else if (today < date1) {
                this.cur_state = 1;
                return '<span style="color: #3000d2;">征稿中</span>';
            }
            else if (today <date3) {
                this.cur_state = 3;
                return '<span style="color: #b44400;">已截稿</span>';
            }
            else if (today <date4) {
                this.cur_state = 4;
                return '<span style="color: #07ae00;">注册中</span>';
            }
            else if (today <date5) {
                this.cur_state = 5;
                return '<span style="color: #b5351d;">注册截止</span>';
            }
            else if (today <date6) {
                this.cur_state = 6;
                return '<span style="color: #980061;">会议中</span>';
            }
            else {
                this.cur_state = 7;
                return '<span style="color: #464646;">会议结束</span>';
            }
        }
    },
    methods: {
        time_line: function (i) {
            var time = this.activities[i].start_time;
            time = time.split(' ', 1);
            time = time.split('-').reverse().join('/');
            console.log(time);
            return time;
        }
    }
});

function GetCurrentUser(){
    $.ajax({
        type: 'GET',
        async:false,
        url: url + 'account/user_type/',
        success: function (data) {
            console.log(data);
            if(data.message ==="anonymous user"){
                usertype = data.message;
                $('#NavText1').attr('href','userRegister.html');
                $('#NavText1').text('免费注册');
                $('#NavText2').remove('onclick','LogOut()');
                $('#NavText2').attr('href','login.html');
                $('#NavText2').text('登录');
            }
            else{
                usertype = data.data.user_type;
                if(usertype === 'organization_user' || usertype === 'organization_sub_user'){
                    $('#join_meeting').addClass('hidden');
                    $('#paper_upload').addClass('hidden');
                    $('#favorite').addClass('hidden');
                    $('button[id="favorite"]').addClass('hidden');
                }
                $('#NavText1').attr('href','person_center.html');
                $('#NavText2').removeAttr('href');
                $('#NavText1').text ('个人中心');
                $('#NavText2').text('登出');
                $('#NavText2').attr('onclick','LogOut()');
            }
        }
    });
}

$(document).ready(function () {
    conference_id = getParam('id');
    GetCurrentUser();
    if(conference_id === '0' || conference_id === null || conference_id === undefined)
    {
        $('button').attr("disabled",true);
    }
    else {
        var conference_settings = {
            "async": false,
            "crossDomain": true,
            "url": url + "conference/conference/" + conference_id + "/information/",
            "method": "GET",
            "headers": {}
        };
        $.ajax(conference_settings).done(function (response) {
            console.log(response.message);
            if(response.data.template_no == '2'){
                window.location.href = "meetingModel2.html?id=" + conference_id;
                return;
            }
            meeting.organization = response.data.organization.org_name;
            meeting.title = response.data.title;
            meeting.subject = response.data.subject;
            meeting.introduction = response.data.introduction;
            meeting.soliciting_requirement = response.data.soliciting_requirement;
            meeting.paper_template = response.data.paper_template;
            meeting.register_requirement = response.data.register_requirement;
            meeting.accept_start = format_time(response.data.accept_start);
            meeting.accept_due = format_time(response.data.accept_due);
            meeting.modify_due = format_time(response.data.modify_due);
            meeting.register_start = format_time(response.data.register_start);
            meeting.register_due = format_time(response.data.register_due);
            meeting.conference_start = format_time(response.data.conference_start);
            meeting.conference_due = format_time(response.data.conference_due);
            meeting.contact = response.data.organization.contacts;
            meeting.phonenum = response.data.organization.phone_number;
            meeting.email = response.data.organization.email;
            map_location = response.data.venue;
        });
        //取活动
        var activity_settings = {
            "async": false,
            "crossDomain": true,
            "url": url + "display/conference/" + conference_id + "/activities",
            "method": "GET",
            "headers": {}
        };
        $.ajax(activity_settings).done(function (ac_response) {
            console.log(ac_response.message);
            meeting.activities = ac_response.data;
        });
    }
    favorite_state();
    AddMap();
    getWeather();
});

function triggerfile_fee() {
    var file = $('#fee_upload').val();
    var pos = file.lastIndexOf("\\");
    var filename = file.substring(pos+1);
    if(filename.length != 0) {
        $('#img_fee_upload').removeClass('hidden');
        $('#label_fee_upload').addClass("hidden");
        $("#img_fee_upload").attr("src",URL.createObjectURL($('#fee_upload')[0].files[0]));
    }
    else {
        $('#label_fee_upload').removeClass("hidden");
        $('#img_fee_upload').addClass('hidden');
        $('#label_fee_upload').html('&nbsp;&nbsp;选择图片');
    }
}

function triggerfile_paper() {
    var file = $('#paper_up').val();
    var pos = file.lastIndexOf("\\");
    var filename = file.substring(pos+1);
    if(filename.length != 0) {
        $('#label_paper_up').html(filename);
    }
    else {
        $('#label_paper_up').html('选择文件');
    }
}

function file_upload(id) {
    $('#'+id).click();
}

function checkState_r() {
    if(usertype != 'anonymous user' && usertype != null && usertype != undefined){
        if(meeting.cur_state != 4){
            alert('现在不在注册期间！');
        }
        else{
            $('#join-meeting').modal('show');
        }
    }
    else{
        alert('请先登录！');
    }
}

function checkState_p() {
    if(usertype != 'anonymous user' && usertype != null && usertype != undefined){
        if(meeting.cur_state != 1){
            alert('现在不在投稿期间！');
        }
        else{
            $('#paper-upload').modal('show');
        }
    }
    else{
        alert('请先登录！');
    }
}

function downloadPaper() {
    window.open(url + meeting.paper_template);
    console.log(url + meeting.paper_template);
}

var getParam = function (name) {
    var search = document.location.search;
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
};

function favorite_state() {
    if(usertype === 'normal_user') {
        var settings = {
            "async": false,
            "crossDomain": true,
            "url": url + "account/is_collected/" + conference_id + '/',
            "method": "GET",
            "headers": {}
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.message === 'susccess'){
                is_collected = response.data.collected;
                if(is_collected == true){
                    $('#favorite').text('✔已收藏');
                    $('#favorite').hover(function () {
                        $('#favorite').text('取消收藏');
                    }, function () {
                        $('#favorite').text('✔已收藏');
                    });
                }
                else{
                    $('#favorite').text('❤收藏会议');
                    $('#favorite').hover(function () {
                        $('#favorite').text('❤收藏会议');
                    }, function () {
                        $('#favorite').text('❤收藏会议');
                    });
                }
            }
        });
    }
}

function add_favorite() {
    if(usertype === 'normal_user'){
        if(is_collected == true){
            var settings = {
                "async": false,
                "crossDomain": true,
                "url": url + "account/discollect/" + conference_id + "/",
                "method": "POST",
                "headers": {},
                "processData": false,
                "contentType": false
            };
            $.ajax(settings).done(function (response) {
                console.log(response.message);
                if(response.message === 'susccess'){
                    is_collected = false;
                    $('#favorite').text('❤收藏会议');
                    $('#favorite').hover(function () {
                        $('#favorite').text('❤收藏会议');
                    }, function () {
                        $('#favorite').text('❤收藏会议');
                    });
                }
                else {
                    alert('取消收藏失败，用户没有权限');
                }
            });
        }
        else{
            var settings = {
                "async": false,
                "crossDomain": true,
                "url": url + "account/collect/" + conference_id + "/",
                "method": "POST",
                "headers": {},
                "processData": false,
                "contentType": false
            };
            $.ajax(settings).done(function (response) {
                console.log(response.message);
                if(response.message === 'susccess'){
                    is_collected = true;
                    $('#favorite').text('✔已收藏');
                    $('#favorite').hover(function () {
                        $('#favorite').text('取消收藏');
                    }, function () {
                        $('#favorite').text('✔已收藏');
                    });
                }
                else {
                    alert('收藏失败，用户没有权限');
                }
            });
        }
    }
    else{
        alert('请先登录！');
    }
}

function LogOut(){
    $.ajax({
        type: 'GET',
        async:false,
        url: url + 'account/logout/',
        //headers:{'X-CSRFToken',Token},
        success: function (data) {
            console.log(data);
            if(data.message=='success'){
                alert('登出成功');
                window.location.reload();
            }
        }
    });
}
function format_time(date) {
    if(date === undefined)
        return '未定';
    var str = '' + date;
    var temp = str.split(':', 2);
    str = temp[0] + ':' + temp[1] + ':00';
    str = str.replace('T', ' ');
    return str;
}

function SecToCon() {
    var today = new Date();
    var start = new Date(meeting.conference_start);
    if(start > today)
        return (start - today)/1000;
    return 0;
}

$(function() {
    var timeLength = $('.time-box-ex li').length,
        timeliWidth = $('.time-box-ex li').outerWidth();

    var index = 0;

    $('.time-box-ex ul').width(timeLength * timeliWidth);

    function slideOne(i) {
        var scrollVal = i * timeliWidth; //每次切换的数量
        $('.time-box-ex').stop().animate({
            scrollLeft: scrollVal
        }, 300);
    }

    $('.right-btn').click(function() {
        index = index >= (timeLength-4) ? 0 : index + 1;
        slideOne(index);
    })

    $('.left-btn').click(function() {
        index = index <= 0 ? (timeLength-4) : index - 1;
        slideOne(index);
    })
});

function AddMap(){
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(getLoaction(map_location), function(point){
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        }else{
            console.log('map error');
        }
    },getCity(map_location));
};

function getCity(str) {
    if(str.indexOf('&')>-1) {
        var city = str.split('&')[1].substring(0, 3);
        return city;
    }
};

function getLoaction(str) {
    if(str.indexOf('&')>-1) {
        return str.split('&')[2];
    }
};

function getWeather() {
    var today = new Date();
    var start = new Date(meeting.conference_start);
    var days = (start - today)/(1000*60*60*24);
    days = Math.floor(days);
    console.log(days);
    if(days >= 0 && days < 5) {
        $.ajax({
            type: 'GET',
            async: false,
            url: 'https://www.sojson.com/open/api/weather/json.shtml?city=' + getCity(map_location),
            success: function (data) {
                console.log(data);
                if (data.message === "Success !") {
                    var wea = data.data.forecast[days];
                    if(wea != undefined){
                        set_weather_icon(wea.type);
                        $("li[id='weather1']").text('天气：'+wea.type);
                        $("li[id='weather2']").text('温度：'+wea.low.split(' ')[1]+'~'+wea.high.split(' ')[1]);
                        $("li[id='weather3']").text('空气质量：'+wea.aqi);
                        $("li[id='weather4']").text('风向：'+wea.fx+'  '+wea.fl);
                        $("li[id='weather5']").text('温馨提示：'+wea.notice);
                    }
                    else {
                        $('#weather').addClass('hidden');
                    }
                }
            }
        })
    }
    else{
        $('#weather').addClass('hidden');
    }
};
function set_weather_icon(str) {
    if(str.indexOf('晴') > -1){
        $('#weather-icon').attr('src', 'img/w-sun.png');
    }
    else if(str.indexOf('多云') > -1){
        $('#weather-icon').attr('src', 'img/w-cloudy.png');
    }
    else if(str.indexOf('阴') > -1){
        $('#weather-icon').attr('src', 'img/w-overcast.png');
    }
    else if(str.indexOf('雷') > -1){
        $('#weather-icon').attr('src', 'img/w-thunder.png');
    }
    else if(str.indexOf('雨') > -1){
        $('#weather-icon').attr('src', 'img/w-rain.png');
    }
    else if(str.indexOf('雪') > -1){
        $('#weather-icon').attr('src', 'img/w-snow.png');
    }
    else{
        $('#weather-icon').attr('src', 'img/w-other.png');
    }
    console.log($('#weather-icon').src);
}
