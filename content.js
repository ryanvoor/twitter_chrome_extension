var checkPageLoadedYet = setInterval(
    function() {
        // When the videos are loaded then we know that the page is loaded
        var loaded_videos = $( 'video' ).length;
        if( loaded_videos > 0 ) {
            var promoted_elements = $( 'span:contains("Promoted")' );
            promoted_elements.each( function( index, promoted_element ) {
                var current_element = promoted_element;
                var article_not_found = true;
                var counter = 0;
                // Look at the parent elements until we find the "article" element.
                // If we hide that then we will hide the promoted tweet.
                while( article_not_found ) {
        	        current_element = $( current_element ).parent()[0];
                    counter++;
	                if( current_element.nodeName === 'ARTICLE' ) {
		                article_not_found = false;
                    }
                    if( counter > 100 ) {
                        clearInterval( checkPageLoadedYet );
                        throw "Could not find parent article element of promoted element";
                    }
                }
                $( current_element ).hide();
            });

            clearInterval( checkPageLoadedYet );
        }
    },
    200 // check every 200 ms to see if the page is loaded yet
);
