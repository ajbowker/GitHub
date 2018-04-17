//dimension constants
var headingHeight = 96;
var rowHeight = 52;
var subheadingHeight = 52;
var footerHeight = 48;
var hdDimensions = {width:1920, height:1080};

//dynamic height of classified board
var rowsHeight = 0;
var sliderHeight;
var sliderPosition;

//select elements from html
var slider = document.querySelector('.js-slider');
var board = document.querySelector('.js-board');
var rows = document.querySelector('.js-data-rows');
var heading = document.querySelector('.js-heading');
var competitionLogo = document.querySelector('.js-competition-logo');


//update function used by Caspar at window.update to 
var update = function (updatejson) {

  var update = JSON.parse(updatejson);

  //what message do we have?
  switch (update.type) {
    case 'setup':

      console.log('Creating the classified board with ' + update.rows);

      //create the rows of the classified board updating dimensions as we go
      var rowData = update.rows.split('#');
      rowsHeight = 0;
      
      for (var i = 0; i < rowData.length; i += 1) {
        var row = rowData[i];
        rows.appendChild(createRow(row, i));
        rowsHeight += rowHeight;
      }

      sliderHeight = (rowsHeight + headingHeight + subheadingHeight + footerHeight);
      sliderPosition = (hdDimensions.height - sliderHeight)/2;

      slider.style.height = sliderHeight + 'px';
      slider.style.webkitTransform = 'translateX(-450px) translateY(' + sliderPosition + 'px)';

      break;

    case 'animate':

      console.log('Animating to state - ' + update.state);

      //each of the animate "states" removes css styles and classes
      if (update.state === 'expand') {

        //expand the classified board
        slider.style.webkitTransform = 'translateX(221px) translateY(' + sliderPosition + 'px)';
        slider.style.width = '1369px';

        rows.style.height = (rowsHeight + subheadingHeight) + 'px';

        addClass(heading, 'expand');
        addClass(competitionLogo, 'expand');

      } else if (update.state === 'shrink') {

        //shrink the classified board
        slider.style.webkitTransform = 'translateX(-450px) translateY(' + sliderPosition + 'px)';
        slider.style.width = '0px';

        rows.style.height = '0px';

        removeClass(heading, 'expand');
        removeClass(competitionLogo, 'expand');
      }

      break;
  }
}

//some helper functions 
var addClass = function (element, classname) {
  element.classList.add(classname);
};

var removeClass = function (element, classname) {
  element.classList.remove(classname);
};

var createRow = function (rowData, index) {
  var items = rowData.split(',');

  var newRow = document.createElement('li');
  addClass(newRow, 'row');
  addClass(newRow, (index % 2 === 0) ? 'white' : 'grey');

  var scoreline = '<div class="home-team">' + items[0] + '</div>';
  scoreline += '<div class="score">' + items[1] + ' - ' + items[2] + '</div>';
  scoreline += '<div class="away-team">' + items[3] + '</div>';

  newRow.innerHTML = scoreline;

  return newRow;
}

//link up the update function we built to Caspar through the window object
window.update = update;