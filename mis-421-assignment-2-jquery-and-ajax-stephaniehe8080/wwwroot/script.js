var len;
var results = '';

function apiSearch(count, isLuckySearch) {
  var params = {
    "q": $("#query").val(),
    "count": count,
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", process.env.API_KEY);
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      if(isLuckySearch === true) {
          window.open(data.webPages.value[0].url, '_blank');
      } else {
          for (i = 0; i < len; i++) {
            results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
          }
          $('#searchResults').css('visibility', 'visible').html(results);
          $('#searchResults').dialog();
      }
    })
    .fail(function () {
      alert("error");
    });
}

function changeBackgroundImage() {
    var imageUrl1 = 'https://images.unsplash.com/photo-1648061557966-8e30f972f0be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
    var imageUrl2 = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
    
    var currentImage = $('body').css('background-image').replace(/url\(["']?([^"']*)["']?\)/, '$1');
    if (currentImage === imageUrl1) {
        $('body').css('background-image', 'url(' + imageUrl2 + ')');
    } else {
        $('body').css('background-image', 'url(' + imageUrl1 + ')');
    }
}


function showTime() {
    var now = new Date();
    var time = now.getHours() + ":" + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    $('#time').css('visibility', 'visible').html(time).dialog();
}

$(document).ready(function() {
    $('#searchBtn').click(function() {
        apiSearch(50, false);
    });

    $('#searchEngineName').click(function() {
        changeBackgroundImage();
    });
    
    $('#timeBtn').click(function() {
        showTime();
    });
    
    $('#luckyBtn').on('click', function() {
        apiSearch(1, true)
    });
});

