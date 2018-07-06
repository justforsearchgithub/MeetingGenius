var url = 'http://139.199.24.235:80/';

function GetCurrentUser() {
    var user;
    var type;
    $.ajax({
        type: 'GET',
        async: false,
        url: url + 'account/username/',
        //headers:{'X-CSRFToken',Token},
        success: function (data) {
            console.log(data);
            user = data.username;
            if (user == "anonymous user") {
                console.log(0);
                type = 0;
                $('#NavText1').attr('href', 'userRegister.html');
                $('#NavText1').text('免费注册');
                $('#NavText2').remove('onclick', 'LogOut()');
                $('#NavText2').attr('href', 'login.html');
                $('#NavText2').text('登录');
            }
            else {
                console.log(1);
                type = 1;
                $('#NavText1').attr('href', 'person_center.html');
                $('#NavText2').removeAttr('href');
                $('#NavText1').text(user);
                $('#NavText2').text('登出');
                $('#NavText2').attr('onclick', 'LogOut()');
                var str = "";
            }
        }
    });
    return type;
}

var user_type;

function GetUserType() {
    $.ajax({
        type: 'GET',
        async: false,
        url: url + 'account/user_type/',
        success: function (data) {
            console.log(data.data.user_type);
            user_type = data.data.user_type;
        }
    })
}

$('#CountConNumBar').mouseover(function () {
    $('#CountConNumBar').addClass("animated tada");
    setTimeout(function () {
        $('#CountConNumBar').removeClass("animated tada");
    }, 5000);
});

function GetActiveConferenceNum() {
    $.ajax({
        type: 'GET',
        url: url + 'conference/num_not_over/',
        async: 'false',
        success: function (data) {
            console.log(data.data);
            var ActiveConferenceNum = data.data;
            $('#CountConNumBar').text("有" + ActiveConferenceNum + "个会议正等待您的参与");
        }
    })
};

var HotSpotConferenceList = [];
var HotSpotConferenceListVue = new Vue({
    el: '#HotSpotConference',
    data: {
        HotSpotConferenceList: HotSpotConferenceList
    }
});

function GetHotConferenceList() {
    $.ajax({
        type: 'GET',
        async: 'false',
        url: url + 'conference/top10_hot_references/',
        success: function (data) {
            console.log(data.message);
            HotSpotConferenceList = data.data;
            for (con in data.data) {
                HotSpotConferenceListVue.$data.HotSpotConferenceList.push(data.data[con]);
            }

        }
    })
}
var RandomOrgList = [];
var RandomOrgListVue = new Vue({
   el:'#RandomOrgList',
    data:{
        RandomOrgList:RandomOrgList
    }
});
function GetRandomOrg(){
    $.ajax({
        type:'GET',
        url:url+'account/random_6_orgs/',
        async:false,
        success:function(data){
            console.log(data);
            RandomOrgList = data.data;
            for(Org in data.data){
                RandomOrgListVue.$data.RandomOrgList.push(data.data[Org]);
            }
        }
    })
}
function GoToSearch(){
    var Keyword = $("#SearchBarText").val();
    window.location.href = "SearchResult.html?Keyword="+Keyword;
}
function RefreshOrg(){
    for(var i =0;i<6;i++){
        RandomOrgListVue.$data.RandomOrgList.pop();
    }
    GetRandomOrg();
}
function changeSearchKey(e) {
    $("[role='presentation']").removeClass('active');
    /*$('#SearchBar').find('li').each(function(){
        console.log("1");
        $(this).removeClass("active");
    })*/
    $(e).addClass("active");
}

function AddChart(){
    //指定图标的配置和数据
    var option = {
        backgroundColor: '#FFFFFF',

        title: {
            text: 'Customized Pie',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#000000'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },

        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'},
                    {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(0, 0, 0, 0.8)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.8)'
                        },
                        smooth: 0.2,
                        length: 50,
                        length2: 40
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#65ffa4',
                        shadowBlur: 500,
                        shadowColor: 'rgba(20, 20, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

    //初始化echarts实例
    var myChart = echarts.init(document.getElementById('piechart'));

    //使用制定的配置项和数据显示图表
    myChart.setOption(option);

    myChart.on('click', function(param) {
        console.log(param["data"].name);//重要的参数都在这里！
    });
}

$(document).ready(function () {
        AddChart();
        GetRandomOrg();
        GetUserType();
        GetActiveConferenceNum();
        GetHotConferenceList();
        if (user_type != "normal_user") {
            $("#CreateConButton").removeClass("hidden");
        }
        else {
            $('#CountNumBar').removeClass('hidden');
        }
    }
);

