var url = 'http://139.199.24.235:80/';
var conference_id = 0;
var usertype = 'anonymous user';
var is_collected = false;
var meeting = new Vue(
    {
        el: '#meeting',
        data: {
            meetingName: '这里是会议名称',
            subject:'这里是学科',
            meetingIntroduction: '这里是会议简介',
            firstAuditNoticeDate: '2018-6-20 12:00:00',
            closeDate: '2018-6-25 12:00:00',
            registerOpenDate: '2018-6-25 12:00:00',
            registerEndDate: '2018-7-27 12:00:00',
            meetingStartDate: '2018-11-25 12:00:00',
            meetingEndDate:'2018-12-25 12:00:00',
            paper_template: null,
            registerRequest: '这里是注册要求',
            solicitInformation: '这里是投稿要求',
            organizationName: '这里是组织名称',
            contactName: '这里是联系人姓名',
            contactPhone: '这里是联系人电话',
            email: '这里是联系人邮箱',
            activities: [
                {
                    start_time: '2018-12-25 12:00:00',
                    end_time: '2018-12-25 18:00:00',
                    place: '地点A',
                    activity: '会议开始'
                },
                {
                    start_time: '2018-12-27 12:00:00',
                    end_time: '2018-12-27 18:00:00',
                    place: '地点B',
                    activity: '会议进行'
                },
                {
                    start_time: '2018-12-30 12:00:00',
                    end_time: '2018-12-30 18:00:00',
                    place: '地点C',
                    activity: '会议结束'
                }
            ],
        },
        computed: {
            state: function() {
                var today = new Date();
                var date0 = new Date(this.firstAuditNoticeDate);
                var date1 = new Date(this.closeDate);
                var date2 = new Date(this.registerOpenDate);
                var date3 = new Date(this.registerEndDate);
                var date4 = new Date(this.meetingStartDate);
                var date5 = new Date(this.meetingEndDate);
                if (today <date0)
                    return '征稿未开始';
                else if (today < date1)
                    return '征稿中';
                else if (today <date2)
                    return '已截稿';
                else if (today <date3)
                    return '注册中';
                else if (today <date4)
                    return '截止注册';
                else if (today <date5)
                    return '会议中';
                else
                    return '会议完成';
            }
        }
    })
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
    if(conference_id === 0 || conference_id === null || conference_id === undefined)
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
            meeting.meetingName = response.data.title;
            meeting.subject = response.data.subject;
            meeting.meetingIntroduction = response.data.introduction;
            meeting.registerRequest = response.data.registerRequest;
            meeting.solicitInformation = response.data.soliciting_requirement;
            meeting.paper_template = response.data.paper_template;
            meeting.firstAuditNoticeDate = format_time(response.data.accept_start);
            meeting.closeDate = format_time(response.data.accept_due);
            meeting.registerOpenDate = format_time(response.data.register_start);
            meeting.registerEndDate = format_time(response.data.register_due);
            meeting.meetingStartDate = format_time(response.data.conference_start);
            meeting.meetingEndDate = format_time(response.data.conference_due);
            meeting.organizationName = response.data.organization.org_name;
            meeting.contactName = response.data.organization.contacts;
            meeting.contactPhone = response.data.organization.phone_number;
            meeting.email = response.data.organization.email;
        })
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
    //日期倒计时
    $(function(){
        var today = new Date();
        var flag = true;
        var start = new Date(meeting.meetingStartDate);
        if(today >= start)
            flag = false;
        $.leftTime(meeting.meetingStartDate, function(d){
            if(d.status || flag){
                var $dateShow1=$("#dateShow1");
                $dateShow1.find(".d").html(d.d);
                $dateShow1.find(".h").html(d.h);
                $dateShow1.find(".m").html(d.m);
                $dateShow1.find(".s").html(d.s);
            }
            else
            {
                var $dateShow1=$("#dateShow1");
                $dateShow1.find(".d").html('0');
                $dateShow1.find(".h").html('0');
                $dateShow1.find(".m").html('0');
                $dateShow1.find(".s").html('0');
            }
        });
    });


})

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
function join_register() {
    var name =  $("input[id='person_name']").val();
    var gender = $("input[name='sex']:checked").val();
    var reservation = $("input[name='hotel']:checked").val();
    var information = $("textarea[id='extra_info']").val();
    var paper_id = $("input[id='paper_num']").val();
    var pay_voucher = $('#fee_upload')[0].files[0];
    var listen_only = false;
    if (name === null || name === ''){
        alert('请填写姓名');
        return;
    }
    else if (pay_voucher === null || pay_voucher === undefined){
        alert('请上传缴费凭证图');
        return;
    }
    if (paper_id === null || paper_id === ""){
        listen_only = true;
    }
    /*TODO:check ajax with file*/
    var temp_json = [
        {'name': name},
        {'gender': gender},
        {'reservation': reservation},
        {'information': information}
    ];
    var formData = new FormData();
    formData.append('listen_only', listen_only);
    formData.append('paper_id', paper_id);
    formData.append('participants', JSON.stringify(temp_json));
    console.log(temp_json);
    formData.append('pay_voucher', pay_voucher);
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": url + "conference/conference/" + conference_id + "/register/",
        "method": "POST",
        "headers": {},
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formData
    };
    $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        console.log(data);
        if(data.message === 'success'){
            alert('注册成功');
        }
        else if (data.message === 'reduplicate register'){
            alert('您已经注册了该会议');
        }
        else{
            alert('注册失败：错误的论文编号');
        }
    });
}

function checkState_r() {
    if(usertype != 'anonymous user' && usertype != null && usertype != undefined){
        if(meeting.state != '注册中'){
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
        if(meeting.state != '征稿中'){
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

