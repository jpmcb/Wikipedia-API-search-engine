// -- all code by jpmcb, message me on Github or twitter (@jpmmcbride) if you have questions! -->


// ------ MAIN AJAX CODE ---------

var userInput;
var myJson;
var site = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch='
var cb = '&callback=?'
  
function getContent() {
  $('.col-sm-10').fadeOut(250).delay(250);
  $('#headerTitle').fadeOut(300).delay(250);
  userInput = encodeURIComponent($('#search').val());
  $.getJSON(site + userInput + cb, function(data){
    myJson = data;
    console.log(myJson.query.search[0]);
    
    //--- create 10 divs below search that populate page with search results
    //--- onclick of div title, open new wiki tab with link to page
    
    for (var i = 0; i < myJson.query.search.length; i++) {
      var wikiLink ='<div class="col-sm-10 col-sm-offset-1"><a target="_blank"  href="https://en.wikipedia.org/wiki/' + encodeURIComponent(myJson.query.search[i].title) + '"><h2>' + myJson.query.search[i].title + '</h2></a><br><p>' + myJson.query.search[i].snippet + '</p></div>';
      $(wikiLink).hide().delay(i * 100).appendTo("#searchContent").fadeIn(400);
    }
  })
}

// --- onclick & press enter interaction with user input
$('#searchBtn').click(getContent);
$(document).keypress(function(e) {
    if(e.which == 13) {
        getContent();
    }
});

// --- clear button 
$('#clearBtn').click(function(){
  $('.col-sm-10').fadeOut(500).delay(500);
  $('#headerTitle').delay(500).fadeIn(450);
})