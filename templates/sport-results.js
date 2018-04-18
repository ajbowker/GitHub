//dimension varants
var headingHeight = 96;
var rowHeight = 52;
var subheadingHeight = 52;
var footerHeight = 48;
var hdDimensions = {
  width: 1920,
  height: 1080
};

//dynamic height of classified board
var sliderHeight;
var sliderPosition;

//current state of display
var currentState = 'out';
var currentRawRows = '';
var currentRowData;
var currentTitle = '';
var currentLogoId = '';

//select elements from html
var slider = document.querySelector('.js-slider');
var board = document.querySelector('.js-board');
var rows = document.querySelector('.js-data-rows');
var heading = document.querySelector('.js-heading');
var headingText = document.querySelector('.js-heading-text');
var competitionLogo = document.querySelector('.js-competition-logo');


//initialise slider
slider.style.width = '0';
slider.style.webkitTransform = 'translateX(-450px)';

//update function used by Caspar at window.update
var update = function (message) {

  var update = JSON.parse(message);

  switch (update.type) {
    case 'SPORT_RESULTS':

      switch (currentState) {
        case 'out':
          currentRowData = parseRows(update.rows);
          currentRawRows = update.rows;

          rows.innerHTML = '';

          for (var i = 0; i < currentRowData.length; i += 1) {
            rows.appendChild(createRow(currentRowData[i]));
          }

          //set the title and competition sponsor logo
          currentTitle = update.title;
          headingText.innerText = update.title;

          currentLogoId = update.logoId;
          competitionLogo.src = 'img/competition_logos/' + update.logoId + '.png';

          //position the slider
          sliderHeight = ((rowHeight * currentRowData.length) + headingHeight + footerHeight);
          sliderPosition = (hdDimensions.height - sliderHeight) / 2;

          slider.style.height = sliderHeight + 'px';
          slider.style.width = '0';
          slider.style.webkitTransform = 'translateX(-450px) translateY(' + sliderPosition + 'px)';

          //expand the classified board
          // waitForTransition(slider, 'transform', function (e) {
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () {
              slider.style.webkitTransition = '-webkit-transform 0.37s ease-in-out, width 1s ease-in-out';
              slider.style.webkitTransform = 'translateX(221px) translateY(' + sliderPosition + 'px)';
              slider.style.width = '1369px';

              heading.style.webkitTransitionDelay = '1s';
              heading.style.height = '96px';

              rows.style.webkitTransitionDelay = '1s';
              rows.style.height = (rowHeight * currentRowData.length) + 'px';

              competitionLogo.style.webkitTransitionDelay = '2s';
              competitionLogo.style.webkitTransform = 'translateX(0)';

              currentState = 'in';
            });
          });

          break;

        case 'in':


          break;

      }

      break;

    case 'SPORT_RESULTS_OFF':

      switch (currentState) {
        case 'in':

          competitionLogo.removeAttribute('style');
          competitionLogo.style.webkitTransform = 'translateX(-100px)';

          rows.style.webkitTransitionDelay = '0.3s';
          rows.style.height = '0';

          heading.style.webkitTransitionDelay = '0.3s';
          heading.style.height = '156px';

          slider.style.webkitTransitionDelay = '1.3s';
          slider.style.webkitTransform = 'translateX(-450px) translateY(' + sliderPosition + 'px)';
          slider.style.width = '0';

          currentState = 'out';
          currentRawRows = '';
          currentTitle = '';
          currentLogoId = '';

          break;
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

var waitForTransition = (element, property, callback) => {

  var func = (e) => {
    //console.log('transition finished for ' + element.id + ((property !== undefined) ? ' on property ' + property : ''));

    if (property === undefined || e.propertyName === property || e.propertyName === ('-webkit-' + property)) {
      element.removeEventListener('webkitTransitionEnd', func);
      callback(e);
    }
  };

  element.addEventListener('webkitTransitionEnd', func);
};

var parseRows = function (rowdata) {
  var rows = rowdata.split('#');
  var parsedRows = [];
  var items;
  var trimmedItem;
  var trimmedItems;
  var matchCounter = 0;

  for (var i = 0; i < rows.length; i += 1) {
    var items = rows[i].split('~');
    trimmedItems = [];

    for (var j = 0; j < items.length; j += 1) {
      trimmedItem = items[j].trim();

      if (trimmedItem !== '') {
        trimmedItems.push(trimmedItem);
      }
    }

    if (trimmedItems.length === 0) {
      //do nothing with empty row
    } else if (trimmedItems.length === 1) {
      parsedRows.push({
        type: 'subheading',
        text: trimmedItems[0]
      })
    } else if (trimmedItems.length > 1) {
      var scoreMatches = trimmedItems[1].match(/\d+/g);

      if (scoreMatches !== null && scoreMatches.length === 2) {
        //has two scores
        parsedRows.push({
          type: 'score',
          colour: (matchCounter % 2) ? 'grey' : 'white',
          homeTeam: trimmedItems[0].toUpperCase(),
          betweenText: scoreMatches[0] + ' - ' + scoreMatches[1],
          betweenType: 'scores',
          awayTeam: trimmedItems[2].toUpperCase()
        })
      } else {
        //is some other text
        parsedRows.push({
          type: 'score',
          colour: (matchCounter % 2) ? 'white' : 'grey',
          homeTeam: trimmedItems[0].toUpperCase(),
          betweenText: trimmedItems[1].toUpperCase(),
          betweenType: 'other',
          awayTeam: trimmedItems[2].toUpperCase()
        })
      }

      matchCounter += 1;
    }
  }

  return parsedRows;
};

var createRow = function (row) {
  var newRow = document.createElement('li');

  if (row.type === 'subheading') {
    //subheading
    addClass(newRow, 'row');
    addClass(newRow, 'subheading');

    newRow.innerHTML = '<h2>' + row.text + '</h2>';
  } else if (row.type === 'score') {
    addClass(newRow, 'row');
    addClass(newRow, row.colour);

    var scoreline = '<div class="home-team">' + row.homeTeam + '</div>';
    scoreline += '<div class="between ' + row.betweenType + '">' + row.betweenText + '</div>';
    scoreline += '<div class="away-team">' + row.awayTeam + '</div>';

    newRow.innerHTML = scoreline;
  }

  return newRow;
}

//link up the update function we built to Caspar through the window object
window.update = update;