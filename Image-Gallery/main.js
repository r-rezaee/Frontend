var displayedImage = document.getElementById('displayed-img');

var thumbBar = document.querySelector('.thumb-bar');


var overlay = document.querySelector('.overlay');

/* Looping through images */
for (i = 1; i < 6; i++) {
    var newImage = document.createElement('img');
    newImage.setAttribute('src', 'img/pic' + i + '.png');
    thumbBar.appendChild(newImage);
    newImage.onclick = function(e) {
        var imgSrc = e.target.getAttribute('src');
        displayImage(imgSrc);
    }

}

function displayImage(imgSrc) {
    displayedImage.setAttribute('src', imgSrc);
}

var filtArray = new Array('reset', 'contrast', 'sepia', 'blur', 'brightness', 'grayscale', 'invert', 'saturate', 'shadow', 'huerotate');
for (var j = 0; j < filtArray.length; j++) {
    var newButton = document.createElement('button');

    newButton.setAttribute('id', filtArray[j]);

    newButton.innerHTML = filtArray[j];

    var filtbtn = document.getElementById('filter');
    filtbtn.appendChild(newButton);

    newButton.onclick = function() {
        //alert(this.textContent);
        displayedImage.style.display = null;
        displayedImage.setAttribute('class', this.textContent);
    }

}
