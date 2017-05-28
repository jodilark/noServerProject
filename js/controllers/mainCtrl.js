angular.module('noServer').controller('changeMeController', function ($scope, changeMeService, $stateParams, recipeListService, singleRecipeService) {
    // hookup tests
    $scope.controllerTest = "changeMe controller is working"
    $scope.serviceTest = changeMeService.serviceTest
    $scope.recipeListServiceTest = recipeListService.recipeListServiceTest
    $scope.singleRecipeServiceTest = singleRecipeService.singleRecipeServiceTest

    // list of variables   
    $scope.selectedRecipe //two way binding
    $scope.qtyToMake = 1 //two way binding
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


    // show directive span if recipe has a url_type = 'recipe'
    $scope.isRecipe = function (urltype) {
        return urltype > 0
    }

    //add tier1 objects to raw material array
    var rawArr = []
    $scope.rawMat = rawArr
    $scope.raw = function (name, qty, sName, sQty, recipeBool) {
        if (recipeBool) {
            rawArr.push(
                {
                    [sName]: sQty
                }
            )
        }
        else {
            rawArr.push(
                {
                    [name]: qty
                }
            )
        }

        return rawArr //of raw objects and their quantities
    }

    // combine duplicate mats
    var shoppingListArr = []
    $scope.testy = shoppingListArr
    $scope.combineMats = function (rawArr) {
        let a = rawArr;
        let ans = {};
        for (let i = 0; i < a.length; ++i) {
            for (let obj in a[i]) {
                ans[obj] = ans[obj] ? ans[obj] + a[i][obj] : a[i][obj];
            }
        }
        shoppingListArr.push(ans)
    }

    //make the shoppinListArr into a Json blob
    var jsonObject = []
    $scope.shoppingJson = jsonObject
    $scope.makeJson = function (arr, newKeyName, newValueQty) {
        let obj = arr[0]        
        // console.log(obj)
        for (let key in obj) {
            // console.log(key)
            // console.log(obj[key])
            jsonObject.push(
                {
                    [newKeyName]: key
                    , [newValueQty]: obj[key]
                }
            )
        }
        // console.log(jsonObject)
    }

})