'use strict';

angular.module('queueCastApp')
  .controller('QueueCtrl', function (EpisodesService) {
    
  	this.episodes = function() {
      console.log(EpisodesService.likedEpisodes);
      return EpisodesService.likedEpisodes;
    };

  	this.getImageUrl = function (episode) {
  		console.log('url : ', episode.episode.image_urls.thumb);
      if (episode.episode) {
        episode = episode.episode;
      }
  		return episode.image_urls.thumb;
  		// return {'background-url' : 'url(' + episode.episode.image_urls.thumb + ')' };
  	};

  	this.getShowTitle = function (episode) {
      if (episode.episode) {
        episode = episode.episode;
      }
  		return episode.show_title;
  	};

  	this.getEpisodeTitle = function (episode) {
    if (episode.episode) {
      episode = episode.episode;
    }
		return episode.title;
  	};

  	this.getDuration = function (episode) {
      if (episode.episode) {
        episode = episode.episode;
      }
  		return episode.audio_files[0].duration;
  	};
  });
