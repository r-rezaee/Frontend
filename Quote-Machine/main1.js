$('#new-quote').on('click', function(e) {
    e.preventDefault();
    $.ajax({
        url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
            var post = data.shift();
            $('#quote-content').html(post.content);
            $('#quote-title').html("_" + post.title);

            // If the Source is available, use it. Otherwise hide it.
            if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                $('#quote-source').html('Source:' + post.custom_meta.Source);
            } else {
                $('#quote-source').text('');
            }
        },
        cache: false

    }); // quote ajax ends here

});
