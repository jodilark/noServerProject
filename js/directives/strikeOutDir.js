angular.module("noServer").directive("strikeOut", function (){
    return {
        link: function (scope, element, attribure){
            element.on("click", function (){             
                 element.css('text-decoration', 'line-through')                
                 element.css('text-decoration-color', 'white')                
            })
        }
    }
})