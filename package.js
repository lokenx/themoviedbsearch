Package.describe({
  name: 'lokenx:themoviedbsearch',
  version: '0.5.0',
  summary: 'A package that allows you to search TheMovieDB',
  git: 'https://github.com/lokenx/themoviedbsearch',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');

  api.addFiles('lib/server/methods/search.js', ['server']);
  api.addFiles('lib/server/methods/externalIds.js', ['server']);
  api.addFiles('lib/server/methods/movie.js', ['server']);
  api.addFiles('lib/server/methods/tv.js', ['server']);

  api.use('meteor-base@1.0.1')
  api.use('templating');
  api.use('underscore');
  api.use('check');
  api.use('http');
  api.use('reactive-var');
  api.use('fortawesome:fontawesome@4.4.0')

  api.export("TMDBSearch")
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('lokenx:themoviedbsearch');
  api.addFiles('themoviedbsearch-tests.js');
});
