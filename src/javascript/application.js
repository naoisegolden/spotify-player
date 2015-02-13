// https://api.spotify.com/v1/search?q=%22Isabel%20F%C3%A8lix%22&type=track
// https://api.spotify.com/v1/tracks/2Ct1gb8w9f189Dq8BnsEwj
'use strict';

document.querySelector("#search_form").addEventListener("submit", function(event) {
  event.preventDefault();
  // console.log(event);
  var search_text = document.querySelector("#search_text");
  var song_list = document.querySelector("#song_list");
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
        createSong(song_list, "No songs found!", "");
      } else {
        response.tracks.items.forEach(function(item) {
          createSong(song_list, item.album.name, item.artists[0].name, item.id);
        });
      }
    } catch (e) {
      createSong(song_list, "Error getting albums", e);
    }
  });

});

function createSong(parent, title, author, id) {
  var li = document.createElement("li");
  var h3 = document.createElement("h3");
  h3.innerHTML = title;
  if (id) {
    h3.id = id;
  }
  h3.addEventListener("click", songClick);
  var h4 = document.createElement("h4");
  h4.innerHTML = author;
  parent.appendChild(li);
  li.appendChild(h3);
  li.appendChild(h4);
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
    document.querySelector("#album_img").src="https://i.scdn.co/image/c6aa825443428782713e047893aa043a30cd357d";

    console.log(this.id);
  }
}
