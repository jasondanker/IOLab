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
				var artist = data[i].user.username;
				var title = data[i].title;
				var picture = data[i].artwork_url;
				var permalink = data[i].permalink_url;
				if (picture == null) {
					picture = "_images/missing_image.png";
				};
				$("#search-results").append("<div class='song'><img src='"+picture+"'><li>"+artist+"</li><li>"+title+"</li>\
											 <button class='play' id='"+permalink+"'>Play Song</button>\
											 <button class='playlist-add'>Add to Playlist</button></div>");
			};
		},'json'
	);
}

// Play a song
$(document).on("click", ".play", function () {
	var permalink_url = $(this).attr('id');
	changeTrack(permalink_url);
});

// Add a song to the playlist; remove 'add to playlist'; add 'up', 'down', and 'remove'
$(document).on("click", ".playlist-add", function () {
	var clone = $(this).parent().clone();
	clone.children('.playlist-add').remove();
	clone.append("<button class='up'>Up</button>\
				  <button class='down'>Down</button>\
				  <button class='remove'>Remove</button>");
	$('#playlist').prepend(clone);
});

// Move Up
$(document).on("click", ".up", function() {
	song = $(this).parent();
	song.insertBefore(song.prev());
});

// Move Down
$(document).on("click", ".down", function() {
	song = $(this).parent();
	song.insertAfter(song.next());
});

// Remove from playlist
$(document).on("click", ".remove", function() {
	$(this).parent().remove();
});

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