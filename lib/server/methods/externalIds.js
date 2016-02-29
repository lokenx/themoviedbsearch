Meteor.methods({
  externalIds: function(id, type){
    check(id, Number);
    check(type, String);
    check(TMDBSearch.api, String);
    check(TMDBSearch.language, String);

    try {
      if (type == "tv") {
        var response = HTTP.call("GET", "https://api.themoviedb.org/3/tv/" + id + "/external_ids?api_key=" + TMDBSearch.api, {timeout: 4000} );
      } else {
        var response = HTTP.call("GET", "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + TMDBSearch.api, {timeout: 4000} );
      }
    }
    catch (error) {
      console.log(error);
      throw new Meteor.Error(503, "Unabled to get external ids");
    }
    
    if (type == "tv" && response.data.tvdb_id) {
      return response.data.tvdb_id;
    } else if (response.data.imdb_id) {
      return response.data.imdb_id;
    } else {
      throw new Meteor.Error(503, "Unabled to get external ids");
    }
  }
});

TMDBSearch.externalIds = function(id, type) {
  return Meteor.call("externalIds", id, type, {});
}
