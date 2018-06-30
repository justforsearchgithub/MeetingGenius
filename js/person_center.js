function addChildAccount2(){
    $('#myModal').modal({backdrop: 'static', keyboard: true});
}
$(document).ready(function () {

    var vm = new Vue({
        el: '#per_info',
        data: {
            is_normal:false,
            not_normal:true,
            account_name:'Tom',
            account_mail:'123@163.com',
            addchildaccount_name:'',
            addchildaccount_password:'',
            setaccount_password:'请设置新的密码',
            childaccounts:[
                {
                    name:'456@163.com',
                    password:'1111'
                },
                {
                    name:'789@163.com',
                    password:'2222'
                }
            ]
        },
        methods:{
            click_account: function (event) {
                document.getElementById("div_account").style.display="block";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_password").style.display="none";
            },
            click_collection: function (event) {
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="block";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_password").style.display="none";
            },
            click_childaccount: function (event) {
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="block";
                document.getElementById("div_password").style.display="none";
             },
            click_password: function (event) {
                document.getElementById("div_account").style.display="none";
                document.getElementById("div_collection").style.display="none";
                document.getElementById("div_childaccount").style.display="none";
                document.getElementById("div_password").style.display="block";
                },
            addChildAccount:function (event) {
                $('#myModal').modal({backdrop: 'static', keyboard: true});
            },
            addChildAccount2:function (event) {

            }

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