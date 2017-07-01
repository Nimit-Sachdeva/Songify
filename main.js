
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

      var songList = ['Tamma Tamma Again','Humma Song','Nashe Si Chadh Gayi','The Breakup Song'];
      window.onload = function()
      {
        $('#song1 .song-name').text(songList[0]);
        $('#song2 .song-name').text(songList[1]);
        $('#song3 .song-name').text(songList[2]);
        $('#song4 .song-name').text(songList[3]);
        updateCurrentTime();
          setInterval(function()      //sets interval so that the current time will be updated
          {
            updateCurrentTime();
          },1000);
      }
      var fileNames=['song1.mp3','song2.mp3','song3.mp3','song4.mp3'];
      $('#song1').click(function()
      {
          var audio = document.querySelector('audio');
          var currentSong = audio.src;
          if(currentSong.search(fileNames[0]) != -1)
          {
            toggleSong();
          }
          else
          {
              audio.src = fileNames[0];
              toggleSong();
          }
      });
      $('#song2').click(function()
      {
        var audio=document.querySelector('audio');
        var currentSong=audio.src;
        if(currentSong.search(fileNames[1]) != -1)
        {
          toggleSong();
        }
        else
        {
          audio.src=fileNames[1];
          toggleSong();
        }
      });
      $('#song3').click(function()
    {
      var audio=document.querySelector('audio');
      var currentSong=audio.src;
      if (currentSong.search(fileNames[2]) != -1)
      {
          toggleSong();
      }
      else
      {
        console.log("else part");
        audio.src=fileNames[2];
        toggleSong();
      }
    });
    $('#song4').click(function()
    {
        var audio=document.querySelector('audio');
        var currentSong=audio.src;
        if (currentSong.search(fileNames[3]) != -1)
        {
            toggleSong();
        }
        else
        {
          audio.src=fileNames[3];
          toggleSong();
        }
      });
