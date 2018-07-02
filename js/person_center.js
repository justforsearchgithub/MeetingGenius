var url='http://139.199.24.235:80/';
function addChildAccount2(){
    $('#myModal').modal({backdrop: 'static', keyboard: true});
}
$(document).ready(function () {
    var username;
    var oldpassword;
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
            is_normal:false,
            is_unit:true,
            not_normal:true,
            account_name:'123@163.com',
            addchildaccount_name:'',
            addchildaccount_password:'',
            setaccount_password:'',
            currentindex:1,

            temp_name:'',
            temp_password:'',
            temp_password2:'',

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
            papers:[
                {
                    name:'123',
                    author:'456',
                }
            ]
        },
        methods:{
            click_account: function (event) {
                document.getElementById("div_account").style.display="block";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
            },
            click_collection: function (event) {
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="block";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
            },
            click_childaccount: function (event) {
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="block";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="none";

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
                            console.log('meeting');
                            console.log(data.data);
                           
                            for(var ptr=0;ptr<data.data.length;ptr++)
                            {
                                console.log(666);
                                console.log(data.data[ptr].conference_id);
                                vm.$data.meetings[ptr].id=data.data[ptr].conference_id;
                                vm.$data.meetings[ptr].name=data.data[ptr].conference_title;
                                Vue.set(vm.$data.meetings,ptr,vm.$data.meetings[ptr]);
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

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
            },
            click_password: function (event) {
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_password").style.display="block";

                document.getElementById("div_meeting_info").style.display="none";
                document.getElementById("div_paper_info").style.display="none";
                },
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
                this.$data.currentindex=no;
                this.$data.temp=this.$data.meetings[this.$data.currrentindex];
            },
            click_paper_info: function (no) {
                this.$data.currentindex.no;
                document.getElementById("div_meeting").style.display="none";
                document.getElementById("div_paper_info").style.display="block";
            },
            click_meeting_cancal: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_meeting_info").style.display="none";
            },
            click_meeting_set: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_meeting_info").style.display="none";
                Vue.set(vm.$data.meetings,currentindex,vm.$data.temp);
            },
            click_paper_end: function (event) {
                document.getElementById("div_meeting").style.display="block";
                document.getElementById("div_paper_info").style.display="none";
            },
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
            setcapassword: function (no) {
                this.$data.currentindex=no;
                this.$data.temp_name=this.$data.childaccounts[this.$data.currentindex].name;
                $('#myModal3').modal({backdrop: 'static', keyboard: true});
            },
            complete_ac_password: function (event) {
                  if(this.$data.temp_password===this.$data.temp_password2)
                  {
                      //上传修改密码


                      //修改本地
                        var temp_object={
                            name:this.$data.temp_name,
                            password:this.$data.temp_password
                        }
                      Vue.set(vm.$data.childaccounts,vm.$data.currentindex,temp_object);
                  }
                  else{
                      alert("密码不一致！");
                  }
            },
            deleteca: function (no) {

                /*var formData = new FormData();
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
                });*/

                this.$data.childaccounts.splice(no,1);

                //document.getElementById("div_childaccount").style.display="none";
                //document.getElementById("div_childaccount").style.display="block";

            },
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
            console.log(1);
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