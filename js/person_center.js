var url='http://139.199.24.235:80/';
function addChildAccount2(){
    $('#myModal').modal({backdrop: 'static', keyboard: true});
}
$(document).ready(function () {
    var username;
    var oldpassword;
    var currentindex;
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
            //用户提交的论文信息
            user_papers:[
                {
                    name:'用户论文题目',
                    author:'用户论文作者',
                    status:'论文审核状态'
                }
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
                name:'',
                description:'',
                requirement:'',
                starttime:'',
                endtime:'',
                firsttime:'',
                secondtime:'',
                paperinfo:'',
                contactname:'',
                contactphone:'',
                contactmail:''
            },
            collection_meetings:[
                {
                    id:'1',
                    name:'收藏会议',
                }
            ],
            //子账户标识信息
            childaccounts:[
                {
                    id:'1',
                    name:'2',

                }
            ],
            //会议详细信息
            meetings:[
                {
                    id:'1',
                    name:'混合现实区块链社交研讨会',
                    description:'123',
                    requirement:'456',
                    starttime:'2018-10-10 12:30',
                    endtime:'2018-11-10 12:30',
                    firsttime:'2018-10-25 12:30',
                    secondtime:'2018-11-20 12:30',
                    paperinfo:'789',
                    contactname:'联系人',
                    contactphone:'123456',
                    contactmail:'1@126.com'
                }
            ],
            //论文信息
            papers:[
                {
                    id:'1',
                    name:'123',
                    author:'456',
                    status:'good'

                }
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
                document.getElementById("div_paper_info").style.display="none";
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
            },
            click_childaccount: function (event) {
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



                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="block";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";
                document.getElementById("div_paper").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
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
                },
            click_paper: function (event) {
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";
                document.getElementById("div_paper").style.display="block";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
            },

            //修改会议信息
            click_meeting_info: function (no) {
                var formData = new FormData();
                formData.append("id",this.$data.meetings[no].id);
                $.ajax({
                    type: 'GET',
                    url: url + 'conference/conference/'+this.$data.meetings[no].id+'/information/',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        if (data.message == "success") {
                            this.$data.temp.name=data.data.title;
                            this.$data.temp.description=data.data.introduction;

                            this.$data.temp.requirement=data.data.register_requirement;
                            this.$data.temp.paperinfo=data.data. soliciting_requirement;

                        }
                    }
                });

                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_meeting_info").style.display="block";
                currentindex=no;
                this.$data.temp=this.$data.meetings[this.$data.currrentindex];
            },

            //论文审核信息
            click_paper_info: function (no) {
                    console.log(vm.$data.meetings[no].id);
                    console.log(url + 'display/conference/'+vm.$data.meetings[no].id+'/papers/');
                $.ajax({
                    type: 'GET',
                    url: url + 'display/conference/'+vm.$data.meetings[no].id+'/papers',
                    contentType: false,
                    async: false,
                    cache: false,
                    processData: false,
                    success: function (data) {
                        console.log(data);
                        paper_id.length=0;
                        if (data.message == "success") {
                            paper_id.length=0;
                            for(var ptr=0;ptr<data.data.length;ptr++)
                            {
                                paper_id[ptr].id=data.data[ptr].submitter_id;
                                console.log('paper'+paper_id[ptr].id);
                            }

                        }
                    }
                });
                vm.$data.papers.length=0;
                for(var ptr=0;ptr<paper_id.length;ptr++)
                {

                    $.ajax({
                        type: 'GET',
                        url: url + 'conference/submission/'+paper_id[ptr]+'/',
                        contentType: false,
                        async: false,
                        cache: false,
                        processData: false,
                        success: function (data) {
                            if (data.message == "success") {
                                    var abc={
                                        id:data.data[ptr].submitter_id,
                                        name:data.data[ptr].paper_name,
                                        author:data.data[ptr].authors,
                                        status:data.data[ptr].state

                                    }
                                    vm.$data.papers.push(abc);

                                }

                        }
                    });
                }

                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_paper_info").style.display="block";
            },
            //修改会议信息取消
            click_meeting_cancal: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_meeting_info").style.display="none";
            },
            //修改会议信息确认
            click_meeting_set: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_meeting_info").style.display="none";
                Vue.set(vm.$data.meetings,currentindex,vm.$data.temp);
            },
            //从审核会议页面返回会议管理页面
            click_paper_end: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_paper_info").style.display="none";
            },
            //添加子账户
            addChildAccount:function (event) {
                $('#myModal').modal({backdrop: 'static', keyboard: true});
            },
            addChildAccount2:function (event) {
                $('#myModal2').modal({backdrop: 'static', keyboard: true});
            },
            addChildAccount3: function (event) {
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
                        if (data.message == "success") {
                            alert("添加成功");

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
                            删除成功

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

            }

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