jQuery(document).ready(function dogCatalog() {
    var $main = jQuery('#main');

    var app;

    app = Sammy('#main', function () {
        this.get('#/', function () {
            $main.html(Renderer.render('home'));
        });
    });

    app.run('#/');
});