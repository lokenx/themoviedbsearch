TMDBSearch = {api: ""};

Meteor.methods({
  TMDBSearch:function(search){
    check(search, String);
    check(TMDBSearch.api, String);

    try {
      var movie_response = HTTP.call("GET", "https://api.themoviedb.org/3/search/movie?api_key=" + TMDBSearch.api + "&query=" + search, {});
      var tv_response = HTTP.call("GET", "https://api.themoviedb.org/3/search/tv?api_key=" + TMDBSearch.api + "&query=" + search, {});
    }
    catch (error) {
      console.log(error);
      return error.status_message;
    }

    var results = [];
    var movie_results = [];
    var tv_results = [];
    var movie_quantity = movie_response.data.results.length < 10 ? movie_response.data.results.length : 10;
    var tv_quantity = tv_response.data.results.length < 10 ? tv_response.data.results.length : 10;

    if (movie_response.data.total_results > 0) {
      for (i = 0; i < movie_quantity; i++) {
        var id = movie_response.data.results[i].id || 0;
        var title = movie_response.data.results[i].title || "Unknown";
        var release_date = movie_response.data.results[i].release_date || 0;
        var year = (release_date != 0) ? release_date.slice(0,4) : 0;
        var overview = movie_response.data.results[i].overview || "No overview found.";
        overview = (overview.length > 200) ? overview.slice(0,200) + "..." : overview;
        var poster_path = movie_response.data.results[i].poster_path || "";
        var link = "https://www.themoviedb.org/movie/" + id;
        var media_type = "movie";
        var index = i;

        movie_results.push({
          "id": id,
          "title": title,
          "year": year,
          "release_date": release_date,
          "overview": overview,
          "poster_path": poster_path,
          "link": link,
          "media_type": media_type,
          "index": index
        });
      }
    }
    if (tv_response.data.total_results > 0) {
      for (i = 0; i < tv_quantity; i++) {
        var id = tv_response.data.results[i].id || 0;
        var name = tv_response.data.results[i].name || "Unknown";
        var first_air_date = tv_response.data.results[i].first_air_date || 0;
        var year = (first_air_date != 0) ? first_air_date.slice(0,4) : 0;
        var overview = tv_response.data.results[i].overview || "No overview found.";
        overview = (overview.length > 200) ? overview.slice(0,200) + "..." : overview;
        var poster_path = tv_response.data.results[i].poster_path || "";
        var link = "https://www.themoviedb.org/tv/" + id;
        var media_type = "tv";
        var index = i;

        tv_results.push({
          "id": id,
          "name": name,
          "year": year,
          "first_air_date": first_air_date,
          "overview": overview,
          "poster_path": poster_path,
          "link": link,
          "media_type": media_type,
          "index": index
        });
      }
    }
    results.push(movie_results)
    results.push(tv_results)
    return results
  }
});
