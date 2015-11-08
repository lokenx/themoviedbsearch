Meteor.methods({
  tv: function(id){
    //Old ones are strings, new ones are numbers so removing check
    check(TMDBSearch.api, String);
    check(TMDBSearch.language, String);

    try {
      var response = HTTP.call("GET", "https://api.themoviedb.org/3/tv/" + id + "?api_key=" + TMDBSearch.api, {timeout: 4000} );
    }
    catch (error) {
      console.log(error);
      return false;
    }

    return response.data.poster_path
  }
});

TMDBSearch.tv = function(id) {
  return Meteor.call("tv", id, {});
}
