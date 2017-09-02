jQuery(document).ready(function dogCatalog() {
    var $main = jQuery('#main');

    var app;

    app = Sammy('#main', function () {
        this.get('#/', function () {
            Dogs.randomDog().then(function (randomDog){
                $main.html(Renderer.render('home', randomDog));
            });
        });
    });

    app.run('#/');
});