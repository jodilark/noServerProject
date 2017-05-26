angular.module('noServer').service('singleRecipeService', function ($http) {
    this.singleRecipeServiceTest = "singleRecipeService is working"

this.getRecipe = (id) => ( $http.get('https://api.xivdb.com/recipe/' + id).then(function (response) {
            return response
        }) )


})
