angular.module("noServer").directive('testDirective', function (recipeListService, singleRecipeService) {
    return {
        templateUrl: '../../views/testDirective.html'
    }
})