$('#new-quote').on('click', function(e) {
    e.preventDefault();
    $.ajax({
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
            var post = data.shift();
            $("#quote-content").html(post.content);
            $("#quote-title").html("_" + post.title);
            /*
                        var avatar = post.title;

                        $('#quote-title').html(avatar);
            */

            // If the Source is available, use it. Otherwise hide it.
            if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                $('#quote-source').html('Source:' + post.custom_meta.Source);
            } else {
                $('#quote-source').text('');
            }
        },


    }); // quote ajax ends here



    var quote_avatar = "Charlie Chaplin";
    var wikiurl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + quote_avatar +
        '&format=json&callback=wikiCallback&prop=extracts&exchars=175';

    // Error handeling
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources!");
    }, 8000);

    $.ajax({
        url: wikiurl,
        dataType: "jsonp",

        success: function(response) {
            var articleList = response[1];

            $("#avatar").html(articleList);


            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + quote_avatar;
                $("#avatar").append('<li><a href="' + url + '">' +
                    articleStr + '</a></li>');
            };
            // Error handeling
            clearTimeout(wikiRequestTimeout);
        }
    });


    /*
    var quote_avatar = "Charlie Chaplin";
      //var quote_avatar = $("#quote-title").html(); 
          quote_avatar = quote_avatar.replace(/\s+/g, '%20');
        var wiki_url = 'https://en.wikipedia.org/w/api.php?action=query&formatversion=2&prop=pageimages%7Cpageterms&titles='+quote_avatar+'&format=json&callback=wikiCallback';
    
    //$("#avatar").html(wiki_url);
    
    
        $.ajax({
          url: wiki_url,
          datatype: "jsonp",
          
          success: function(data) {
          var src = data[1];
          //$('#avatar').html('<img id="avatar" src='+source+'/>');
            $('#avatar').html(src);
        }
          
        });
    
    
        return false;
    
  
  
  //https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/John_Gruber.jpeg/50px-John_Gruber.jpeg
  */

});