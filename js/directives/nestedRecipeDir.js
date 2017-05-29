angular.module("noServer").directive('nestedRecipe', function (recipeListService, singleRecipeService) {
    return {
        templateUrl: '../../views/nestedRecipe.html'
    }
})