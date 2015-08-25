Package.describe({
  name: 'lokenx:themoviedbsearch',
  version: '0.0.2',
  summary: 'A package that allows you to search TheMovieDB',
  git: 'https://github.com/lokenx/themoviedbsearch',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.addFiles('lib/client/views/tmdbSearchForm.html',['client']);
  api.addFiles('lib/client/views/movieItem.html',['client']);
  api.addFiles('lib/client/views/tvItem.html',['client']);
  api.addFiles('lib/client/controllers/tmdbSearchForm.js', ['client']);
  api.addFiles('lib/client/controllers/tvItem.js', ['client']);
  api.addFiles('lib/client/controllers/movieItem.js', ['client']);
  api.addFiles('lib/server/methods/search.js', 'server');

  api.use('templating');
  api.use('underscore');
  api.use('check');
  api.use('http');
  api.use('reactive-var');
  api.use('fortawesome:fontawesome@4.4.0')

  api.export("TMDBSearch")
  api.export("tmdbSearchForm");
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('lokenx:themoviedbsearch');
  api.addFiles('themoviedbsearch-tests.js');
});
