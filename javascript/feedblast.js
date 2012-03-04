var index = 0;
var sentences, trans_sentences;

Array.prototype.shuffle = function () {
        for(var rnd, tmp, i=this.length; i; rnd=parseInt(Math.random()*i), tmp=this[--i], this[i]=this[rnd], this[rnd]=tmp);
};

// Split string and stuff into sentences[]
function SplitFeed( string, option )
{
   if ( option == 0 )
   {
      sentences = string.match( /[^.!?;,]+[.!?;,]*/g );
   }
   else
   {
      trans_sentences = string.match( /[^.!?;,]+[.!?;,]*/g );

      //ReplaceDuplicateComma( );
   }
}

function ReplaceDuplicateComma( )
{
   for ( i = 0; i < trans_sentences.length; i++ )
   {
      trans_sentences[i] = trans_sentences[i].replace( /,$/, '' );
   }
}

function GetLang() {
   return document.getElementById('lang_select').value;
}

function GetFeed() {
   return document.getElementById('feed_select').value;
}

function GetWordBox() {
   return document.getElementById('box').innerHTML;
}

function ChangeURL() {
   document.getElementById('link_box').setAttribute('href', feed );
}

function PrintNextWord()
{
   var lang = GetLang();

   if ((index + 7) < (sentences.length - 1))
   {
      index = index + 7;
      PrintWord(index, lang);
   }
   else
   {
      index = 0;
      PrintWord(index, lang);
   }
}

function PrintWord( index, lang )
{
   typeof trans_sentences[index] === 'undefined' ?
      document.getElementById("box1").innerHTML = '' :
      document.getElementById("box1").innerHTML = trans_sentences[index];
   typeof trans_sentences[index+1] === 'undefined' ?
      document.getElementById("box2").innerHTML = '' :
      document.getElementById("box2").innerHTML = trans_sentences[index+1];
   typeof trans_sentences[index+2] === 'undefined' ?
      document.getElementById("box3").innerHTML = '' :
      document.getElementById("box3").innerHTML = trans_sentences[index+2];
   typeof trans_sentences[index+3] === 'undefined' ?
      document.getElementById("box4").innerHTML = '' :
      document.getElementById("box4").innerHTML = trans_sentences[index+3];
   typeof trans_sentences[index+4] === 'undefined' ?
      document.getElementById("box5").innerHTML = '' :
      document.getElementById("box5").innerHTML = trans_sentences[index+4];
   typeof trans_sentences[index+5] === 'undefined' ?
      document.getElementById("box6").innerHTML = '' :
      document.getElementById("box6").innerHTML = trans_sentences[index+5];
   typeof trans_sentences[index+6] === 'undefined' ?
      document.getElementById("box7").innerHTML = '' :
      document.getElementById("box7").innerHTML = trans_sentences[index+6];

   document.getElementById("t_box1").innerHTML = sentences[index];
   document.getElementById("t_box2").innerHTML = sentences[index+1];
   document.getElementById("t_box3").innerHTML = sentences[index+2];
   document.getElementById("t_box4").innerHTML = sentences[index+3];
   document.getElementById("t_box5").innerHTML = sentences[index+4];
   document.getElementById("t_box6").innerHTML = sentences[index+5];
   document.getElementById("t_box7").innerHTML = sentences[index+6];
}

var langFrom = "en";

// Translate english word then display to word box (bing)
function TranslateFeed( feed_string, lang)
{
   langTo = GetLang();

   // If not string is specified, get current parsed sentences
   if ( typeof feed_string === 'undefined' )
   {
      feed_string = sentences;
   }

   window.mycallback = function(response) {
      trans_feed_string = response;

      // Split translated feed and store into translated sentence array
      SplitFeed( trans_feed_string, 1 );

      PrintWord( index, lang );
   }

   var s = document.createElement("script");
   s.src = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate?oncomplete=mycallback&appId=8F7A5DB489A40721CBADB9FED30E8A1DE99C02A7&from=" + langFrom + "&to=" + langTo + "&text=" + feed_string;

   document.getElementsByTagName("head")[0].appendChild(s);
}

// Get Feed
google.load("feeds", "1");
function ParseFeed( lang ) {
   index = 0;

   Feed = GetFeed();

   var feed = new google.feeds.Feed( Feed );
   var feed_string = '';
   feed.setNumEntries(1);

   feed.load(function(result) {
      if (!result.error) {
         var author_box = document.getElementById("author_box");
         var title_box = document.getElementById("title_box");
         var link_box = document.getElementById("link_box");

         var f = result.feed.entries[0];

         link_box.innerHTML = '<a href="' + f.link + '" target="_blank">[ see original ]</a>';

         for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            feed_string += (entry.title + '.' + entry.content + ' ').replace(/(<([^>]+)>)/ig,"");
         }

         // Strip out quotations, parentheses, and brackets
         feed_string = feed_string.replace(/["()[\]]/g,'');

         // Split feed and store into sentence array
         SplitFeed( feed_string, 0 );

         // Translate feed
         trans_feed_string = TranslateFeed( feed_string, lang );
         //trans_feed_string = TranslateFeed( sentences, lang );
      }
   });
}

// Initialize application
function InitProgram( lang )
{
   ParseFeed( lang );
}

// Clear form
function ClearFields() { document.input_form.reset(); }

function KeyUpHandler(key) {
   if (key.which == 37) {
      //PrintPrevWord();
   }
   if (key.which == 38) {
      //TextToSpeech();
   }
   if (key.which == 39) {
      PrintNextWord();
   }
   if (key.which == 40) {
      //$('#toggle').click();
   }
}
document.onkeyup = KeyUpHandler;

function ToggleBox1() { $('#toggle1').click(); }
function ToggleBox2() { $('#toggle2').click(); }
function ToggleBox3() { $('#toggle3').click(); }
function ToggleBox4() { $('#toggle4').click(); }
function ToggleBox5() { $('#toggle5').click(); }
function ToggleBox6() { $('#toggle6').click(); }
function ToggleBox7() { $('#toggle7').click(); }

// Toggle translate div
$(document).ready(function() {
  $('#toggle1').click(function() { $('#t_box1').slideToggle(); });
  $('#toggle2').click(function() { $('#t_box2').slideToggle(); });
  $('#toggle3').click(function() { $('#t_box3').slideToggle(); });
  $('#toggle4').click(function() { $('#t_box4').slideToggle(); });
  $('#toggle5').click(function() { $('#t_box5').slideToggle(); });
  $('#toggle6').click(function() { $('#t_box6').slideToggle(); });
  $('#toggle7').click(function() { $('#t_box7').slideToggle(); });
});

// User voice jquery plugin
var uservoiceOptions = {
   /* required */
   key: 'feedblast',
   host: 'feedblast.uservoice.com', 
   forum: '110601',
   showTab: true,  
   /* optional */
   background_color:'#999',
   hover_color: '#f00',
   text_color: 'white',
   lang: 'en'
};

$("#loading").ajaxStart(function(){
    $(this).show();
 }).ajaxStop(function(){
    $(this).hide();
});

function showLoading() {
  $("#loading").show();
}

function hideLoading() {
  $("#loading").hide();
}

