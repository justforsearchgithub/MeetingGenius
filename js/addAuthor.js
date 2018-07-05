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
    var paper_name = $("input[id='paper_title']").val();
    var paper_abstract = $("textarea[id='paper_outline']").val();
    var paper = $('#paper_up')[0].files[0];
    var authors = [];
    var orgs = [];
    var authorsJSON = [];

    authors .push($("input[id='author-com']").val());
    authors.push($("input[id='author1']").val());
    authors.push($("input[id='author2']").val());
    authors.push($("input[id='author3']").val());
    authors.push($("input[id='author4']").val());
    authors.push($("input[id='author5']").val());

    orgs.push($("input[id='org-com']").val());
    orgs.push($("input[id='org1']").val());
    orgs.push($("input[id='org2']").val());
    orgs.push($("input[id='org3']").val());
    orgs.push($("input[id='org4']").val());
    orgs.push($("input[id='org5']").val());

    if (paper_name === '' || paper_abstract === ''){
        alert('信息填写不完全');
        return;
    }
    else if(paper === null || paper === undefined){
        alert('未上传论文');
        return;
    }
    else{
        for(var i=0; i<=author_num; i++){
            if(authors[i] === ''||orgs[i] === ''){
                alert('信息填写不完全');
                return;
            }
            else {
                if(i===0){
                    authorsJSON.push({'CA': {'name': authors[i], 'institute': orgs[i]}});
                }
                else{
                    var tempJSON = {};
                    tempJSON['A'+i]= {'name': authors[i], 'institute': orgs[i]};
                    authorsJSON.push(tempJSON);
                }
            }
        }
    }
    var formData = new FormData();
    //todo:add author and org
    formData.append('authors', JSON.stringify(authorsJSON));
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