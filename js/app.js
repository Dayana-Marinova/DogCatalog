jQuery(document).ready(function dogCatalog() {
    var $main = jQuery('#main');
    var $searchForm = jQuery('#search');

    var app;

    showHome = function(event) {
        app.setLocation('#/');
    }

    searchBreed = function (event) {
        event.preventDefault();

        var breed = $('#searchBreed').val();
        app.setLocation('#/album/' + breed + '/0');
    };

    showBreed = function(e) {
        var breed = e.currentTarget.innerText;
        app.setLocation('#/album/' + breed + '/0');
    };

    showSubBreed = function(e) {
        var breed = e.data.br;
        var sub = e.currentTarget.innerText;
        app.setLocation('#/album/sub/' + breed + "/" + sub + "/0");
    };

    showImage = function(e) {
        var src = e.currentTarget.src;
        var name = src.split('/').pop();
        var data = { 
            'src': src
        };
        $main.html(Renderer.render('image', data));
        app.setLocation('#/image/' + name);
    };

    previousDog = function(e) {
        var index = e.currentTarget.id;
        var id = parseInt(index);
        var breed = e.data.breed;
        var breedImages = e.data.list;
        var subBreeds = e.data.sub;
        if(id > 0) {
            id -= 1;
        }
        var data = {
            'breed': breed,
            'dog': breedImages["message"][id],
            'subBreeds': subBreeds,
            'breedImages': breedImages,
            'index': id

        }
        $main.html(Renderer.render('catalog', data));
        $('.dog_home_btn').on('click', showHome);
        $('.dog_btn-default').on('click', { br: breed }, showSubBreed);
        $('.dog_img').on('click', showImage);
        $('.move_left').on('click', { list: breedImages, breed: breed, sub: subBreeds }, previousDog);
        $('.move_right').on('click', { list: breedImages, breed: breed, sub: subBreeds }, nextDog);
    };

    nextDog = function(e) {
        var index = e.currentTarget.id;
        var id = parseInt(index);
        var breed = e.data.breed;
        var breedImages = e.data.list;
        var subBreeds = e.data.sub;
        if(id < breedImages["message"].length) {
            id += 1;
        }
        var data = {
            'breed': breed,
            'dog': breedImages["message"][id],
            'subBreeds': subBreeds,
            'breedImages': breedImages,
            'index': id

        }
        $main.html(Renderer.render('catalog', data));
        $('.dog_home_btn').on('click', showHome);
        $('.dog_btn-default').on('click', { br: breed }, showSubBreed);
        $('.dog_img').on('click', showImage);
        $('.move_left').on('click', { list: breedImages, breed: breed, sub: subBreeds }, previousDog);
        $('.move_right').on('click', { list: breedImages, breed: breed, sub: subBreeds }, nextDog);
    };

    previousDogSub = function(e) {
        var index = e.currentTarget.id;
        var id = parseInt(index);
        var breed = e.data.breed;
        var breedImages = e.data.list;
        var sub = e.data.sub;
        if(id > 0) {
            id -= 1;
        }
        var data = {
            'breed': sub,
            'dog': breedImages["message"][id],
            'breedImages': breedImages,
            'index': index
        }
        $main.html(Renderer.render('catalogSub', data));
        $('.dog_home_btn').on('click', showHome);
        $('.dog_btn-default').on('click', { br: breed }, showSubBreed);
        $('.dog_img').on('click', showImage);
        $('.move_left').on('click', { list: breedImages, breed: breed, sub: sub }, previousDogSub);
        $('.move_right').on('click', { list: breedImages, breed: breed, sub: sub}, nextDogSub);
    };

    nextDogSub = function(e) {
        var index = e.currentTarget.id;
        var id = parseInt(index);
        var breed = e.data.breed;
        var breedImages = e.data.list;
        var sub = e.data.sub;
        if(id < breedImages["message"].length) {
            id += 1;
        }
        var data = {
            'breed': breed,
            'dog': breedImages["message"][id],
            'breedImages': breedImages,
            'index': id

        }
        $main.html(Renderer.render('catalogSub', data));
        $('.dog_home_btn').on('click', showHome);
        $('.dog_btn-default').on('click', { br: breed }, showSubBreed);
        $('.dog_img').on('click', showImage);
        $('.move_left').on('click', { list: breedImages, breed: breed, sub: sub }, previousDog);
        $('.move_right').on('click', { list: breedImages, breed: breed, sub: sub }, nextDog);
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
                $('.dog_home_btn').on('click', showHome);
            });
        });
        this.get('#/album/:breed/:id', function () {
            var breed = this.params.breed;
            var index = this.params.id;

            $.when(Catalog.getSubBreeds(breed), Catalog.getBreedImages(breed)).done(function(getSubBreeds, getBreedImages){
                var data = {
                    'breed': breed,
                    'dog': getBreedImages[0]["message"][index],
                    'subBreeds': getSubBreeds[0],
                    'breedImages': getBreedImages[0],
                    'index': index

                }
                $main.html(Renderer.render('catalog', data));
                $('.dog_home_btn').on('click', showHome);
                $('.dog_btn-default').on('click', { br: breed }, showSubBreed);
                $('.dog_img').on('click', showImage);
                $('.move_left').on('click', { list: getBreedImages[0], breed: breed, sub: getSubBreeds[0] }, previousDog);
                $('.move_right').on('click', { list: getBreedImages[0], breed: breed, sub: getSubBreeds[0]}, nextDog);
            });
        });
        this.get('#/image/:name', function () {
            $('.dog_home_btn').on('click', showHome);
        });
        this.get('#/album/sub/:breed/:sub/:id', function () {
            var breed = this.params.breed;
            var index = this.params.id;
            var sub = this.params.sub;

            $.when(Dogs.getSubBreed(breed, sub)).done(function(getBreedImages){
                var data = {
                    'breed': sub,
                    'dog': getBreedImages["message"][index],
                    'breedImages': getBreedImages,
                    'index': index

                }
                $main.html(Renderer.render('catalogSub', data));
                $('.dog_home_btn').on('click', showHome);
                $('.dog_btn-default').on('click', { br: breed }, showSubBreed);
                $('.dog_img').on('click', showImage);
                $('.move_left').on('click', { list: getBreedImages, breed: breed, sub: sub }, previousDogSub);
                $('.move_right').on('click', { list: getBreedImages, breed: breed, sub: sub}, nextDogSub);
            });
        });
    });

    $searchForm.on('submit', searchBreed);

    app.run('#/');
});