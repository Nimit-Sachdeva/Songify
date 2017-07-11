var context;
// var tuna;
var delay;
var overdrive;
var wahwah;
var tremolo;
var phaser;
function tunaDemo() {
            // if (!window.webkitAudioContext) {
            //     document.getElementById("body").innerHTML = "Oops, your browser doesn't support this demo! Please try the latest Google Chrome.";
            //     return;
            // } else {
            //     if (!window.Audio) {
            //         document.getElementById("body").innerHTML = "Oops, your browser doesn't support this demo! Please try the latest Google Chrome.";
            //         return;
            //     }
            /*These are the effects made with tuna*/
          var tuna = new Tuna(context);

             delay= new tuna.Delay({
              feedback:0.78,
              delayTime:70,
              wetLevel:0.9,
              dryLevel:1,
              cutOff:5000,
              bypass:1
            });

             overdrive= new tuna.Overdrive({
                outputGain:1,
                drive:0.9,
                curveAmount:1,
                algorithmIndex:4,
                bypass:1
            });
             wahwah = new tuna.WahWah({
              automode: true, //true/false
              baseFrequency: 0.5, //0 to 1
              excursionOctaves: 3, //1 to 6
              sweep: 0, //0 to 1
              resonance: 2, //1 to 100
              sensitivity: 1, //-1 to 1
              bypass: 1
            });
             phaser = new tuna.Phaser({
              rate: 1.2, //0.01 to 8 is a decent range, but higher values are possible
              depth: 0.8, //0 to 1
              feedback: 0.9, //0 to 1+
              stereoPhase: 180, //0 to 180
              baseModulationFrequency: 700, //500 to 1500
              bypass: 1
            });
             tremolo = new tuna.Tremolo({
              intensity: 0.2, //0 to 1
              rate: 8, //0.001 to 8
              stereoPhase: 0, //0 to 180
              feedback: 0.9, //0 to 1+
              bypass: 1
            });
        }
                context = new AudioContext();
                tunaDemo();
                var song1=document.querySelector('audio');
                var source=context.createMediaElementSource(song1);

                source.connect(wahwah.input);
                source.connect(tremolo.input);
                source.connect(delay.input);
                source.connect(overdrive.input);
                overdrive.connect(context.destination);
                wahwah.connect(context.destination);
                delay.connect(context.destination);
                tremolo.connect(context.destination);

var del=document.querySelector('#delay');
var ovr=document.querySelector('#overdrive');
var wah=document.querySelector('#wahwah');
var trem=document.querySelector('#tremolo');

// var ovr=document.querySelector('#overdrive');
del.addEventListener('click',function(e)
{
      $(this).toggleClass('changecolor');
      if(delay.bypass)
      {
        delay.bypass=0;
        console.log('false');
      }
      else {
        delay.bypass=1;
        console.log('true');
      }
});
ovr.addEventListener('click',function(e)
{
      $(this).toggleClass('changecolor');
      if(overdrive.bypass)
      {
        overdrive.bypass=0;
        console.log('false');
      }
      else {
        overdrive.bypass=1;
        console.log('true');
      }
});
wah.addEventListener('click',function(e)
{
      $(this).toggleClass('changecolor');
      if(wahwah.bypass)
      {
        wahwah.bypass=0;
        console.log('false');
      }
      else {
        wahwah.bypass=1;
        console.log('true');
      }
});
trem.addEventListener('click',function(e)
{
      $(this).toggleClass('changecolor');
      if(tremolo.bypass)
      {
        tremolo.bypass=0;
        console.log('false');
      }
      else {
        tremolo.bypass=1;
        console.log('true');
      }
});
        //     var freq = 55 * Math.pow(1.059463, 11);
        //     var osc;
        //
        //
        //     //no effect
        //     function createNoTuna() {
        //         osc = context.createOscillator();
        //         osc.type = 3; // triangle wave
        //         osc.frequency.value = freq
        //         osc.connect(context.destination);
        //         osc.noteOn(0);
        //     }
        //
        //     //play with wahwah effect
        //     function createWahWah() {
        //         osc = context.createOscillator();
        //         osc.type = 3; // triangle wave
        //         osc.frequency.value = freq
        //         osc.connect(wahwah.input);
        //         wahwah.connect(context.destination);
        //         osc.noteOn(0);
        //     }
        //
        //     //play with phaser effect
        //     function createPhaser() {
        //         osc = context.createOscillator();
        //         osc.type = 3; // triangle wave
        //         osc.frequency.value = freq
        //         osc.connect(phaser.input);
        //         phaser.connect(context.destination);
        //         osc.noteOn(0);
        //     }
        //
        //     //play with tremolo effect
        //     function createTremolo() {
        //         osc = context.createOscillator();
        //         osc.type = 3; // triangle wave
        //         osc.frequency.value = freq
        //         osc.connect(tremolo.input);
        //         tremolo.connect(context.destination);
        //         osc.noteOn(0);
        //     }
        //
        //     function stopWave() {
        //         osc.noteOff(0);
        //     }
        //
        //     document.getElementById('notuna').addEventListener('mousedown', createNoTuna)
        //     document.getElementById('notuna').addEventListener('mouseup', stopWave)
        //     document.getElementById('wahwah').addEventListener('mousedown', createWahWah)
        //     document.getElementById('wahwah').addEventListener('mouseup', stopWave)
        //     document.getElementById('phaser').addEventListener('mousedown', createPhaser)
        //     document.getElementById('phaser').addEventListener('mouseup', stopWave)
        //     document.getElementById('tremolo').addEventListener('mousedown', createTremolo)
        //     document.getElementById('tremolo').addEventListener('mouseup', stopWave)
        // }
