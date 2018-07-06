var url='http://139.199.24.235:80/';
var subjects = [
    '工业技术',
    '医药卫生',
    '经济',
    '农业科学',
    '文化科学、教育、体育',
    '交通运输','天文学、地球科学','数理科学与化学','环境科学、安全科学','政治、法律','航空、航天',
    '生物科学','社会科学总论','历史','地理','自然科学总论','语言、文字','哲学、宗教','艺术','文学','军事'
];
var optionsubjects = [
  '环境科学、安全科学','政治、法律','航空、航天',
    '生物科学','社会科学总论','历史','地理','自然科学总论','语言、文字','哲学、宗教','艺术','文学','军事'
];
var AlreadySelectedSubjects=[
];

var myActivities = [

];
var AlreadySelectedSubject = 0;
new Vue({
    el:"#optionList",
    data:{
        Subjects:optionsubjects
    }
});
new Vue({
    el:"#TimeLine",
    data:{
        Activities:myActivities
    }
});
new Vue({
    el:"#AlreadySelectedSubjectList",
    data:{
        AlreadySelectedSubjectList:AlreadySelectedSubjects
    }
});


$('.form_datetime').datetimepicker({
    format: 'yyyy-mm-dd hh:ii'
});
$('.form_datetimeTimeLine').datetimepicker({
    format: 'yyyy-mm-dd hh:ii'
});

function PaperExample(){
    var test = $('#PaperExample').val();
    console.log(test);
    var pos = test.lastIndexOf("\\");
    console.log(pos);
    var Filename = test.substring(pos+1);
    if(Filename.length != 0)
        $('#PaperExampleFileName').html(Filename);
    else
        $('#PaperExampleFileName').html('&nbsp;&nbsp;选择文件');
}
function showAddTimeLine(){
    $('#myModal').modal({backdrop: 'static', keyboard: true});
}
function GetTime(Timestr){
    console.log(Timestr);
    var ymd = Timestr.split(' ')[0];
    var hm = Timestr.split(' ')[1];
    var year = ymd.split('-')[0];
    var month = ymd.split('-')[1];
    var day = ymd.split('-')[2];
    var hour = hm.split(':')[0];
    var minute = hm.split(':')[1];
    var date = new Date();
    date.setFullYear(parseInt(year),parseInt(month),parseInt(day));
    date.setHours(parseInt(hour));
    date.setMinutes(parseInt(minute));
    return date;
}
function AddTimeLine(){
    var StartTime  = $('#AddTimeLine_StartTime').val();
    var EndTime = $('#AddTimeLine_FinishTime').val();
    var Location = $('#AddTimeLine_Location').val();
    var Description = $('#AddTimeLine_Description').val();
    console.log(Description);
    var StartDate = GetTime(StartTime);
    var EndDate = GetTime(EndTime);
    if(StartDate>=EndDate){
        alert("Error!");
    }
    else {
        myActivities.push({start_time: StartTime, end_time: EndTime, place: Location, activity: Description});
        myActivities.sort(sortbyTime);
        $('#myModal').modal('hide');
        $('#AddTimeLine_StartTime').val("");
        $('#AddTimeLine_FinishTime').val("");
        $('#AddTimeLine_Location').val("");
        $('#AddTimeLine_Description').val("");
        $('#AddTimeLine_Description').val("");
    }
}


function ReMoveTimeLine(e){
    var id = $(e).attr("id");
    var index = parseInt(id.split('_')[1]);
    console.log(myActivities[index]);
    myActivities.splice(index,1);
}


function sortbyTime(a,b){
    var date_a = GetTime(a.StartTime);
    var date_b = GetTime(b.StartTime);
    return date_a-date_b;
}


function AddSubjects(){
    if(AlreadySelectedSubject == 0) {
        console.log($('#txt_ide').val());
        if ($.inArray($('#txt_ide').val(), AlreadySelectedSubjects) == -1) {
            AlreadySelectedSubjects.push($('#txt_ide').val());
            AlreadySelectedSubject = AlreadySelectedSubject + 1;
        }
    }
}

function AddSubjectsToAlreadySelected(e){
    if(AlreadySelectedSubject == 0) {
        if ($.inArray($(e).text(), AlreadySelectedSubjects) == -1) {
            AlreadySelectedSubjects.push($(e).text());
            AlreadySelectedSubject = AlreadySelectedSubject + 1;
        }
    }
}

function DeleteAlreadySelectedSubject(e){
    console.log($(e).text());
    var index = $.inArray($(e).text());
    AlreadySelectedSubjects.splice(index,1);
    AlreadySelectedSubject = AlreadySelectedSubject - 1;
}

var sendflag = true;
function AddConference() {
    var formdata = new FormData();
    var location_id = document.getElementById('province').selectedIndex;
    var city_id = document.getElementById('city').selectedIndex;
    var location = $('#province')+'_'+location_id+'&'+$('#city')+'_'+city_id+'&'+$('#Location');
    var title = $('#title').val();
    var introduction = $('#Description').val();
    var subject = AlreadySelectedSubjects[0];
    var register_requirement = $('#RegRequirment').val();
    var soliciting_requirement = $('#UploadRequirment').val();
    var accept_due = $('#accept_due').val();
    var register_start = $('#register_start').val();
    var register_due = $('#register_due').val();
    var conference_start = $('#conference_start').val();
    var conference_due = $('#conference_due').val();
    var paper_template = $('#PaperExample')[0].files[0];
    var activities = JSON.stringify(myActivities);
    var template_no = $('img.active').attr('id');
    formdata.append('title', title);
    if(title==""){
        $('#Title_Warning').removeClass("hidden");
        $('#Title_Warning').text("该字段不能为空");
        flag = false;
        return;
    }
    console.log('__________CHECK_________');
    console.log(title);
    formdata.append('introduction', introduction);
    console.log(introduction);
    if(introduction == ""){
        $('#Description_Warning').removeClass("hidden");
        $('#Description_Warning').text("该字段不能为空");
        flag = false;
        return;
    }
    formdata.append('register_requirement', register_requirement);
    if(register_requirement == ""){
        $('#RegRequirment_Warning').removeClass('hidden');
        $('#RegRequirment_Warning').text("该字段不能为空");
        flag = false;
        return ;
    }
    formdata.append('subject', subject);
    if(AlreadySelectedSubject == 0){
        $('#SubjectZero_Warning').removeClass("hidden");
        $('#SubjectZero_Warning').text("该字段不能为空");
        flag = false;
        return ;
    }
    console.log(subject);

    console.log(register_requirement);
    formdata.append('soliciting_requirement', soliciting_requirement);
    if(soliciting_requirement == ""){
        $('#UploadRequirment_Warning').removeClass('hidden');
        $('#UploadRequirment_Warning').text("该字段不能为空");
        flag = false;
        return ;
    }
    console.log(soliciting_requirement);
    formdata.append('accept_due', accept_due);
    console.log(accept_due);
    formdata.append('register_start', register_start);
    console.log(register_start);
    formdata.append('register_due', register_due);
    console.log(register_due);
    formdata.append('conference_start', conference_start);
    console.log(conference_start);
    formdata.append('conference_due', conference_due);
    console.log(conference_due);
    formdata.append('paper_template', paper_template);
    console.log(paper_template);
    formdata.append('activities', activities);
    console.log(activities);
    formdata.append('template_no', template_no);
    console.log(template_no);
    formdata.append('venue',location);
    console.log(location);
    console.log('_________CHECKOUT_________');

    if(sendflag) {
        $.ajax({
            type: 'POST',
            url: url + 'conference/add_conference/',
            data: formdata,
            contentType: false,
            async: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log(data);
                if (data.message == 'success') {
                    alert("添加成功");
                    window.location.href = "index.html";
                }
            }
        });
    }

}

function AddMap(){
    $('#LocationWarning').addClass("hidden");
    var province = $('#province').val();
    var city = $('#city').val();

    $('#allmap').removeClass('hidden');
    var location = $('#Location').val();
    switch(city){
        case '北京市市辖区':
        case '上海市市辖区':
        case '重庆市市辖区':
        case '天津市市辖区':
        case '北京市郊县':
        case '上海市郊县':
        case '重庆市郊县':
        case '天津市郊县':
            city = city.substr(0,3);
            break;
    }
    console.log(city);
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    // 创建地址解析器实例
    var myGeo = new BMap.Geocoder();
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(location, function(point){
        if (point) {
            map.centerAndZoom(point, 16);
            map.addOverlay(new BMap.Marker(point));
        }else{
            $('#LocationWarning').removeClass("hidden");
            $('#LocationWarning').text("无法解析到您的地址,请检查输入");
            sendflag = false;
        }
    },city);
}
function CancelWarning(){
    $('div[role=Warning]').addClass("hidden");
}
$(document).ready(function(){
    $('input[role=listen]').attr("onchange","CancelWarning()");
    $('textarea[role=listen]').attr("onchange","CancelWarning()");
});

function choose_img(img_id) {
    $("img.chosen-img").removeClass('active');
    $("img[id="+ img_id +"]").addClass('active');
}