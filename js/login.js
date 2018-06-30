
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