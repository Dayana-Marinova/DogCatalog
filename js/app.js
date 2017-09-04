jQuery(document).ready(function dogCatalog() {
    var $main = jQuery('#main');

    var app;

    showBreed = function(e) {
        var breed = e.currentTarget.innerText;
        app.setLocation('#/breed/' + breed);
    };

    showSubBreed = function(e) {
        var breed = e.currentTarget.innerText;
        app.setLocation('#/breed/' + breed);
    };

    app = Sammy('#main', function () {
        this.get('#/', function () {
            $.when(Dogs.randomDog(), Dogs.getBreeds()).done(function(randomDog, breeds){
                var data = {
                    'rand': randomDog[0],
                    'list': breeds[0]
                };
                $main.html(Renderer.render('home', data));
                $('.dog_btn-default').on('click', showBreed);
            });
        });
        this.get('#/catalog', function () {
            Dogs.getBreeds().then(function(breeds){
                $main.html(Renderer.render('catalog', breeds));
            });
        });
        this.get('#/breed/:breed', function(){
            var breed = this.params.breed;

            $.when(Dogs.getSubBreeds(breed)).done(function(subBreeds){
                console.log(subBreeds);
                var data = {
                    'list': subBreeds,
                    'breed': breed
                };
                $main.html(Renderer.render('breeds', data));
                $('.dog_btn-default').on('click', showSubBreed);
            });
        });
    });


    

    app.run('#/');
});