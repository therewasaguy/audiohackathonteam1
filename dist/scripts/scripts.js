'use strict';

/**
 * @ngdoc overview
 * @name audiohackathonteam1App
 * @description
 * # audiohackathonteam1App
 *
 * Main module of the application.
 */
angular
  .module('queueCastApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/categories', {
        templateUrl: 'views/categories.tpl.html',
        controller: 'CategoryCtrl',
        controllerAs: 'catCtrl'
      })
      .when('/trailers', {
        templateUrl: 'views/trailers.tpl.html',
        controller: 'TrailerSwipeCtrl',
        controllerAs: 'tsCtrl'
      })
      .when('/queue',{
        templateUrl: 'views/queue.tpl.html',
        controller: 'QueueCtrl',
        controllerAs: 'queueCtrl'
      })
      .otherwise({
        redirectTo: '/categories'
      });
  });

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
		
/**
 *  curated playlists for feel and laugh
 */

var feel = 
{
   "episodes":[
      {
         "id":8269,
         "title":"The first and last time I robbed a bank",
         "description":"\"The first time I robbed a bank, I understood that I was amping up my game. Ã¢â‚¬Â¦ Here I am a petty criminal and I wanna innovate with my narrative, amp it up and become a serious criminal. So IÃ¢â‚¬â„¢m like fÃ¢â‚¬â€œk it, IÃ¢â‚¬â„¢m gonna go rob a bank. I had already committed to the idea that I was a new man, new life, fÃ¢â‚¬â€œk the world Ã¢â‚¬â€œ this is the new Joe Loya. IÃ¢â‚¬â„¢m gonna rob a bank.Ã¢â‚¬Â\n\nJoe Loya used to be a bankrobber. Now he's a writer. Grab his astonishing memoir, \"The Man Who Outgrew His Prison Cell\" from Amazon.  \n\n\nConnect with First Time Last Time and please help spread the word! I'm aiming to put podcasts out every few weeks. Also Ã¢â‚¬â€œ new stories every few days on Facebook, Instagram, Tumblr and Twitter. Connect to it all via firstlasttime.com! \n\nAnd please help me get the word out about this new project. Share with anyone you know who loves great stories.",
         "date_created":"2015-05-28",
         "identifier":"tag:soundcloud,2010:tracks/207675011",
         "digital_location":"https://soundcloud.com/1stlasttime/tell-me-about-the-first-time-you-robbed-a-bank",
         "physical_location":"rss",
         "duration":781,
         "tags":[

         ],
         "updated_at":"2015-07-29 04:13:48 UTC",
         "itunes_episode":"343370302",
         "date_added":"2015-07-20 18:56:15 UTC",
         "show_id":507,
         "show_title":"First Time Last Time",
         "audio_files":[
            {
               "id":8263,
               "duration":781,
               "start_time": 125,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/2047/207675011-1stlasttime-tell-me-about-the-first-time-you-robbed-a-bank.mp3"
               ]
            }
         ],
         "image_files":[

         ],
         "entities":[
            {
               "id":306645,
               "name":"bank",
               "identifier":"http://d.opencalais.com/genericHasher-1/6c8d4d6b-9026-39f0-8967-42d22a408453",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"---\nrentities:\n- Water streams\n- Fluvial landforms\n- Geomorphology\n- Sedimentology\n- Rivers\n"
            },
            {
               "id":306644,
               "name":"Instagram",
               "identifier":"http://d.opencalais.com/comphash-1/ab6c8681-759a-37ec-af62-b24109670f3d",
               "score":1,
               "type":"Company",
               "category":"entity",
               "extra":"---\nrentities:\n- Android software\n- Photo sharing\n- Social networking services\n- 2010 software\n- IPhone software\n- Facebook acquisitions\n- Companies based in San Francisco, California\n- Companies established in 2010\n"
            },
            {
               "id":306647,
               "name":"Human Interest",
               "identifier":null,
               "score":1,
               "type":null,
               "category":"topic",
               "extra":"{\"original\"=>\"Human Interest\"}"
            },
            {
               "id":306646,
               "name":"writer",
               "identifier":"http://d.opencalais.com/genericHasher-1/a69a1d4c-2214-3b28-bca4-351920e672e5",
               "score":1,
               "type":"Position",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[Loya used to be a bankrobber. Now he's ]a writer[. Grab his astonishing memoir, \\\"The Man Who]\", \"prefix\"=>\"Loya used to be a bankrobber. Now he's \", \"exact\"=>\"a writer\", \"suffix\"=>\". Grab his astonishing memoir, \\\"The Man Who\", \"offset\"=>408, \"length\"=>8}]}"
            }
         ],
         "extra":{
            "itunes_episode":"343370302",
            "skip_transcript":"true"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/8269",
            "ui":"https://www.audiosear.ch/a/204d/the-first-and-last-time-i-robbed-a-bank"
         },
         "categories":[
            {
               "id":18,
               "parent_id":5,
               "name":"Personal Journals",
               "name_lc":"personal journals"
            },
            {
               "id":5,
               "parent_id":null,
               "name":"Society & Culture",
               "name_lc":"society & culture"
            }
         ],
         "highlights":{

         }
      },
      {
         "id":17772,
         "title":"Episode 14: The Others",
         "description":" We donÃ¢â‚¬â„¢t like to be alone. We hate it. So we tell stories about others, the things at the edges of society. Things weÃ¢â‚¬â„¢re not sure about. But what if those Ã¢â‚¬Å“othersÃ¢â‚¬Â are more real than we first believed?  \n   \n \n   \n This episode of Lore was sponsored by: \n   \n Warby Parker: Visit <a href=\"http://www.warbyparker.com/Lore\"><span>WarbyParker.com/Lore</span></a> today to pick out your 5 favorite frames for a Home Try-On. If you use that web address, youÃ¢â‚¬â„¢ll get free 3-day shipping on your final order. YouÃ¢â‚¬â„¢re welcome. \n   \n Casper: Visit <a href=\"http://www.casper.com/Lore\"><span>Casper.com/Lore</span></a> to save $50 on the mattress of your choice with the offer code LORE. Terms and Conditions Apply. \n   \n \n   \n <span><a href=\"http://www.lorepodcast.com/support\">Support Lore</a></span>  \n <span><a href=\"http://aaronmahnke.com/novels/\">Novels by Aaron Mahnke</a></span> ",
         "date_created":"2015-09-06",
         "identifier":"182d686ab294eec9315320c20b235f19",
         "digital_location":"http://lorepodcast.libsyn.com/episode-14-the-others",
         "physical_location":"rss",
         "duration":1471,
         "tags":[

         ],
         "updated_at":"2015-09-09 19:40:40 UTC",
         "itunes_episode":"351584990",
         "date_added":"2015-09-09 10:05:03 UTC",
         "show_id":373,
         "show_title":"Lore",
         "audio_files":[
            {
               "id":17579,
               "duration":1471,
               "start_time": 131,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/44ab/Lore14.mp3"
               ]
            }
         ],
         "image_files":[
            {
               "url":{
                  "full":"https://www.audiosear.ch/media/a47fdab6026a69f9d546edf384cff004/0/public/image_file/17235/lore-coverart2.jpg",
                  "thumb":"https://www.audiosear.ch/media/5f20d96390130c041b2368fb7b859b69/0/thumb/image_file/17235/lore-coverart2.jpg"
               }
            }
         ],
         "entities":[
            {
               "id":400262,
               "name":"Finland",
               "identifier":"http://d.opencalais.com/genericHasher-1/1290ada6-0614-37b2-9148-eac58d4ff658",
               "score":0.301029995663981,
               "type":"Country",
               "category":"location",
               "extra":"---\nlatitude: '62.4301586365'\nlongitude: '24.7271464355'\nrentities:\n- PostÃ¢â‚¬â€œRussian Empire states\n- Member states of the European Union\n- Republics\n- Countries bordering the Baltic Sea\n- European countries\n- Northern Europe\n- Member states of the United Nations\n- Liberal democracies\n- Nordic countries\n- Finland\n- Member states of the Union for the Mediterranean\n- States and territories established in 1918\n- Member states of the Council of Europe\n- Scandinavia\n"
            },
            {
               "id":400259,
               "name":"Indonesia",
               "identifier":"http://d.opencalais.com/genericHasher-1/31920b2e-1c01-38e1-8a7d-fb9e30666d21",
               "score":0.301029995663981,
               "type":"Country",
               "category":"location",
               "extra":"---\nlatitude: '-3.25906772689'\nlongitude: '109.702752248'\nrentities:\n- Member states of the Organisation of Islamic Cooperation\n- Republics\n- Member states of the United Nations\n- G20 nations\n- G15 nations\n- Southeast Asian countries\n- Malay-speaking countries and territories\n- Liberal democracies\n- Island countries\n- Indonesia\n- States and territories established in 1949\n- Developing 8 Countries member states\n- Member states of the Association of Southeast Asian Nations\n"
            },
            {
               "id":400258,
               "name":"America",
               "identifier":"http://d.opencalais.com/genericHasher-1/22b7ced9-f8a7-328d-b061-241cb9bc908a",
               "score":0.778151250383644,
               "type":"Continent",
               "category":"location",
               "extra":"---\nrentities:\n- Northern American countries\n- United States\n- 1776 establishments in the United States\n- Countries bordering the Atlantic Ocean\n- States and territories established in 1776\n- Countries bordering the Arctic Ocean\n- English-speaking countries and territories\n- Former confederations\n- Member states of the United Nations\n- Member states of NATO\n- G20 nations\n- Countries bordering the Pacific Ocean\n- Liberal democracies\n- Superpowers\n- Bicontinental countries\n- Federal countries\n- G8 nations\n"
            },
            {
               "id":400255,
               "name":"food",
               "identifier":"http://d.opencalais.com/genericHasher-1/c16d75d3-6824-32a7-82c2-b8c266572ee5",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"---\nrentities:\n- Agriculture\n"
            },
            {
               "id":400253,
               "name":"Abraham Lincoln",
               "identifier":"http://d.opencalais.com/pershash-1/7637e23c-d48e-3ac8-ac82-6017bb3592e8",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"---\nrentities:\n- People murdered in Washington, D.C.\n- Republican Party (United States) presidential nominees\n- People from LaRue County, Kentucky\n- Members of the United States House of Representatives from Illinois\n- Illinois Whigs\n- People from Macon County, Illinois\n- Assassinated United States Presidents\n- People of the Black Hawk War\n- Deaths by firearm in Washington, D.C.\n- People of Illinois in the American Civil War\n- 1809 births\n- American people of Welsh descent\n- Illinois lawyers\n- Illinois Republicans\n- Union political leaders\n- Republican Party Presidents of the United States\n- 1865 deaths\n- Lincoln family\n- Postmasters\n- People from Spencer County, Indiana\n- Abraham Lincoln\n- United States presidential candidates, 1860\n- Presidents of the United States\n- American people of English descent\n- People from Springfield, Illinois\n- Members of the Illinois House of Representatives\n- United States presidential candidates, 1864\n- People from Coles County, Illinois\n"
            },
            {
               "id":400252,
               "name":"pharmacist",
               "identifier":"http://d.opencalais.com/genericHasher-1/a0caa598-ed5c-388c-8281-648b40d6cae5",
               "score":1,
               "type":"Position",
               "category":"entity",
               "extra":"---\nrentities:\n- Pharmacy\n- Medicinal chemistry\n- Greek loanwords\n"
            },
            {
               "id":400251,
               "name":"The Boston Globe",
               "identifier":"http://d.opencalais.com/genericHasher-1/9d5d65f5-41d4-3428-9668-4860ab414822",
               "score":1,
               "type":"Published Medium",
               "category":"entity",
               "extra":"---\nrentities:\n- Publications established in 1872\n- Pulitzer Prize winning newspapers\n- Media coverage of Catholic sex abuse cases\n- The Boston Globe\n- Newspapers published in Boston, Massachusetts\n- Worth Bingham Prize recipients\n- The New York Times\n"
            },
            {
               "id":400263,
               "name":"Massachusetts",
               "identifier":"http://d.opencalais.com/genericHasher-1/7acdcb17-60d8-35c2-ad99-3b224d74f25f",
               "score":0.301029995663981,
               "type":"Province Or State",
               "category":"location",
               "extra":"---\nlatitude: '42.3'\nlongitude: '-71.8'\ncountry: United States\nrentities:\n- Northeastern United States\n- Massachusetts\n- States of the United States\n- New England\n- States and territories established in 1788\n- Former British colonies\n"
            },
            {
               "id":400261,
               "name":"Wyoming",
               "identifier":"http://d.opencalais.com/genericHasher-1/e995f737-ea09-3646-a0f3-68c1e263a067",
               "score":0.301029995663981,
               "type":"Province Or State",
               "category":"location",
               "extra":"---\nlatitude: '43.0039679365'\nlongitude: '-108.154049643'\ncountry: United States\nrentities:\n- States of the United States\n- States and territories established in 1890\n- Wyoming\n"
            },
            {
               "id":400257,
               "name":"steel",
               "identifier":"http://d.opencalais.com/genericHasher-1/a0a86161-b630-36e5-a965-d3d122c513fd",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"---\nrentities:\n- Steel\n- Building materials\n"
            },
            {
               "id":400250,
               "name":"Latex",
               "identifier":"http://d.opencalais.com/genericHasher-1/bf8c5598-d250-370a-85e6-b92dbb1e24f0",
               "score":1,
               "type":"Programming Language",
               "category":"entity",
               "extra":"---\nrentities:\n- Materials\n- Sculpture materials\n- Rubber\n"
            },
            {
               "id":400248,
               "name":"printing press",
               "identifier":"http://d.opencalais.com/genericHasher-1/dae75e8b-a2b1-3b89-9d51-0bc25e9f7c31",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"---\nrentities:\n- Johannes Gutenberg\n- Printing\n- 1445 introductions\n- Obsolete technologies\n"
            },
            {
               "id":400245,
               "name":"food chain",
               "identifier":"http://d.opencalais.com/genericHasher-1/606d9ca8-8f5a-3f37-9d9a-af16aa1707bd",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"---\nrentities:\n- Systems ecology\n- Trophic ecology\n"
            },
            {
               "id":400243,
               "name":"Instagram",
               "identifier":"http://d.opencalais.com/comphash-1/ab6c8681-759a-37ec-af62-b24109670f3d",
               "score":1,
               "type":"Company",
               "category":"entity",
               "extra":"---\nrentities:\n- Android software\n- Photo sharing\n- Social networking services\n- 2010 software\n- IPhone software\n- Facebook acquisitions\n- Companies based in San Francisco, California\n- Companies established in 2010\n"
            }
         ],
         "extra":{
            "itunes_episode":"351584990"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/17772",
            "ui":"https://www.audiosear.ch/a/456c/episode-14-the-others"
         },
         "categories":[
            {
               "id":52,
               "parent_id":5,
               "name":"History",
               "name_lc":"history"
            },
            {
               "id":5,
               "parent_id":null,
               "name":"Society & Culture",
               "name_lc":"society & culture"
            },
            {
               "id":11,
               "parent_id":6,
               "name":"Arts",
               "name_lc":"arts"
            },
            {
               "id":14,
               "parent_id":6,
               "name":"Literature",
               "name_lc":"literature"
            }
         ],
         "highlights":{

         }
      },
      {
         "id":9547,
         "title":"Edition 18: Night",
         "description":"\"Night in London is a brief period of infinite possibility\" wrote the journalist and travel writer HV Morton in the 1920s, and nowhere is this truer than in Hackney, which from doors open till dawn chorus becomes an asphalt jungle for revellers, criminals, artists, lovers, all night eateries and taxi drivers. In the latest and [Ã¢â‚¬Â¦]",
         "date_created":"2010-04-08",
         "identifier":"http://hackneypodcast.co.uk/?p=437",
         "digital_location":"http://hackneypodcast.co.uk/2010/04/edition-18-night/",
         "physical_location":"rss",
         "duration":2029,
         "tags":[
            "Podcast"
         ],
         "updated_at":"2015-07-29 16:51:02 UTC",
         "itunes_episode":"82179127",
         "date_added":"2015-07-20 19:52:58 UTC",
         "show_id":536,
         "show_title":"The Hackney Podcast",
         "audio_files":[
            {
               "id":9492,
               "duration":2029,
               "start_time": 1300,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/2514/Edition-18_-Night.mp3"
               ]
            }
         ],
         "image_files":[

         ],
         "entities":[
            {
               "id":314935,
               "name":"taxicab",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Taxicabs\n"
            },
            {
               "id":314937,
               "name":"Hospitality & Recreation",
               "identifier":null,
               "score":1,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Hospitality_Recreation\nrentities: []\n"
            },
            {
               "id":314936,
               "name":"the asphalt jungle",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- 1950s crime films\n- 1950 films\n- United States National Film Registry films\n- American films\n- Films directed by John Huston\n- Crime thriller films\n- Edgar Award winning works\n- Films based on novels\n- Metro-Goldwyn-Mayer films\n- Black-and-white films\n- Heist films\n- English-language films\n- Film noir\n"
            }
         ],
         "extra":{
            "itunes_episode":"82179127",
            "skip_transcript":"true"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/9547",
            "ui":"https://www.audiosear.ch/a/254b/edition-18-night"
         },
         "categories":[
            {
               "id":18,
               "parent_id":5,
               "name":"Personal Journals",
               "name_lc":"personal journals"
            },
            {
               "id":5,
               "parent_id":null,
               "name":"Society & Culture",
               "name_lc":"society & culture"
            },
            {
               "id":7,
               "parent_id":null,
               "name":"News & Politics",
               "name_lc":"news & politics"
            },
            {
               "id":11,
               "parent_id":6,
               "name":"Arts",
               "name_lc":"arts"
            }
         ],
         "highlights":{

         }
      },
      {
         "id":15951,
         "title":"Ep 37: Adrienne Celt & Jason Diamond",
         "description":" What's the mythology driving your world? From family stories to fairy tales, classic movies to Food Network starsÃ¢â‚¬â€on this episode, Adrienne Celt reads from her novel, The Daughters, and Jason Diamond reads his essay, \"Bleach.\" \n <a href=\"http://catapultreads.com\">CatapultReads.com</a> // <a href=\"http://twitter.com/catapultreads\">@CatapultReads</a> // <a href=\"http://tinyletter.com/thecatapult\">The Trebuchet</a> ",
         "date_created":"2015-08-10",
         "identifier":"5934e103cfc1b4ab35073771c007963a",
         "digital_location":"http://thecatapult.libsyn.com/ep-37-adrienne-celt-jason-diamond",
         "physical_location":"rss",
         "duration":1681,
         "tags":[

         ],
         "updated_at":"2015-08-11 11:28:04 UTC",
         "itunes_episode":"349262918",
         "date_added":"2015-08-10 12:18:44 UTC",
         "show_id":533,
         "show_title":"The Catapult",
         "audio_files":[
            {
               "id":15826,
               "duration":1681,
               "start_time": 823,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/3dd2/Episode_37_-_Adrienne_Celt_and_Jason_Diamond.mp3"
               ]
            }
         ],
         "image_files":[
            {
               "url":{
                  "full":"https://www.audiosear.ch/media/d8ebd00e428210e8be2a39407d20d007/0/public/image_file/16952/Catapult.png",
                  "thumb":"https://www.audiosear.ch/media/9b1cc9acf34b81632e4f71e98ccd7080/0/thumb/image_file/16952/Catapult.png"
               }
            }
         ],
         "entities":[
            {
               "id":367687,
               "name":"Media",
               "identifier":null,
               "score":0.803383,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Media\nrentities:\n- Journalism occupations\n- Broadcasting occupations\n- Journalists\n- Television terminology\n- Media occupations\n- Occupations\n- Reporting\n"
            },
            {
               "id":367686,
               "name":"Arts and Entertainment",
               "identifier":null,
               "score":0.979008,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Arts & Entertainment\nrentities:\n- American studies\n- American society\n- Arts in the United States\n- American culture\n- Entertainment in the United States\n"
            },
            {
               "id":367685,
               "name":"Entertainment & Culture",
               "identifier":null,
               "score":0.904,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Entertainment_Culture\nrentities:\n- Media studies\n- Popular culture\n- Youth\n"
            },
            {
               "id":367684,
               "name":"hcard",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Business cards\n- Microformats\n"
            },
            {
               "id":367683,
               "name":"hyperlink",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Identifiers\n- Uniform resource locator\n"
            },
            {
               "id":367682,
               "name":"bleach",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Bathrooms\n- Disinfectants\n- Dyes\n- Bleaches\n- Household chemicals\n- Laundry\n"
            },
            {
               "id":367681,
               "name":"folklore",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Folklore\n- Fiction\n"
            },
            {
               "id":367680,
               "name":"fairy tale",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Persuasion techniques\n- Literary techniques\n- Fiction\n- Fairy tales\n- Folklore\n- Fairies\n"
            },
            {
               "id":367679,
               "name":"fairy",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Persuasion techniques\n- Literary techniques\n- Fiction\n- Fairy tales\n- Folklore\n- Fairies\n"
            },
            {
               "id":367678,
               "name":"microformat",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Microformats\n- Semantic HTML\n- Knowledge representation\n- Web development\n- Web design\n- Semantic Web\n"
            },
            {
               "id":367677,
               "name":"toonami",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- American children's television series\n- Cartoon Network programming blocks\n- Television programming blocks\n- Toonami\n"
            },
            {
               "id":367676,
               "name":"pierrot",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Japanese animation studios\n- Companies established in 1979\n- Article Feedback 5\n- 1979 establishments in Japan\n- Studio Pierrot\n- Mitaka, Tokyo\n- Companies based in Tokyo\n"
            },
            {
               "id":367675,
               "name":"Food Network",
               "identifier":null,
               "score":0.899,
               "type":"Organization",
               "category":"entity",
               "extra":"---\nwikipedia_url: http://en.wikipedia.com/wiki/Food_Network\nrentities:\n- English-language television stations in the United States\n- Food Network\n- Food and drink media\n- Television channels and stations established in 1993\n- Scripps Cable Networks\n"
            },
            {
               "id":367674,
               "name":"Bleach",
               "identifier":"http://d.opencalais.com/genericHasher-1/190eb350-c5da-31ad-a111-a7fab152c17a",
               "score":1,
               "type":"Movie",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: \"[Daughters, and Jason Diamond reads his essay, ]\\\"Bleach.\\\"[ \\n <a href=\\\"http://catapultreads.com\\\">CatapultRead]\"\n  prefix: 'Daughters, and Jason Diamond reads his essay, '\n  exact: '\"Bleach.\"'\n  suffix: \" \\n <a href=\\\"http://catapultreads.com\\\">CatapultRead\"\n  offset: 218\n  length: 9\nrentities:\n- Bathrooms\n- Disinfectants\n- Dyes\n- Bleaches\n- Household chemicals\n- Laundry\n"
            }
         ],
         "extra":{
            "itunes_episode":"349262918",
            "skip_transcript":"true"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/15951",
            "ui":"https://www.audiosear.ch/a/3e4f/ep-37-adrienne-celt--jason-diamond"
         },
         "categories":[
            {
               "id":14,
               "parent_id":6,
               "name":"Literature",
               "name_lc":"literature"
            },
            {
               "id":11,
               "parent_id":6,
               "name":"Arts",
               "name_lc":"arts"
            }
         ],
         "highlights":{

         }
      },
      {
         "id":19072,
         "title":"The Couple in 303",
         "description":" Boston Irish mob boss \"Whitey\" Bulger and his girlfriend spent 15 years hiding out in Santa Monica. Residents say the most wanted man in America was a good neighbor.  \n<a href=\"http://feeds.kcrw.com/~ff/kcrw/uf?a=GmT6VLfLhRg:IIHNvpkba38:yIl2AUoC8zA\"></a> <a href=\"http://feeds.kcrw.com/~ff/kcrw/uf?a=GmT6VLfLhRg:IIHNvpkba38:F7zBnMyn0Lo\"></a> <a href=\"http://feeds.kcrw.com/~ff/kcrw/uf?a=GmT6VLfLhRg:IIHNvpkba38:V_sGLiPBpWU\"></a> <a href=\"http://feeds.kcrw.com/~ff/kcrw/uf?a=GmT6VLfLhRg:IIHNvpkba38:qj6IDK7rITs\"></a> <a href=\"http://feeds.kcrw.com/~ff/kcrw/uf?a=GmT6VLfLhRg:IIHNvpkba38:gIN9vFwOqvQ\"></a>\n ",
         "date_created":"2015-09-18",
         "identifier":"http://serve.castfire.com/audio/2549995/uf_2015-09-18-174635.6929.mp3",
         "digital_location":"http://www.kcrw.com/news-culture/shows/unfictional/the-couple-in-303",
         "physical_location":"rss",
         "duration":1728,
         "tags":[

         ],
         "updated_at":"2015-09-19 13:41:38 UTC",
         "itunes_episode":"352588048",
         "date_added":"2015-09-19 13:30:48 UTC",
         "show_id":55,
         "show_title":"UnFictional",
         "audio_files":[
            {
               "id":18856,
               "duration":1728,
               "start_time": 413,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/49a8/uf_2015-09-18-174635-6929.mp3"
               ]
            }
         ],
         "image_files":[

         ],
         "entities":[
            {
               "id":412987,
               "name":"Human Interest",
               "identifier":null,
               "score":1,
               "type":null,
               "category":"topic",
               "extra":"{\"original\"=>\"Human Interest\"}"
            },
            {
               "id":412986,
               "name":"whitey bulger",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"{}"
            },
            {
               "id":412985,
               "name":"santa monica college",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"{}"
            },
            {
               "id":412984,
               "name":"kcrw",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"{}"
            },
            {
               "id":412983,
               "name":"winter hill gang",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"{}"
            }
         ],
         "extra":{
            "itunes_episode":"352588048",
            "skip_transcript":"true"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/19072",
            "ui":"https://www.audiosear.ch/a/4a80/the-couple-in-303"
         },
         "categories":[
            {
               "id":5,
               "parent_id":null,
               "name":"Society & Culture",
               "name_lc":"society & culture"
            },
            {
               "id":71,
               "parent_id":6,
               "name":"Storytelling",
               "name_lc":"storytelling"
            }
         ],
         "highlights":{

         }
      }
   ]
};

var laugh = {
   "episodes":[
      {
         "id":4495,
         "title":"05 Alessandra: Lips",
         "description":"The high school diaries of a late bloomer determined to land her first boyfriend. To learn more about Mortified visit getmortified.com.  The Mortified Podcast is a proud member of Radiotopia from PRX. ",
         "date_created":"2015-03-09",
         "identifier":"https://api.soundcloud.com/tracks/194958308",
         "digital_location":"http://soundcloud.com/themortifiedpodcast/05-alessandra-lips",
         "physical_location":"soundcloud",
         "duration":920,
         "tags":[
            "teenager",
            "tbt",
            "diary",
            "journal",
            "teenangst",
            "embarrassing",
            "nerd",
            "geek",
            "sex",
            "firstbase",
            "losangeles",
            "radiotopia",
            "prx",
            "virgin"
         ],
         "updated_at":"2015-07-22 15:14:24 UTC",
         "itunes_episode":"337238917",
         "date_added":"2015-04-07 18:48:40 UTC",
         "show_id":149,
         "show_title":"Mortified",
         "audio_files":[
            {
               "id":4494,
               "duration":919,
               "start_time": 482,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/118e/stream.mp3",
                  "https://www.audiosear.ch/media/audio_file/118e/stream.ogg"
               ]
            }
         ],
         "image_files":[
            {
               "url":{
                  "full":"https://i1.sndcdn.com/artworks-000109399263-c8cldf-t500x500.jpg",
                  "thumb":"https://i1.sndcdn.com/artworks-000109399263-c8cldf-large.jpg"
               }
            }
         ],
         "entities":[
            {
               "id":159299,
               "name":"Paul Saunders",
               "identifier":"http://d.opencalais.com/pershash-1/ae252331-9f49-3af8-a489-c7df826cd27b",
               "score":0.166666666666667,
               "type":"Person",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: |-\n    [was at home studying for the S.A.T.'s.\n    There ]she[ is sharing her teenage clothes on stage with]\n  prefix: \"was at home studying for the S.A.T.'s.\\nThere \"\n  exact: she\n  suffix: ' is sharing her teenage clothes on stage with'\n  offset: 1006\n  length: 3\n- detection: |-\n    [studying for the S.A.T.'s.\n    There she is sharing ]her[ teenage clothes on stage with mortified Los]\n  prefix: \"studying for the S.A.T.'s.\\nThere she is sharing \"\n  exact: her\n  suffix: ' teenage clothes on stage with mortified Los'\n  offset: 1021\n  length: 3\n- detection: |-\n    [hundred seven when I first met Jill ]she[ seems so weird\n    to me.\n    I was one year old. She]\n  prefix: 'hundred seven when I first met Jill '\n  exact: she\n  suffix: |2-\n     seems so weird\n    to me.\n    I was one year old. She\n  offset: 1471\n  length: 3\n- detection: |-\n    [she seems so weird\n    to me.\n    I was one year old. ]She[ was two years old and she seemed\n    like such an]\n  prefix: \"she seems so weird\\nto me.\\nI was one year old. \"\n  exact: She\n  suffix: |2-\n     was two years old and she seemed\n    like such an\n  offset: 1517\n  length: 3\n- detection: |-\n    [was one year old. She was two years old and ]she[ seemed\n    like such an intellectual child.\n    Jill]\n  prefix: 'was one year old. She was two years old and '\n  exact: she\n  suffix: |2-\n     seemed\n    like such an intellectual child.\n    Jill\n  offset: 1543\n  length: 3\n- detection: |-\n    [don't test.\n    Jill gives hand jobs to all the boy ]she[ likes and because of\n    it they like her.\n    Sometimes]\n  prefix: \"don't test.\\nJill gives hand jobs to all the boy \"\n  exact: she\n  suffix: |2-\n     likes and because of\n    it they like her.\n    Sometimes\n  offset: 2338\n  length: 3\n- detection: |-\n    [the boy she likes and because of\n    it they like ]her[.\n    Sometimes I see her posing on her garage]\n  prefix: \"the boy she likes and because of\\nit they like \"\n  exact: her\n  suffix: |-\n    .\n    Sometimes I see her posing on her garage\n  offset: 2376\n  length: 3\n- detection: |-\n    [ and because of\n    it they like her.\n    Sometimes I see ]her[ posing on her garage rooftop in a nude colored]\n  prefix: \" and because of\\nit they like her.\\nSometimes I see \"\n  exact: her\n  suffix: ' posing on her garage rooftop in a nude colored'\n  offset: 2397\n  length: 3\n- detection: |-\n    [they like her.\n    Sometimes I see her posing on ]her[ garage rooftop in a nude colored bikini]\n  prefix: \"they like her.\\nSometimes I see her posing on \"\n  exact: her\n  suffix: ' garage rooftop in a nude colored bikini'\n  offset: 2411\n  length: 3\n- detection: |-\n    [garage rooftop in a nude colored bikini while\n    ]her[ stupid boyfriend Hans-Peter grapes.\n    It's so]\n  prefix: |\n    garage rooftop in a nude colored bikini while\n  exact: her\n  suffix: |2-\n     stupid boyfriend Hans-Peter grapes.\n    It's so\n  offset: 2461\n  length: 3\nrentities:\n- Recipients of the Silver Star\n- 1918 births\n- 2003 deaths\n- Recipients of the Bronze Star Medal\n- United States Navy sailors\n"
            },
            {
               "id":159302,
               "name":"Media",
               "identifier":null,
               "score":0.736842,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Media\n"
            },
            {
               "id":159301,
               "name":"Arts and Entertainment",
               "identifier":null,
               "score":0.924847,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Arts & Entertainment\n"
            },
            {
               "id":159300,
               "name":"Human Interest",
               "identifier":null,
               "score":0.914,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Human Interest\n"
            },
            {
               "id":159298,
               "name":"Radio Tokyo",
               "identifier":"http://d.opencalais.com/genericHasher-1/aa71f154-6453-308f-a35e-7cb66f79e04b",
               "score":0.166666666666667,
               "type":"Organization",
               "category":"entity",
               "extra":"--- {}\n"
            },
            {
               "id":159297,
               "name":"Radio Tokyo",
               "identifier":"http://d.opencalais.com/genericHasher-1/66616564-8b2d-3d94-8705-76d7f939fc7a",
               "score":0.166666666666667,
               "type":"Radio Station",
               "category":"entity",
               "extra":"--- {}\n"
            },
            {
               "id":159296,
               "name":"Mortified",
               "identifier":"http://d.opencalais.com/genericHasher-1/4c975615-8f92-3068-b831-d3e5dcfb6b87",
               "score":1,
               "type":"Tv Show",
               "category":"entity",
               "extra":"--- {}\n"
            }
         ],
         "extra":{
            "itunes_episode":"337238917"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/4495",
            "ui":"https://www.audiosear.ch/a/118f/05-alessandra-lips"
         },
         "categories":[
            {
               "id":71,
               "parent_id":6,
               "name":"Storytelling",
               "name_lc":"storytelling"
            }
         ],
         "highlights":{

         }
      },
      {
         "id":19002,
         "title":"You've Got Mail",
         "description":"A brand new mailbag episode full of your letters from home. \n<a href=\"http://feeds.feedburner.com/~ff/CnF-TheRead?a=0UtXqZdI-B4:KCGYSdBX7vE:yIl2AUoC8zA\"></a> <a href=\"http://feeds.feedburner.com/~ff/CnF-TheRead?a=0UtXqZdI-B4:KCGYSdBX7vE:V_sGLiPBpWU\"></a> <a href=\"http://feeds.feedburner.com/~ff/CnF-TheRead?a=0UtXqZdI-B4:KCGYSdBX7vE:qj6IDK7rITs\"></a> <a href=\"http://feeds.feedburner.com/~ff/CnF-TheRead?a=0UtXqZdI-B4:KCGYSdBX7vE:gIN9vFwOqvQ\"></a>\n ",
         "date_created":"2015-09-17",
         "identifier":"tag:soundcloud,2010:tracks/224238702",
         "digital_location":"https://soundcloud.com/theread/youve-got-mail",
         "physical_location":"rss",
         "duration":4815,
         "tags":[

         ],
         "updated_at":"2015-09-18 13:46:32 UTC",
         "itunes_episode":"352455879",
         "date_added":"2015-09-18 13:41:56 UTC",
         "show_id":331,
         "show_title":"The Read",
         "audio_files":[
            {
               "id":18789,
               "duration":4815,
               "start_time": 4317,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/4965/224238702-theread-youve-got-mail.mp3"
               ]
            }
         ],
         "image_files":[

         ],
         "entities":[
            {
               "id":411875,
               "name":"Hospitality & Recreation",
               "identifier":null,
               "score":0.717,
               "type":null,
               "category":"topic",
               "extra":"{\"original\"=>\"Hospitality_Recreation\"}"
            },
            {
               "id":411874,
               "name":"world wide web",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"{}"
            },
            {
               "id":411873,
               "name":"hyperlink",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"{}"
            }
         ],
         "extra":{
            "itunes_episode":"352455879",
            "skip_transcript":"true"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/19002",
            "ui":"https://www.audiosear.ch/a/4a3a/you-ve-got-mail"
         },
         "categories":[
            {
               "id":5,
               "parent_id":null,
               "name":"Society & Culture",
               "name_lc":"society & culture"
            },
            {
               "id":16,
               "parent_id":6,
               "name":"Music",
               "name_lc":"music"
            }
         ],
         "highlights":{

         }
      },
      {
         "id":17358,
         "title":"Ben Franklin's Secret Hack to Make People Like You",
         "description":"Growing up we were taught to abide by the golden rule: Do unto others as you would have them do unto you. But that's hard to maintain. People get in the way and always seem to let you down, right? A co worker is a jerk to you and you don't know why....",
         "date_created":"2015-08-31",
         "identifier":"http://www.earwolf.com/episode/ben-franklins-secret-hack-to-make-people-like-you/",
         "digital_location":"http://www.earwolf.com/episode/ben-franklins-secret-hack-to-make-people-like-you/",
         "physical_location":"rss",
         "duration":5757,
         "tags":[

         ],
         "updated_at":"2015-09-01 14:29:15 UTC",
         "itunes_episode":"350990598",
         "date_added":"2015-09-01 13:39:08 UTC",
         "show_id":97,
         "show_title":"The Cracked Podcast",
         "audio_files":[
            {
               "id":17176,
               "duration":5757,
               "start_time": 618,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/4318/221650502-crackedpod-ben-franklins-secret-hack-to-make-people-like-you.mp3"
               ]
            }
         ],
         "image_files":[

         ],
         "entities":[
            {
               "id":393302,
               "name":"Human Interest",
               "identifier":null,
               "score":0.972,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Human Interest\nrentities:\n- Journalism genres\n"
            },
            {
               "id":393301,
               "name":"social philosophy",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Subfields of political science\n- Social philosophy\n- Branches of philosophy\n- Branches of sociology (interdisciplinary)\n"
            },
            {
               "id":393300,
               "name":"sermon on the mount",
               "identifier":null,
               "score":0.7,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Christian ethics\n- New Testament words and phrases\n- Sayings of Jesus\n- Vulgate Latin words and phrases\n- Sermon on the Mount\n- Early Christianity and Judaism\n"
            },
            {
               "id":393299,
               "name":"philosophy of law",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Roman law\n- Legal ethics\n- Philosophy by field\n- Academic disciplines\n- Social philosophy\n- Philosophy of law\n- Jurisprudence\n"
            },
            {
               "id":393298,
               "name":"golden rule",
               "identifier":null,
               "score":0.9,
               "type":null,
               "category":"tag",
               "extra":"---\nrentities:\n- Social philosophy\n- Philosophy of law\n- Ethical principles\n- Doctrines and teachings of Jesus\n- Christian terms\n- Christian nonviolence\n- Sermon on the Mount\n- Gospel of Matthew\n"
            }
         ],
         "extra":{
            "itunes_episode":"350990598",
            "skip_transcript":"true"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/17358",
            "ui":"https://www.audiosear.ch/a/43ce/ben-franklin-s-secret-hack-to-make-people-like-you"
         },
         "categories":[
            {
               "id":1,
               "parent_id":null,
               "name":"Comedy",
               "name_lc":"comedy"
            }
         ],
         "highlights":{

         }
      },
      {
         "id":18915,
         "title":"Teen Angstagrams",
         "description":"Decode devious anagrams with novelist Meg Wolitzer. The author of The Interestings talks about the challenges in writing her first young adult novel Belzhar and her adolescent journaling habits.",
         "date_created":"2015-09-17",
         "identifier":"71583dfa-87e1-42ff-9ede-395b2ec980ae",
         "digital_location":"http://npr.mc.tritondigital.com/AMA_PODCAST/media/anon.npr-mp3/npr/ama/2015/09/20150917_ama_fullshow.mp3?orgId=1&d=3076&p=510299&story=440576150&t=podcast&e=440576150&ft=pod&f=510299",
         "physical_location":"rss",
         "duration":3190,
         "tags":[

         ],
         "updated_at":"2015-09-18 10:43:45 UTC",
         "itunes_episode":"350569108",
         "date_added":"2015-09-18 10:04:35 UTC",
         "show_id":368,
         "show_title":"Ask Me Another",
         "audio_files":[
            {
               "id":18705,
               "duration":3190,
               "start_time": 2588,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/4911/20150917_ama_fullshow.mp3"
               ]
            }
         ],
         "image_files":[

         ],
         "entities":[
            {
               "id":411070,
               "name":"air illinois flight 710",
               "identifier":null,
               "score":0.0368421052631579,
               "type":null,
               "category":"tag",
               "extra":"{}"
            },
            {
               "id":411068,
               "name":"Chicago",
               "identifier":"http://d.opencalais.com/genericHasher-1/03ff2f32-7d79-3042-a299-2010505bc8fc",
               "score":0.235408913366638,
               "type":"City",
               "category":"location",
               "extra":"{\"latitude\"=>\"41.85\", \"longitude\"=>\"-87.65\", \"country\"=>\"United States\", \"state\"=>\"Illinois\"}"
            },
            {
               "id":411067,
               "name":"United States",
               "identifier":"http://d.opencalais.com/genericHasher-1/a54ac18b-a956-3b5c-b235-0609ca899305",
               "score":0.235408913366638,
               "type":"Country",
               "category":"location",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[ played by Kevin Costner fails to qualify for the ]U.S.[ Open yet again\\nhe decides to run away from it]\", \"prefix\"=>\" played by Kevin Costner fails to qualify for the \", \"exact\"=>\"U.S.\", \"suffix\"=>\" Open yet again\\nhe decides to run away from it\", \"offset\"=>8348, \"length\"=>4}], \"latitude\"=>\"40.4230003233\", \"longitude\"=>\"-98.7372244786\"}"
            },
            {
               "id":411066,
               "name":"Boston",
               "identifier":"http://d.opencalais.com/genericHasher-1/aace28ec-e4e2-3ad0-9a59-806a900252a9",
               "score":0.235408913366638,
               "type":"City",
               "category":"location",
               "extra":"{\"latitude\"=>\"42.3583\", \"longitude\"=>\"-71.0603\", \"country\"=>\"United States\", \"state\"=>\"Massachusetts\"}"
            },
            {
               "id":411064,
               "name":"France",
               "identifier":"http://d.opencalais.com/genericHasher-1/e1fd0a20-f464-39be-a88f-25038cc7f50c",
               "score":0.373114300021637,
               "type":"Country",
               "category":"location",
               "extra":"{\"latitude\"=>\"46.0\", \"longitude\"=>\"2.0\"}"
            },
            {
               "id":411063,
               "name":"Paris",
               "identifier":"http://d.opencalais.com/genericHasher-1/56fc901f-59a3-3278-addc-b0fc69b283e7",
               "score":0.470817826733276,
               "type":"City",
               "category":"location",
               "extra":"{\"latitude\"=>\"48.8742\", \"longitude\"=>\"2.346954\", \"country\"=>\"France\"}"
            },
            {
               "id":411062,
               "name":"Shirley Temple",
               "identifier":"http://d.opencalais.com/genericHasher-1/5526776b-e91f-3214-8248-7e556c612ce4",
               "score":1,
               "type":"Facility",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411060,
               "name":"Kurt Russell",
               "identifier":"http://d.opencalais.com/pershash-1/d8f61256-0ea3-343c-8149-1d3e3dee0aa1",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411057,
               "name":"Woody Harrelson",
               "identifier":"http://d.opencalais.com/pershash-1/657722e1-972a-39e9-9f47-426f087890de",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411055,
               "name":"fiberglass",
               "identifier":"http://d.opencalais.com/genericHasher-1/bfc38cbf-613e-3e14-9b19-5af2960d6ba9",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411053,
               "name":"writer",
               "identifier":"http://d.opencalais.com/genericHasher-1/a69a1d4c-2214-3b28-bca4-351920e672e5",
               "score":1,
               "type":"Position",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[for an adult audience you know you have to be ]the writer[ that you always\\nare. There's a great line by]\", \"prefix\"=>\"for an adult audience you know you have to be \", \"exact\"=>\"the writer\", \"suffix\"=>\" that you always\\nare. There's a great line by\", \"offset\"=>27076, \"length\"=>10}]}"
            },
            {
               "id":411049,
               "name":"United Nations",
               "identifier":"http://d.opencalais.com/genericHasher-1/fa36ccaa-3402-3be8-993a-00a6a8fbfb2e",
               "score":1,
               "type":"Organization",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[of the Russian royal family. Eludes the ]UN[ did Rasputin\\nwhile amounts in a wizard outfit]\", \"prefix\"=>\"of the Russian royal family. Eludes the \", \"exact\"=>\"UN\", \"suffix\"=>\" did Rasputin\\nwhile amounts in a wizard outfit\", \"offset\"=>9168, \"length\"=>2}, {\"detection\"=>\"[her first young adult novels so stick around. ]IMO[ if you're EISENBERG And this is N.P.R.'s\\nASK ME]\", \"prefix\"=>\"her first young adult novels so stick around. \", \"exact\"=>\"IMO\", \"suffix\"=>\" if you're EISENBERG And this is N.P.R.'s\\nASK ME\", \"offset\"=>9620, \"length\"=>3}, {\"detection\"=>\"[to ask me another From N.P.R. and W. N.Y.C. ]IMO[ if you're EISENBERG And with me is our\\none man]\", \"prefix\"=>\"to ask me another From N.P.R. and W. N.Y.C. \", \"exact\"=>\"IMO\", \"suffix\"=>\" if you're EISENBERG And with me is our\\none man\", \"offset\"=>10892, \"length\"=>3}]}"
            },
            {
               "id":411047,
               "name":"Napoleon",
               "identifier":"http://d.opencalais.com/pershash-1/9e558aea-819f-3839-8f9f-5dd7e9b6f5c4",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411045,
               "name":"George Thorogood",
               "identifier":"http://d.opencalais.com/pershash-1/baaa2fa6-0dc5-300e-ae7f-43ce9d552fa0",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411044,
               "name":"Jonathan Coulton",
               "identifier":"http://d.opencalais.com/pershash-1/5248d2a7-593b-3f63-8473-d205e6e02363",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[Here's your host Ophira\\nEisenberg thank\\nyou ]Jonathan[. So you know our the IP from her New York Times]\", \"prefix\"=>\"Here's your host Ophira\\nEisenberg thank\\nyou \", \"exact\"=>\"Jonathan\", \"suffix\"=>\". So you know our the IP from her New York Times\", \"offset\"=>1253, \"length\"=>8}, {\"detection\"=>\"[you. Jeff Gerth Yes\\nexactly. But down there\\n]he[ is to need to hope. It's a daily deal website]\", \"prefix\"=>\"you. Jeff Gerth Yes\\nexactly. But down there\\n\", \"exact\"=>\"he\", \"suffix\"=>\" is to need to hope. It's a daily deal website\", \"offset\"=>3837, \"length\"=>2}, {\"detection\"=>\"[a prize for there's no props in\\nyour drinks. ]Jonathan[ you have to drink to be a good musician. Well I]\", \"prefix\"=>\"a prize for there's no props in\\nyour drinks. \", \"exact\"=>\"Jonathan\", \"suffix\"=>\" you have to drink to be a good musician. Well I\", \"offset\"=>11703, \"length\"=>8}]}"
            },
            {
               "id":411043,
               "name":"poet",
               "identifier":"http://d.opencalais.com/genericHasher-1/ebb0a6ac-92fc-359c-8502-dce14e312553",
               "score":1,
               "type":"Position",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[food restaurants it's lost on them because edge ]a poet[ Lay they\\ndon't. Dioxide there are beings they]\", \"prefix\"=>\"food restaurants it's lost on them because edge \", \"exact\"=>\"a poet\", \"suffix\"=>\" Lay they\\ndon't. Dioxide there are beings they\", \"offset\"=>23307, \"length\"=>6}]}"
            },
            {
               "id":411042,
               "name":"the Guardian",
               "identifier":"http://d.opencalais.com/genericHasher-1/5fd4ce05-12d0-38d9-9c45-ef889b6020ac",
               "score":1,
               "type":"Published Medium",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411041,
               "name":"Justin Timberlake",
               "identifier":"http://d.opencalais.com/pershash-1/38b97093-9af0-3c75-8636-0eb1f7013ea4",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411040,
               "name":"retail",
               "identifier":"http://d.opencalais.com/genericHasher-1/9384a77b-4fc6-3509-9826-c2d8cedace1b",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411039,
               "name":"Tobey Maguire",
               "identifier":"http://d.opencalais.com/pershash-1/6f83b5ef-aa2d-3ce1-9e29-05580b1ca58c",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411038,
               "name":"Meg Wolitzer",
               "identifier":"http://d.opencalais.com/pershash-1/b5a14033-531f-3a01-893a-f82b6d2e8142",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[talks about the challenges in writing ]her[ first young adult novel Belzhar and her]\", \"prefix\"=>\"talks about the challenges in writing \", \"exact\"=>\"her\", \"suffix\"=>\" first young adult novel Belzhar and her\", \"offset\"=>121, \"length\"=>3}, {\"detection\"=>\"[writing her first young adult novel Belzhar and ]her[ adolescent journaling habits. This pod cast on]\", \"prefix\"=>\"writing her first young adult novel Belzhar and \", \"exact\"=>\"her\", \"suffix\"=>\" adolescent journaling habits. This pod cast on\", \"offset\"=>161, \"length\"=>3}]}"
            },
            {
               "id":411037,
               "name":"David Bowie",
               "identifier":"http://d.opencalais.com/pershash-1/ff183e61-2121-3f17-a9c7-336232a74d76",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[Well that's you know how well do you know ]he[ is a vampire the\\nvampire he is one of the]\", \"prefix\"=>\"Well that's you know how well do you know \", \"exact\"=>\"he\", \"suffix\"=>\" is a vampire the\\nvampire he is one of the\", \"offset\"=>24916, \"length\"=>2}, {\"detection\"=>\"[ how well do you know he is a vampire the\\nvampire ]he[ is one of the eternal How do you explain like]\", \"prefix\"=>\" how well do you know he is a vampire the\\nvampire \", \"exact\"=>\"he\", \"suffix\"=>\" is one of the eternal How do you explain like\", \"offset\"=>24944, \"length\"=>2}, {\"detection\"=>\"[you explain like Ziggy Stardust get married to\\n]him[ on like there's a lot of things how do you]\", \"prefix\"=>\"you explain like Ziggy Stardust get married to\\n\", \"exact\"=>\"him\", \"suffix\"=>\" on like there's a lot of things how do you\", \"offset\"=>25023, \"length\"=>3}, {\"detection\"=>\"[like there's a lot of things how do you explain ]his[ I suppose.\\nTurn and face the strange. Diagonally]\", \"prefix\"=>\"like there's a lot of things how do you explain \", \"exact\"=>\"his\", \"suffix\"=>\" I suppose.\\nTurn and face the strange. Diagonally\", \"offset\"=>25078, \"length\"=>3}, {\"detection\"=>\"[that I believe Howard Wexler's like ]David[ but we did not currently like now\\nplease welcome]\", \"prefix\"=>\"that I believe Howard Wexler's like \", \"exact\"=>\"David\", \"suffix\"=>\" but we did not currently like now\\nplease welcome\", \"offset\"=>25722, \"length\"=>5}]}"
            },
            {
               "id":411036,
               "name":"Bureau of Land Management",
               "identifier":"http://d.opencalais.com/genericHasher-1/ee4b0286-d8e2-3692-8501-b6ba2d35d2e4",
               "score":1,
               "type":"Organization",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411035,
               "name":"Federal Aviation Administration",
               "identifier":"http://d.opencalais.com/genericHasher-1/05a214f2-60d2-3c6e-9045-d12a4478c7d5",
               "score":1,
               "type":"Organization",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[civil rights of unaccompanied minors. ]Federal Aviation\\nAdministration[ could there be a comma in there somewhere.]\", \"prefix\"=>\"civil rights of unaccompanied minors. \", \"exact\"=>\"Federal Aviation\\nAdministration\", \"suffix\"=>\" could there be a comma in there somewhere.\", \"offset\"=>20870, \"length\"=>31}]}"
            },
            {
               "id":411034,
               "name":"Jeff Gerth",
               "identifier":"http://d.opencalais.com/pershash-1/82416cff-3546-3155-a171-31c9bae64e17",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[metal caps worn is jewelry over one's teeth. ]Jeff\\nGerth[ rails hero yet also probably due for a comeback]\", \"prefix\"=>\"metal caps worn is jewelry over one's teeth. \", \"exact\"=>\"Jeff\\nGerth\", \"suffix\"=>\" rails hero yet also probably due for a comeback\", \"offset\"=>4612, \"length\"=>10}, {\"detection\"=>\"[Temple Beth Israel.\\nThis is your last question. ]He['s the quiet canine half of a British]\", \"prefix\"=>\"Temple Beth Israel.\\nThis is your last question. \", \"exact\"=>\"He\", \"suffix\"=>\"'s the quiet canine half of a British\", \"offset\"=>5354, \"length\"=>2}, {\"detection\"=>\"[job malfunctions\\nwardrobe malfunction is that ]Jeff[. Abraham Lincoln is\\ntypically depicted wearing]\", \"prefix\"=>\"job malfunctions\\nwardrobe malfunction is that \", \"exact\"=>\"Jeff\", \"suffix\"=>\". Abraham Lincoln is\\ntypically depicted wearing\", \"offset\"=>36891, \"length\"=>4}]}"
            },
            {
               "id":411033,
               "name":"Paul Flaherty",
               "identifier":"http://d.opencalais.com/pershash-1/154c4f78-5b41-34b4-a76a-c403c0117763",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411032,
               "name":"The Great Gatsby",
               "identifier":"http://d.opencalais.com/genericHasher-1/9b9e42d4-abc4-34ba-9c5c-605ead13837e",
               "score":1,
               "type":"Movie",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411031,
               "name":"Central Intelligence Agency",
               "identifier":"http://d.opencalais.com/genericHasher-1/49513620-7853-3fa2-bb02-ebbb491fe28b",
               "score":1,
               "type":"Organization",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[an example if I were to\\nsay Ben Affleck plays a ]CIA[ agent who helps American hostages escape\\nfrom]\", \"prefix\"=>\"an example if I were to\\nsay Ben Affleck plays a \", \"exact\"=>\"CIA\", \"suffix\"=>\" agent who helps American hostages escape\\nfrom\", \"offset\"=>7099, \"length\"=>3}]}"
            },
            {
               "id":411030,
               "name":"Peter Sarsgaard",
               "identifier":"http://d.opencalais.com/pershash-1/1bade028-4f8f-3a60-8074-edededc352cf",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411029,
               "name":"Melissa McCarthy",
               "identifier":"http://d.opencalais.com/pershash-1/975cc680-f452-35e6-93de-5c1da7367c07",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411028,
               "name":"Virginia Woolf",
               "identifier":"http://d.opencalais.com/pershash-1/05d97d8e-ef3d-3dda-b169-e0df53c3dc06",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411027,
               "name":"author",
               "identifier":"http://d.opencalais.com/genericHasher-1/e911da6b-56e4-3544-9357-5d79d01c1538",
               "score":1,
               "type":"Position",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[devious anagrams with novelist Meg Wolitzer. ]The author[ of The Interestings talks about the challenges]\", \"prefix\"=>\"devious anagrams with novelist Meg Wolitzer. \", \"exact\"=>\"The author\", \"suffix\"=>\" of The Interestings talks about the challenges\", \"offset\"=>52, \"length\"=>10}, {\"detection\"=>\"[ Bookish girl.\\nYou come to that book knowing that ]the author[ took her life I mean so you come to it with a]\", \"prefix\"=>\" Bookish girl.\\nYou come to that book knowing that \", \"exact\"=>\"the author\", \"suffix\"=>\" took her life I mean so you come to it with a\", \"offset\"=>28836, \"length\"=>10}]}"
            },
            {
               "id":411026,
               "name":"Bloomsbury Group",
               "identifier":"http://d.opencalais.com/comphash-1/f089390f-581f-34a0-a471-eab4700db4c3",
               "score":1,
               "type":"Company",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411025,
               "name":"food",
               "identifier":"http://d.opencalais.com/genericHasher-1/c16d75d3-6824-32a7-82c2-b8c266572ee5",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411024,
               "name":"puzzle",
               "identifier":"http://d.opencalais.com/genericHasher-1/6b583bba-2748-369e-bf7d-25434924298a",
               "score":1,
               "type":"Industry Term",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[ and you\\nhave to name both movies let's go to our ]puzzle group[ Mary Tobler for an example if I were to\\nsay Ben]\", \"prefix\"=>\" and you\\nhave to name both movies let's go to our \", \"exact\"=>\"puzzle group\", \"suffix\"=>\" Mary Tobler for an example if I were to\\nsay Ben\", \"offset\"=>7022, \"length\"=>12}, {\"detection\"=>\"[clue the original title. OK let's\\ngo to our ]puzzle group[ Mary Tobler for an example a tart by the eggs\\nas]\", \"prefix\"=>\"clue the original title. OK let's\\ngo to our \", \"exact\"=>\"puzzle group\", \"suffix\"=>\" Mary Tobler for an example a tart by the eggs\\nas\", \"offset\"=>31046, \"length\"=>12}]}"
            },
            {
               "id":411023,
               "name":"Sylvia Plath",
               "identifier":"http://d.opencalais.com/pershash-1/e997a425-6783-3fb5-aa6b-bfe3143679c0",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[come to that book knowing that the author took ]her[ life I mean so you come to it with a kind\\nof]\", \"prefix\"=>\"come to that book knowing that the author took \", \"exact\"=>\"her\", \"suffix\"=>\" life I mean so you come to it with a kind\\nof\", \"offset\"=>28852, \"length\"=>3}, {\"detection\"=>\"[which didn't you know get fulfilled because of ]her[ short short\\nlife so the characters in The Bell]\", \"prefix\"=>\"which didn't you know get fulfilled because of \", \"exact\"=>\"her\", \"suffix\"=>\" short short\\nlife so the characters in The Bell\", \"offset\"=>29068, \"length\"=>3}]}"
            },
            {
               "id":411022,
               "name":"Ben Affleck",
               "identifier":"http://d.opencalais.com/pershash-1/08c343e9-91d6-3c82-aa5b-bfb68c6a051e",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411021,
               "name":"Super Bowl",
               "identifier":"http://d.opencalais.com/genericHasher-1/64979480-3dd0-34fb-aa09-2d8f003d25e0",
               "score":1,
               "type":"Sports Event",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411020,
               "name":"mathematician",
               "identifier":"http://d.opencalais.com/genericHasher-1/f82879f2-91e1-354a-bfac-7bcb15d3585a",
               "score":1,
               "type":"Position",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[read it. Nick you're an I.T. genius\\nYes and ]a mathematician[ yes yeah look at that you went for both of them]\", \"prefix\"=>\"read it. Nick you're an I.T. genius\\nYes and \", \"exact\"=>\"a mathematician\", \"suffix\"=>\" yes yeah look at that you went for both of them\", \"offset\"=>2496, \"length\"=>15}]}"
            },
            {
               "id":411019,
               "name":"Fred Flintstone",
               "identifier":"http://d.opencalais.com/pershash-1/f752ccbd-fc18-3ce6-bf7e-3898fa556479",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411018,
               "name":"operating system",
               "identifier":"http://d.opencalais.com/genericHasher-1/05ddd98f-097f-3701-a737-6fd2555f411c",
               "score":1,
               "type":"Technology",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411017,
               "name":"National Oceanic and Atmospheric Administration",
               "identifier":"http://d.opencalais.com/genericHasher-1/b7dfb3e9-a248-3a16-93f6-d86d7538d2d5",
               "score":1,
               "type":"Organization",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411016,
               "name":"Abraham Lincoln",
               "identifier":"http://d.opencalais.com/pershash-1/7637e23c-d48e-3ac8-ac82-6017bb3592e8",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[you'll be our Ask Me Another grand prize winner ]Abraham\\nLincoln[ is typically depicted wearing this type of hat.]\", \"prefix\"=>\"you'll be our Ask Me Another grand prize winner \", \"exact\"=>\"Abraham\\nLincoln\", \"suffix\"=>\" is typically depicted wearing this type of hat.\", \"offset\"=>37093, \"length\"=>15}]}"
            },
            {
               "id":411015,
               "name":"Brandy",
               "identifier":"http://d.opencalais.com/pershash-1/88eb302c-deba-3610-b905-40d3a1c968fb",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[drink it you know I was\\njust further in forced ]her[ entire paradigm. Yeah man you really drive it]\", \"prefix\"=>\"drink it you know I was\\njust further in forced \", \"exact\"=>\"her\", \"suffix\"=>\" entire paradigm. Yeah man you really drive it\", \"offset\"=>12916, \"length\"=>3}, {\"detection\"=>\"[all right let's go to pose a groom Mary told ]her[ that leads us to a\\ntie so we will give you a]\", \"prefix\"=>\"all right let's go to pose a groom Mary told \", \"exact\"=>\"her\", \"suffix\"=>\" that leads us to a\\ntie so we will give you a\", \"offset\"=>14858, \"length\"=>3}, {\"detection\"=>\"[Yeah you can\\ngo to our Puzzle guru Mary told ]her[ to explain what is a nice a grand sure and I]\", \"prefix\"=>\"Yeah you can\\ngo to our Puzzle guru Mary told \", \"exact\"=>\"her\", \"suffix\"=>\" to explain what is a nice a grand sure and I\", \"offset\"=>16021, \"length\"=>3}, {\"detection\"=>\"[letters so the word ice a gram is\\nitself I saw ]her[ magic now we're interested for this game and]\", \"prefix\"=>\"letters so the word ice a gram is\\nitself I saw \", \"exact\"=>\"her\", \"suffix\"=>\" magic now we're interested for this game and\", \"offset\"=>16167, \"length\"=>3}, {\"detection\"=>\"[be a comma in there somewhere. Wow\\nYou know ]she['s like be fewer Yeah you know what's going on]\", \"prefix\"=>\"be a comma in there somewhere. Wow\\nYou know \", \"exact\"=>\"she\", \"suffix\"=>\"'s like be fewer Yeah you know what's going on\", \"offset\"=>20958, \"length\"=>3}, {\"detection\"=>\"[ technology officer.\\nThat's it that's it and they ]She['s technology officer yes\\nhe would be like the]\", \"prefix\"=>\" technology officer.\\nThat's it that's it and they \", \"exact\"=>\"She\", \"suffix\"=>\"'s technology officer yes\\nhe would be like the\", \"offset\"=>22024, \"length\"=>3}]}"
            },
            {
               "id":411014,
               "name":"shopkeeper",
               "identifier":"http://d.opencalais.com/genericHasher-1/3478647a-2d22-31de-b54f-493bb1c0384c",
               "score":1,
               "type":"Position",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[ know what maybe you should go home and\\nit's been ]a shopkeeper[ Che how many lies in a strange way\\nwe well we]\", \"prefix\"=>\" know what maybe you should go home and\\nit's been \", \"exact\"=>\"a shopkeeper\", \"suffix\"=>\" Che how many lies in a strange way\\nwe well we\", \"offset\"=>13626, \"length\"=>12}]}"
            },
            {
               "id":411013,
               "name":"Kevin Costner",
               "identifier":"http://d.opencalais.com/pershash-1/0494c928-d223-3228-8dde-4b9f73fb4904",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411012,
               "name":"Gordon Ramsay",
               "identifier":"http://d.opencalais.com/pershash-1/5d40a826-a1fb-3e61-9ce3-3c9e8ada45fc",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411011,
               "name":"Omar Sharif",
               "identifier":"http://d.opencalais.com/pershash-1/a45f2991-9411-3842-9f96-f4c026f24dda",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411010,
               "name":"Maritime Administration",
               "identifier":"http://d.opencalais.com/genericHasher-1/0a657599-f067-383a-8ae7-4c6c203bae88",
               "score":1,
               "type":"Organization",
               "category":"entity",
               "extra":"{\"matches\"=>[{\"detection\"=>\"[we go. Acting associate administrator\\nfor the ]administration[ for the Maritime Administration.\\nBy God I'll say]\", \"prefix\"=>\"we go. Acting associate administrator\\nfor the \", \"exact\"=>\"administration\", \"suffix\"=>\" for the Maritime Administration.\\nBy God I'll say\", \"offset\"=>19984, \"length\"=>14}]}"
            },
            {
               "id":411009,
               "name":"Sandra Bullock",
               "identifier":"http://d.opencalais.com/pershash-1/7a135dbf-8b1b-3c0a-ab0a-b828e07298f7",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            },
            {
               "id":411008,
               "name":"Bobby Fischer",
               "identifier":"http://d.opencalais.com/pershash-1/96b6d83f-e977-3065-9b01-80cd202558a3",
               "score":1,
               "type":"Person",
               "category":"entity",
               "extra":"{}"
            }
         ],
         "extra":{
            "itunes_episode":"350569108"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/18915",
            "ui":"https://www.audiosear.ch/a/49e3/teen-angstagrams"
         },
         "categories":[
            {
               "id":1,
               "parent_id":null,
               "name":"Comedy",
               "name_lc":"comedy"
            },
            {
               "id":5,
               "parent_id":null,
               "name":"Society & Culture",
               "name_lc":"society & culture"
            },
            {
               "id":43,
               "parent_id":2,
               "name":"Games & Hobbies",
               "name_lc":"games & hobbies"
            }
         ],
         "highlights":{

         }
      },
      {
         "id":5332,
         "title":"34 - Ali Shaheed Muhammad (A Tribe Called Quest)",
         "description":"Couldn't be happier to share this episode with you guys--- my guest this week is Ali Shaheed Muhammad, DJ, producer, and founding member of A Tribe Called Quest !!! We talked about Brooklyn in 2015, Los Angeles in 1989, his own podcast \"Microphone Check\", touring, making music, and much much more.\n\nAs always, my email is noeffectsshow@gmail.com ",
         "date_created":"2015-04-28",
         "identifier":"https://api.soundcloud.com/tracks/202953552",
         "digital_location":"http://soundcloud.com/no-effects/34-ali-shaheed-muhammad-a-tribe-called-quest",
         "physical_location":"soundcloud",
         "duration":4190,
         "tags":[
            "ali shaheed muhammad",
            "Podcast",
            "no effects",
            "jesse cohen",
            "A Tribe Called Quest"
         ],
         "updated_at":"2015-09-03 10:17:12 UTC",
         "itunes_episode":"340909165",
         "date_added":"2015-04-29 09:07:07 UTC",
         "show_id":329,
         "show_title":"No Effects",
         "audio_files":[
            {
               "id":5331,
               "duration":4189,
               "start_time": 116,
               "url":[
                  "https://www.audiosear.ch/media/audio_file/14d3/stream.mp3",
                  "https://www.audiosear.ch/media/audio_file/14d3/stream.ogg"
               ]
            }
         ],
         "image_files":[
            {
               "url":{
                  "full":"https://i1.sndcdn.com/avatars-000069631557-0bj4it-t500x500.jpg",
                  "thumb":"https://i1.sndcdn.com/avatars-000069631557-0bj4it-large.jpg"
               }
            }
         ],
         "entities":[
            {
               "id":174030,
               "name":"Earl Sweatshirt",
               "identifier":"http://d.opencalais.com/pershash-1/2d7f9693-b963-3aeb-bb13-816d2ee27551",
               "score":0.037037037037037,
               "type":"Person",
               "category":"entity",
               "extra":"---\nrentities:\n- American atheists\n- American people of South African descent\n- 1994 births\n- Living people\n- South African rappers\n- OFWGKTA members\n- American rappers\n- Horrorcore artists\n- People self-identifying as substance abusers\n"
            },
            {
               "id":174027,
               "name":"Jimmy Kimmel",
               "identifier":"http://d.opencalais.com/pershash-1/280079ec-a23d-34c6-a4f1-26ddc1ad6854",
               "score":0.037037037037037,
               "type":"Person",
               "category":"entity",
               "extra":"---\nrentities:\n- American people of German descent\n- Radio personalities from the Las Vegas Valley\n- American television talk show hosts\n- American radio personalities\n- Living people\n- People from Brooklyn\n- American people of Italian descent\n- American television writers\n- 1967 births\n- American comedians\n- Actors from Nevada\n- University of Nevada, Las Vegas alumni\n- American people of Irish descent\n- American film actors\n- American television producers\n- Actors from New York City\n- American television actors\n- American game show hosts\n"
            },
            {
               "id":174052,
               "name":"Media",
               "identifier":null,
               "score":0.950704,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Media\n"
            },
            {
               "id":174051,
               "name":"Music",
               "identifier":null,
               "score":0.967213,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Music\n"
            },
            {
               "id":174050,
               "name":"Arts and Entertainment",
               "identifier":null,
               "score":0.979008,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Arts & Entertainment\n"
            },
            {
               "id":174049,
               "name":"Human Interest",
               "identifier":null,
               "score":0.791,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Human Interest\n"
            },
            {
               "id":174048,
               "name":"Entertainment and Culture",
               "identifier":null,
               "score":0.978,
               "type":null,
               "category":"topic",
               "extra":"---\noriginal: Entertainment_Culture\n"
            },
            {
               "id":174047,
               "name":"New York",
               "identifier":"http://d.opencalais.com/genericHasher-1/9f45e0f5-aa73-39b8-b39e-2a1546da820a",
               "score":0.821657840239309,
               "type":"City",
               "category":"location",
               "extra":"--- {}\n"
            },
            {
               "id":174046,
               "name":"Colorado",
               "identifier":"http://d.opencalais.com/genericHasher-1/096a73ce-884f-33d7-9375-ac1c8ec74b16",
               "score":0.333333333333333,
               "type":"Province Or State",
               "category":"location",
               "extra":"---\nlatitude: '39.0473491002'\nlongitude: '-105.465397491'\ncountry: United States\n"
            },
            {
               "id":174045,
               "name":"West Coast",
               "identifier":"http://d.opencalais.com/genericHasher-1/b5efd66f-e3b6-34f3-894e-93f0e2221b2d",
               "score":0.210309917857152,
               "type":"Region",
               "category":"location",
               "extra":"--- {}\n"
            },
            {
               "id":174044,
               "name":"New York City",
               "identifier":"http://d.opencalais.com/genericHasher-1/83519291-578e-3651-9517-b86e5d5df944",
               "score":0.333333333333333,
               "type":"City",
               "category":"location",
               "extra":"---\nlatitude: '40.7142'\nlongitude: '-74.0064'\ncountry: United States\nstate: New York\n"
            },
            {
               "id":174043,
               "name":"East Coast",
               "identifier":"http://d.opencalais.com/genericHasher-1/f6b5cf4d-aeab-38f3-b3c7-ed835341a13e",
               "score":0.210309917857152,
               "type":"Natural Feature",
               "category":"location",
               "extra":"---\nmatches:\n- detection: |-\n    [we were just so different and this is\n    before ]the East Coast[ versus West Coast. We had Africa\n    Islam who was]\n  prefix: \"we were just so different and this is\\nbefore \"\n  exact: the East Coast\n  suffix: |2-\n     versus West Coast. We had Africa\n    Islam who was\n  offset: 10759\n  length: 14\n- detection: |-\n    [artists from this side\n    that you know maybe from ]the East Coast[ it didn't really it wasn't exposed in the\n    same]\n  prefix: \"artists from this side\\nthat you know maybe from \"\n  exact: the East Coast\n  suffix: |2-\n     it didn't really it wasn't exposed in the\n    same\n  offset: 24345\n  length: 14\n"
            },
            {
               "id":174042,
               "name":"East Coast",
               "identifier":"http://d.opencalais.com/genericHasher-1/b298add8-25a1-3660-8619-cac3420884ff",
               "score":0.210309917857152,
               "type":"Region",
               "category":"location",
               "extra":"--- {}\n"
            },
            {
               "id":174041,
               "name":"Los Angeles",
               "identifier":"http://d.opencalais.com/genericHasher-1/874eaab9-7b66-36e3-9650-8de7a5001cf9",
               "score":0.590414583053807,
               "type":"City",
               "category":"location",
               "extra":"---\nmatches:\n- detection: |-\n    [yes I'm sitting in your hotel room here in ]Los\n    Angeles[. It's also your studio right now\n    and you said]\n  prefix: 'yes I''m sitting in your hotel room here in '\n  exact: |-\n    Los\n    Angeles\n  suffix: |-\n    . It's also your studio right now\n    and you said\n  offset: 1386\n  length: 11\n- detection: |-\n    [most of the music industry is operating out of ]Los\n    Angeles[ now in America at least a figure well let me go]\n  prefix: 'most of the music industry is operating out of '\n  exact: |-\n    Los\n    Angeles\n  suffix: ' now in America at least a figure well let me go'\n  offset: 2839\n  length: 11\n- detection: |-\n    [have you found being out here inspired by ]Los\n    Angeles[ I'm inspired by the calm and quiet\n    that comes]\n  prefix: 'have you found being out here inspired by '\n  exact: |-\n    Los\n    Angeles\n  suffix: |2-\n     I'm inspired by the calm and quiet\n    that comes\n  offset: 7346\n  length: 11\nlatitude: '34.0522'\nlongitude: '-118.2428'\ncountry: United States\nstate: California\n"
            },
            {
               "id":174040,
               "name":"West Coast",
               "identifier":"http://d.opencalais.com/genericHasher-1/fd9d4db3-5eb9-3259-acc0-ac25259e5d10",
               "score":0.210309917857152,
               "type":"Natural Feature",
               "category":"location",
               "extra":"--- {}\n"
            },
            {
               "id":174039,
               "name":"New York",
               "identifier":null,
               "score":0.507784545267893,
               "type":"Place",
               "category":"entity",
               "extra":"---\nwikipedia_url: http://en.wikipedia.com/wiki/New_York\n"
            },
            {
               "id":174038,
               "name":"energy",
               "identifier":"http://d.opencalais.com/genericHasher-1/05bb2646-0ab8-3a48-b4eb-d29cfd33ce39",
               "score":0.210309917857152,
               "type":"Industry Term",
               "category":"entity",
               "extra":"--- {}\n"
            },
            {
               "id":174037,
               "name":"engineer",
               "identifier":"http://d.opencalais.com/genericHasher-1/d14be7b7-bdab-3153-9c43-3c0e5215bb8a",
               "score":0.630929753571457,
               "type":"Position",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: |-\n    [ just someone who just really\n    thinks that they're ]an engineer[ and they're there as in the service\n    position but]\n  prefix: \" just someone who just really\\nthinks that they're \"\n  exact: an engineer\n  suffix: |2-\n     and they're there as in the service\n    position but\n  offset: 40878\n  length: 11\n- detection: |-\n    [even use of the huge\n    Eagles and it's like I'm ]the engineer[ I'm not even a\n    human being to you anymore so I'm]\n  prefix: \"even use of the huge\\nEagles and it's like I'm \"\n  exact: the engineer\n  suffix: |2-\n     I'm not even a\n    human being to you anymore so I'm\n  offset: 41871\n  length: 12\n"
            },
            {
               "id":174036,
               "name":"Gestapo",
               "identifier":"http://d.opencalais.com/genericHasher-1/d3aee35e-5927-3546-89f0-e50101a84386",
               "score":0.037037037037037,
               "type":"Organization",
               "category":"entity",
               "extra":"--- {}\n"
            },
            {
               "id":174035,
               "name":"keyboardist",
               "identifier":"http://d.opencalais.com/genericHasher-1/c7aef142-3dbd-3c46-a4df-6123a31c79c5",
               "score":0.037037037037037,
               "type":"Position",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: |-\n    [ know and I just asked him if I could take\n    one of ]the keyboardist[ monitors which was right behind me flip it]\n  prefix: \" know and I just asked him if I could take\\none of \"\n  exact: the keyboardist\n  suffix: ' monitors which was right behind me flip it'\n  offset: 42840\n  length: 15\n"
            },
            {
               "id":174034,
               "name":"vitamin D",
               "identifier":"http://d.opencalais.com/genericHasher-1/81095b37-0d47-39da-9e8a-d8d8b097fedc",
               "score":0.037037037037037,
               "type":"Product",
               "category":"entity",
               "extra":"--- {}\n"
            },
            {
               "id":174033,
               "name":"Butler",
               "identifier":"http://d.opencalais.com/genericHasher-1/fd98f752-93d3-3ff1-ba70-42972b13b787",
               "score":0.037037037037037,
               "type":"Position",
               "category":"entity",
               "extra":"--- {}\n"
            },
            {
               "id":174032,
               "name":"drummer",
               "identifier":"http://d.opencalais.com/genericHasher-1/9a3c6d03-186b-3314-8ab8-0cc3e8065d64",
               "score":0.210309917857152,
               "type":"Position",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: |-\n    [the D.J. in a rap group\n    is in some ways like ]the drummer[ I feel like you know so\n    I'm just drawn that line]\n  prefix: \"the D.J. in a rap group\\nis in some ways like \"\n  exact: the drummer\n  suffix: |2-\n     I feel like you know so\n    I'm just drawn that line\n  offset: 30821\n  length: 11\n"
            },
            {
               "id":174031,
               "name":"politician",
               "identifier":"http://d.opencalais.com/genericHasher-1/724ba748-8002-32e5-abce-5960d80dfae8",
               "score":0.037037037037037,
               "type":"Position",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: |-\n    [one of them and say thank you for you it's like ]a politician[.\n    Yeah it's just you know ISIS unlike my Eagles]\n  prefix: 'one of them and say thank you for you it''s like '\n  exact: a politician\n  suffix: |-\n    .\n    Yeah it's just you know ISIS unlike my Eagles\n  offset: 45055\n  length: 12\n"
            },
            {
               "id":174029,
               "name":"journalist",
               "identifier":"http://d.opencalais.com/genericHasher-1/4da0da39-6aa7-3d57-828e-02d6b6998ab2",
               "score":0.543643251190486,
               "type":"Position",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: |-\n    [learning experience for me because I'm not ]a journalist[ I don't go to any\n    journalism school. And in]\n  prefix: 'learning experience for me because I''m not '\n  exact: a journalist\n  suffix: |2-\n     I don't go to any\n    journalism school. And in\n  offset: 17555\n  length: 12\n- detection: |-\n    [been able to.\n    I still have a chance to. I'm not ]a journalist[ so if I get something out of order or]\n  prefix: \"been able to.\\nI still have a chance to. I'm not \"\n  exact: a journalist\n  suffix: ' so if I get something out of order or'\n  offset: 21198\n  length: 12\n- detection: |-\n    [that could still happen but I'm not not as ]a journalist[ just as a guy\n    who's like a fan and is doing]\n  prefix: 'that could still happen but I''m not not as '\n  exact: a journalist\n  suffix: |2-\n     just as a guy\n    who's like a fan and is doing\n  offset: 21308\n  length: 12\n"
            },
            {
               "id":174028,
               "name":"bank",
               "identifier":"http://d.opencalais.com/genericHasher-1/6c8d4d6b-9026-39f0-8967-42d22a408453",
               "score":0.037037037037037,
               "type":"Industry Term",
               "category":"entity",
               "extra":"--- {}\n"
            },
            {
               "id":174026,
               "name":"rapper",
               "identifier":"http://d.opencalais.com/genericHasher-1/f4a8f829-1808-38c9-9fe5-fa264ff99feb",
               "score":0.210309917857152,
               "type":"Position",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: |-\n    [Go beneath\n    the perception of what you think of ]a rapper[ or you think of the\n    person or you think of what]\n  prefix: \"Go beneath\\nthe perception of what you think of \"\n  exact: a rapper\n  suffix: |2-\n     or you think of the\n    person or you think of what\n  offset: 18818\n  length: 8\n"
            },
            {
               "id":174025,
               "name":"artist",
               "identifier":"http://d.opencalais.com/genericHasher-1/5a5e4ce5-5f85-3f1c-ad2d-c816cf155690",
               "score":0.876976584523819,
               "type":"Position",
               "category":"entity",
               "extra":"---\nmatches:\n- detection: |-\n    [the surface like meaning less aspect of\n    ]an artist[ and I think an opportunity is missed to really]\n  prefix: |\n    the surface like meaning less aspect of\n  exact: an artist\n  suffix: ' and I think an opportunity is missed to really'\n  offset: 18631\n  length: 9\n- detection: |-\n    [ a\n    different view.\n    That.\n    Was my own limitation as ]an artist[ as well you know and so being in]\n  prefix: \" a\\ndifferent view.\\nThat.\\nWas my own limitation as \"\n  exact: an artist\n  suffix: ' as well you know and so being in'\n  offset: 20137\n  length: 9\n- detection: |-\n    [Microphone Check that we did that and we\n    made ]the artist[ and not just the artist as anyone who has some]\n  prefix: \"Microphone Check that we did that and we\\nmade \"\n  exact: the artist\n  suffix: ' and not just the artist as anyone who has some'\n  offset: 20885\n  length: 10\n- detection: |-\n    [we did that and we\n    made the artist and not just ]the artist[ as anyone who has some sort of a tie\n    in]\n  prefix: \"we did that and we\\nmade the artist and not just \"\n  exact: the artist\n  suffix: |2-\n     as anyone who has some sort of a tie\n    in\n  offset: 20909\n  length: 10\n- detection: |-\n    [these kind of conversations I think when you\n    as ]an artist[ when you write a song and you put it out on the]\n  prefix: \"these kind of conversations I think when you\\nas \"\n  exact: an artist\n  suffix: ' when you write a song and you put it out on the'\n  offset: 21748\n  length: 9\n- detection: |-\n    [creating more space to sort of hear the\n    R hear ]the artist[ talk about what they think it is. Their music is]\n  prefix: \"creating more space to sort of hear the\\nR hear \"\n  exact: the artist\n  suffix: ' talk about what they think it is. Their music is'\n  offset: 22799\n  length: 10\n- detection: |-\n    [do take it seriously and I do know that we want ]an\n    artist[ to. Speak in a way it may not be speaking\n    in in]\n  prefix: 'do take it seriously and I do know that we want '\n  exact: |-\n    an\n    artist\n  suffix: |2-\n     to. Speak in a way it may not be speaking\n    in in\n  offset: 24611\n  length: 9\n- detection: |-\n    [have been in New York City and I know\n    that ]an artist[ may be hit in a circuit so they did all the the]\n  prefix: \"have been in New York City and I know\\nthat \"\n  exact: an artist\n  suffix: ' may be hit in a circuit so they did all the the'\n  offset: 25049\n  length: 9\n- detection: |-\n    [what I'm doing you\n    know other than I know I'm ]an artist[ and I know I would like for someone to]\n  prefix: \"what I'm doing you\\nknow other than I know I'm \"\n  exact: an artist\n  suffix: ' and I know I would like for someone to'\n  offset: 25488\n  length: 9\n- detection: |-\n    [just like having her\n    perspective like she's not ]an artist[ but she is an artist in my\n    opinion you know in]\n  prefix: \"just like having her\\nperspective like she's not \"\n  exact: an artist\n  suffix: |2-\n     but she is an artist in my\n    opinion you know in\n  offset: 25819\n  length: 9\n- detection: |-\n    [like she's not an artist but she is ]an artist[ in my\n    opinion you know in the way that she]\n  prefix: 'like she''s not an artist but she is '\n  exact: an artist\n  suffix: |2-\n     in my\n    opinion you know in the way that she\n  offset: 25840\n  length: 9\n- detection: |-\n    [ really completely told and with every album that\n    ]an artist[ released is something new that's revealed and]\n  prefix: |2\n     really completely told and with every album that\n  exact: an artist\n  suffix: ' released is something new that''s revealed and'\n  offset: 26974\n  length: 9\n- detection: |-\n    [takes on a new new meaning and then you as ]an artist[ you\n    may accept that or you may not you may see]\n  prefix: 'takes on a new new meaning and then you as '\n  exact: an artist\n  suffix: |2-\n     you\n    may accept that or you may not you may see\n  offset: 27231\n  length: 9\n- detection: |-\n    [there's a lot that you could misconstrue about ]an artist[\n    and so it's someone who's reaching out and]\n  prefix: 'there''s a lot that you could misconstrue about '\n  exact: an artist\n  suffix: |2-\n\n    and so it's someone who's reaching out and\n  offset: 27777\n  length: 9\n"
            },
            {
               "id":174024,
               "name":"Mayor",
               "identifier":"http://d.opencalais.com/genericHasher-1/5ec709f3-8447-3db2-a70a-b4aff43a699a",
               "score":0.037037037037037,
               "type":"Position",
               "category":"entity",
               "extra":"--- {}\n"
            },
            {
               "id":174023,
               "name":"ISIS",
               "identifier":"http://d.opencalais.com/genericHasher-1/2a294103-bb30-374c-8ff7-d7da9fa9f258",
               "score":0.037037037037037,
               "type":"Operating System",
               "category":"entity",
               "extra":"--- {}\n"
            }
         ],
         "extra":{
            "itunes_episode":"340909165"
         },
         "urls":{
            "self":"https://www.audiosear.ch/api/episodes/5332",
            "ui":"https://www.audiosear.ch/a/14d4/34--ali-shaheed-muhammad-a-tribe-called-quest"
         },
         "categories":[
            {
               "id":16,
               "parent_id":6,
               "name":"Music",
               "name_lc":"music"
            },
            {
               "id":5,
               "parent_id":null,
               "name":"Society & Culture",
               "name_lc":"society & culture"
            }
         ],
         "highlights":{

         }
      }
   ]
};
'use strict';

angular.module('queueCastApp')
.directive('audioQc', AudioDirective);

// function AudioDirective() {
function AudioDirective(EpisodesService) {

	return {
		restrict: 'E',
		scope: {
			isPlaying: '='
		},
		template:'',
		link: function(scope, elem, attr) {
			// scope.epService = EpisodesService;
			EpisodesService.resetQueue();
			EpisodesService.clearAudioDecks();

			// scope.initPlayback();
			EpisodesService.playNext();
		},

		controller: function($scope) {
		}
	}
}
'use strict';

angular.module('queueCastApp')
  .factory('APIPortalFactory', APIPortalFactory);

 function APIPortalFactory () {
 	var factory = {};

 	factory.initWithCategories = function(categories) {
 		//assumes categories are an array of objects
 		// similar to the one in CategoryService
 		_.pluck(categories, 'name');

 		$http('get', URL)
 	};

 	return factory;
 }
'use strict';

angular.module('queueCastApp')
.filter('secondsToDateTime', function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
});
// modifying part of the p5sjs p5sdom addon library
// https://github.com/processing/p5sjs/blob/master/lib/addons/p5sdom.js

  var p5AudioElt = function(src, callback) {
    var elt = document.createElement('audio');
    if (typeof src === 'string') {
      src = [src];
    }
    if (typeof (src) !== 'undefined') {
      for (var i=0; i<src.length; i++) {
        var source = document.createElement('source');
        source.src = src[i];
        elt.appendChild(source);
      }
    }
    if (typeof callback !== 'undefined') {
      elt.addEventListener('canplaythrough', function() {
        callback();
      });
    }

    elt.preload = 'auto';
    this.elt = elt;
    this._prevTime = 0;
    this._cueIDCounter = 0;
    this._cues = [];

    return this;
  };

  p5AudioElt.prototype.load = function() {
    this.elt.load()
  };

  /**
   *  reset the audio source
   */
  p5AudioElt.prototype.src = function(src) {
    this.elt.src = src;
  };

  /**
   * Play an HTML5 media element.
   *
   * @method play
   * @return {Object/p5s.Element}
   */
  p5AudioElt.prototype.play = function() {
    if (this.elt.currentTime === this.elt.duration) {
      this.elt.currentTime = 0;
    }

    if (this.elt.readyState > 1) {
      this.elt.play();
    } else {
      // in Chrome, playback cannot resume after being stopped and must reload
      this.elt.load();
      this.elt.play();
    }
    return this;
  };

  /**
   * Stops an HTML5 media element (sets current time to zero).
   *
   * @method stop
   * @return {Object/p5sElement}
   */
  p5AudioElt.prototype.stop = function() {
    if (this.elt) {
      this.elt.currentTime = 0;
      this.elt.pause();
    }
    return this;
  };

  /**
   * Pauses an HTML5 media element.
   *
   * @method pause
   * @return {Object/p5sElement}
   */
  p5AudioElt.prototype.pause = function() {
    this.elt.pause();
    return this;
  };

  /**
   * Set 'loop' to true for an HTML5 media element, and starts playing.
   *
   * @method loop
   * @return {Object/p5sElement}
   */
  p5AudioElt.prototype.loop = function() {
    this.elt.setAttribute('loop', true);
    this.play();
    return this;
  };
  /**
   * Set 'loop' to false for an HTML5 media element. Element will stop
   * when it reaches the end.
   *
   * @method noLoop
   * @return {Object/p5sElement}
   */
  p5AudioElt.prototype.noLoop = function() {
    this.elt.setAttribute('loop', false);
    return this;
  };


  /**
   * Set HTML5 media element to autoplay or not.
   *
   * @method autoplay
   * @param {Boolean} autoplay whether the element should autoplay
   * @return {Object/p5sElement}
   */
  p5AudioElt.prototype.autoplay = function(val) {
    this.elt.setAttribute('autoplay', val);
    return this;
  };

  /**
   * Sets volume for this HTML5 media element. If no argument is given,
   * returns the current volume.
   *
   * @param {Number}            [val] volume between 0.0 and 1.0
   * @return {Number|p5AudioElt} current volume or p5AudioElt
   * @method volume
   */
  p5AudioElt.prototype.volume = function(val) {
    if (typeof val === 'undefined') {
      return this.elt.volume;
    } else {
      this.elt.volume = val;
    }
  };

  /**
   * If no arguments are given, returns the current time of the elmeent.
   * If an argument is given the current time of the element is set to it.
   *
   * @method time
   * @param {Number} [time] time to jump to (in seconds)
   * @return {Number|Object/p5AudioElt} current time (in seconds)
   *                                  or p5AudioElt
   */
  p5AudioElt.prototype.time = function(val) {
    if (typeof val === 'undefined') {
      return this.elt.currentTime;
    } else {
      try {
        this.elt.currentTime = val;
      } catch(e) {
        console.log(e);
        console.log(this.elt);
      }
    }
  };

  /**
   * Returns the duration of the HTML5 media element.
   *
   * @method duration
   * @return {Number} duration
   */
  p5AudioElt.prototype.duration = function() {
    return this.elt.duration;
  };

  /*** CONNECT TO WEB AUDIO API / p5ssound.js ***/

  /**
   *  Send the audio output of this element to a specified audioNode or
   *  p5ssound object. If no element is provided, connects to p5ss master
   *  output. That connection is established when this method is first called.
   *  All connections are removed by the .disconnect() method.
   *  
   *  This method is meant to be used with the p5ssound.js addon library.
   *
   *  @method  connect
   *  @param  {AudioNode|p5ssound object} audioNode AudioNode from the Web Audio API,
   *  or an object from the p5ssound library
   */
  p5AudioElt.prototype.connect = function(obj) {
    var audioContext, masterOutput;

    // if p5ssound exists, same audio context
    if (p5 && typeof p5.prototype.getAudioContext === 'function') {
      audioContext = p5sprototype.getAudioContext(); 
      masterOutput = p5ssoundOut.input;
    } else {
      try {
        audioContext = obj.context;
        masterOutput = audioContext.destination
      } catch(e) {
        throw 'connect() is meant to be used with Web Audio API or p5ssound.js'
      }
    }

    // create a Web Audio MediaElementAudioSourceNode if none already exists
    if (!this.audioSourceNode) {
      this.audioSourceNode = audioContext.createMediaElementSource(this.elt);

      // connect to master output when this method is first called
      this.audioSourceNode.connect(masterOutput);
    }

    // connect to object if provided
    if (obj) {
      if (obj.input) {
        this.audioSourceNode.connect(obj.input);
      } else {
        this.audioSourceNode.connect(obj);
      }
    }

    // otherwise connect to master output of p5ssound / AudioContext
    else {
      this.audioSourceNode.connect(masterOutput);
    }

  };

  /**
   *  Disconnect all Web Audio routing, including to master output.
   *  This is useful if you want to re-route the output through
   *  audio effects, for example.
   *  
   *  @method  disconnect
   */
  p5AudioElt.prototype.disconnect = function() {
    if (this.audioSourceNode) {
      this.audioSourceNode.disconnect();
    } else {
      throw 'nothing to disconnect';
    }
  };


  /*** SHOW / HIDE CONTROLS ***/

  /**
   *  Show the default MediaElement controls, as determined by the web browser.
   *
   *  @method  showControls
   */
  p5AudioElt.prototype.showControls = function() {
    // must set style for the element to show on the page
    this.elt.style['text-align'] = 'inherit';
    this.elt.controls = true;
  };

  /**
   *  Hide the default mediaElement controls.
   *  
   *  @method hideControls
   */
  p5AudioElt.prototype.hideControls = function() {
    this.elt.controls = false;
  };

  /*** SCHEDULE EVENTS ***/

  /**
   *  Schedule events to trigger every time a MediaElement
   *  (audio/video) reaches a playback cue point.
   *
   *  Accepts a callback function, a time (in seconds) at which to trigger
   *  the callback, and an optional parameter for the callback.
   *
   *  Time will be passed as the first parameter to the callback function,
   *  and param will be the second parameter.
   *
   *
   *  @method  addCue
   *  @param {Number}   time     Time in seconds, relative to this media
   *                             element's playback. For example, to trigger
   *                             an event every time playback reaches two
   *                             seconds, pass in the number 2. This will be
   *                             passed as the first parameter to
   *                             the callback function.
   *  @param {Function} callback Name of a function that will be
   *                             called at the given time. The callback will
   *                             receive time and (optionally) param as its
   *                             two parameters.
   *  @param {Object} [value]    An object to be passed as the
   *                             second parameter to the
   *                             callback function.
   *  @return {Number} id ID of this cue,
   *                      useful for removeCue(id)
   *  @example
   *  <div><code>
   *  function setup() {
   *    background(255,255,255);
   *    
   *    audioEl = createAudio('assets/beat.mp3');
   *    audioEl.showControls();
   *
   *    // schedule three calls to changeBackground
   *    audioEl.addCue(0.5, changeBackground, color(255,0,0) );
   *    audioEl.addCue(1.0, changeBackground, color(0,255,0) );
   *    audioEl.addCue(2.5, changeBackground, color(0,0,255) );
   *    audioEl.addCue(3.0, changeBackground, color(0,255,255) );
   *    audioEl.addCue(4.2, changeBackground, color(255,255,0) );
   *    audioEl.addCue(5.0, changeBackground, color(255,255,0) );
   *  }
   *
   *  function changeBackground(val) {
   *    background(val);
   *  }
   *  </code></div>
   */
  p5AudioElt.prototype.addCue = function(time, callback, val) {
    var id = this._cueIDCounter++;

    var cue = new Cue(callback, time, id, val);
    this._cues.push(cue);

    if (!this.elt.ontimeupdate) {
      this.elt.ontimeupdate = this._onTimeUpdate.bind(this);
    }

    return id;
  };

  /**
   *  Remove a callback based on its ID. The ID is returned by the
   *  addCue method.
   *
   *  @method removeCue
   *  @param  {Number} id ID of the cue, as returned by addCue
   */
  p5AudioElt.prototype.removeCue = function(id) {
    for (var i = 0; i < this._cues.length; i++) {
      var cue = this._cues[i];
      if (cue.id === id) {
        this.cues.splice(i, 1);
      }
    }

    if (this._cues.length === 0) {
      this.elt.ontimeupdate = null
    }
  };

  /**
   *  Remove all of the callbacks that had originally been scheduled
   *  via the addCue method.
   *
   *  @method  clearCues
   */
  p5AudioElt.prototype.clearCues = function() {
    this._cues = [];
    this.elt.ontimeupdate = null;
  };

  // private method that checks for cues to be fired if events
  // have been scheduled using addCue(callback, time).
  p5AudioElt.prototype._onTimeUpdate = function() {
    var playbackTime = this.time();

    for (var i = 0 ; i < this._cues.length; i++) {
      var callbackTime = this._cues[i].time;
      var val = this._cues[i].val;


      if (this._prevTime < callbackTime && callbackTime <= playbackTime) {

        // pass the scheduled callbackTime as parameter to the callback
        this._cues[i].callback(val);
      }

    }

    this._prevTime = playbackTime;
  };


  // Cue inspired by JavaScript setTimeout, and the
  // Tone.js Transport Timeline Event, MIT License Yotam Mann 2015 tonejs.org
  var Cue = function(callback, time, id, val) {
    this.callback = callback;
    this.time = time;
    this.id = id;
    this.val = val;
  };
'use strict';

angular.module('queueCastApp')
  .service('CategoriesService', CategoriesService);

//Names are categories come from Audiosearch except Motivation and Feel, text is what shows up in Categories  View
//Change names as needed, name will pull the playlist
function CategoriesService() {
	this.categoreies = [{'name': 'Education', 'text': 'Learn', 'image':'images/learn.8509d3aa.svg'}, {'name': 'Comedy', 'text': 'Laugh', 'image':'images/laugh.98b99aa8.svg'}, {'name':'Technology', 'text': 'See the Future', 'image':'images/seeTheFuture.12a840f2.svg'},{'name':'Motivation', 'text': 'Get Inspired', 'image':'images/getInspired.bb22acf9.svg'}, {'name': 'Emotion', 'text':'Feel', 'image':'images/feel.c5f60ad9.svg'}];

	this.getCategories = function () {
		return this.categoreies;
	};

}
'use strict';

angular.module('queueCastApp')
  .service('EpisodesService', EpisodesService);

function EpisodesService($timeout) {
	this.toView = [];

  // index of the currently playing episode
  this.epIndex = 0;

	// this.episodeQueue = [];
  this.episodeQueue = getFakeEpisodes();
  this.likedEpisodes = [];

  this.audioDecks = [new p5AudioElt(), new p5AudioElt()];


	//TODO: add lodash for this
	// this.likeEpisode = function (id) {
	// 	//remove from toView list
	// 	//send to API as liked
	// 	//deal with API response (maybe)
	// 	//add to episodeQueue maybe
	// };

  var _this = this;
  this.uiTriggerNext = function(like) {
    // if it was liked, add to the likedEpisodes
    if (like) {
      $timeout(function() {_this.likedEpisodes.push(_this.episodeQueue[_this.epIndex]);});
      console.log(_this.likedEpisodes);
    }
    _this.playNext();
  };

	this.getNextEpisodes = function () {
		return getFakeEpisodes();
	};

	this.getEpisodeQueue = function () {
		return getFakeEpisodes();
	};

  this.resetQueue = function() {
    this.epIndex = 0;
    this.cueIndex = 0;
  };

  this.clearAudioDecks = function() {
    for (var i = 0; i < this.audioDecks.length; i++) {
      this.audioDecks[i].stop();
    }
    this.loadDeck(this.epIndex);
    this.loadDeck(this.epIndex + 1);
  };

  this.startPlaying = function() {
    this.isPlaying = true;
  };

  this.stopPlaying = function() {
    this.isPlaying = false;
    this.clearAudioDecks();
  };

  this.loadDeck = function(_index) {
    var q = this.episodeQueue;

    if (_index >= q.length) {
      console.log('no more to load');
      return null;
    } else {
      // which deck to use
      var i = _index % this.audioDecks.length;
      var deck = this.audioDecks[i];

      // which episode to load
      var episode = q[_index];
      if (episode.episode) {
        episode = episode.episode;
      }

      // TO DO: how do we load mp3 and start/end time

      var mp3URL = episode.audio_files[0].url[0];
      var startTime = episode.audio_files[0].start_time || 200;
      var endTime = startTime + 15;
      deck.src(mp3URL);
      deck.load();
      deck.time(startTime);
    }
  },

  this.timeIsUp = function() {
    swipeLeftAnimation();
    this.playNext().bind(this);
  };

  this.playNext = function() {
    var epQueue = this.episodeQueue;
    var audioElt = this.audioDecks[this.epIndex % 2];

    // just play the first cue (TO DO: remove this)
    var cueIndex = 0;
    clearAudioElementCues(this.audioDecks);

    // if there is another episode to play... play it!
    if (this.epIndex < epQueue.length - 1) {
      audioElt.stop();
      this.epIndex++;

      // prepare the next deck...
      this.loadDeck(this.epIndex + 1);

      // reset the deck and play it
      audioElt = this.audioDecks[this.epIndex % 2];
      audioElt.play();
      window.audioElt = audioElt;
      var ep = this.episodeQueue[this.epIndex];

      if (ep.episode) {
        ep = ep.episode;
      }

      var startTime = ep.audio_files[0].start_time || 200;
      var endTime = startTime + 15;

      audioElt.time(startTime);
      audioElt.addCue(endTime, this.timeIsUp.bind(this));
    }
    // otherwise, ...load more?
    else {
      audioElt.stop();
      // TO DO: scope.epService.loadMore();
    }
  }

}


function clearAudioElementCues(decks) {
  for (var i = 0; i < decks.length; i++) {
    decks[i].clearCues();
  }
}

function getFakeEpisodes() {
	return [
  {
    "id": 1598,
    "source": "@JesseThorn",
    "tastemaker": null,
    "text": "RT @Bullseye: \"...I wasn’t existentially prepared for this question.\" Hear Jesse Eisenberg talk about acting, anxiety &amp; his book https://t.…",
    "published": "2015-09-19T18:16:38.000Z",
    "episode": {
      "id": 18244,
      "title": "Jesse Eisenberg & Brian Regan",
      "show_id": 24,
      "show_title": "Bullseye",
      "tags": [],
      "network": "Maximum Fun",
      "audio_files": [
        {
          "id": 18035,
          "filename": "npr_440480617.mp3",
          "duration": 4239,
          "current_status": "Premium transcript complete",
          "url": [
            "http://podcastdownload.npr.org/anon.npr-podcasts/podcast/510309/440480617/npr_440480617.mp3?orgId=1&d=4226&p=510309&story=440480617&t=podcast&e=440480617&ft=pod&f=510309"
          ]
        }
      ],
      "image_urls": {
        "thumb": "https://i1.sndcdn.com/avatars-000008686540-t8984i-large.jpg",
        "full": "https://i1.sndcdn.com/avatars-000008686540-t8984i-t500x500.jpg"
      },
      "urls": {
        "self": "https://www.audiosear.ch/api/episodes/18244",
        "ui": "https://www.audiosear.ch/a/4744/jesse-eisenberg--brian-regan"
      }
    }
  },
  {
    "id": 1593,
    "source": "@pjvogt",
    "tastemaker": null,
    "text": "RT @torixoxx: Guys throwback to when I was interviewed in a Larry podcast https://t.co/j2uZ1PpIIS @PJVogt",
    "published": "2015-09-18T22:18:35.000Z",
    "episode": {
      "id": 266,
      "title": "#6 This Proves Everything",
      "show_id": 42,
      "show_title": "Reply All",
      "tags": [
        "larryshipper",
        "onedirection",
        "larry stylinson",
        "louis",
        "harry",
        "one direction",
        "keith calder",
        "eleanor calder",
        "reply all",
        "gimlet",
        "Podcast"
      ],
      "network": "Gimlet Media",
      "audio_files": [
        {
          "id": 265,
          "filename": "stream",
          "duration": 1121,
          "current_status": "Premium transcript complete",
          "url": [
            "https://api.soundcloud.com/tracks/183060239/stream?client_id=df968aa6d731e453a4a867495d1cdb4c"
          ]
        }
      ],
      "image_urls": {
        "thumb": "https://i1.sndcdn.com/artworks-000101289831-ynnme0-large.jpg",
        "full": "https://i1.sndcdn.com/artworks-000101289831-ynnme0-t500x500.jpg"
      },
      "urls": {
        "self": "https://www.audiosear.ch/api/episodes/266",
        "ui": "https://www.audiosear.ch/a/10a/6-this-proves-everything"
      }
    }
  },
  {
    "id": 1582,
    "source": "@nuncaduermo",
    "tastemaker": null,
    "text": "RT @Oyerista: Increíble esta historia by @RadioAmbulante on #SoundCloud\nhttps://t.co/8PevYtymYI",
    "published": "2015-09-18T10:33:12.000Z",
    "episode": {
      "id": 18214,
      "title": "Crónica de una muerte mal anunciada / Chronicle of a Death Wrongly Foretold",
      "show_id": 523,
      "show_title": "Radio Ambulante",
      "tags": [],
      "network": "Radio Ambulante",
      "audio_files": [
        {
          "id": 18006,
          "filename": "223925725-radioambulante-muerte-mal-anunciada.mp3",
          "duration": 1077,
          "current_status": "Premium transcript complete",
          "url": [
            "http://www.podtrac.com/pts/redirect.mp3/feeds.soundcloud.com/stream/223925725-radioambulante-muerte-mal-anunciada.mp3"
          ]
        }
      ],
      "image_urls": {
        "thumb": "https://www.audiosear.ch/media/5cb47e72ba068e9ba61ca58e3569ddba/0/thumb/image_file/14421/mza_9122813481217228261-600x600-75.jpg",
        "full": "https://www.audiosear.ch/media/23bc3f029db1a7d8be8d68a191633df3/0/public/image_file/14421/mza_9122813481217228261-600x600-75.jpg"
      },
      "urls": {
        "self": "https://www.audiosear.ch/api/episodes/18214",
        "ui": "https://www.audiosear.ch/a/4726/cr-nica-de-una-muerte-mal-anunciada--chronicle-of-a-death-wrongly-foretold"
      }
    }
  },
  {
    "id": 1552,
    "source": "@iexplorer",
    "tastemaker": null,
    "text": "RT @katienotopoulos: Twitter is been deleting those shitty parody accounts. Read this: http://t.co/8MguQLAJfq\n\nAnd listen to this: https://…",
    "published": "2015-09-16T18:19:49.000Z",
    "episode": {
      "id": 18887,
      "title": "How Does A Twitter Parody Account Work And Why Are They Vanishing?",
      "show_id": 317,
      "show_title": "Internet Explorer",
      "tags": [],
      "network": "Buzzfeed",
      "audio_files": [
        {
          "id": 18677,
          "filename": "224094701-iexplorer-who-is-deleting-all-of-the-twitter-parody-accounts.mp3",
          "duration": 1839,
          "current_status": "Premium transcript complete",
          "url": [
            "http://www.Podtrac.com/pts/redirect.mp3/http://feeds.soundcloud.com/stream/224094701-iexplorer-who-is-deleting-all-of-the-twitter-parody-accounts.mp3"
          ]
        }
      ],
      "image_urls": {
        "thumb": "https://i1.sndcdn.com/avatars-000136452961-j4nztq-large.jpg",
        "full": "https://i1.sndcdn.com/avatars-000136452961-j4nztq-t500x500.jpg"
      },
      "urls": {
        "self": "https://www.audiosear.ch/api/episodes/18887",
        "ui": "https://www.audiosear.ch/a/49c7/how-does-a-twitter-parody-account-work-and-why-are-they-vanishing"
      }
    }
  },
  {
    "id": 1528,
    "source": "@audiosearchbot",
    "tastemaker": {
      "id": 2,
      "name": "The Audio Signal",
      "type_of": "newsletter",
      "identifier": "#audiosignal",
      "description": "The Audio Signal by Dana Gerber-Margie is a weekly digest about audio: 'I am an audio archivist, which means I organize, preserve, digitize, and manage sound recordings for a large historical institution. I listen to a lot archival material, podcasts, radio shows, and audiobooks, and then curate it all for you into this little thing.'",
      "link": "http://tinyletter.com/theaudiosignal/archive",
      "img_asset": "audiosignal500.png",
      "categories": [
        "71",
        "10",
        "5"
      ],
      "created_at": "2015-08-14T20:14:17.936Z",
      "updated_at": "2015-08-14T20:14:18.388Z",
      "extra": {}
    },
    "text": "https://t.co/bxb4xV72MU #audiosignal This episode takes 6 TED talks focused on our relationship to screens...",
    "published": "2015-09-16T04:18:39.000Z",
    "episode": {
      "id": 17934,
      "title": "Screen Time - Part I",
      "show_id": 355,
      "show_title": "TED Radio Hour",
      "tags": [],
      "network": "NPROne",
      "audio_files": [
        {
          "id": 17737,
          "filename": "20150910_ted_tedpodb.mp3",
          "duration": 3726,
          "current_status": "Premium transcript complete",
          "url": [
            "http://podcastdownload.npr.org/anon.npr-mp3/npr/ted/2015/09/20150910_ted_tedpodb.mp3?orgId=1&d=3713&p=510298&story=439233253&t=podcast&e=439233253&ft=pod&f=510298"
          ]
        }
      ],
      "image_urls": {
        "thumb": "https://www.audiosear.ch/media/0054de9dd48917483a13d982b90bec58/0/thumb/image_file/5025/mza_4056289010954687262-600x600-75.jpg",
        "full": "https://www.audiosear.ch/media/62b1ebccdd4a5e7907cbc229dd9c5bd1/0/public/image_file/5025/mza_4056289010954687262-600x600-75.jpg"
      },
      "urls": {
        "self": "https://www.audiosear.ch/api/episodes/17934",
        "ui": "https://www.audiosear.ch/a/460e/screen-time--part-i"
      }
    }
  },
  {
    "id": 1529,
    "source": "@audiosearchbot",
    "tastemaker": {
      "id": 2,
      "name": "The Audio Signal",
      "type_of": "newsletter",
      "identifier": "#audiosignal",
      "description": "The Audio Signal by Dana Gerber-Margie is a weekly digest about audio: 'I am an audio archivist, which means I organize, preserve, digitize, and manage sound recordings for a large historical institution. I listen to a lot archival material, podcasts, radio shows, and audiobooks, and then curate it all for you into this little thing.'",
      "link": "http://tinyletter.com/theaudiosignal/archive",
      "img_asset": "audiosignal500.png",
      "categories": [
        "71",
        "10",
        "5"
      ],
      "created_at": "2015-08-14T20:14:17.936Z",
      "updated_at": "2015-08-14T20:14:18.388Z",
      "extra": {}
    },
    "text": "https://t.co/pvRLCOqjGv #audiosignal [About] Wordset, a collaborative online dictionary attempting to document every version of English ever",
    "published": "2015-09-16T04:18:33.000Z",
    "episode": {
      "id": 17931,
      "title": "18. Fix part II",
      "show_id": 321,
      "show_title": "The Allusionist",
      "tags": [],
      "network": "Radiotopia",
      "audio_files": [
        {
          "id": 17734,
          "filename": "Allusionist-18-Fix-part-II.mp3",
          "duration": 891,
          "current_status": "Premium transcript complete",
          "url": [
            "http://www.podtrac.com/pts/redirect.mp3/media.blubrry.com/allusionist/cdn.allusionist.prx.org/wp-content/uploads/Allusionist-18-Fix-part-II.mp3"
          ]
        }
      ],
      "image_urls": {
        "thumb": "https://i1.sndcdn.com/avatars-000123965826-q9zyz9-large.jpg",
        "full": "https://i1.sndcdn.com/avatars-000123965826-q9zyz9-t500x500.jpg"
      },
      "urls": {
        "self": "https://www.audiosear.ch/api/episodes/17931",
        "ui": "https://www.audiosear.ch/a/460b/18-fix-part-ii"
      }
    }
  }
  ];
}
'use strict';

angular.module('queueCastApp')
  .service('TagsService', TagsService);

function TagsService() {
	this.liked = [];
	this.disliked = [];
}
angular.module('queueCastApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/categories.tpl.html',
    "<div id=\"navBar\"> <div class=\"headerTitle\">Discover</div> <img src=\"images/hamburger.66412b64.png\" id=\"hamburger\"> <a href=\"/#/queue\"><img src=\"images/headphone.e983631e.png\" id=\"headphone\"></a> </div> <div class=\"categoryBody\"> <p>I want to ...</p> <div ng-repeat=\"x in catCtrl.categories\" class=\"categoryChoices\"> <a><img width=\"75\" ng-src=\"{{x.image}}\" ng-click=\"catCtrl.chooseCategory(x.name)\"></a> <p>{{x.text}}</p> </div> <p>{{catCtrl.pick}}</p> </div>"
  );


  $templateCache.put('views/queue.tpl.html',
    "<div class=\"queues-view\"> <div id=\"queueBG\"> <div class=\"headerTitle\">My Queue</div> <a href=\"/#/catetories\"><img src=\"images/hamburger.66412b64.png\" id=\"hamburger\"></a> <a href=\"/#/queue\"><img src=\"images/headphone.e983631e.png\" id=\"headphone\"></a> </div> <img src=\"images/button_play.11dafcf3.png\" id=\"playAll\"> <div class=\"queue\"> <div class=\"row\" ng-repeat=\"episode in queueCtrl.episodes\"> <div class=\"left\" style=\"background-image : url({{queueCtrl.getImageUrl(episode)}})\"></div> <div class=\"right\"> <div class=\"show-title\"> {{ queueCtrl.getShowTitle(episode) }} </div> <div class=\"episode-title\"> {{ queueCtrl.getEpisodeTitle(episode) }} </div> <div class=\"episode-duration\"> {{ queueCtrl.getDuration(episode) | secondsToDateTime | date:'HH:mm:ss' }} </div> </div> <div class=\"right-carot\"></div> </div> </div> </div>"
  );


  $templateCache.put('views/trailers.tpl.html',
    "<div> <div class=\"something\">{{tsCtrl.getLikedEpAmt()}}</div> <div id=\"navBar\"> <div class=\"headerTitle\">Discover</div> <a href=\"/#/catetories\"><img src=\"images/carot.2725438a.png\" id=\"backToProfile\"></a> <a href=\"/#/queue\"><img src=\"images/headphone.e983631e.png\" id=\"headphone\"></a> <a href=\"/#/queue\" ng-if=\"tsCtrl.getLikedEpAmt()\"> <img src=\"images/headphone_selected.fdfb1edd.png\" id=\"headphoneSelected\"> <span class=\"epi-like-amt\">{{tsCtrl.getLikedEpAmt()}}</span> </a> </div> <div id=\"container\"> <div class=\"buddy cardBG1\" style=\"display: block\" ng-repeat=\"episode in tsCtrl.episodes\"> <div class=\"avatar\" style=\"display: block; background-image: url( {{ tsCtrl.getImageUrl(episode) }} )\"></div> <div class=\"showInfo\"> <h1>{{tsCtrl.getShowTitle(episode)}}</h1> <h2>{{tsCtrl.getEpisodeTitle(episode)}}</h2> </div> <div class=\"showInfoFriends\"> <p>Friends Who Have Like This</p> <img src=\"images/friends.a35d0428.png\"> </div> <div class=\"showInfoTags\"> <p>Tags</p> <img src=\"images/tags.eb40c0f7.png\"> </div> </div> <!-- \t\t<div class=\"buddy cardBG1\" ng-repeat=\"style in tsCtrl.hitrailers track by $index\">\n" +
    "\t\t\t<div class=\"avatar\" style=\"display: block; background-image: {{ style }}\"></div>\n" +
    "\t\t</div>  --> </div> <div id=\"previewActions\"> <a id=\"yesClick\" class=\"showPointer\"><img src=\"images/button_save.7d79d43b.png\"></a> <a id=\"noClick\" class=\"showPointer\"><img src=\"images/button_skip.53ba9a11.png\"></a> <audio id=\"soundHandle\" style=\"display:none\"></audio> <audio-qc is-playing=\"tsCtrl.isPlaying\"> </audio-qc> </div> </div>"
  );

}]);
