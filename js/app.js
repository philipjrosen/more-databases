(function(){

  var friends = {};
  var currentUser = "You";
  var messages = [];
  var currentRoom;

  var ajaxHelper = function(options) {
    options = options || {};
    // options.beforeSend = options.beforeSend || headerSetter
    options.type = options.type || "GET";
    options.contentType = options.contentType || "application/json";
    options.data = options.data || {};
    options.success = options.success || null;
    $.ajax('classes/messages', options);
  }

  var getData = function() {
    ajaxHelper({
      success: function(data){
      $('.content').html("");
        $.each(data, function(index, item) {
          var parsedData = JSON.parse(item);
          console.log("parsedData: ");
          if (parsedData.text) {
            $('.content').append(renderMessage(parsedData));
          }
        });

        messages = data;
        createRoomSelector();
        selectRoom();
        updateFriends();
      },
    });
  };

  var renderMessage = function(item){
    var $node =
    $('<div class="message" data-room="'+item.roomname+'">'+
          '<span class="username" data-user="' +item.username+'">'+item.username+
          '</span>: '+ item.text +
          '<br/></div>');

    $($node).on('click', '.username', function(e) {
      toggleFriend(item.username);
      updateFriends();
    });

    return $node;
  }

  var createRoomSelector = function(){
    $('select.rooms').html("");
    _.each(rooms=getRoomList(), function(room){
      $('select.rooms').append("<option value="+room+">"+room+"</option>")
    });

    $('select').val(currentRoom);
  };

  var updateFriends = function(username) {
    $('.friends ul').html("");
    $('.message').removeClass('friend');
    _.each(friends, function(k,v){
      $('.friends ul').append('<li>'+v+'</li>');
      $("[data-user='"+v+"']").parent().addClass('friend');
    });
  }

  var toggleFriend = function(username) {
    if (friends[username]) {
      delete friends[username];
    } else {
      friends[username] = true;
    }
  }

  var selectUser = function() {
    currentUser = $('input.name').val();
    currentUser = currentUser || "You";
    $('.main h1').html(currentUser+": Chat with JSON!");
  }

  var selectRoom = function(){

    $('.message').css('display','none');
    currentRoom = $('select').val();

    if (currentRoom === "All") {
      $('.message').css("display", "block");
    } else {
      $("[data-room='"+currentRoom+"']").css('display','block');
    }
    return currentRoom;
  };

  var getRoomList = function() {
    var defaults = ['All', 'Sports', 'Politics', 'News', 'Love'];
    var all = defaults.concat(_.pluck(messages, "roomname"));
    return _.uniq(_.without(all, undefined, "", "default"));
  }

  $(document).ready(function(){
    $('input.name').keyup(function() {
      selectUser();
    });

    $('select').change(function(){
      selectRoom();
    });

    $("form button.submit").on('click', null, function(e) {
      e.preventDefault();
      ajaxHelper({
        type: "POST",
        data: JSON.stringify({
          'username': currentUser,
          'text': $('textarea.input').val(),
          'roomname': currentRoom
        }),
        success: getData
      });
    });

    getData();
    setInterval(function(){
      getData();
    },3000);
  });

})();
