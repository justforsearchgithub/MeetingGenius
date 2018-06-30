var url='';
jQuery(document).ready(function() {

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

function Login(){
    var email = $("#form-email").val();
    var passwd = $("#form-passwd").val();
    var formData = new FormData();
    formData.append("username", email);
    formData.append("password", passwd);
    $.ajax({
        type: 'POST',
        url: url+'account/login/',
        data: formData,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success: function (data) {

            if (data.message == "success") {
                alert("SUcces.");
/*
                var exp = new Date();
                exp.setHours(exp.getHours()+24*7);
                document.cookie = 'SmartChainToken' + "=" +  data.SmartChainToken + ";expires="+ exp.toUTCString();
*/
                console.log(data);

            }
            else  {
                alert(data.message);
            }
            return true;
        }
    });
}

function UserRegister(){
    var email = $("#form-email").val();
    var passwd = $("#form-passwd").val();
    var passwdr = $("#form-passwd-r").val();
    var formData = new FormData();
    formData.append("username", email);
    formData.append("password", passwd);
    formData.append("confirm_password",passwdr);
    $.ajax({
        type: 'POST',
        url: url+'account/normal_user_register/',
        data: formData,
        contentType: false,
        async: false,
        cache: false,
        processData: false,
        success: function (data) {
            console.log(data.message);
            return true;
        }
    });
}

function OrgUserRegister(){

}