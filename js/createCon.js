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
new Vue({
    el:"#optionList",
    data:{
        Subjects:optionsubjects
    }
})
new Vue({
    el:"#TimeLine",
    data:{
        Activities:myActivities
    }
})
new Vue({
    el:"#AlreadySelectedSubjectList",
    data:{
        AlreadySelectedSubjectList:AlreadySelectedSubjects
    }
})


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
    myActivities.push({start_time:StartTime,end_time:EndTime,place:Location,activity:Description});
    myActivities.sort(sortbyTime);
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
    console.log($('#txt_ide').val());
    if($.inArray($('#txt_ide').val(),AlreadySelectedSubjects)==-1){
        AlreadySelectedSubjects.push($('#txt_ide').val());
    }
}

function AddSubjectsToAlreadySelected(e){
    if($.inArray($(e).text(),AlreadySelectedSubjects)==-1) {
        AlreadySelectedSubjects.push($(e).text());
    }
}

function DeleteAlreadySelectedSubject(e){
    console.log($(e).text());
    var index = $.inArray($(e).text());
    AlreadySelectedSubjects.splice(index,1);
}

function AddConference() {
    var formdata = new FormData();
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
    var template_no = 1;
    formdata.append('title', title);
    formdata.append('introduction', introduction);
    formdata.append('subject', subject);
    formdata.append('register_requirement', register_requirement);
    formdata.append('soliciting_requirement', soliciting_requirement);
    formdata.append('accept_due', accept_due);
    formdata.append('register_start', register_start);
    formdata.append('register_due', register_due);
    formdata.append('conference_start', conference_start);
    formdata.append('conference_due', conference_due);
    formdata.append('paper_template', paper_template);
    formdata.append('activities', activities);
    formdata.append('template_no', template_no);

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
        }
    });


}