window.onload = function() {
    //creating array of 8 emoji
    let emojiArr = new Set();
    let pair = [];
    for (let item = 0; item < 8; item++) {
        emojiArr.add(String.fromCodePoint('0x1F' + getNumberInInterval(400, 600)))
    }
    emojiArr = Array.from(emojiArr);
    //create array with 16 emoji divided by 8 pairs. This array contains values for html table
    let tdArray = document.querySelectorAll('td');
    let emojiTable = [];
    while (emojiArr.length > 0) {
        let i = emojiArr.shift();
        let firstIndex = 0;
        let secondIndex = 0;
        let flag = false;
        while (!flag) {
            firstIndex = getNumberInInterval(0, 7);
            secondIndex = getNumberInInterval(8, 15);
            //if items aren't filled yet
            if (typeof emojiTable[firstIndex] === 'undefined' && typeof emojiTable[secondIndex] === 'undefined')
                flag = true;
        }
        emojiTable[firstIndex] = i;
        emojiTable[secondIndex] = i;
        firstIndex = 0;
        secondIndex = 0;
    }
    //create listener for pair of cards
    tdArray.forEach((item, key) => {
        item.addEventListener('click', event => {
            item.innerHTML = emojiTable[key];
            if (pair.length < 2) {
                pair.push(event.target);
            }
        });
        //checking pair of cards
        item.addEventListener('mouseout', () => {
            if (pair.length == 2) {
                if (pair[0].innerHTML === pair[1].innerHTML) {
                    pair[0].classList.add('hide');
                    pair[1].classList.add('hide');
                    pair.length = 0;
                }
                else {
                    pair[0].innerHTML = '?';
                    pair[1].innerHTML = '?';
                    pair.length = 0;
                }
            }
            let countHide = document.querySelectorAll('.hide');
            if (countHide.length === 16)
                alert('You won');
        })
    })

}

//create integer number in range
function getNumberInInterval(left, right) {
    let min = Math.ceil(left);
    let max = Math.floor(right);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

