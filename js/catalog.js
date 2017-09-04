var Catalog = (function ($) {
    sep = "/";
    return {
        getSubBreeds: function() {
            return $.ajax({
                url: dog_api + breed + 'sheepdog/' + list
            });
        },
        getBreedImages: function () {
            return $.ajax({
                url: dog_api + breed + 'sheepdog/' + images
            });
        },
        randomDog: function () {
            return $.ajax({
                url: dog_api + breed + 'sheepdog/' + random_images
            });
        }
    };
})(jQuery);

///api/breed/{breed name}/{sub-breed name}/images
///api/breed/{breed name}/{sub-breed name}/images/random