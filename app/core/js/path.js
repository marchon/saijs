// Set application path
angular.module('saijs').constant('APP_PATH', document.currentScript.src.substr(0, document.currentScript.src.length - 14).split("").reverse().join("").slice(1).substr(0,document.currentScript.src.substr(0, document.currentScript.src.length - 14).split("").reverse().join("").slice(1).search('/')).split("").reverse().join("")+'/dist/');
//angular.module('saijs').constant('APP_PATH', 'core/dist/');
