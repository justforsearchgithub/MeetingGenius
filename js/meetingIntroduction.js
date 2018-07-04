var url='';
var meeting = new Vue(
    {
        el: '#meeting',
        data: {
            meetingName: '这里是会议名称',
            /*startTime:'2018-12-25 12:00:00',
            endTime: '这里是结束时间',
            activityPlace: '这里是活动地点',
            activityDescription: '这里是活动描述',*/
            subject:'这里是学科',
            meetingIntroduction: '这里是会议简介',
            registerRequest: '这里是注册要求',
            firstAuditNoticeDate: '这里是开始投稿时间',
            closeDate: '这里是投稿截止时间',
            secondAuditNoticeDate: '这里是修改截止日期',
            registerOpenDate: '这里是注册开放日期',
            registerCloseDate: '这里是注册结束日期',
            meetingStartDate: '这里是会议开始日期',
            paper_template: '论文模板',
            organizationName: '这里是组织名称',
            contactName: '这里是联系人姓名',
            contactPhone: '这里是联系人电话',
            contactEmail: '这里是联系人邮箱',
            solicitInformation: '这里是投稿要求',
        }
    })
$(document).ready(function () {
    var id = getParam('id');
    if(id != 0 && id != null && id != undefined)
    {
        var conference_settings = {
            "async": false,
            "crossDomain": true,
            "url": url + "conference/conference/" + id + "/information/",
            "method": "GET",
            "headers": {}
        }
        $.ajax(conference_settings).done(function (response) {
            console.log(response.message);
            meeting.meetingName = response.data.title;
            /*meeting.startTime = response.data.start_time;
            meeting.endTime = response.data.end_time;
            meeting.activityPlace = response.data.place;
            meeting.activityDescription = response.data.activityDescription;*/
            meeting.subject = response.data.subject;
            meeting.meetingIntroduction = response.data.introduction;
            meeting.registerRequest = response.data.registerRequest;
            meeting.paper_template = response.data.paper_template;
            meeting.firstAuditNoticeDate = response.data.accept_start;
            meeting.closeDate = response.data.accept_due;
            meeting.modifyCloseDate = response.data.modify_due;
            meeting.registerOpenDate = response.data.register_start;
            meeting.registerCloseDate = response.data.register_due;
            meeting.meetingStartDate = response.data.conference_start;
            meeting.organizationName = response.data.organization.org_name;
            meeting.contactName = response.data.organization.contacts;
            meeting.contactPhone = response.data.organization.phone_number;
            meeting.contactEmail = response.data.organization.email;
            meeting.solicitInformation = response.data.soliciting_requirement;
            /*TODO:contact info*/
        })
    }
    $(function(){
        var today = new Date();
        var flag = true;
        var start = new Date(meeting.meetingStartDate);
        if(today >= start)
            flag = false;
        $.leftTime(meeting.startTime, function(d){
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
/*
window.onload=function show(){
    var d1 = new Date();//获取到当前的时间
    var d1Ms = d1.getTime();
    var d2 =meeting.startTime;
    var d2Ms = d2.getTime();
    var differMs = d2Ms-d1Ms;//相差的毫秒数
    var days = parseInt(differMs/(3600*24*1000));//天
    var hours = parseInt((differMs%(3600*24*1000))/(3600*1000));//1小时=3600s
    var minutes =parseInt((differMs%(3600*1000))/(60*1000));//分钟
    var seconds = parseInt((differMs%(60*1000))/1000);//秒
    //当前分秒为个位数字时，对其进行的处理
    hours = hours<10?"0"+hours:hours;
    minutes = minutes<10?"0"+minutes:minutes;
    seconds = seconds<10?"0"+seconds:seconds;
    setInterval(show,1000);
    document.getElementById("timer").innerHTML = days+"天"+hours+"小时"+ minutes+"分"+ seconds+"秒";
}*/
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
    var pay_vouvher = $('#fee_upload')[0].files[0];
    var listen_only = false;
    if (name === null || name === ''){
        alert('请填写姓名');
        return;
    }
    else if (pay_vouvher === null || pay_vouvher === undefined){
        alert('请上传缴费凭证图');
        return;
    }
    if (paper_id === null || paper_id === ""){
        listen_only = true;
    }
    /*TODO:ajax with file*/
    /*
    url: conference/<会议的主键id>/conference_register
    post: listen_only  仅仅聆听会议  传字符串 true 或者 false 就好
    paper_id 参与会议的paper的id（如果），participants 与会者的信息（考虑到这些信息只需要在展示时使用，
    能读即可，不想为其建立单独数据库表，希望前端用序列化的json传递过来，格式为：
        [{'name': <str>, 'gender': <男or女>, 'reservation' /*是否预定住宿//: <bool>}, ...]  ）
    pay_voucher 缴费凭证的照片或者pdf文件
    */
}

function paper_upload() {
    var paper_name = $("input[id='paper_title']").val();
    var authors = $("input[id='paper_author']").val();
    var institute = $("input[id='paper_organization']").val();
    var paper_abstract = $("textarea[id='paper_outline']").val();
    var paper = $('#paper_up')[0].files[0];
    if (paper_name === '' || authors === '' || institute === '' || paper_abstract === ''){
        alert('信息填写不完全');
        return;
    }
    else if(paper === null || paper === undefined){
        alert('未上传论文');
        return;
    }
    /*TODO:ajax with file*/
    /*
url: conference/<会议的主键id>/paper_submit
说明：普通用户提交论文
from 前端：
    post: authors 作者们 institute 机构  paper_name paper_abstract  paper 上传的论文文件
    */
}

function checkLogin() {
    var cookie = document.cookie;
    if(false){
        alert('您尚未登陆！');
        $('#join-meeting').addClass('hidden');
        $('#paper-upload').addClass('hidden');
        window.location.href = 'login.html';
    }
}

function downloadPaper() {
    window.open('http://www.baidu.com');
}

var getParam = function (name) {
    var search = document.location.search;
    //alert(search);
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
/**
 * 获取对应名称的cookie
 * @param name cookie的名称
 * @returns {null} 不存在时，返回null
 */
var getCookie = function (name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
};