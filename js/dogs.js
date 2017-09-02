var Dogs = (function ($) {
    return {
        randomDog: function ( ) {
            return $.ajax({
                url: dog_api + breeds + random_image
            });
        }
    };
})(jQuery);
