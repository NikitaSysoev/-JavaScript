function init() {
    var div = document.createElement('div');

    var div_container = document.body.appendChild(div.cloneNode(true));
    div_container.classList.add('container');
    var class_container = document.getElementsByClassName('container')[0];
    class_container.style = "max-width:1200px; margin: 80px auto";

    var div_grid = class_container.appendChild(div.cloneNode(true));
    div_grid.classList.add('grid');
    var class_grid = document.getElementsByClassName('grid')[0];
    class_grid.style = "display: grid; grid-template-columns: repeat(9, 50px);\n" +
        "    grid-template-rows: repeat(9, 50px); justify-content: center";

    var letters = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    var numbers = ['', '1', '2', '3', '4', '5', '6', '7', '8'];
    var blackFigs1 = ['&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'];
    var whiteFigs1 = ['&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;'];
    var blackFigs2 = ['&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;'];
    var whiteFigs2 = ['&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817'];


    for (var i = 0, j = 0; i < 81, j < 81; i++, j++) {
        var div_item = class_grid.appendChild(div.cloneNode(true));
        div_item.classList.add('item');
        var class_item = document.getElementsByClassName('item');
        class_item[i].style.display = "flex";
        class_item[i].style.alignItems = "center";
        class_item[i].style.justifyContent = "center";
        class_item[i].style.width = "100%";
        class_item[i].style.height = "100%";
        if (j % 2 !== 0) {
            div_item.classList.add('item_black');
            var class_item_black = document.getElementsByClassName('item_black');
            for (var l = 0; l < class_item_black.length; l++) {
                class_item_black[l].style.backgroundColor = "#CD853F";
            }
        }

        if (j % 2 === 0) {
            div_item.classList.add('item_white');
            var class_item_white = document.getElementsByClassName('item_white');
            for (var q = 0; q < class_item_white.length; q++) {
                class_item_white[q].style.backgroundColor = "#F5DEB3";
            }
        }

        if (j < 9) {
            div_item.classList.add('item_main');
            var class_item_main = document.getElementsByClassName('item_main');
            div_item.classList.remove('item_black');
            div_item.classList.remove('item_white');
            for (var z = 0; z < class_item_main.length; z++) {
                class_item_main[z].style.backgroundColor = "transparent";
                div_item.innerText = letters[z];
            }
        }


        if (j % 9 === 0) {
            div_item.classList.add('item_num');
            var class_item_num = document.getElementsByClassName('item_num');
            div_item.classList.remove('item_black');
            div_item.classList.remove('item_white');
            for (var r = 0; r < class_item_num.length; r++) {
                class_item_num[r].style.backgroundColor = "transparent";
                div_item.innerText = numbers[r];
            }
        }


        if (j > 9 && j < 18) {
            div_item.classList.add('item_figs_white1');
            var item_figs_white1 = document.getElementsByClassName('item_figs_white1');
            for (var n = 0; n < item_figs_white1.length; n++) {
                div_item.innerHTML = whiteFigs1[n];
            }
        }

        if (j > 18 && j < 27) {
            div_item.classList.add('item_figs_white2');
            var item_figs_white2 = document.getElementsByClassName('item_figs_white2');
            for (var h = 0; h < item_figs_white2.length; h++) {
                div_item.innerHTML = whiteFigs2[h];
            }
        }

        if (j >= 64 && j < 72) {
            div_item.classList.add('item_figs_black2');
            var item_figs_black2 = document.getElementsByClassName('item_figs_black2');
            for (var g = 0; g < item_figs_black2.length; g++) {
                div_item.innerHTML = blackFigs2[g];
            }
        }

        if (j <= 81 && j >= 73) {
            div_item.classList.add('item_figs_black1');
            var item_figs_black1 = document.getElementsByClassName('item_figs_black1');
            for (var y = 0; y < item_figs_black1.length; y++) {
                div_item.innerHTML = blackFigs1[y];
            }
        }
    }
};

window.onload = init;