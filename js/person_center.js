var url='http://139.199.24.235:80/';
var check_status='N';
var currentpaperindex;
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

function GetCurrentUser(){
    var user;
    var type;
    $.ajax({
        type: 'GET',
        async:false,
        url: url + 'account/username/',
        //headers:{'X-CSRFToken',Token},
        success: function (data) {
            console.log(data);
            user = data.username;
            if(user =="anonymous user"){
                console.log(0);
                type =0;
                $('#NavText1').attr('href','userRegister.html');
                $('#NavText1').text('免费注册');
                $('#NavText2').remove('onclick','LogOut()');
                $('#NavText2').attr('href','login.html');
                $('#NavText2').text('登录');
            }
            else{
                console.log(1);
                type = 1;
                $('#NavText1').attr('href','person_center.html');
                $('#NavText2').removeAttr('href');
                $('#NavText1').text ('个人中心');
                $('#NavText2').text('登出');
                $('#NavText2').attr('onclick','LogOut()');
            }
        }
    });
    return type;
}
var myActivities = [
    {
        start_time:'1',
        end_time:'2',
        place:'p',
        activity:'a'
    }

];
function showAddTimeLine(){
    $('#myModal').modal({backdrop: 'static', keyboard: true});
}
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

    paper_template = $('#PaperExample')[0].files[0];
}

function ReMoveTimeLine(e){
    var id = $(e).attr("id");
    var index = parseInt(id.split('_')[1]);
    console.log(myActivities[index]);
    myActivities.splice(index,1);
}
function AddTimeLine(){
    var StartTime  = $('#AddTimeLine_StartTime').val();
    var EndTime = $('#AddTimeLine_FinishTime').val();
    var Location = $('#AddTimeLine_Location').val();
    var Description = $('#AddTimeLine_Description').val();
    console.log(Description);
    if(StartTime>=EndTime){
        alert("Error!");
    }
    myActivities.push({start_time:StartTime,end_time:EndTime,place:Location,activity:Description});
    myActivities.sort(sortbyTime);
}
function sortbyTime(a,b){
    if(a.StartTime>b.StartTime)
    {
        return 1;
    }
    else if(a.StartTime<b.StartTime)
    {
        return -1;
    }
    else
    {
        return 0;
    }
}
function stringchange (str){
    var sub_str=str.substring(0,10);
    var sub_str2=str.substring(11,16);
    sub_str+=" ";
    sub_str+=sub_str2;
    return sub_str;
}
function check_pass() {
    ckeck_status='P';
}
function check_not_pass() {
    ckeck_status='R';
}
function check_modify() {
    ckeck_status='M';
}

$(document).ready(function () {
    var paper_template;
    GetCurrentUser();
    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd hh:ii'
    });
    $('.form_datetimeTimeLine').datetimepicker({
        format: 'yyyy-mm-dd hh:ii'
    });
    console.log('goodend');
    var username;
    var oldpassword;
    var currentindex;
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
    var chack_advice;
    $.ajax({
        type: 'GET',
        async:false,
        url: url + 'account/username/',
        //headers:{'X-CSRFToken',Token},
        success: function (data) {
          //  console.log(data);
            username = data.username;
        }
    });
    console.log(username);
    var vm = new Vue({
        el: '#per_info',
        data: {
            //当前显示的页面
            is_normal:false,
            is_unit:true,
            not_normal:true,
            //当前用户名字
            account_name:'123@163.com',
            addchildaccount_name:'',
            addchildaccount_password:'',
            setaccount_password:'',
            //临时存储的账户名，密码
            temp_name:'',
            temp_password:'',
            temp_password2:'',
            //选中的会议学科分类

            //用户提交的论文信息
            user_papers:[

            ],
            // 下拉框 会议学科
            Subjects:subjects,
            AlreadySelectedSubjectList:[
               '已选学科' 
            ],

            //子账户详细信息
            childaccounts:[
                {
                    name:'456@163.com',
                    password:'1111'
                },
                {
                    name:'789@163.com',
                    password:'2222'
                },
                {
                    name:'123@126.com',
                    password:'333'
                }
            ],
            temp:{
                title:'测试会议名称',//会议名称
                subject:'测试会议学科',//所属学科
                introduction:'测试会议简介',//会议简介
                soliciting_requirement:'投稿要求',//投稿要求
                paper_template:'论文模版',//论文模板，返回的是路径/media/xxx，加到ip地址后可访问
                register_requirement:'注册要求',//注册要求
                accept_start:'',//开始投稿时间
                accept_due:'',//投稿截止时间
                modify_due:'',//修改截止日期
                register_start:'',//注册开始时间
                register_due:'',//注册截止时间
                conference_start:'',//会议开始时间
                conference_due:''//会议结束时间
            },
            collection_meetings:[
                {
                    id:'1',
                    name:'收藏会议',
                }
            ],
            //子账户标识信息
            childaccounts:[

            ],
            //会议详细信息
            meetings:[
                {
                    id:'1',
                    name:'测试'
                }
            ],
            //会议的活动列表
            Activities:myActivities,
            //论文信息
            papers:[
            ],
            paper_detail:[],
            authors:[
                {
                    name:'1',
                    inst:'2'
                }
            ],
            //显示作者信息
            au2:false,
            au3:false,
            au4:false,
            au5:false,
            //注册会议人员信息
            meeting_users:[
                /*{
                    name:'注册会议人员名字',
                    gender:'性别出错',
                    reservation:'是否'
                }*/
            ]
        },
        methods:{
            //点击侧边栏相应标题
            click_account: function (event) {
                document.getElementById("div_account").style.display="block";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";
                document.getElementById("div_paper").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none"
                document.getElementById("div_meeting_user_info").style.display="none";
            },
            click_collection: function (event) {
                $.ajax({
                    type: 'GET',
                    url: url + 'account/collect_list/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        if (data.message == "success") {
                            vm.$data.collection_meetings.length=0;
                            if(data.data.length!=0)
                            {
                                for(var ptr=0;ptr<data.data.length;ptr++)
                                {

                                    var abc={
                                        id:data.data[ptr].id,
                                        name:data.data[ptr].title

                                    }
                                    vm.$data.collection_meetings.push(abc);
                                    console.log('good'+abc);

                                }
                                    console.log(vm.$data.collection_meetings);
                            }
                            else
                            {

                            }

                        }
                    }
                });


                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="block";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";
                document.getElementById("div_paper").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
                document.getElementById("div_meeting_user_info").style.display="none";
            },
            click_childaccount: function (event) {
                vm.$data.childaccounts.length=0;
                console.log('#2');
                console.log(vm.$data.childaccounts);
                $.ajax({
                    type: 'GET',
                    url: url + 'display/my_subusers/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        if (data.message == "success") {

                            if(data.data.length!=0)
                            {
                                for(var ptr=0;ptr<data.data.length;ptr++)
                                {
                                    var abc={
                                        id:data.data[ptr].sub_user_id,
                                        name:data.data[ptr].sub_username
                                    }
                                    vm.$data.childaccounts.push(abc);
                                }
                            }
                            else
                            {
                            }
                        }
                    }
                });



                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="block";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";
                document.getElementById("div_paper").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
                document.getElementById("div_meeting_user_info").style.display="none";
             },
            click_meeting: function (event) {
                $.ajax({
                    type: 'GET',
                    url: url + 'display/my_conference',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        if (data.message == "success") {
                            vm.$data.meetings.length=0;
                            console.log('end');
                            for(var ptr=0;ptr<data.data.length;ptr++)
                            {
                                console.log('ptr'+ptr);
                                var abc={
                                    id:data.data[ptr].conference_id,
                                    name:data.data[ptr].conference_title
                                }
                                vm.$data.meetings.push(abc);
                                //vm.$data.meetings[ptr].id=data.data[ptr].conference_id;
                                //vm.$data.meetings[ptr].name=data.data[ptr].conference_title;

                                //Vue.set(vm.$data.meetings,ptr,vm.$data.meetings[ptr]);
                                console.log('vm'+vm.$data.meetings[ptr].id);

                            }
                        }
                    }
                });
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_password").style.display="none";
                document.getElementById("div_paper").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
                document.getElementById("div_meeting_user_info").style.display="none";
            },
            click_password: function (event) {
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="block";
                document.getElementById("div_paper").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
                document.getElementById("div_meeting_user_info").style.display="none";
                },
            click_paper: function (event) {
                $.ajax({
                    type: 'GET',
                    url: url + 'display/my_submission/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        if (data.message == "success") {
                            console.log(data);
                            vm.$data.user_papers.length=0;
                            for(var ptr=0;ptr<data.data.length;ptr++)
                            {
                                var abc={
                                    paper_name:data.data[ptr].paper_name,
                                    conference_title:data.data[ptr].conference_title,
                                    state:data.data[ptr].state
                                };
                                console.log(abc);
                                vm.$data.user_papers.push(abc);
                            }
                        }
                    }
                });

                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";
                document.getElementById("div_paper").style.display='block';

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
                document.getElementById("div_meeting_user_info").style.display="none";
            },
            click_modify:function (no) {
              currentpaperindex=no;

            },

            //修改会议信息
            click_meeting_info: function (no) {
                currentindex=no;
                $.ajax({
                    type: 'GET',
                    url: url + 'conference/conference/'+this.$data.meetings[no].id+'/information/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        if (data.message == "success") {
                            vm.$data.temp.title=data.data.title;
                            vm.$data.temp.subject=data.data.subject,
                            vm.$data.temp.introduction=data.data.introduction;
                            vm.$data.temp.paper_template=data.data.paper_template;
                            vm.$data.temp.register_requirement=data.data.register_requirement;
                            vm.$data.temp.soliciting_requirement=data.data. soliciting_requirement;
                            vm.$data.temp.accept_start=stringchange(data.data.accept_due);
                            vm.$data.temp.accept_due=stringchange(data.data.accept_due);
                            //vm.$data.temp.modify_due=stringchange(data.data.modify_due);

                            vm.$data.temp.register_start=stringchange(data.data.register_start);

                            vm.$data.temp.register_due=stringchange(data.data.register_due);
                            vm.$data.temp.conference_start=stringchange(data.data.conference_start);
                            vm.$data.temp.conference_due=stringchange(data.data.conference_due);
                            vm.$data.AlreadySelectedSubjectList.length=0;
                            vm.$data.AlreadySelectedSubjectList.push(data.data.subject);

                        }
                    }
                });

                $.ajax({
                    type: 'GET',
                    url: url + 'display/conference/'+this.$data.meetings[no].id+'/activities/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        if (data.message == "success") {
                            console.log('goodgood');
                            console.log(data);
                            myActivities.length=0;
                            vm.$data.Activities.length=0;
                            for(var index=0;index<data.data.length;index++)
                            {
                                var temp_activity={
                                    start_time:stringchange(data.data[index].start_time),
                                    end_time:stringchange(data.data[index].end_time),
                                    place:data.data[index].place,
                                    activity:data.data[index].activity_name
                                };
                                console.log(temp_activity.start_time);
                                console.log(temp_activity.end_time);
                                myActivities.push(temp_activity);
                               // vm.$data.Activities.push(temp_activity);
                            }
                            console.log('endend');
                            console.log(vm.$data.Activities[0].activity);
                        }
                    }
                });


                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_meeting_info").style.display="block";
                currentindex=no;
                //this.$data.temp=this.$data.meetings[this.$data.currrentindex];
            },

            //论文审核信息
            click_paper_info: function (no) {
                currentindex=no;
                $.ajax({
                    type: 'GET',
                    url: url + 'display/conference/'+this.$data.meetings[no].id+'/papers/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log('#3');
                            console.log(data);
                        if (data.message == "success") {
                           vm.$data.papers.length=0;

                            for(var ptr=0;ptr<data.data.length;ptr++)
                            {
                                var abc={
                                    submission_id:data.data[ptr].submission_id,
                                    paper_name:data.data[ptr].paper_name,
                                    paper_url:data.data[ptr].paper_url,
                                    state:data.data[ptr].state,
                                    submitter:data.data[ptr].submitter
                                };
                                console.log(abc);
                                vm.$data.papers.push(abc);

                                console.log(vm.$data.papers);
                                //paper_id[ptr].id=data.data[ptr].submitter_id;
                                //console.log('paper'+paper_id[ptr].id);
                            }

                        }
                    }
                });

                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_paper_info").style.display="block";
                document.getElementById("div_meeting_user_info").style.display="none";
            },
            click_paper_check: function (no) {
                console.log(this.$data.papers[no].submission_id);
                currentpaperindex=no;
                $.ajax({
                    type: 'GET',
                    url: url + 'conference/submission/'+this.$data.papers[no].submission_id+'/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log('#3');
                        console.log(data);
                        if (data.message == "success") {
                            vm.$data.paper_detail.length=0;
                            var abc={
                                paper_name:data.data.paper_name,
                                state:data.data.state,
                                paper_abstract:data.data.paper_abstract
                                //paper_id[ptr].id=data.data[ptr].submitter_id;
                                //console.log('paper'+paper_id[ptr].id);
                            };
                            vm.$data.paper_detail.push(abc);
                            console.log(data.data.authors);
                            $('#author11').val(data.data.authors[1]["A1"].name);
                            $('#org11').val(data.data.authors[1]["A1"].institute);
                            $('#author-com1').val(data.data.authors[0]["CA"].name);
                            $('#org-com1').val(data.data.authors[0]["CA"].institute);
                            $('#paper_title1').val(data.data.paper_name);
                            $('#paper_abstract1').val(data.data.paper_abstract);
                            if(data.data.authors[2]!=undefined)
                            {
                                $('#author12').val(data.data.authors[2]["A2"].name);
                                $('#org12').val(data.data.authors[2]["A2"].institute);
                                $('#author-12').removeClass('hidden');
                            }
                            if(data.data.authors[3]!=undefined)
                            {
                                $('#author13').val(data.data.authors[3]["A3"].name);
                                $('#org13').val(data.data.authors[3]["A3"].institute);
                                $('#author-13').removeClass('hidden');
                            }
                            if(data.data.authors[4]!=undefined)
                            {
                                $('#author14').val(data.data.authors[4]["A4"].name);
                                $('#org14').val(data.data.authors[4]["A4"].institute);
                                $('#author-14').removeClass('hidden');
                            }
                            if(data.data.authors[5]!=undefined)
                            {
                                $('#author15').val(data.data.authors[5]["A5"].name);
                                $('#org15').val(data.data.authors[5]["A5"].institute);
                                $('#author-15').removeClass('hidden');
                            }
                        }
                    }
                });
                for(var ptr=2;ptr<vm.$data.authors.length;ptr++)
                {
                    $('#author-1' + ptr).removeClass('hidden');
                }
                $('#myModal6').modal({backdrop: 'static', keyboard: true});
                $('#myModal6').modal('show');
            },
            //修改会议信息取消
            click_meeting_cancal: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_meeting_user_info").style.display="none";
            },
            //修改会议信息确认
            click_meeting_set: function (event) {
                vm.$data.meetings[currentindex].name=vm.$data.temp.title;
                Vue.set(vm.$data.meetings, currentindex, vm.$data.meetings[currentindex]);
                var activities = JSON.stringify(myActivities);
                var formdata = new FormData();
                formdata.append('title', vm.$data.temp.title);
                formdata.append('introduction', vm.$data.temp.introduction);
                formdata.append('subject', vm.$data.temp.subject);
                formdata.append('register_requirement', vm.$data.temp.register_requirement);
                formdata.append('soliciting_requirement', vm.$data.temp.soliciting_requirement);
                formdata.append('accept_due', vm.$data.temp.accept_due);
                formdata.append('register_start', vm.$data.temp.register_start);
                formdata.append('register_due', vm.$data.temp.register_due);
                formdata.append('conference_start', vm.$data.temp.conference_start);
                formdata.append('conference_due', vm.$data.temp.conference_due);
                //formdata.append('paper_template', vm.$data.temp.paper_template);
                //formdata.append('activities',activities);
                formdata.append('template_no', 1);
                formdata.append('venue','123');
                $.ajax({
                    type: 'POST',
                    url: url + 'conference/edit_conference/'+this.$data.meetings[currentindex].id+'/',
                    data: formdata,
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                    }
                });

                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_meeting_info").style.display="none";
                //Vue.set(vm.$data.meetings,currentindex,vm.$data.temp);
            },
            //从审核会议页面返回会议管理页面
            click_paper_end: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_paper_info").style.display="none";
            },
            //查看注册会议人员信息
            click_meeting_user_info: function (no) {
                currentindex=no;
                $.ajax({
                    type: 'GET',
                    url: url + 'display/conference/'+this.$data.meetings[currentindex].id+'/registrations/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        if (data.message == "success") {
                            vm.$data.meeting_users.length=0;
                            if(data.data.length!=0)
                            {
                                for(var ptr=0;ptr<data.data.length;ptr++)
                                {
                                    var de;
                                    if(data.data[ptr].reservation)
                                    {
                                        de='是';
                                    }
                                    else
                                    {
                                        de='否';
                                    }
                                    var abc={
                                        name:data.data[ptr].name,
                                        gender:data.data[ptr].gender,
                                        reservation:de
                                    }
                                    vm.$data.meeting_users.push(abc);
                                }

                            }
                            else
                            {

                            }

                        }
                    }
                });
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";
                document.getElementById("div_paper").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
                document.getElementById("div_meeting_user_info").style.display="block";

            },
            click_meeting_user_end: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_meeting_user_info").style.display="none";
            },
            click_check_add: function () {
                vm.$data.papers[currentpaperindex].state=check_status;
                Vue.set(vm.$data.meetings, currentindex, vm.$data.meetings[currentindex]);
                var formdata = new FormData();
                formdata.append('state_choice', check_status);
                if(check_status==='M')
                {
                    formdata.append('advice',$('#check_advice').val());
                    vm.$data.papers[currentpaperindex].advice=$('#check_advice').val();
                }
                Vue.set(vm.$data.papers, currentpaperindex, vm.$data.papers[currentpaperindex]);
                $.ajax({
                    type: 'POST',
                    url: url + 'conference/submission/'+this.$data.papers[currentpaperindex].submission_id+'/review/',
                    data: formdata,
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                    }
                });

            },
            click_download:function (no) {
                window.open(url+this.$data.papers[no].paper_url);
            },
            //添加子账户
            addChildAccount:function (event) {
                $('#myModal').modal({backdrop: 'static', keyboard: true});
            },
            addChildAccount2:function (event) {
                $('#myModal2').modal({backdrop: 'static', keyboard: true});
            },
            addChildAccount3: function (event) {
                console.log('点击添加');
                var formData = new FormData();
                formData.append("username", this.$data.addchildaccount_name);
                formData.append("password", this.$data.addchildaccount_password);
                formData.append("confirm_password", this.$data.addchildaccount_password);
                $.ajax({
                    type: 'POST',
                    url: url + 'account/organization_sub_user_register/',
                    data: formData,
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        if (data.message == "success") {
                            alert("添加成功");
                            this.$options.methods.click_childaccount();
                        }
                    }
                });
            },
            addChildAccount4: function(event){
                $.ajax({
                    type: 'GET',
                    url: url + 'display/my_subusers/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        if (data.message == "success") {
                            vm.$data.childaccounts.length=0;
                            if(data.data.length!=0)
                            {
                                for(var ptr=0;ptr<data.data.length;ptr++)
                                {

                                    var abc={
                                        id:data.data[ptr].sub_user_id,
                                        name:data.data[ptr].sub_username

                                    }
                                    vm.$data.childaccounts.push(abc);
                                }
                            }
                            else
                            {

                            }

                        }
                    }
                });
            },
            //修改子账户密码  悬浮框
            setcapassword: function (no) {
                currentindex=no;
                this.$data.temp_name=this.$data.childaccounts[currentindex].name;
                $('#myModal3').modal({backdrop: 'static', keyboard: true});
            },
            //修改子账户密码确认
            complete_ac_password: function (event) {
                  if(this.$data.temp_password===this.$data.temp_password2)
                  {
                      //上传修改密码
                      var formData = new FormData();
                      formData.append("username", this.$data.childaccount[currentindex].name);
                      formData.append("old_password",this.$data.setaccount_password);
                      formData.append("new_password", this.$data.temp_password);
                      formData.append("confirm_password", this.$data.temp_password);
                      $.ajax({
                          type: 'POST',
                          url: url + 'account/change_password/',
                          data: formData,
                          contentType: false,
                          async: false,
                          cache: false,
                          processData: false,
                          success: function (data) {
                              if (data.message == "success") {
                                  alert('修改成功');
                              }
                          }
                      });
                  }
                  else{
                      alert("密码不一致！");
                  }
            },
            //删除子帐号
            deleteca: function (no) {

                var formData = new FormData();
                formData.append("sub_user_username", this.$data.childaccounts[no].name);
                $.ajax({
                    type: 'POST',
                    url: url + 'account/delete_sub_user/',
                    data: formData,
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        if (data.message == "success") {
                            alert('删除成功');

                        }
                    }
                });

                this.$data.childaccounts.splice(no,1);

                //document.getElementById("div_childaccount").style.display="none";
                //document.getElementById("div_childaccount").style.display="block";

            },
            //修改密码
            set_password: function (event) {
                if(this.$data.temp_password===this.$data.temp_password2)
                {
                    var formData = new FormData();
                    formData.append("username", this.$data.account_name);
                    formData.append("old_password",this.$data.setaccount_password);
                    formData.append("new_password", this.$data.temp_password);
                    formData.append("confirm_password", this.$data.temp_password);
                    $.ajax({
                        type: 'POST',
                        url: url + 'account/change_password/',
                        data: formData,
                        contentType: false,
                        async: false,
                        cache: false,
                        processData: false,
                        success: function (data) {
                            if (data.message == "success") {
                                alert('修改成功');

                            }
                            else if(data.message==="old_password error")
                            {
                                console.log(data.message);
                                alert('旧密码错误！');
                            }
                        }
                    });

                }
                else{
                    alert('密码不一致！');
                }

            },
            //修改密码确认
            complete_password: function (event) {
                if(this.$data.temp_password===this.$data.temp_password2)
                {
                    var formData = new FormData();
                    formData.append("username", this.$data.account_name);
                    formData.append("old_password", oldpassword);
                    formData.append("new_password", this.$data.temp_password);
                    formData.append("confirm_password", this.$data.temp_password);
                    $.ajax({
                        type: 'POST',
                        url: url + 'account/change_password/',
                        data: formData,
                        contentType: false,
                        async: false,
                        cache: false,
                        processData: false,
                        success: function (data) {
                            if (data.message == "success") {
                                alert('修改成功');

                            }
                        }
                    });

                }
                else{
                    alert('密码不一致！');
                }

            },

            AddSubject: function (event) {
                if($('#txt_ide').val()!='')
                {
                    vm.$data.AlreadySelectedSubjectList.length=0;

                    vm.$data.AlreadySelectedSubjectList.push($('#txt_ide').val());
                    console.log($('#txt_ide').val());
                }


            },

        }
    });

    $.ajax({
        type: 'GET',
        async:false,
        url: url + 'account/user_type/',
        //headers:{'X-CSRFToken',Token},
        success: function (data) {
            console.log(data);
            if(data.message==="success"){
                vm.$data.account_name=username;

                console.log(6);
                console.log(data.data.user_type);
                if(data.data.user_type==="normal_user")
                {
                    console.log(2);
                    vm.$data.is_normal=true;
                    vm.$data.is_unit=false;
                    vm.$data.not_normal=false;
                }
                else if(data.data.user_type==='organization_user')
                {
                    console.log(3);
                    vm.$data.is_nomal=false;
                    vm.$data.is_unit=true;
                    vm.$data.not_normal=true;
                }
                else if(data.data.user_type==='organization_sub_user')
                {
                    console.log(4);
                    vm.$data.is_nomal=false;
                    vm.$data.is_unit=false;
                    vm.$data.not_normal=true;
                }
            }
            else
            {
                console.log(5);
            }
            console.log(123);

        }

    });

    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });


});