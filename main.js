//for constants in javascript , const keyword is used
var width = 1;
var songNumber=1;
var isPlaying=false;
var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0; // will use this soon
//objects for songs details
var songs =
[{
  'name': 'Tamma Tamma Again',
  'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
  'album': 'Badrinath ki Dulhania',
  'duration': '2:56',
  'fileName': 'song1.mp3',
  'image':'song1.jpg'
},
{
  'name': 'Humma Song',
  'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
  'album': 'Ok Jaanu',
  'duration': '3:15',
  'fileName': 'song2.mp3',
  'image':'song2.jpg'
},
{
  'name': 'Nashe Si Chadh Gayi',
  'artist': 'Arijit Singh',
  'album': 'Befikre',
  'duration': '2:34',
  'fileName': 'song3.mp3',
  'image':'song3.jpg'
},
{
  'name': 'The Breakup Song',
  'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
  'album': 'Ae Dil Hai Mushkil',
  'duration': '2:29',
  'fileName': 'song4.mp3',
  'image':'song4.jpg'
}];
        function progressMove()           //for prograss bar moving
        {
          var elem = document.getElementsByClassName('progress-filled');
          // var width = 1;
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
      $('.welcome-screen button').on('click', function() {
          var name = $('#name-input').val();
          if (name.length > 3) {          //min Characters should be 3 otherwise error
              var message = "Welcome, " + name;
              $('.main .user-name').text(message);
              $('.welcome-screen').addClass('hidden');
              $('.main').removeClass('hidden');
          } else {
            var text = $('#name-input');
              $('#name-input').addClass('error');
              var wrong="Error: Minimum Characters should be more than 3";
              $('.welcome-screen .wrong').text(wrong);

          }
      });
      function timeJump()       //jumps the song for less than 5 seconds than duration
      {
        var song = document.querySelector('audio');
         song.currentTime = song.duration - 5;
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
      {     var target=event.target;
            if (event.keyCode == 32 && target.tagName != 'INPUT')    //code for spacebar key which will toggle Song is it is not on input
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

      function changeCurrentNameDetails(songObj)        // for getting song details like name and album name and album art
      {
        $('.current-song-image').attr('src','img/'+songObj.image);
        $('.current-song-name').text(songObj.name);
        $('.current-song-album').text(songObj.album);
      }

      function addSongNameClickEvent(songObj,position)     //songName and position are just two variables
      {
          var songName=songObj.fileName;
          var id = '#song' + position;              // if position is one id will be #song1
          $(id).click(function()
          {

              var audio = document.querySelector('audio');
              var currentSong = audio.src;
              //if(currentSong.search(songName) != -1)  //if what we got is not having the name songName is having , it will be -1 .
              if(songNumber !== position)
              {
                audio.src = songName;
                songNumber= position; // it will update value(position) of song as the songNumber changes
                changeCurrentNameDetails(songObj);
              }
              toggleSong();
          });
      }




      $('.fa-random').on('click',function() {
          $('.fa-random').toggleClass('disabled')
          willShuffle = 1 - willShuffle;    //it will shuffle the songs on clicking the shuffle button button
      });
      // $(document).ready(function() can also se used be as it performs the same function and can be used more than once
      window.onload = function()    //works after html file loaded
      {

            changeCurrentNameDetails(songs[0]);   //first song will play first
            updateCurrentTime();
//            move();   //for moving progress bar
            setInterval(function()      //sets interval so that the current time will be updated
            {

                updateCurrentTime();
            },1000);
            for(var i =0; i < songs.length;i++)
            {
                  var obj = songs[i];
                  var name = '#song' + (i+1);
                  var song = $(name);
                  song.find('.song-name').text(obj.name);   //song.find() will make our code faster by not searching data in whole html file again and again
                  song.find('.song-artist').text(obj.artist);
                  song.find('.song-album').text(obj.album);
                  song.find('.song-length').text(obj.duration);
                  addSongNameClickEvent(obj,i+1);
            }
            //below function will add data table plugin and paging property is hidden by making it false.
            $('#songs').DataTable({
                paging: false
            });
            $('songs').DataTable();
            $('audio').on('ended',function()
                {
                        var audio = document.querySelector('audio');
                        if(currentSongNumber < songs.length) {
                            var nextSongObj = songs[currentSongNumber];
                            currentSongNumber = currentSongNumber + 1; // Change State
                            audio.src = nextSongObj.fileName; // Change Soure
                            toggleSong(); // Play Next Song
                            changeCurrentNameDetails(nextSongObj); // Update Image
                        }
                        else
                        {
                          $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                                  audio.currentTime = 0;
                                  console.log('else');
                        }

              });
              //below commented code is not working so I made it as comment for some time
              // $('.fa-repeat').on('click',function() {
              //         $('.fa-repeat').toggleClass('disabled')
              //         var song= document.querySelector('audio');
              //         willLoop = 1 - willLoop;    //it will repeat the song on clicking the loop button
              //         if(currentSongNumber==songs.length && song.currentTime==song.duration)
              //         {
              //           audio.src=songs[0].fileName;
              //               currentSongNumber==1;
              //
              //         }
              //   });

                $('.fa-step-backward').on('click',function()
                {
                      var audio= document.querySelector('audio');
                      if(currentSongNumber > 1) {
                          var prevSongObj = songs[currentSongNumber];
                          currentSongNumber = currentSongNumber - 1; // Change State
                          audio.src = prevSongObj.fileName; // Change Soure
                          toggleSong(); // Play previous Song
                          changeCurrentNameDetails(prevSongObj); // Update Image
                      }
                });

            $('.fa-step-forward').on('click',function()
            {
                  var audio= document.querySelector('audio');
                  if(currentSongNumber < songs.length) {
                      var nextSongObj = songs[currentSongNumber];
                      audio.src = nextSongObj.fileName; // Change Soure
                      toggleSong(); // Play Next Song
                      changeCurrentNameDetails(nextSongObj); // Update Image
                      currentSongNumber = currentSongNumber + 1; // Change State
                  }
            });

      }
