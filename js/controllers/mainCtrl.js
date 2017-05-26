angular.module('noServer').controller('changeMeController', function ($scope, changeMeService, $stateParams, recipeListService, singleRecipeService) {
    // hookup tests
    $scope.controllerTest = "changeMe controller is working"
    $scope.serviceTest = changeMeService.serviceTest
    $scope.recipeListServiceTest = recipeListService.recipeListServiceTest
    $scope.singleRecipeServiceTest = singleRecipeService.singleRecipeServiceTest

    // list of variables   
    $scope.selectedRecipe //two way binding
    $scope.qtyToMake //two way binding
    $scope.id = (selectedRecipe) => {
        $scope.theRecipe(selectedRecipe.match(/\d/ig).join(''))
    }



    // functions
    //Get a list of all recipes
    $scope.listOfRecipes = function () {
        recipeListService.getRecipeList().then(function (response) {
            $scope.recipeCard = response.data
        })
    }
    $scope.listOfRecipes()

    // Get a single recipe by ID
    $scope.theRecipe = function (id) {
        singleRecipeService.getRecipe(id).then(function (response) {
            $scope.thisRecipe = response.data
            $scope.tree = response.data.tree
            console.log($scope.thisRecipe)

        })
    }


    // helper method to check if item is "connected"
$scope.isConnected = function(itemConnected, itemName){
    if(itemConnected = true){
        console.log(itemName)
    }
}



})