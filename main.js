
      $('.welcome-screen button').on('click', function() {
          var name = $('#name-input').val();
          if (name.length > 2) {
              var message = "Welcome, " + name;
              $('.main .user-name').text(message);
              $('.welcome-screen').addClass('hidden');
              $('.main').removeClass('hidden');
          } else {
              $('#name-input').addClass('error');
          }
      });
    function move()           //for prograss bar moving
    {
          var elem = document.getElementsByClassName('progress-filled');
          var width = 1;
          var id = setInterval(frame, 10);
          function frame()
          {
              if (width >= 100)
              {
                  clearInterval(id);
              } else
              {
                  width++;
                  elem.style.width = width + '%';
              }
          }
      }
      function toggleSong()         //it will toggle play and pause function
      {
          var song = document.querySelector('audio');
          if (song.paused == true) {
            //move();               //for progress bar
            console.log('Playing');
            $('.play-icon').removeClass('fa-play').addClass('fa-pause');
            song.play();
          } else {
            console.log('Pausing');
            $('.play-icon').removeClass('fa-pause').addClass('fa-play');
            song.pause();
          }
      }
      $('.play-icon').on('click', function()
      {
          toggleSong();
      });
      $('body').on('keypress', function(event)
      {
            if (event.keyCode == 32)    //code for spacebar key
            {
                toggleSong();
            }
      });
      function fancyTimeFormat(time)
      {
          // Hours, minutes and seconds
          var hrs = ~~(time / 3600);      // seconds divided by 3600 = hours and ~~ is used to remove all digits after decimal(as floor function)
          var mins = ~~((time % 3600) / 60);    //modulus will give us seconds which will give mins by divide by 60
          var secs = time % 60;       //converting seconds after removing minutes out

          // Output like "1:01" or "4:03:59" or "123:03:59"
          var ret = "";

          if (hrs > 0)            //it means if hours are there i.e. more than 0.
          {
              ret += "" + hrs + ":" + (mins < 10 ? "0" : "");   //it is better to show single digit as 01 than 1 .
          }

          ret += "" + mins + ":" + (secs < 10 ? "0" : "");     //it is better to show single digit as 01 than 1 .
          ret += "" + secs;
          return ret;
      }
      function updateCurrentTime()
      {
            var song = document.querySelector('audio');
            var currentTime = Math.floor(song.currentTime);
            currentTime = fancyTimeFormat(currentTime);
            var duration = Math.floor(song.duration);
            //console.log(duration);
            duration = fancyTimeFormat(duration)
            $('.time-elapsed').text(currentTime);
            $('.song-duration').text(duration);
      }
      var songs =
          [{
              'name': 'Badri Ki Dulhania (Title Track)',
              'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
              'album': 'Badrinath ki Dulhania',
              'duration': '2:56',
             'fileName': 'song1.mp3'
          },
          {
              'name': 'Humma Song',
              'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
              'album': 'Ok Jaanu',
              'duration': '3:15',
              'fileName': 'song2.mp3'
          },
          {
              'name': 'Nashe Si Chadh Gayi',
              'artist': 'Arijit Singh',
              'album': 'Befikre',
              'duration': '2:34',
              'fileName': 'song3.mp3'
          },
          {
              'name': 'The Breakup Song',
              'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
              'album': 'Ae Dil Hai Mushkil',
              'duration': '2:29',
              'fileName': 'song4.mp3'
          }];

      function addSongNameClickEvent(songName,position)     //songName and position are just two variables
      {
          var id = '#song' + position;              // if position is one id will be #song1
          $(id).click(function()
          {
              var audio = document.querySelector('audio');
              var currentSong = audio.src;
              if(currentSong.search(songName) != -1)  //if what we got is not having the name songName is having , it will be -1 .
              {
                toggleSong();
              }
              else {
                audio.src = songName;
                toggleSong();
             }
          });
      }
      // for (var i = 0; i < fileNames.length ; i++) // we need not to write same type of lines loop is repeating them
      // {
      //     addSongNameClickEvent(fileNames[i],i)
      // }
      window.onload = function()
      {
        for(var i =0; i < songs.length;i++)
        {
          var obj = songs[i];
          var name = '#song' + (i+1);
          var song = $(name);
          song.find('.song-name').text(obj.name);   //song.find() will make our code faster by not searching data in whole html file again and again
          song.find('.song-artist').text(obj.artist);
          song.find('.song-album').text(obj.album);
          song.find('.song-length').text(obj.duration);
          addSongNameClickEvent(obj.fileName,i)
        }
        updateCurrentTime();
        setInterval(function()      //sets interval so that the current time will be updated
        {
          updateCurrentTime();
        },1000);
      }
