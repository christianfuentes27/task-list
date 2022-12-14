var count = 1;

$(function () {
    $('.item').draggable();
});

$('.addTask').on('click', (e) => {
    let item = `<div class="item">${$('#taskContent').val()}</div>`;
    $('.desktop').append(item);
    console.log(item);
    // task.html($('#taskContent').val());
    // $('.item').html($('#taskContent').val());
    count++;
});
