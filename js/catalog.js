var Catalog = (function ($) {
    sep = "/catalog";
    return {
        getBreeds: function() {
            return $.ajax({
                url: dog_api + breeds + list
            });
        },
        randomDog: function () {
            return $.ajax({
                url: dog_api + breeds + random_image
            });
        }
    };
})(jQuery);