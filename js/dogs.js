var Dogs = (function ($) {
    "use strict";
    var sep = "/";
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
        getSubBreed: function(breedName, subBreedName) {
            return $.ajax({
                url: dog_api + breed + breedName + sep + subBreedName + sep + images
            });
        },
        getSubBreeds: function(breedName) {
            return $.ajax({
                url: dog_api + breed + breedName + sep + list
            });
        }
    };
})(jQuery);
