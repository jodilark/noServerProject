angular.module('noServer').service('recipeListService', function ($http) {
    this.recipeListServiceTest = "recipeListService is working"

this.getRecipeList  = () => ( $http.get('https://api.xivdb.com/recipe') )

})