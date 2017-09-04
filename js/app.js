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
            $.when(Catalog.randomDog(), Catalog.getSubBreeds(), Catalog.getBreedImages()).done(function(randomDog, getSubBreeds, getBreedImages){
                var data = {
                    'dog': randomDog[0],
                    'subBreeds': getSubBreeds[0],
                    'breedImages': getBreedImages[0]

                }
                $main.html(Renderer.render('catalog', data));
            });
        });
        this.get('#/breed/:breed', function(){
            var breed = this.params.breed;

            $.when(Dogs.getSubBreeds(breed), Dogs.getBreed(breed)).done(function(subBreeds, breedImages){
                console.log(breedImages);
                var data = {
                    'list': subBreeds[0],
                    'breed': breed,
                    'breedImages': breedImages[0]
                };
                $main.html(Renderer.render('breeds', data));
                $('.dog_btn-default').on('click', showSubBreed);
            });
        });
    });


    

    app.run('#/');
});