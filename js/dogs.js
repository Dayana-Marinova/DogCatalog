var Dogs = (function ($) {
    sep = "/";
    return {
        randomDog: function () {
            return $.ajax({
                url: dog_api + breeds + random_image
            });
        },
        getBreeds: function() {
            return $.ajax({
                url: dog_api + breeds + list
            });
        },
        getBreed: function(breedName) {
            return $.ajax({
                url: dog_api + breed + breedName + sep + images
            });
        },
        getSubBreeds: function(breedName, subBreedName) {
            return $.ajax({
                url: dog_api + breed + breedName + sep + subBreedName + sep + images
            });
        }
    };
})(jQuery);
