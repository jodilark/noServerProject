angular.module('noServer').controller('changeMeController', function ($scope, changeMeService, $stateParams, recipeListService, singleRecipeService, $interval) {
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
            // console.log($scope.tree[0])
        })
    }

//   item.synths['1'].tree  

    // show directive span if recipe has a url_type = 'recipe'
    $scope.isRecipe = function (urltype, obj) {
        // console.log(`the obj is ${obj}`)
        for(let key in obj){
            // console.log(`the key in the obj is ${key}`)
            $scope.synthID = obj[key]
            // console.log(`the new obj should be ${$scope.synthID} but is actually ${obj[key]}`)
            break;
        }        
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
    $scope.startInterval = function(){
        $interval(function(){
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
            // console.log(rawArr)
            $scope.combineMats(rawArr)
        }, 500,1)  
    }

    //make the shoppinListArr into a Json blob
    var jsonObject = []
    $scope.shoppingJson = jsonObject
    $scope.startIntervalMakeJson = function(){
        $interval(function(){
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
            // console.log(jsonObject)
            $scope.makeJson(shoppingListArr, "name", "qty")
        }, 1000,1)
    }


    //Enable get recipe button
    $scope.enabeGetRecipe = function (bool) {
        return $scope.getRecipeButton = bool
    }

//get dynamic synths id


})