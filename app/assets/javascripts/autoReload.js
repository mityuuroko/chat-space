$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message-box" data-message-id=${message.id}>
          <div class="Message-info">
            <div class="Message-info__name">
              ${message.user_name}
            </div>
            <div class="Message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Message-box" data-message-id=${message.id}>
        <div class="Message-info">
          <div class="Message-info__name">
            ${message.user_name}
          </div>
          <div class="Message-info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="Message">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Message-box:last').data("message-id") || 0;
    $.ajax({

      url: "api/messages",

      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Chat-main__message-list').append(insertHTML);
        $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});