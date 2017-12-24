var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 300;

var snakeTimer;
var snake = [];
var snakeCoordX;
var snakeCoordY;
var direction = 'top';
var score = 0;
var obstacles = [];
var obstaclesTimer;


window.onload = function () {
    generateGameField();

    document.getElementById('snake-start').addEventListener('click', startGameHandler);
    document.getElementById('snake-renew').addEventListener('click', refreshGameHandler);
    window.addEventListener('keydown', changeDirectionHandler);


    function changeDirectionHandler(event) {
        switch (event.keyCode) {
            case 37:
                if (direction !== 'right') {
                    direction = 'left';
                }
                break;
            case 38:
                if (direction !== 'bottom') {
                    direction = 'top';
                }
                break;
            case 39:
                if (direction !== 'left') {
                    direction = 'right';
                }
                break;
            case 40:
                if (direction !== 'top') {
                    direction = 'bottom';
                }
                break;
        }
    }

    function generateGameField() {
        var table = document.createElement('table');
        table.classList.add('game-table');
        table.id = 'game-table';

        document.getElementById('snake-field').style.width = (FIELD_SIZE_X * 15 + FIELD_SIZE_X * 1 + 1) + 'px';

        for (var i = 0; i < FIELD_SIZE_X; i++) {
            var row = document.createElement('tr');
            for (var j = 0; j < FIELD_SIZE_Y; j++) {
                var cell = document.createElement('td');
                cell.classList.add('game-table-cell');

                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        document.getElementById('snake-field').appendChild(table);
    }

    function startGameHandler() {
        respawn();

        snakeTimer = setInterval(move, SNAKE_SPEED);
        setTimeout(createFood, 3000);
        obstaclesTimer = setInterval(createObstacles, 3000); // добавляем препятсвия в саму игру
    }

    function createFood() {
        var foodCreated = false;

        while (!foodCreated) {
            var foodX = Math.floor(Math.random() * FIELD_SIZE_X);
            var foodY = Math.floor(Math.random() * FIELD_SIZE_Y);

            var table = document.getElementById('game-table');
            var foodUnit = table.children[foodX].children[foodY];

            if (!foodUnit.classList.contains('snake-unit') && !foodUnit.classList.contains('obstacle-unit')) {
                foodCreated = true;
                foodUnit.classList.add('food-unit');
            }
        }
    }

//
    function createObstacles() {                  // создаем сами препятсвия
        var obstaclesCreated = false;

        while (!obstaclesCreated) {
            var obstacleX = Math.floor(Math.random() * FIELD_SIZE_X);
            var obstacleY = Math.floor(Math.random() * FIELD_SIZE_Y);
            var table = document.getElementById('game-table');
            var obstacleUnit = table.children[obstacleX].children[obstacleY];

            if (!obstacleUnit.classList.contains('snake-unit') && !obstacleUnit.classList.contains('food-unit')) {
                obstaclesCreated = true;
                obstacleUnit.classList.add('obstacle-unit');
                obstacles.push(obstacleUnit);

                for (i = 0; i < obstacles.length; i++) {
                    if (i > 5) {
                        obstacles.shift().classList.remove('obstacle-unit');
                    }
                }
            }
        }
    }


    function respawn() {
        snakeCoordX = Math.floor(FIELD_SIZE_X / 2);
        snakeCoordY = Math.floor(FIELD_SIZE_Y / 2);

        var table = document.getElementById('game-table');
        var snakeHead = table.children[snakeCoordX].children[snakeCoordY];
        var snakeTail = table.children[--snakeCoordX].children[snakeCoordY];

        snakeHead.classList.add('snake-unit');
        snakeTail.classList.add('snake-unit');

        snake.push(snakeHead);
        snake.push(snakeTail);
    }

    function refreshGameHandler() {

    }

    function move() {
        var newUnit;
        var table = document.getElementById('game-table');

        switch (direction) {
            case 'top':
                snakeCoordX--;
                break;
            case 'bottom':
                snakeCoordX++;
                break;
            case 'left':
                snakeCoordY--;
                break;
            case 'right':
                snakeCoordY++;
                break;
        }

        if (snakeCoordX >= 0 && snakeCoordX <= FIELD_SIZE_X) {
            newUnit = table.children[snakeCoordX].children[snakeCoordY];
        }

        if (newUnit && !isSnakeUnit(newUnit) && !IsObstaclesUnit(newUnit)) {
            newUnit.classList.add('snake-unit');
            snake.push(newUnit);

            if (!isFoodUnit(newUnit)) {
                var oldUnit = snake.shift();
                oldUnit.classList.remove('snake-unit');
            }
        } else {
            gameOver();
        }
    }

    function isSnakeUnit(unit) {
        return snake.includes(unit);
    }

    function gameOver() {
        clearInterval(snakeTimer);
        clearInterval(obstaclesTimer);
        alert('Ваша змейка врезалась!!! Игра окончена. Ваш суммарный счет составил ' + score);
    }

    function isFoodUnit(unit) {
        if (unit.classList.contains('food-unit')) {
            score++;
            document.getElementById('score').innerHTML = 'Ваш счет: ' + score; // Добавляем счет в реальном времени
            unit.classList.remove('food-unit');

            createFood();

            return true;
        } else {
            return false;
        }
    }

    function IsObstaclesUnit(unit) {  // если змейка совпдает с преградой, завершаем игру
        if (unit.classList.contains('obstacle-unit')) {
            gameOver();
        }
    }
}
