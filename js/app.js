jQuery(document).ready(function dogCatalog() {
    var $main = jQuery('#main');

    var app;

    showBreed = function(e) {
        var breed = e.currentTarget.innerText;
        app.setLocation('#/album/' + breed);
    };

    showSubBreed = function(e) {
        var breed = e.data.br;
        var sub = e.currentTarget.innerText;
        app.setLocation('#/album/sub/' + breed + "/" + sub);
    };

    showImage = function(e) {
        var src = e.currentTarget.src;
        app.setLocation('#/image');
        var data = { 
            'src': src
        };
        $main.html(Renderer.render('image', data));
    }

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
                $('.dog_btn-default').on('click', {br: breed}, showSubBreed);
                $('.dog_img').on('click', showImage);
            });
        });
        this.get('#/image', function () {
            //var src = this.params.src;
            //console.log(src)
            //$main.html(Renderer.render('image', src));
        });
        this.get('#/album/sub/:breed/:sub', function () {
            var breed= this.params.breed;
            var sub = this.params.sub;

            $.when(Catalog.randomSubDog(breed, sub), Dogs.getSubBreed(breed, sub)).done(function(randomDog, getBreedImages){
                var data = {
                    'breed': breed,
                    'dog': randomDog[0],
                    'breedImages': getBreedImages[0]

                }
                $main.html(Renderer.render('catalogSub', data));
                $('.dog_img').on('click', showImage);
            });
        });
    });

    app.run('#/');
});