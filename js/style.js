
let level = 9;
let livesCount = 3;
let hintsCount = 2;
let currentCursor = 0;
let result = null;

function showLevels() {
    let maxLevel = 121;

    let levelsList = '<div class="row levels-list">';
    for (let l = 1; l <= maxLevel; l++) {
        levelsList += '<div class="col-2 col-sm-2"><span>'+ l +'</span></div>';
    }
    levelsList += '</div>';

    $('.levels').empty();
    $('.levels').append(levelsList);

    $('.levels .levels-list div').click( function(event) {
        level = $(this).find('span').text();
        $('.levels').empty();

        startGame()
    });
}





$( document ).ready(function() {
    // append levels
    showLevels();
});

function startGame() {
    updateLiveInfo();
    updateHintInfo();

    let matrixSize = Math.round(Math.sqrt(level) + 0.5);

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
    }
    resultHtml += '</div>';

    $('.main-data').append(resultHtml)


    // setInterval(
    setTimeout(
        function() {
            $('.guess-cover').addClass('show-cover');
            $('.guess-cover').removeClass('hide-cover');
        }, 5000);


    /////////////////////////////////////
    $('.main-data div div').click(function(event) {
        let elementIndex = $(this).attr('id');

        if (elementIndex === 'el-'+ result['elementsIndexes'][currentCursor]) {
            removeCover(elementIndex);

            currentCursor++;
        }
        else {
            livesCount--;

            updateLiveInfo();
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
    $('#'+ elementIndex).find('.guess-cover').removeClass('show-cover');
    $('#'+ elementIndex).find('.guess-cover').addClass('hide-cover');
}

function checkLive() {
    if (livesCount === 0) {
        alert("Game over!");

        $('.guess-cover').removeClass('show-cover');
        $('.guess-cover').addClass('hide-cover');
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











// createMatrix(level);



function createMatrix(level) {
    let matrix = '';
    let matrixSize = Math.round(Math.sqrt(level) + 0.5);

    let elementPlaces = getMatrixElementPlaces(level)



}

function getMatrixElementPlaces(level) {
    let elementsPlaces = [];

    getSortedElements(level, elementsPlaces);

    return elementsPlaces;
}

function getSortedElements(level, elementsPlaces) {
    let randomIndex = getRandomInt(level);

    if (elementsPlaces.length === level) {
        return elementsPlaces
    }
    else {
        if (elementsPlaces.includes(randomIndex)) {
            getSortedElements(level, elementsPlaces)
        }
        else {
            elementsPlaces.push(randomIndex)
        }
    }

    getSortedElements(level, elementsPlaces);
}

function getRandomInt(max) {
    return (Math.floor(Math.random() * Math.floor(max)) + 1);
}

