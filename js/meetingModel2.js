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
        accept_due: '2018-6-01 12:00:00',
        change_due: '2018-16-08 12:00:00',
        register_start: '2018-6-10 12:00:00',
        register_due: '2018-6-20 12:00:00',
        conference_start: '2018-6-25 12:00:00',
        conference_due: '2018-6-30 12:00:00',
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
        paper_template: null
    },
    computed: {
        state: function() {
            var today = new Date();
            var date1 = new Date(this.accept_due);
            var date2 = new Date(this.change_due);
            var date3 = new Date(this.register_start);
            var date4 = new Date(this.register_due);
            var date5 = new Date(this.conference_start);
            var date6 = new Date(this.conference_due);
            if (today < date1)
                return '征稿中';
            else if (today < date2)
                return '已截稿，征稿修改中';
            else if (today <date3)
                return '已截稿';
            else if (today <date4)
                return '注册中';
            else if (today <date5)
                return '截止注册';
            else if (today <date6)
                return '会议中';
            else
                return '会议完成';
        }
    }
});
/*
var title = new Vue ({
    el: '#title',
    data: {
        title: meeting.title
    }
});

var intro = new Vue ({
    el: '#introduction',
    data: {
        org_name: meeting.organization,
        subject: meeting.subject,
        introduce: meeting.introduction
    }
});
*/
$(document).ready(function () {
    var today = new Date();
    var flag = true;
    var start = new Date(meeting.conference_start);
    if(today >= start)
        flag = false;
    //日期倒计时
    $(function(){
        $.leftTime(meeting.conference_start, function(d){
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
        $("#img_fee_upload").attr("src",URL.createObjectURL($('#'+id)[0].files[0]));
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
    
}

function paper_upload() {
    
}