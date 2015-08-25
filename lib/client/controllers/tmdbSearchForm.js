Template.tmdbSearchForm.events({
  'keyup  #tmdb-search': _.throttle(function (event, template) {
    template.movieSearchResults.set([]);
    template.tvSearchResults.set([]);
    $('.results-header').hide();
    template.noResults.set(false);
    var searchterm = $(event.target).val().trim();
    var results = [];
    if (searchterm.length > 2) {
      template.searching.set(true);
      Meteor.call("TMDBSearch", searchterm, function (error, result) {
        if (error) {
          console.log(error);
          template.noResults.set(true);
          template.searching.set(false);
        } else if (result[0].length > 0 | result[1].length > 0) {
          template.movieSearchResults.set(result[0]);
          template.tvSearchResults.set(result[1]);
          template.searching.set(false);
          $('.results-header').show();
        } else {
          template.noResults.set(true);
          template.searching.set(false);
        }
      });
    }
  }, 1000),
  'submit #tmdb-form': function (event) {
    return false;
  }
});

Template.tmdbSearchForm.helpers({
  'movieSearchResults': function () {
    return Template.instance().movieSearchResults.get();
  },
  'tvSearchResults': function () {
    return Template.instance().tvSearchResults.get();
  },
  'searching': function () {
    return Template.instance().searching.get();
  },
  'noResults': function () {
    return Template.instance().noResults.get();
  }
})

Template.tmdbSearchForm.onCreated(function () {
  this.movieSearchResults = new ReactiveVar();
  this.tvSearchResults = new ReactiveVar();
  this.searching = new ReactiveVar();
  this.noResults = new ReactiveVar();
})
