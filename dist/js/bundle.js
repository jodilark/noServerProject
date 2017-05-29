'use strict';

angular.module('noServer', ['ui.router', 'ui.select', 'ngSanitize']).config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/', "");
    $stateProvider.state('home', {
        templateUrl: './views/home.html',
        url: '/'
    }).state('recipe', {
        templateUrl: './views/selectedRecipe.html',
        url: '/recipe'
    });
});
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

angular.module('noServer').controller('changeMeController', function ($scope, changeMeService, $stateParams, recipeListService, singleRecipeService, $interval) {
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
            // console.log($scope.tree[0])
        });
    };

    //   item.synths['1'].tree  

    // show directive span if recipe has a url_type = 'recipe'
    $scope.isRecipe = function (urltype, obj) {
        // console.log(`the obj is ${obj}`)
        for (var key in obj) {
            // console.log(`the key in the obj is ${key}`)
            $scope.synthID = obj[key];
            // console.log(`the new obj should be ${$scope.synthID} but is actually ${obj[key]}`)
            break;
        }
        return urltype > 0;
    };

    //add tier1 objects to raw material array
    var rawArr = [];
    $scope.rawMat = rawArr;
    $scope.raw = function (name, qty, sName, sQty, recipeBool) {
        if (recipeBool) {
            rawArr.push(_defineProperty({}, sName, sQty));
        } else {
            rawArr.push(_defineProperty({}, name, qty));
        }

        return rawArr; //of raw objects and their quantities
    };

    // combine duplicate mats
    var shoppingListArr = [];
    $scope.testy = shoppingListArr;
    $scope.startInterval = function () {
        $interval(function () {
            $scope.combineMats = function (rawArr) {
                var a = rawArr;
                var ans = {};
                for (var i = 0; i < a.length; ++i) {
                    for (var obj in a[i]) {
                        ans[obj] = ans[obj] ? ans[obj] + a[i][obj] : a[i][obj];
                    }
                }
                shoppingListArr.push(ans);
            };
            // console.log(rawArr)
            $scope.combineMats(rawArr);
        }, 500, 1);
    };

    //make the shoppinListArr into a Json blob
    var jsonObject = [];
    $scope.shoppingJson = jsonObject;
    $scope.startIntervalMakeJson = function () {
        $interval(function () {
            $scope.makeJson = function (arr, newKeyName, newValueQty) {
                var obj = arr[0];
                // console.log(obj)
                for (var key in obj) {
                    var _jsonObject$push;

                    // console.log(key)
                    // console.log(obj[key])
                    jsonObject.push((_jsonObject$push = {}, _defineProperty(_jsonObject$push, newKeyName, key), _defineProperty(_jsonObject$push, newValueQty, obj[key]), _jsonObject$push));
                }
                // console.log(jsonObject)
            };
            // console.log(jsonObject)
            $scope.makeJson(shoppingListArr, "name", "qty");
        }, 1000, 1);
    };

    //Enable get recipe button
    $scope.enabeGetRecipe = function (bool) {
        return $scope.getRecipeButton = bool;
    };

    //get dynamic synths id

});
"use strict";

angular.module("noServer").directive("tests", function (changeMeService, recipeListService, singleRecipeService) {
    return {
        templateUrl: "../../views/connectionTest.html"
    };
});
"use strict";
'use strict';

angular.module("noServer").directive('nestedRecipe', function (recipeListService, singleRecipeService) {
    return {
        templateUrl: '../../views/nestedRecipe.html'
    };
});
'use strict';

angular.module("noServer").directive('shoppingList', function (recipeListService, singleRecipeService) {
    return {
        templateUrl: '../../views/shoppingList.html'
    };
});
"use strict";

angular.module("noServer").directive("strikeOut", function () {
    return {
        link: function link(scope, element, attribure) {
            element.on("click", function () {
                element.css('text-decoration', 'line-through');
            });
        }
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
