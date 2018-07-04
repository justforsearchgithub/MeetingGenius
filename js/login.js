var url='http://139.199.24.235:80/';

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
                var str = "";
            }
        }
    });
    return type;
}

$( document ).ready(function(){
    console.log("testtttewtawercawfheiafuhoicawbiuhfouiaw");

    GetCurrentUser();

    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });

    $('.registration-form').on('submit', function(e) {
        $(this).find('input[type="text"], textarea').each(function(){
            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            }
            else {
                $(this).removeClass('input-error');
            }
        });

    });
});

function triggerfile_l() {
    var file = $('#license_upload').val();
    var pos = file.lastIndexOf("\\");
    var filename = file.substring(pos+1);
    console.log(filename);
    if(filename.length != 0) {
        $('#license_img').removeClass('hidden');
        $('#license_label').addClass("hidden");
        $("#license_img").attr("src",URL.createObjectURL($('#license_upload')[0].files[0]));
    }
    else {
        $('#license_label').removeClass("hidden");
        $('#license_img').addClass('hidden');
        $('#license_label').html('&nbsp;&nbsp;选择文件');
    }
}

function triggerfile_f() {
    var file = $('#id_upload_front').val();
    var pos = file.lastIndexOf("\\");
    var filename = file.substring(pos+1);
    if(filename.length != 0) {
        $('#id_img_front').removeClass('hidden');
        $('#id_label_front').addClass("hidden");
        $("#id_img_front").attr("src",URL.createObjectURL($('#id_upload_front')[0].files[0]));
    }
    else {
        $('#id_label_front').removeClass("hidden");
        $('#id_img_front').addClass('hidden');
        $('#id_label_front').html('&nbsp;&nbsp;选择文件');
    }
}

function triggerfile_b() {
    var file = $('#id_upload_back').val();
    var pos = file.lastIndexOf("\\");
    var filename = file.substring(pos+1);
    if(filename.length != 0) {
        $('#id_img_back').removeClass('hidden');
        $('#id_label_back').addClass("hidden");
        $("#id_img_back").attr("src",URL.createObjectURL($('#id_upload_back')[0].files[0]));
    }
    else {
        $('#id_label_back').removeClass("hidden");
        $('#id_img_back').addClass('hidden');
        $('#id_label_back').html('&nbsp;&nbsp;选择文件');
    }
}

function file_upload(id) {
    $('#'+id).click();
}

function Login() {
    /*var Token;
    $.ajax({
        type:'GET',
        url:url+'account/csrf_token',
        success:function(data){
        console.log(data);
        Token = data.token;
        }
    });*/
    var flag =true;
    var email = $("#form-email").val();
    var passwd = $("#form-passwd").val();
    if (email === "" || email === null){
        alert('请输入邮箱');
        flag = false;
    }
    else if (passwd === "" || passwd === null){
        alert('请输入密码');
        flag = false;
    }
    if(flag) {
        var formData = new FormData();
        formData.append("username", email);
        formData.append("password", passwd);
        $.ajax({
            type: 'POST',

            url: url + 'account/login/',
            data: formData,
            contentType: false,
            async: false,
            cache: false,
            processData: false,
            //headers:{'X-CSRFToken',Token},
            success: function (data) {
                console.log(data);
                if (data.message === "success") {
                    alert("登录成功");
                   window.location.href = 'index.html';
                }
                else if (data.message === "username or password error"){
                    alert('登录失败，用户名或密码错误');
                }
                else {
                    alert('登录失败，服务器错误，请联系网站管理员解决');
                }
                //return true;
            }
        });
    }
}

function user_reg() {
    var email = $(" input[ id='form-email'] ").val();
    var passwd = $(" input[ id='form-passwd'] ").val();
    var passwd_ok = $(" input[ id='form-passwd-ok'] ").val();
    var flag = true;
    if (email === "" || email === null){
        alert('请输入邮箱');
        flag = false;
    }
    else if(!checkEmail(email)){
        alert('邮箱格式不正确');
        flag = false;
    }
    else if (passwd === "" || passwd === null){
        alert('请输入密码');
        flag = false;
    }
    else if (passwd_ok === "" || passwd_ok === null){
        alert('请输入确认密码');
        flag = false;
    }
    else if (passwd != passwd_ok){
        alert('两次密码输入不一致');
        flag = false;
    }

    if(flag){
        var formData = new FormData();
        formData.append("username", email);
        formData.append("password", passwd);
        formData.append("confirm_password", passwd_ok);

        var settings = {
            "async": false,
            "crossDomain": true,
            "url": url + "account/normal_user_register/",
            "method": "POST",
            "processData": false,
            "contentType": false,
            "data": formData
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if(response.message === 'success'){
                alert('注册成功');
                window.location.href = "index.html";
            }
            else if (data.message === "username error"){
                alert('注册失败，用户名重复');
            }
            else if (data.message === "password error"){
                alert('注册失败，密码不一致');
            }
            else {
                alert('注册失败，服务器错误，请联系网站管理员解决');
            }
            //alert(response);
        });
    }
}

function enterprise_reg() {
    var company = $(" input[ id='form-company-name'] ").val();
    var department = $(" input[ id='form-department-name'] ").val();
    var address = $(" input[ id='form-address'] ").val();
    var name = $(" input[ id='form-name']").val();
    var email = $(" input[ id='form-email'] ").val();
    var phone = $(" input[ id='form-phone'] ").val();
    var passwd = $(" input[ id='form-passwd'] ").val();
    var passwd_ok = $(" input[ id='form-passwd-ok'] ").val();
    var license_img = $('#license_upload')[0].files[0];
    var id_img_f = $('#id_upload_front')[0].files[0];
    var id_img_b = $('#id_upload_back')[0].files[0];
    var flag = true;
    if (company === "" || company === null){
        alert('请输入机构名');
        flag = false;
    }
    else if (department === "" || department === null){
        alert('请输入部门名');
        flag = false;
    }
    else if (address === "" || address === null){
        alert('请输入地址');
        flag = false;
    }
    else if (email === "" || email === null){
        alert('请输入邮箱');
        flag = false;
    }
    else if (phone === "" || phone === null){
        alert('请输入手机号');
        flag = false;
    }
    else if(!checkEmail(email)){
        alert('邮箱格式不正确');
        flag = false;
    }
    else if (passwd === "" || passwd === null){
        alert('请输入密码');
        flag = false;
    }
    else if (passwd_ok === "" || passwd_ok === null){
        alert('请输入确认密码');
        flag = false;
    }
    else if (passwd != passwd_ok){
        alert('两次密码输入不一致');
        flag = false;
    }
    else if (email === "" || email === null){
        alert('请输入邮箱');
        flag = false;
    }
    else if (license_img === undefined || id_img_b === undefined || id_img_f === undefined){
        alert('请上传图片')
        flag = false;
    }
    if(flag){
        var formData = new FormData();
        formData.append("username", email);
        formData.append("password", passwd);
        formData.append("confirm_password", passwd_ok);
        formData.append("org_name", company);
        formData.append("department", department);
        formData.append("contacts", name);
        formData.append("phone_number", phone);
        formData.append("address", address);
        formData.append("bussiness_license", license_img);
        formData.append("id_card_front", id_img_f);
        formData.append("id_card_reverse", id_img_b);
        console.log(formData);
        var settings = {
            "async": false,
            "crossDomain": true,
            "url": url + "account/organization_user_register/",
            "method": "POST",
            "headers": {},
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": formData
        };
        $.ajax(settings).done(function (response) {
            console.log(response);
            alert(response);
            if(response.message =="success"){
                alert('注册信息提交成功，请等待管理员审核，审核结果将通过邮件发送');
                window.location.href='index.html';
            }
            else if (data.message === "username error"){
                alert('注册失败，用户名重复');
            }
            else if (data.message === "password error"){
                alert('注册失败，密码不一致');
            }
            else {
                alert('注册失败，服务器错误，请联系网站管理员解决');
            }
        });
    }
}

function checkEmail(str) {
    console.log(str);
    var reg = new RegExp("^[a-zA-Z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
    if(!reg.test(str))
        return false;
    return true;
}

function LogOut(){
    $.ajax({
        type: 'GET',
        async:false,
        url: url + 'account/logout/',
        //headers:{'X-CSRFToken',Token},
        success: function (data) {
            console.log(data);
            if(data.message=='success'){
                alert('登出成功');
                window.location.href="index.html";
            }
        }
    });
}

function GoToCreateCon(){
    $.ajax({
        type: 'GET',
        async:false,
        url: url + 'account/user_type/',
        //headers:{'X-CSRFToken',Token},
        success: function (data) {
           console.log(data);
           console.log(data.data.user_type);
           if(data.data.user_type == "organization_user"){
               window.location.href = "createCon.html";
           }
           else{
               alert("请先成为会议主办方！！");
               window.location.href="enterpriseRegister.html";
           }
        }
    });
}