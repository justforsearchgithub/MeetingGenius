//日期插件
var myActivities = [
    {
        StartTime:'2022-02-02 12:00',
        EndTime:'2023-02-02 12:00',
        Location:'MainHall',
        Description:'BalaBala'
    },
    {
        StartTime:'2023-02-02 12:00',
        EndTime:'2024-02-02 12:00',
        Location:'NMB',
        Description:'BalaBalaadss'
    },
    {
        StartTime:'2023-02-02 12:00',
        EndTime:'2024-02-02 12:00',
        Location:'NMB',
        Description:'BalaBalaadss'
    },
    {
        StartTime:'2023-02-02 12:00',
        EndTime:'2024-02-02 12:00',
        Location:'NMB',
        Description:'BalaBalaadss'
    },
    {
        StartTime:'2023-02-02 12:00',
        EndTime:'2024-02-02 12:00',
        Location:'NMB',
        Description:'BalaBalaadss'
    }
];
new Vue({
    el:"#TimeLine",
    data:{
        Activities:myActivities
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
    myActivities.push({StartTime:StartTime,EndTime:EndTime,Location:Location,Description:Description});
}

function ReMoveTimeLine(e){


}
