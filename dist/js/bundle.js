'use strict';

angular.module('noServer', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
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
    $scope.qtyToMake; //two way binding
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

    // helper method to check if item is "connected"
    $scope.isConnected = function (itemConnected, itemName) {
        if (itemConnected = true) {
            console.log(itemName);
        }
    };
});
'use strict';

angular.module("noServer").directive('testDirective', function () {
    return {
        replace: true,
        templateUrl: '../../views/testDirective.html',
        link: function link(scope, element, attribute) {
            if (scope.itemConnected = true) {
                element.css("height", "0px");
            }
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
