function amoba () {
    var size = document.getElementById('size');

    var firstPlayer = document.getElementById('firstplayer').value;
    var secondPlayer = document.getElementById('secondplayer').value;

    document.getElementById('alfaromeo').remove();
    // document.getElementById('size').remove();
    // document.getElementById('go-button').remove();
    document.body.setAttribute('class', 'table');

    var sizeInt = parseInt(size.value, 10);
    var tableSize = sizeInt * sizeInt;
    var board = [];
    for (var boardIndex = 0; boardIndex < sizeInt; boardIndex += 1) {
        var inner = new Array(sizeInt);
        inner.fill(0,0,sizeInt)
        board.push(inner);
    }

    var turn = document.createElement('P');
    turn.textContent = "It's " + firstPlayer + "'s turn.";
    turn.setAttribute('class', 'turn');
    document.body.appendChild(turn);

    var outerBorder = document.createElement('div');
    outerBorder.setAttribute('id', 'outerBorder');
    var tileSize =sizeInt * 40;
    outerBorder.setAttribute('style', ['width: ' + tileSize + 'px', 'height: ' + tileSize + 'px'].join(';'));
    document.body.appendChild(outerBorder);

    var firstPlayerCounter = document.createElement('p');
    var firstCounter = 0;
    firstPlayerCounter.setAttribute('id', 'firstCounter');
    firstPlayerCounter.setAttribute('class', 'counter');
    firstPlayerCounter.textContent = firstPlayer + " : " + firstCounter + " points";
    document.body.appendChild(firstPlayerCounter);
    var secondCounter = 0;
    var secondPlayerCounter = document.createElement('p');
    secondPlayerCounter.setAttribute('id', 'secondCounter');
    secondPlayerCounter.setAttribute('class', 'counter');
    secondPlayerCounter.textContent = secondPlayer + " : " + secondCounter + " points";
    document.body.appendChild(secondPlayerCounter);

    function newGame() {
        window.history.go();
    }
    var newgame = document.createElement('button');
    newgame.setAttribute('id', 'newgame');
    newgame.setAttribute('style', ['margin-top: 20px'].join(';'));
    newgame.textContent = "New";
    document.body.appendChild(newgame);
    newgame.addEventListener('click', newGame);

    function reStart() {

        board = [];
        for (var boardIndex = 0; boardIndex < sizeInt; boardIndex += 1) {
            var inner = new Array(sizeInt);
            inner.fill(0,0,sizeInt)
            board.push(inner);
        }
        var tileArray = document.getElementById('outerBorder').children;
        for (var tileIndex = 0; tileIndex < tileArray.length; tileIndex += 1) {
            tileArray[tileIndex].setAttribute('class', 'tile');
        }
    }
    var restart = document.createElement('button');
    restart.setAttribute('id', 'restart');
    restart.setAttribute('style', ['margin-top: 20px'].join(';'));
    restart.textContent = "Restart"
    document.body.appendChild(restart);
    restart.addEventListener('click', reStart);

    for (var tileIndex = 0; tileIndex < tableSize; tileIndex += 1) {
        var div = document.createElement('div');
        div.setAttribute('id', 'div' + tileIndex);
        div.setAttribute('class', 'tile');
        outerBorder.appendChild(div);
        div.addEventListener('click', clickFunction);
    }

    var clickNumber = 0;
    function clickFunction () {

        var divnum = event.target.id.substring(3);
        var yPos = Math.floor(divnum/sizeInt);
        var xPos = divnum % sizeInt;

        if (board[yPos][xPos] !== 0) {

            return;
        }
        if (clickNumber % 2 === 0) {
            turn.textContent = "It's " + secondPlayer + "'s turn.";
        }
        else {
            turn.textContent = "It's " + firstPlayer + "'s turn.";

        }
        if (clickNumber % 2 === 0) {
            event.target.setAttribute('class', 'ex');
        }
        else {
            event.target.setAttribute('class', 'circle');
        }

        board[yPos][xPos] = (clickNumber % 2) + 1;
        clickNumber += 1;

        var max = Math.min(sizeInt, 5);
        var diff = max - 1;

        function check() {
            var currentY = yPos;
            var currentX = xPos;

            function winner() {
                if (firstPlayer === 'Kristof') {
                    window.alert("Kristof has won!");
                    firstCounter += 1;
                    document.getElementById('firstCounter').textContent = firstPlayer + " : " + firstCounter + " points";
                    reStart();
                }
                if (board[currentY][currentX] === 1) {
                    window.alert(firstPlayer + " has won!");
                    firstCounter += 1;
                    document.getElementById('firstCounter').textContent = firstPlayer + " : " + firstCounter + " points";
                    reStart();
                }
                if (board[currentY][currentX] === 2) {
                    window.alert(secondPlayer + " has won!");
                    secondCounter += 1;
                    document.getElementById('secondCounter').textContent = secondPlayer + " : " + secondCounter + " points";
                    reStart();
                }
            }


            // horiontal check
            // xStart = the "x" coordinates from where the check starts
            // yIndex = the "y" coordinates which array is checks

            // xIndex = az a lépték amivel "előre megyünk az xStart-hoz képest"

            for (var xStart = currentX - diff, yIndex = currentY; xStart <= currentX; xStart += 1) {
                // check bounds
                if (xStart < 0 || xStart > sizeInt - 1) {
                    continue;
                }
                var finish = true;
                for (var xIndex = 0; xIndex < max; xIndex += 1) {

                    if ((xStart+xIndex) > sizeInt - 1) {
                        finish = false;
                        break;
                    }

                    if (board[yIndex][xStart+xIndex] !== board[currentY][currentX]) {
                        finish = false;
                        break;
                    }
                }
                if (finish) {
                    setTimeout(winner, 10);
                    break;
                }
            }

            // vertival check
            // xIndex the element index of what is being checked in every array
            // yStart the outerarray index from where the checking is started

            // yIndex is the increase number which is added to the yStart
            for (var xIndex = currentX, yStart = currentY - diff; yStart <= currentY; yStart += 1) {

                if (yStart < 0 || yStart > sizeInt - 1) {
                    continue;
                }
                var finish = true;
                for (var yIndex = 0; yIndex < max; yIndex += 1) {

                    if (yStart+yIndex > sizeInt - 1) {
                        finish = false;
                        break;
                    }

                    if (board[yStart+yIndex][xIndex] !== board[currentY][currentX]) {
                        finish = false;
                        break;
                    }
                }
                if (finish) {
                    setTimeout(winner, 10);
                    break;
                }
            }

            // diagonal check leftup to rightdown

            for (var yStart = currentY - diff, xStart = currentX - diff; yStart <= currentY; yStart += 1, xStart += 1) {

                if (yStart < 0 || xStart < 0 || yStart > sizeInt - 1 || xStart > sizeInt - 1) {
                    continue;
                }
                var finish = true;
                for (var commonIndex = 0; commonIndex < max; commonIndex += 1) {

                    if (yStart + commonIndex > sizeInt - 1 || xStart + commonIndex > sizeInt - 1) {
                        finish = false;
                        break;
                    }

                    if (board[yStart+commonIndex][xStart+commonIndex] !== board[currentY][currentX]) {
                        finish = false;
                        break;
                    }
                }
                if (finish) {
                    setTimeout(winner, 10);
                    break;
                }
            }

            // diagonal check rigthup to leftdown


            for (var yStart = currentY - diff, xStart = currentX + diff; yStart <= currentY; yStart += 1, xStart -= 1) {

                if (yStart < 0 || xStart < 0 || yStart > sizeInt - 1 || xStart > sizeInt - 1) {
                    continue;
                }
                var finish = true;
                for (var commonIndex = 0; commonIndex < max; commonIndex += 1) {

                    if(yStart + commonIndex > sizeInt - 1 || xStart - commonIndex < 0) {
                        finish = false;
                        break;
                    }

                    if (board[yStart+commonIndex][xStart-commonIndex] !== board[currentY][currentX]) {
                        finish = false;
                        break;
                    }
                }
                if (finish) {
                    setTimeout(winner, 10);
                    break;
                }
            }
            var tie = true;
            for (var boardIndex = 0; boardIndex < board.length; boardIndex += 1) {
                for (var rowIndex = 0; rowIndex < board[boardIndex].length; rowIndex += 1) {
                    if (board[boardIndex][rowIndex] === 0) {
                        tie = false;
                    }
                }
            }
            if (tie) {
                setTimeout(function(){
                    window.alert('tie');
                    reStart();
                }, 10);
            }
        };

        if (clickNumber > max) {
            check();
        }
    };

};
