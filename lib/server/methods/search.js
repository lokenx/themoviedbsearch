TMDBSearch = {
  api: "",
  language: "en"
};

Meteor.methods({
  TMDBSearch:function(search, type){
    check(search, String);
    check(type, String);
    check(TMDBSearch.api, String);
    check(TMDBSearch.language, String);

    try {
      var response = HTTP.call("GET", "https://api.themoviedb.org/3/search/" + type + "?api_key=" + TMDBSearch.api + "&language=" + TMDBSearch.language + "&query=" + search, {});
    }
    catch (error) {
      console.log(error);
      return error.status_message;
    }

    var results = [];
    var quantity = response.data.results.length < 15 ? response.data.results.length : 15;

    if (response.data.total_results > 0) {
      for (i = 0; i < quantity; i++) {
        var id = response.data.results[i].id || 0;
        var title = response.data.results[i].title || response.data.results[i].name || "Unknown";
        var release_date = response.data.results[i].release_date || response.data.results[i].first_air_date || 0;
        var year = (release_date != 0) ? release_date.slice(0,4) : 0;
        var overview = response.data.results[i].overview || "No overview found.";
        overview = (overview.length > 250) ? overview.slice(0,250) + "..." : overview;
        var poster_path = response.data.results[i].poster_path || "";
        var link = "https://www.themoviedb.org/" + type + '/' + id;
        var media_type = type;
        var index = i;

        results.push({
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
    return results
  }
});
