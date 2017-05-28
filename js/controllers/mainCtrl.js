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

    //test to loop through object
    $scope.foo = function (obj) {
        if (obj === undefined || obj === null) {
            return
        }
        else {
            let array = []
            array.push(Object.keys(obj))
            var bob = array.join("")
            return $scope.mynewitem = `item.synths[${bob}].tree`
        }
    }



    //add tier1 objects to raw material array
    var rawArr = []
    $scope.rawMat = rawArr
    $scope.raw = function (name, qty, sName, sQty, recipeBool) {
        // console.log(`this is the name ${name}`)
        // console.log(`this is the qty ${qty}`)
        // console.log(`this is the sName ${sName}`)
        // console.log(`this is the sQty ${sQty}`)
        if (recipeBool) {
            // console.log(`yup true`)
            rawArr.push(
                {
                   sName: sName
                    , sqty: sQty
                }
            )
        }
        else {
            rawArr.push(
                {
                    iName: name
                    , iqty: qty
                }
            )
        }

        return rawArr //of raw objects and their quantities
    }

    // combine duplicate mats
    $scope.combineMats = function (rawArr) {
        //make all name say sName
        for (let i = 0; i < rawArr.length; i++) {
            for (let key in rawArr[i]) {
                // console.log(`key is ${key}`)
                if (key === 'iName') {
                    // console.log(`this is the iName - ${key}`)
                    rawArr[i]['sName'] = rawArr[i]['iName'];
                    rawArr[i]['sqty'] = rawArr[i]['iqty'];
                    delete rawArr[i]['iName'];
                    delete rawArr[i]['iqty'];
                }
            }
        }
        //add duplicate names
        var a = rawArr;
        var ans = {};

        for (var i = 0; i < a.length; ++i) {
            console.log(i)
            console.log(a[i])
            for (var obj in a[i]) {
        
                    ans[obj] = ans[obj] ? ans[obj] + a[i][obj] : a[i][obj];
                
            }
        }
        console.log(`this is a = ${ans.sName} ${ans.sqty}`)

        // return rawMaterials
    }


    //just to check the rawArr
    $scope.checkRawArr = function (rawArr) {
        console.log(rawArr)
    }




})