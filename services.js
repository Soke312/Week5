$('#input-box').submit(function () {
    $.post({
        url: './',
        data: JSON.stringify({"thing": $('#db-entry').val()}),
        dataType: 'json',
         })
})