function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // ############################################################
    // Google Maps Images
    var streetStr = $("#street").val();
    var cityStr = $("#city").val();
    //alert(cityStr + " " + streetStr);
    var goomap = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + cityStr + ", " + streetStr + ".png";

    $greeting.text("Do you want to live at " + streetStr + ", " + cityStr + "?");
    $body.append('<img class="bgimg" src="' + goomap + '">');

    // ############################################################
    // NyTimes Articles
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=';

    nytimesUrl += cityStr + '&sort=newest&api-key=d2118c5200014baf891a0301e0985f3e';

    $.getJSON(nytimesUrl, function(data) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' +
                '<a href="' + article.web_url + '">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' +
                '</li>');
        };
    }).error(function(e) {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded!')
    })


    // ############################################################
    // Wiki Articles
    var wikiurl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr +
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

            $wikiElem.html(articleList);


            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' +
                    articleStr + '</a></li>');
            };
            // Error handeling
            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);