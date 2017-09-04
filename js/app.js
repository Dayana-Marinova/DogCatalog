jQuery(document).ready(function dogCatalog() {
    var $main = jQuery('#main');

    var app;

    app = Sammy('#main', function () {
        this.get('#/', function () {
            $.when(Dogs.randomDog(), Dogs.getBreeds()).done(function(randomDog, breeds){
                var data = {
                    'rand': randomDog[0],
                    'list': breeds[0]
                }
                $main.html(Renderer.render('home', data));
            });
        });
        this.get('#/catalog', function () {
            Dogs.getBreeds().then(function(breeds){
                $main.html(Renderer.render('catalog', breeds));
            });
        });
    });

    app.run('#/');
});