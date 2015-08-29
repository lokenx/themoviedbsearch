Template.tmdbSearchForm.events({
  'keyup  #tmdb-search': _.throttle(function (event, template) {
    $('.results-header').hide();
    template.results.set([]);
    template.tvSearchResults.set([]);
    template.noResults.set(false);

    var searchterm = $(event.target).val().trim();
    var searchType = template.searchType.get();
    var results = [];

    if (searchterm.length > 2) {
      template.searching.set(true);
      Meteor.call("TMDBSearch", searchterm, searchType, function (error, result) {
        if (error) {
          console.log(error);
          template.noResults.set(true);
          template.searching.set(false);
        } else if (result.length) {
          template.searching.set(false);
          template.results.set(result);
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
  },
  'click .type-select': function (event, template) {
    var type = $(event.target).text();
    var searchType = (type == "Movies") ? "movie" : "tv";
    template.searchType.set(searchType);
    $('#type-select-button').html(type + ' <span class="caret"></span>')
    template.results.set([]);
    $('.results-header').hide();
  }
});

Template.tmdbSearchForm.helpers({
  'results': function () {
    return Template.instance().results.get();
  },
  'tvSearchResults': function () {
    return Template.instance().tvSearchResults.get();
  },
  'searching': function () {
    return Template.instance().searching.get();
  },
  'noResults': function () {
    return Template.instance().noResults.get();
  },
  'searchType': function () {
    if (Template.instance().searchType.get() == "movie") {
      return "Movies";
    } else {
      return "TV Shows"
    }
  }
})

Template.tmdbSearchForm.onCreated(function () {
  this.results = new ReactiveVar();
  this.tvSearchResults = new ReactiveVar();
  this.searching = new ReactiveVar();
  this.noResults = new ReactiveVar();
  this.searchType = new ReactiveVar();
  this.searchType.set("movie");
})
