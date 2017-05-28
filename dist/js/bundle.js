'use strict';

angular.module('noServer', ['ui.router', 'ui.select', 'ngSanitize']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/', "");
    $stateProvider.state('home', {
        templateUrl: './views/home.html',
        url: '/'
    }).state('recipe', {
        templateUrl: './views/testview.html',
        url: '/recipe'
    });
});
'use strict';

angular.module('noServer').controller('changeMeController', function ($scope, changeMeService, $stateParams, recipeListService, singleRecipeService) {
    // hookup tests
    $scope.controllerTest = "changeMe controller is working";
    $scope.serviceTest = changeMeService.serviceTest;
    $scope.recipeListServiceTest = recipeListService.recipeListServiceTest;
    $scope.singleRecipeServiceTest = singleRecipeService.singleRecipeServiceTest;

    // list of variables   
    $scope.selectedRecipe; //two way binding
    $scope.qtyToMake = 1; //two way binding
    $scope.id = function (selectedRecipe) {
        $scope.theRecipe(selectedRecipe.match(/\d/ig).join(''));
    };

    // functions
    //Get a list of all recipes
    $scope.listOfRecipes = function () {
        recipeListService.getRecipeList().then(function (response) {
            $scope.recipeCard = response.data;
        });
    };
    $scope.listOfRecipes();

    // Get a single recipe by ID
    $scope.theRecipe = function (id) {
        singleRecipeService.getRecipe(id).then(function (response) {
            $scope.thisRecipe = response.data;
            $scope.tree = response.data.tree;
            console.log($scope.thisRecipe);
        });
    };

    // show directive span if recipe has a url_type = 'recipe'
    $scope.isRecipe = function (urltype) {
        return urltype > 0;
    };

    //test to loop through object
    $scope.foo = function (obj) {
        if (obj === undefined || obj === null) {
            return;
        } else {
            var array = [];
            array.push(Object.keys(obj));
            var bob = array.join("");
            return $scope.mynewitem = 'item.synths[' + bob + '].tree';
        }
    };

    //add tier1 objects to raw material array
    var rawArr = [];
    $scope.rawMat = rawArr;
    $scope.raw = function (name, qty, sName, sQty, recipeBool) {
        // console.log(`this is the name ${name}`)
        // console.log(`this is the qty ${qty}`)
        // console.log(`this is the sName ${sName}`)
        // console.log(`this is the sQty ${sQty}`)
        if (recipeBool) {
            // console.log(`yup true`)
            rawArr.push({
                sName: sName,
                sqty: sQty
            });
        } else {
            rawArr.push({
                iName: name,
                iqty: qty
            });
        }

        return rawArr; //of raw objects and their quantities
    };

    // combine duplicate mats
    $scope.combineMats = function (rawArr) {
        //make all name say sName
        for (var _i = 0; _i < rawArr.length; _i++) {
            for (var key in rawArr[_i]) {
                // console.log(`key is ${key}`)
                if (key === 'iName') {
                    // console.log(`this is the iName - ${key}`)
                    rawArr[_i]['sName'] = rawArr[_i]['iName'];
                    rawArr[_i]['sqty'] = rawArr[_i]['iqty'];
                    delete rawArr[_i]['iName'];
                    delete rawArr[_i]['iqty'];
                }
            }
        }
        //add duplicate names
        var a = rawArr;
        var ans = {};

        for (var i = 0; i < a.length; ++i) {
            console.log(i);
            console.log(a[i]);
            for (var obj in a[i]) {

                ans[obj] = ans[obj] ? ans[obj] + a[i][obj] : a[i][obj];
            }
        }
        console.log('this is a = ' + ans.sName + ' ' + ans.sqty);

        // return rawMaterials
    };

    //just to check the rawArr
    $scope.checkRawArr = function (rawArr) {
        console.log(rawArr);
    };
});
'use strict';

angular.module("noServer").directive('testDirective', function (recipeListService, singleRecipeService) {
    return {
        templateUrl: '../../views/testDirective.html'
    };
});
'use strict';

angular.module('noServer').service('changeMeService', function ($http) {
    this.serviceTest = "changeMe service is working";

    // test data
    this.recipeList = [{
        name: "soup",
        id: 1,
        crystal: "fire",
        ingredients: [{
            name: "onion",
            quantity: 5
        }, {
            name: "salt",
            quantity: 2
        }, {
            name: "grilled Meat",
            quantity: 2,
            isRecipe: true,
            id: 3,
            crystal: "fire",
            ingredients: [{
                name: "sheep meat",
                quantity: 1
            }, {
                name: "salt",
                quantity: 1
            }]
        }]
    }, {
        name: "banana pie",
        id: 2
    }];
});
'use strict';

angular.module('noServer').service('recipeListService', function ($http) {
    this.recipeListServiceTest = "recipeListService is working";

    this.getRecipeList = function () {
        return $http.get('https://api.xivdb.com/recipe');
    };
});
'use strict';

angular.module('noServer').service('singleRecipeService', function ($http) {
    this.singleRecipeServiceTest = "singleRecipeService is working";

    this.getRecipe = function (id) {
        return $http.get('https://api.xivdb.com/recipe/' + id).then(function (response) {
            return response;
        });
    };
});
//# sourceMappingURL=bundle.js.map
