jQuery(document).ready(function dogCatalog() {
    var $main = jQuery('#main');

    var app;

    showBreed = function(e) {
        var breed = e.currentTarget.innerText;
        app.setLocation('#/album/' + breed);
    };

    showSubBreed = function(e) {
        var breed = e.currentTarget.innerText;
        app.setLocation('#/album/' + breed);
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
        this.get('#/album/:breed', function () {
            var breed = this.params.breed;

            $.when(Catalog.randomDog(breed), Catalog.getSubBreeds(breed), Catalog.getBreedImages(breed)).done(function(randomDog, getSubBreeds, getBreedImages){
                var data = {
                    'breed': breed,
                    'dog': randomDog[0],
                    'subBreeds': getSubBreeds[0],
                    'breedImages': getBreedImages[0]

                }
                $main.html(Renderer.render('catalog', data));
                $('.dog_btn-default').on('click', showSubBreed);
            });
        });
    });

    app.run('#/');
});