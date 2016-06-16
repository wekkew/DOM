//Change the body style so it has a font-family of "Arial, sans-serif".
document.body.setAttribute('style', ['color: black', 'font-family: Arial, sans-serif'].join(';'));

// Replace each of the spans (nickname, favorites, hometown) with your own information.
var nickname = document.getElementById('nickname');
nickname.textContent = "CT";

var favorites = document.getElementById('favorites');
favorites.textContent = "szilva, korte, CSERESZNYE";

var hometown = document.getElementById("hometown");
hometown.textContent = "itthon vagyok itt e vilagon es mar nem vagyok otthon az egben";

//Iterate through each li and change the class to "listitem". Add a style tag that sets a rule for "listitem" to make the color red.

var listitem = document.getElementsByTagName('li');

for (var index = 0; index < listitem.length; index += 1) {
    listitem[index].setAttribute('class', 'listitem');
};

var listitemStyle = document.createElement('style');
listitemStyle.innerHTML = '.listitem {color: red}';
document.body.appendChild(listitemStyle);
var index = 0;
//Create a new img element and set its src attribute to a picture of you. Append that element to the page.
function setPictureOfMe() {
    index += 1;
    var img = document.createElement('img');
    if (index % 2 === 0) {
        img.setAttribute('src', ['img.jpg']);
    }
    else {
        img.setAttribute('src', ['img1.jpg'])
    }
    img.setAttribute('style', ['width: 300px', 'height: 200px'].join(';'));
    document.body.appendChild(img);
    img.addEventListener('click', removePictureOfMe)
};


function removePictureOfMe (event) {
    event.target.remove();
}

function setBackGround (event) {
    var x = Math.round(event.clientX / 1000 * 255);
    var y = Math.round(event.clientY / 1000 * 255);
    var rgb = "rgb(" + x + "," + y + "," + " 100)";
    var textColor = "rgb(" + (255 - x) + "," + (255 - y) + "," + " 0)"
    //console.log('style','color: black; font-family: Arial sans-serif; background-color:'+ rgb);
    document.body.setAttribute('style','color: ' + textColor + '; font-family: Arial sans-serif; background-color:'+ rgb);


}

document.addEventListener('mousemove', setBackGround);


listitem[0].addEventListener('click', setPictureOfMe);
