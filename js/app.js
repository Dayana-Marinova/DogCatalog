jQuery(document).ready(function dogCatalog() {
    var $main = jQuery('#main');

    var app;

    app = Sammy('#main', function () {
        this.get('#/', function () {
            Dogs.randomDog().then(function (randomDog){
                Dogs.getBreeds().then(function(breeds){
                    $main.html(Renderer.render('home', {dog: randomDog, list: breeds}));
                });
                
            });
        });
        this.get('#/catalog', function () {
            Catalog.getBreeds().then(function(getBreeds){
                $main.html(Renderer.render('catalog, getBreeds'));
            });
            Catalog.randomDog().then(function(randomDog){
                $main.html(Renderer.render('catalog', randomDog));
            });
        });
    });

    app.run('#/');
});