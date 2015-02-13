// https://api.spotify.com/v1/search?q=%22Isabel%20F%C3%A8lix%22&type=track
// https://api.spotify.com/v1/tracks/2Ct1gb8w9f189Dq8BnsEwj
'use strict';

var song_list = document.querySelector("#song_list");

document.querySelector("#search_form").addEventListener("submit", function(event) {
  event.preventDefault();
  // console.log(event);
  var search_text = document.querySelector("#search_text");
  // console.log(search_text.value);
  var URL = "https://api.spotify.com/v1/search?q=";
  var url = URL + "\"" + search_text.value + "\"&type=track";

  // destroy existing child items
  while (song_list.firstChild) {
    song_list.removeChild(song_list.firstChild);
  }
  // display tab list
  document.querySelector("#search_tab").click();

  ajax(url, {}, function(response) {
    try {
      console.log(response);
      if (response.tracks.items.length === 0) {
        createSong("No songs found!", "");
      } else {
        response.tracks.items.forEach(function(item) {
          createSongItem(item);
        });
      }
    } catch (e) {
      createSong("Error getting albums", e);
    }
  });

});

function createSongItem(item) {
  var h3 = createSong(item.album.name,item.artists[0].name);
  h3.id = item.id;
  h3.img = item.album.images[0];
  h3.preview_url = item.preview_url;
}

function createSong(title, author) {
  var li = document.createElement("li");
  var h3 = document.createElement("h3");
  h3.innerHTML = title;
  h3.addEventListener("click", songClick);
  var h4 = document.createElement("h4");
  h4.innerHTML = author;
  song_list.appendChild(li);
  li.appendChild(h3);
  li.appendChild(h4);
  return h3;
}


function ajax(url, data, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.send(data);
  xhr.onload = function(event) {
    var response = JSON.parse(event.target.response);
    callback(response);
  };
};

function songClick() {
  if (this.id) {
    document.querySelector("#playing_tab").click();
    // document.querySelector("#album_img").src="https://i.scdn.co/image/c6aa825443428782713e047893aa043a30cd357d";
    document.querySelector("#album_img").src=this.img.url;
    var audio = document.querySelector("#audio");
    audio.src = this.preview_url;
    audio.play();

    // console.log(this.id);
  }
}
