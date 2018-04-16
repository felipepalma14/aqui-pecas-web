(function() {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('baWizardCtrl', baWizardCtrl);

  /** @ngInject */
  function baWizardCtrl($scope) {
    var vm = this;
    vm.tabs = [];

    vm.tabNum = 0;

        

    vm.addTab = function(tab) {
      tab.setPrev(vm.tabs[vm.tabs.length - 1]);
      vm.tabs.push(tab);
      vm.selectTab(0);

      vm.progress =  ((vm.tabNum + 1) / vm.tabs.length) * 100;
      vm.ultimaTab = vm.tabs.length -1;
    };

    $scope.$watch(angular.bind(vm, function () {return vm.tabNum;}), calcProgress);

    vm.selectTab = function (tabNum) {      
      if (vm.tabs[tabNum].isAvailiable()) {
        vm.tabNum = tabNum;
        vm.tabs.forEach(function (t, tIndex) {
          tIndex == vm.tabNum ? t.select(true) : t.select(false);
        });
        if(vm.isLastTab() && (vm.tabs.length > 1)){
          console.log("ultimo");
        }

      }
    };

    vm.isFirstTab = function () {
      return vm.tabNum == 0;
    };

    vm.isLastTab = function () {
      return vm.tabNum == vm.tabs.length - 1 ;
    };

    vm.nextTab = function () {
      vm.selectTab(vm.tabNum + 1)
    };

    vm.previousTab = function () {
      vm.selectTab(vm.tabNum - 1)
    };

    function calcProgress() {
      vm.progress = ((vm.tabNum + 1) / vm.tabs.length) * 100;
    }
  }
})();

