
const defaultLivesCount = 3;

let level = 9;
let livesCount = defaultLivesCount;
let hintsCount = 2;
let currentCursor = 0;
let result = null;
let gameStarted = false;
let findPlaceIndexes = [];
let totalIndexesCount = 0;
let timeout = 2000;
let currentIndex = 0;


$( document ).ready(function() {
    showLevels();
});

function hintShowAllNumber() {
    gameStarted = false;

    $('.guess-cover')
        .removeClass('show-cover')
        .addClass('hide-cover');

    setTimeout( function() {
        $('.guess-cover')
            .removeClass('hide-cover')
            .addClass('show-cover');

        for (let index in findPlaceIndexes) {
            removeCover('el-'+ findPlaceIndexes[index]);
        }
        gameStarted = true;

    }, timeout);
}



function resetGameValues() {
    livesCount = defaultLivesCount;
    hintsCount = 2;
    currentCursor = 0;
    findPlaceIndexes = [];
    totalIndexesCount = [];

    gameStarted = false;
}



function startGame() {
    updateLiveInfo();
    updateHintInfo();

    let matrixSize = Math.round(Math.sqrt(level) + 0.5);

    // set width for main-data
    $('.main-data').attr('class', 'main-data mx-auto col-'+ matrixSize +' col-sm-'+ matrixSize +'');

    // show select level button
    $('.select-level').css('display', 'block');

    // block-size
    let blockSize = Math.round(12 / matrixSize - 0.5);

    result = getRandomList(level, (matrixSize * matrixSize));

    let resultHtml = '<div class="row">';
    for (let i in result['elementsList']) {
        if (i % matrixSize === 0) {
            resultHtml += '</div><div class="row">'
        }

        if (result['elementsList'][i] === 0) {
            resultHtml += '<div class="col-'+ blockSize +' col-sm-'+ blockSize +'" id="el-'+ i +'"><span class="guess-cover hide-cover">?</span></div>';
        }
        else {
            resultHtml += '<div class="col-'+ blockSize +' col-sm-'+ blockSize +'" id="el-'+ i +'"><span class="guess-cover hide-cover">?</span>'+ result['elementsList'][i] +'</div>';
        }

        totalIndexesCount = i;
    }
    resultHtml += '</div>';

    $('.main-data').append(resultHtml);


    // setInterval(
    setTimeout(
        function() {
            $('.guess-cover')
                .addClass('show-cover')
                .removeClass('hide-cover');

            gameStarted = true;
        }, 2000);


    /////////////////////////////////////
    $('.main-data div div').click( function(event) {
        if (gameStarted === false) {
            return
        }

        let elementIndex = $(this).attr('id');

        currentIndex = parseInt(elementIndex.split('-').pop());
        

        if (elementIndex === 'el-'+ result['elementsIndexes'][currentCursor]) {
            removeCover(elementIndex);

            findPlaceIndexes.push(result['elementsIndexes'][currentCursor]);

            currentCursor++;
        }
        else {
            if (!findPlaceIndexes.includes(currentIndex)) {
                livesCount--;

                updateLiveInfo();
            }
        }

        checkLive()
    });
}


$('#hint').click( function(event) {
    if (hintsCount < 1) {
        alert("You don't have already hints!");
    }
    else {
        hintsCount--;

        removeCover('el-'+ result['elementsIndexes'][currentCursor]);
        currentCursor++;

        updateHintInfo();
    }
});

function updateHintInfo() {
    $('#hint span').text(hintsCount);
}

function updateLiveInfo() {
    $('#live-info span').text(livesCount);
}

function removeCover(elementIndex) {
    $('#'+ elementIndex).find('.guess-cover')
        .removeClass('show-cover')
        .addClass('hide-cover');
}

function checkLive() {
    if (livesCount === 0) {
        alert("Game over!");

        $('.guess-cover')
            .removeClass('show-cover')
            .addClass('hide-cover');

        showLevels();
    }
}






function getRandomList(elementsCount, maxLength) {
    let elementsList = [];
    let elementsIndexes = [];

    let asd = [];
    for (let q = 1; q <= level; q++) {
        asd.push(q)
    }
    let j = 0;

    for (let i = 0; i < maxLength; i++) {
        elementsList.push(0)
    }

    while (j < level) {
        let index = getRandomInt(maxLength);

        if (elementsList[index] === 0) {
            elementsList[index] = asd[j];

            elementsIndexes.push(index);

            j++;
        }
    }

    return {
        elementsIndexes: elementsIndexes,
        elementsList: elementsList
    };
}


/**
 * Show Levels
 */
function showLevels() {
    resetGameValues();

    let maxLevel = 143;

    let levelsList = '<div class="row levels-list">';
    for (let l = 1; l <= maxLevel; l++) {
        levelsList += '<div class="col-2 col-sm-2">Level: <span>'+ l +'</span></div>';
    }
    levelsList += '</div>';

    $('.main-data').empty();
    $('.levels')
        .empty()
        .append(levelsList);

    $('.levels .levels-list div').click( function(event) {
        level = $(this).find('span').text();
        $('.levels').empty();

        startGame()
    });
}


