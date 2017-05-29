angular.module("noServer").directive('shoppingList', function (recipeListService, singleRecipeService) {
    return {
        templateUrl: '../../views/shoppingList.html'
    }
})