function increasePicture(event) {
    var error = document.createElement('img');
    error.src = 'img/error/error.jpg';
    if (event.target.classList.contains('images_item')) {
        main.innerHTML = '';
        var origPicture = event.target.cloneNode(true);
        origPicture.classList.remove('images_item');
        origPicture.src = origPicture.src.replace('small', 'orig');
    }

    origPicture.onload = function () {
        file.innerHTML = this.src;
        message.innerHTML = 'Изображение загружено';
        main.appendChild(origPicture);
    };

    origPicture.onerror = function () {
        message.innerText = 'Файл не найден';
        file.innerHTML = this.src;
        main.appendChild(error);
    };
}

function init() {
    var main = document.getElementById('main');
    var message = document.getElementById('message');
    var file = document.getElementById('file');
    var images = document.getElementById('images');
    var pictures = ['1.jpg', '2.jpg', '3.jpeg'];


    for (var i = 0; i < pictures.length; i++) {
        var img = document.createElement('img');
        img.src = 'img/small/' + pictures[i];
        img.classList.add('images_item');

        images.appendChild(img);
    }
    images.addEventListener('click', increasePicture);
}


window.onload = init;
