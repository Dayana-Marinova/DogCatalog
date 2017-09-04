var Catalog = (function ($) {
    sep = "/";
    return {
        getSubBreeds: function(breedName) {
            return $.ajax({
                url: dog_api + breed + breedName + sep + list
            });
        },
        getBreedImages: function (breedName) {
            return $.ajax({
                url: dog_api + breed + breedName + sep + images
            });
        },
        randomDog: function (breedName) {
            return $.ajax({
                url: dog_api + breed + breedName + sep + random_images
            });
        }
    };
})(jQuery);

///api/breed/{breed name}/{sub-breed name}/images
///api/breed/{breed name}/{sub-breed name}/images/random