# TheMovieDB Search Package

A package that allows you to search [TheMovieDB](https://www.themoviedb.org/), specifically built for [Plex Requests](https://github.com/lokenx/plexrequests-meteor/).

## Features
- Search form for searching TheMovieDB
- Returns Movies and TV shows side by side

## Installation

`meteor add lokenx:themoviedbsearch`

## Usage

Include your TheMovieDB API Key somewhere in your server-side code.

    if(Meteor.isServer){
      TMDBSearch.api = "abcdef0123456789"
    }

If you would like to change the language, you can set it on the server as well. Acceptable values are ISO 639-1 codes.

    if(Meteor.isServer){
      TMDBSearch.language = "nl"
    }

Insert the search form template where appropriate on the client side. A [Bootstrap](http://getbootstrap.com/) themed search bar will be provided, as well as two columns of results. No submit button is provided, results are generated as the user types (minimum 3 characters required).

    {{> tmdbSearchForm}}

To get the details of the item that gets requested, a simple Template event handler will help out.

    Template.tmdbSearchForm.events({
      'click .add-request': function () {
        console.log(this);
      }
    })

## License

This application is licensed under The MIT License. The Movie Database name and related details are copyright of Fanhattan Inc.
