/*global angular */

/**
 * The main MVC app module
 *
 * @type {angular.Module}
 */
angular.module('tasker', ['ngRoute', 'ngResource', 'firebase'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'JobCtrl',
			templateUrl: 'job-new.html',
			resolve: {
				store: function (jobStorage) {
					// Get the correct module (API or localStorage).
					return jobStorage.then(function (module) {
						module.get(); // Fetch the job records in the background.
						return module;
					});
				}
			}
		}

		var landingConfig = {
			controller: 'JobCtrl',
			templateUrl: 'landing.html',
			resolve: {
				store: function (jobStorage) {
					// Get the correct module (API or localStorage).
					return jobStorage.then(function (module) {
						module.get(); // Fetch the job records in the background.
						return module;
					});
				}
			}
		}

		var jobsConfig = {
			controller: 'JobCtrl',
			templateUrl: 'joblist.html',
			resolve: {
				store: function (jobStorage) {
					// Get the correct module (API or localStorage).
					return jobStorage.then(function (module) {
						module.get(); // Fetch the job records in the background.
						return module;
					});
				}
			}
		}

		$routeProvider
			.when('/', landingConfig)
			.when('/jobs', jobsConfig)
			.when('/job/new', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});




angular.module('todomvc', ['ngRoute', 'ngResource'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'TodoCtrl',
			templateUrl: 'landing.html',
			resolve: {
				store: function (todoStorage) {
					// Get the correct module (API or localStorage).
					return todoStorage.then(function (module) {
						module.get(); // Fetch the todo records in the background.
						return module;
					});
				}
			}
		};

		$routeProvider
			.when('/', routeConfig)
			.when('/:status', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});

