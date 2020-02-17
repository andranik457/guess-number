


let level = 9;

$( document ).ready(function() {
    let matrixSize = Math.round(Math.sqrt(level) + 0.5);

    let result = getRandomList(level, (matrixSize * matrixSize));
    console.log(matrixSize, result)

    let resultHtml = '<div class="row">';
    for (let i in result['elementsList']) {
        if (i % matrixSize === 0) {
            resultHtml += '</div><div class="row">'
        }

        if (result['elementsList'][i] === 0) {
            resultHtml += '<div class="col-1 col-sm-1" id="el-'+ i +'"><span class="guess-cover hide-cover">?</span></div>';
        }
        else {
            resultHtml += '<div class="col-1 col-sm-1" id="el-'+ i +'"><span class="guess-cover hide-cover">?</span>'+ result['elementsList'][i] +'</div>';
        }
    }
    resultHtml += '</div>';

    $('.main-data').append(resultHtml)


    setInterval(
        function() {
            $('.guess-cover').addClass('show-cover');
            $('.guess-cover').removeClass('hide-cover');
        }, 3000);


    /////////////////////////////////////
    let m = 0;
    $('.main-data div div').click(function(event) {
        let elementIndex = $(this).attr('id');

        if (elementIndex === 'el-'+ result['elementsIndexes'][m]) {
            alert('success!');

            removeCover(elementIndex);

            m++;
        }
        else {
            alert('Fail:(');
        }
    });
});

function removeCover(elementIndex) {
    $('.'+ elementIndex).find('.guess-cover').removeClass('show-cover');
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

