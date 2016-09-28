$(document).ready(
    $("#search").on("click", function() {
        var query = $("#query").val();
        api_return = callAPI(query);
    })
);

// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '200'},
		function(data) {
			for (var i = 0; i < 20; i++) {
				artist = data[i].user.username;
				title = data[i].title;
				picture = data[i].artwork_url
				if (picture == null) {
					picture = "_images/missing_image.png";
				};
				$("#search-results").append("<li>"+artist+" - "+title+"</li><img src='"+picture+"'>");
			};
			console.log(data[11]);
		},'json'
	);
}

// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();

	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}