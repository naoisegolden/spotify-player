(function() {

  // Configuration
  var SEARCH_URL = "https://api.spotify.com/v1/search?type=track&q=";
  var TRACK_URL = "https://api.spotify.com/v1/tracks/";
  var MAX_RESULTS = 10;
  var TEMPLATE = document.querySelector("#template").innerHTML;

  // Elements
  var progress  = document.querySelector('.seekbar progress');
  var search    = document.querySelector("#search");
  var play      = document.querySelector(".btn-play");
  var audio     = document.querySelector("#audio");
  var results   = document.querySelector(".results");
  var title     = document.querySelector('.title');
  var artist    = document.querySelector('.author');
  var cover     = document.querySelector('.cover img');

  // Event Listeners
  search.addEventListener("submit", onFormSubmit);
  play.addEventListener("click", onPlayClick);
  audio.addEventListener("timeupdate", onAudioTimeupdate);
  audio.addEventListener("ended", onAudioEnded);
  results.addEventListener("click", onResultsClick);

  // Event Handlers
  function onFormSubmit(event) {
    event.preventDefault();
    var query = event.target[0].value;
    searchTrack(query);
  }

  function onPlayClick(event) {
    event.preventDefault();
    if (audio.paused && audio.duration) {
      this.classList.add('playing');
      audio.play();
    } else {
      this.classList.remove('playing');
      audio.pause();
    }
  }

  function onAudioTimeupdate(event) {
    progress.value = this.currentTime;
  }

  function onAudioEnded(event) {
    progress.value = 0;
    play.classList.remove('playing');
  }

  function onResultsClick(event) {
    event.preventDefault();
    if(this.matches(".empty")) return;

    var link = parents(event.target, ".uri");
    var uri = link.href;

    loadURI(uri, function() {
      audio.play();
      link.parentElement.classList.add("selected");
    });
  }

  // Auxiliary Functions

  function ajax(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.setRequestHeader('Accept','application/json');
    xhr.send();
    xhr.onload = function () {
      if (this.status === 200) {
        callback(JSON.parse(this.response));
      } else {
        alert("Error accessing fetching data.")
      }
    };
  }

  function searchTrack(query) {
    var url = SEARCH_URL + encodeURIComponent(query) + "&limit="+MAX_RESULTS;

    ajax(url, updateList);
  }

  function updateList(response) {
    var songs = response.tracks.items;

    // reset html
    results.innerHTML = "";
    results.classList.add("empty");
    if(songs.length === 0) return;

    // populate html
    songs.forEach(function(track) {
      var tmplt  = TEMPLATE;
      var song   = track.name;
      var uri    = track.uri;
      var artist = track.artists.map(function(artist) {
        return artist.name;
      }).join(", ");

      tmplt = tmplt.replace(/{uri}/, uri);
      tmplt = tmplt.replace(/{artist}/, artist);
      tmplt = tmplt.replace(/{song}/, song);

      results.innerHTML += tmplt;
    });

     results.classList.remove("empty");
  }

  function parents(element, selector) {
    return element.matches(selector) ? element : parents(element.parentElement, selector);
  }

  function trackFromUri(uri) {
    try {
      return uri.split(':')[2];
    } catch(error) {
      throw new Error("Track URI has wrong format.")
    }
  }

  function loadURI(uri, callback) {
    var track = trackFromUri(uri);
    var url = TRACK_URL + track;

    var resultsArray = Array.prototype.slice.call(results.children);
    resultsArray.forEach(function(result) {
      result.classList.remove("selected");
    });

    ajax(url, function(response) {
      title.innerHTML  = response.name;
      artist.innerHTML = response.artists[0].name;
      cover.src        = response.album.images[0].url;
      audio.src        = response.preview_url;

      play.classList.remove('disabled');
      play.classList.add('playing');
      callback();
    });
  }

})();