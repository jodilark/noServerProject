angular.module("noServer").directive('testDirective', function () {
    return {
        replace: true
        , templateUrl: '../../views/testDirective.html'
        , link: function (scope, element, attribute) {
            if (scope.itemConnected = true){
                element.css("height", "0px")
            }
        }
    }
})