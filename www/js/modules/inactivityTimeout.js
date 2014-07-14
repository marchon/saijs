/*
*
* 'use strict';

 app.run(function ($rootScope, $interval, INACTIVE_TIMEOUT) {
 log("INACTIVITY TIMEOUT NEEDS MODIFICATIONS");
 var timer, inactivityTimeout;

 function InactivityWatcher() {
 document.onclick = function () {
 inactivityTimeout.reset();
 };
 }

 function trigger() {
 // .. logic
 }

 // Isolate scope using a module
 inactivityTimeout = {
 countTime: INACTIVE_TIMEOUT,
 start: function (limit) {
 timer = $interval(function () {
 if (inactivityTimeout.countTime <= limit) {
 trigger();
 $interval.cancel(timer);
 }
 inactivityTimeout.countTime--;
 }, 1000, 0);
 },
 reset: function () {
 $interval.cancel(timer);
 inactivityTimeout.countTime = INACTIVE_SHOPPER_TIME
 inactivityTimeout.start(0);
 },
 isRunning: function () {
 return (inactivityTimeout.countTime !== 0);
 }
 };

 new InactivityWatcher();
 });
*
* */