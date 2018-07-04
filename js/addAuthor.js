var author_num = 1;

function add_author() {
    author_num ++;
    $('button[id="delAuthor"]').removeClass('hidden');
    $('#author-' + author_num).removeClass('hidden');
    if(author_num === 5){
        $('button[id="addAuthor"]').addClass('hidden');
    }
}

function del_author() {
    $('button[id="addAuthor"]').removeClass('hidden');
    $('#author-' + author_num).addClass('hidden');
    $('#author-'+author_num+ ' input').val('');
    author_num --;
    if(author_num === 1){
        $('button[id="delAuthor"]').addClass('hidden');
    }
}

function paper_upload() {
    var flag = true;
    var paper_name = $("input[id='paper_title']").val();
    var paper_abstract = $("textarea[id='paper_outline']").val();
    var paper = $('#paper_up')[0].files[0];
    var selectAuthorAll = $('.modal-body').children('div').not('.hidden').children('input[role="author"]');
    var selectOrgAll = $('.modal-body').children('div').not('.hidden').children('input[role="org"]');
    var authorAll = [];
    var orgAll = [];
    var authorJSON = [];
    selectAuthorAll.each(function () {
        if($(this).val() != '' && $(this).val() != null && $(this).val() != undefined){
            authorAll.push($(this).val());
        }
        else{
            alert('信息填写不完全');
            flag = false;
            return false;
        }
    });
    if(flag === false) return;
    selectOrgAll.each(function () {
        if($(this).val() != '' && $(this).val() != null && $(this).val() != undefined){
            orgAll.push($(this).val());
        }
        else{
            alert('信息填写不完全');
            flag = false;
            return false;
        }
    });
    if(flag === false) return;
    if (authorAll.length != orgAll.length || paper_name === '' || paper_abstract === ''){
        alert('信息填写不完全');
        return;
    }
    else if(paper === null || paper === undefined){
        alert('未上传论文');
        return;
    }
    else{
        for(var i in authorAll){
            authorJSON.push({'name': authorAll[i], 'org': orgAll[i]});
        }
    }
    console.log(authorJSON);
    var authors = JSON.stringify(authorJSON);
    var formData = new FormData();
    formData.append('authors', authors);
    formData.append('institute', 'default');
    formData.append('paper_name', paper_name);
    formData.append('paper_abstract', paper_abstract);
    formData.append('paper' ,paper);
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": url + "conference/conference/" + conference_id + "/paper_submit/",
        "method": "POST",
        "headers": {},
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": formData
    };
    $.ajax(settings).done(function (response) {
        console.log(response.message);
        if(response.message === 'multiple submission'){
            alert('您已经提交过论文了');
        }
        else if (response.message === 'success'){
            alert('论文提交成功！');
        }
        else{
            alert('提交失败，请联系网站管理员解决');
        }
    });
}