function game() {
    document.getElementsByTagName('p').remove();
    document.getElementsByTagName('button').remove();
    document.body.setAttribute('class', 'game');
}


document.addEventListener('click', game);
