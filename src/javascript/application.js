// https://api.spotify.com/v1/search?q=%22Isabel%20F%C3%A8lix%22&type=track
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

  ajax(url, {}, function(response) {
    try {
      // console.log(response);
      response.tracks.items.forEach(function(item){
        // createSong(song_list,item.album.name,item.album.artists[0].name);
        // console.log(item.album.name);
        // console.log(item.artists[0].name);
        createSong(song_list,item.album.name,item.artists[0].name);
      });
    } catch (e) {
      createSong(song_list, "Nothing found", "-");
    }
  });

});

function createSong(parent, title, author) {
  var li = document.createElement("li");
  var h3 = document.createElement("h3");
  h3.innerHTML = title;
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
