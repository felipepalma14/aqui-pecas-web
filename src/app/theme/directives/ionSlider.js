/**
 * @author a.demeshko
 * created on 22.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    //.directive('ionSlider', ionSlider);
    .directive('ionRangeSlider', ionRangeSlider);

  /** @ngInject */
/*
  function ionSlider($timeout,$document) {
    return {
      restrict: 'EA',
      template: '<div></div>',
      replace: true,
      require:'ngModel',
      scope: {
        min: '=',
        max: '=',
        //ngModel: '=',
        type: '@',
        prefix: '@',
        maxPostfix: '@',
        prettify: '=',
        prettifySeparator: '@',
        grid: '=',
        gridMargin: '@',
        postfix: '@',
        step: '@',
        hideMinMax: '@',
        hideFromTo: '@',
        from: '=',
        to: '=',
        disable: '=',
        onChange: '=',
        onFinish: '=',
        values: '=',
        timeout: '@'
      },
      link: function ($scope, $element, element,attrs,ngModel) {
             $element.ionRangeSlider({
              min: $scope.min,
              max: $scope.max,
              type: $scope.type,
              prefix: $scope.prefix,
              maxPostfix: $scope.maxPostfix,
              prettify_enabled: $scope.prettify,
              prettify_separator: $scope.prettifySeparator,
              grid: $scope.grid,
              gridMargin: $scope.gridMargin,
              postfix: $scope.postfix,
              step: $scope.step,
              hideMinMax: $scope.hideMinMax,
              hideFromTo: $scope.hideFromTo,
              from: $scope.from,
              to: $scope.to,
              disable: $scope.disable,
              onChange: $scope.onChange,
              onFinish: $scope.onFinish,
              values: $scope.values,

            });

            
            function updateView(value) {
                ngModel.$viewValue = value;
                ngModel.$render(); 
            }

            function updateModel(value) {
                //ngModel.$modelValue = value;
                scope.ngModel = value; // overwrites ngModel value
            }

            

            $scope.$watch('min', function (value) {
              $timeout(function () {

                $element.data("ionRangeSlider").update({min: value});
              });
            }, true);
            $scope.$watch('max', function (value) {
              $timeout(function () {
                $element.data("ionRangeSlider").update({max: value});
              });
            });


            $scope.$watch('from', function (value) {
                //ngModel.$setViewValue(value);
                //ngModel.$render();

                
              $timeout(function () {

                $element.data("ionRangeSlider").update({from: value});
                console.log(value);
              });
            });
            $scope.$watch('to', function (value) {
              $timeout(function () {
                $element.data("ionRangeSlider").update({to: value});
              });
            });
            $scope.$watch('disable', function (value) {
              $timeout(function () {
                $element.data("ionRangeSlider").update({disable: value});
              });
            });
      }
    };
  }
*/

  function ionRangeSlider() {
   return {
      restrict: 'A',
      scope: {
         rangeOptions: '=',
         model: '=ngModel',
         apply: '=apply'
      },
      link: function (scope, elem, attrs) {
         scope.$watch('model',function () {
            console.log(scope.rangeOptions);
            elem.ionRangeSlider(scope.rangeOptions);
            var slider = elem.data("ionRangeSlider");
            slider.update({
               from: scope.model,
            });
         });
      }
      /*
      link: function (scope, elem, attrs) {
         elem.ionRangeSlider(scope.rangeOptions);

         scope.$watch('apply',function () {
          if (scope.apply) {
            scope.apply = false;
            var slider = elem.data("ionRangeSlider"); 

            slider.update({
               from: scope.model,
            });
          }
         });
      }
      */
   }
 }
})();