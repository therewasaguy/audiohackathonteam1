'use strict';

angular.module('queueCastApp')
  .controller('CategoryCtrl', function ($scope, CategoriesService, EpisodesService) {
  	this.categories= CategoriesService.getCategories();

  	this.chooseCategory = function(catName) {
  		var newEpisodes = [];

  		EpisodesService.epIndex = 0;

  		switch(catName) {
  			case "Emotion":
  				newEpisodes = feel.episodes;
  				console.log('feel');
  				break;
  			default: 
  				newEpisodes = laugh.episodes;
  				console.log('no');
  				break;
  		}

  		EpisodesService.episodeQueue = newEpisodes.concat(EpisodesService.episodeQueue);
  		console.log(EpisodesService);

  		window.location.href = '/#/trailers';
  	}
  });