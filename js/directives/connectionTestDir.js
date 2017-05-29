angular.module("noServer").directive("tests", function (changeMeService, recipeListService, singleRecipeService){
    return {
        templateUrl: "../../views/connectionTest.html"
    }
})