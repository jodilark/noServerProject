angular.module('noServer').service('changeMeService', function ($http) {
    this.serviceTest = "changeMe service is working"

    // test data
    this.recipeList = [{
        name: "soup"
        , id: 1
        , crystal: "fire"
        , ingredients: [{
            name: "onion"
            , quantity: 5
        },
        {
            name: "salt"
            , quantity: 2
        },
        {
            name: "grilled Meat"
            , quantity: 2
            , isRecipe: true
            , id: 3
            , crystal: "fire"
            , ingredients: [
                {
                    name: "sheep meat"
                    , quantity: 1
                },
                {
                    name: "salt"
                    , quantity: 1
                }
            ]
        }        
    ]
},
    {
        name: "banana pie",
        id: 2
    }
    ]

})