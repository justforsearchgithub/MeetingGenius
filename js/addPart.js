var part_num = 1;

function add_part() {
    part_num ++;
    $('button[id="delPart"]').removeClass('hidden');
    $('#part-' + part_num).removeClass('hidden');
    if(part_num === 6){
        $('button[id="addPart"]').addClass('hidden');
    }
}

function del_part() {
    $('button[id="addPart"]').removeClass('hidden');
    $('#part-' + part_num).addClass('hidden');
    $('#part-'+part_num+ ' input').val('');
    part_num --;
    if(part_num === 1){
        $('button[id="delPart"]').addClass('hidden');
    }
}

function join_register() {
    var paper_id = $("input[id='paper_num']").val();
    var pay_voucher = $('#fee_upload')[0].files[0];
    var listen_only = false;
    var names = [];
    var sexes = [];
    var hotels = [];
    var temp_json = [];

    names.push($("input[id='person_name1']").val());
    names.push($("input[id='person_name2']").val());
    names.push($("input[id='person_name3']").val());
    names.push($("input[id='person_name4']").val());
    names.push($("input[id='person_name5']").val());
    names .push($("input[id='person_name6']").val());

    sexes.push($("select[id='person_sex1']").val());
    sexes.push($("select[id='person_sex2']").val());
    sexes.push($("select[id='person_sex3']").val());
    sexes.push($("select[id='person_sex4']").val());
    sexes.push($("select[id='person_sex5']").val());
    sexes.push($("select[id='person_sex6']").val());

    hotels.push($("select[id='person_hotel1']").val());
    hotels.push($("select[id='person_hotel2']").val());
    hotels.push($("select[id='person_hotel3']").val());
    hotels.push($("select[id='person_hotel4']").val());
    hotels.push($("select[id='person_hotel5']").val());
    hotels.push($("select[id='person_hotel6']").val());

    if (pay_voucher === null || pay_voucher === undefined){
        alert('请上传缴费凭证图');
        return;
    }
    for(var i=0; i<part_num; i++){
        if(names[i] === ''||sexes[i] === ''|| hotels[i] === ''){
            alert('信息填写不完全！');
            return;
        }
        else {
            temp_json.push({'name': names[i], 'gender': sexes[i], 'reservation': hotels[i]});
        }
    }
    if (paper_id === null || paper_id === ""){
        listen_only = true;
    }
    var formData = new FormData();
    formData.append('listen_only', listen_only);
    formData.append('paper_id', paper_id);
    formData.append('participants', JSON.stringify(temp_json));
    console.log(temp_json);
    formData.append('pay_voucher', pay_voucher);
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": url + "conference/conference/" + conference_id + "/register/",
        "method": "POST",
        "headers": {},
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formData
    };
    $.ajax(settings).done(function (response) {
        var data = JSON.parse(response);
        console.log(data);
        if(data.message === 'success'){
            alert('注册成功');
        }
        else if (data.message === 'reduplicate register'){
            alert('您已经注册了该会议');
        }
        else{
            alert('注册失败：错误的论文编号');
        }
    });
}