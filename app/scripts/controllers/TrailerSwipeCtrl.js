'use strict';

angular.module('queueCastApp')
  .controller('TrailerSwipeCtrl', function (EpisodesService) {
    // this.hitrailers = [ "url(http://files.thisamericanlife.org//sites//default//files//episodes//565_0.jpg)", "url(http://files.thisamericanlife.org//sites//default//files//episodes//565_0.jpg)", "url(http://files.thisamericanlife.org//sites//default//files//episodes//565_0.jpg)", "url(http://files.thisamericanlife.org//sites//default//files//episodes//565_0.jpg)", "url(http://files.thisamericanlife.org//sites//default//files//episodes//565_0.jpg)"];  
  	
  	this.episodes = EpisodesService.getEpisodeQueue();


  	this.getImageUrl = function (episode) {
  		if (episode.episode) {
  			episode = episode.episode;
  		}
  		return episode.image_urls.thumb;
  		// return {'background-url' : 'url(' + episode.episode.image_urls.thumb + ')' };
  	};

  	this.getLikedEpAmt = function () {
  		return EpisodesService.likedEpisodes.length;
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

  	$(document).ready(function(){


			$( "#yesClick" ).click(function() {
				swipeRightAnimation(EpisodesService.uiTriggerNext);
			});

			$( "#noClick" ).click(function() {
				swipeLeftAnimation(EpisodesService.uiTriggerNext);
			});


			$(".buddy").swipe({
			  swipeLeft:function(event, direction, distance, duration, fingerCount) {
					swipeLeftAnimation(EpisodesService.uiTriggerNext);
							
			  },
			  swipeRight:function(event, direction, distance, duration, fingerCount) {
					swipeRightAnimation(EpisodesService.uiTriggerNext);
			  }			   
			});

		});
		
		
  });


function swipeRightAnimation (triggerNextAudioFN) {
			//playAudio(30, 45);
			if (triggerNextAudioFN) {triggerNextAudioFN(true);}
			$('.buddy:visible').addClass('rotate-left').delay(700).fadeOut(1);
			$('.buddy:visible').find('.status').remove();

			$('.buddy:visible').append('<div class="status like">SAVE</div>');      
			if ( $('.buddy:visible').is(':last-child') ) {
				$('.buddy:visible:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
			} else {
				$('.buddy:visible').next().removeClass('rotate-left rotate-right').fadeIn(400);
			}			
			
			$('.buddy:visible').find('.status').fadeOut(600, function () {
				$('.buddy:visible').find('.status').remove();
			});
			
		}
		
function swipeLeftAnimation (triggerNextAudioFN) {
	//playAudio(30, 45);
	if (triggerNextAudioFN) {triggerNextAudioFN(false);}
	$('.buddy:visible').addClass('rotate-right').delay(700).fadeOut(1);
	$('.buddy:visible').find('.status').remove();
	$('.buddy:visible').append('<div class="status dislike">SKIP</div>');

	if ( $('.buddy:visible').is(':last-child') ) {
	 $('.buddy:visible:nth-child(1)').removeClass ('rotate-left rotate-right').fadeIn(300);
	 } else {
		$('.buddy:visible').next().removeClass('rotate-left rotate-right').fadeIn(400);
	} 	
	
		$('.buddy:visible').find('.status').fadeOut(600, function () {
			$('.buddy:visible').find('.status').remove();
		});					

}
		