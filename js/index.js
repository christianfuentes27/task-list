$(function () {
  // There's the gallery and the trash
  // init();

  var $gallery = $("#gallery"),
    $todolist = $("#todolist"),
    list = [];

  $('.add-btn').on('click', (e) => {
    $(`<li class="ui-widget-content ui-corner-tr"><p>${$('.task-text').val()}</p></li>`).draggable({
      cancel: "a.ui-icon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    }).appendTo($('#gallery'));
    $('.task-text').val('');
  });

  // Let the gallery items be draggable
  $("li", $gallery).draggable({
    cancel: "a.ui-icon", // clicking an icon won't initiate dragging
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "document",
    helper: "clone",
    cursor: "move"
  });

  // Let the trash be droppable, accepting the gallery items
  $todolist.droppable({
    accept: "#gallery > li",
    classes: {
      "ui-droppable-active": "ui-state-highlight"
    },
    drop: function (event, ui) {
      deleteTask(ui.draggable);
    }
  });

  // Let the gallery be droppable as well, accepting items from the trash
  $gallery.droppable({
    accept: "#todolist li",
    classes: {
      "ui-droppable-active": "custom-state-active"
    },
    drop: function (event, ui) {
      recycleTask(ui.draggable);
    }
  });

  // Image deletion function
  function deleteTask($item) {
    $item.fadeOut(function () {
      var $list = $("ul", $todolist).length ?
        $("ul", $todolist) :
        $("<ul class='gallery ui-helper-reset'/>").appendTo($todolist);

      $item.appendTo($list).fadeIn();
    });
    list.push($item);
  }

  // Image recycle function
  function recycleTask($item) {
    $item.fadeOut(function () {
      $item
        .appendTo($gallery)
        .fadeIn();
    });
    list.splice(list.indexOf($item), 1);
    sendMessage($item);
  }

  function sendMessage($item) {
    const msg = {
      type: 'task',
      content: $item[0].children[0].innerHTML,
      list
    }
    // socket.send(JSON.stringify(msg));
  }

  function init() {
    socket = new WebSocket(`ws://localhost:8023`);
    socket.onopen = (e) => {
      state = true;
    };
    socket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      //Take array and display all tasks
    }
  }
});