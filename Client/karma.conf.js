// Karma configuration
// Generated on Wed Aug 22 2018 17:54:40 GMT+0300 (FLE Daylight Time)

module.exports = function(config) {
  config.set({


	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: '',


	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ['mocha', 'chai', 'sinon', 'browserify'],

	// list of plugins
	plugins: [
		'karma-mocha-reporter',
		'karma-mocha',
		'karma-chai',
		'karma-sinon',
		'karma-sourcemap-loader',
		'karma-chrome-launcher',
		'karma-coverage',
		'karma-coverage-istanbul-reporter',
		'karma-babel-preprocessor',
		'karma-browserify'
   ],

	// list of files / patterns to load in the browser
	files: [
		 "test/*tests.js",
		 "test/components/CreateDish/*tests.js",
		 "test/components/CreateRestaurant/*tests.js",
		 "test/components/Dishes/*tests.js",
		 "test/components/Restaurants/*tests.js",
		 "test/components/Form/*tests.js",
		 "test/components/Header/*tests.js",
		 "test/stores/*tests.js",
		 "test/components/common/Button/*tests.js/",
		 "test/components/common/List/*tests.js/",
		 "test/components/common/Modal/*tests.js/",
	],


	crossOriginAttribute: true,


	// list of files / patterns to exclude
	exclude: [
		
	],


	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: {
		  'src/**/*.jsx': ['browserify'],
		  'src/**/*.js': ['browserify'],
		  'test/*tests.js': ["browserify"],
		  "test/*tests.js" : ["browserify"],
		  "test/components/CreateDish/*tests.js" : ["browserify"],
		  "test/components/CreateRestaurant/*tests.js" : ["browserify"],
		  "test/components/Dishes/*tests.js" : ["browserify"],
		  "test/components/Restaurants/*tests.js" : ["browserify"],
		  "test/components/Form/*tests.js" : ["browserify"],
		  "test/components/Header/*tests.js" : ["browserify"],
		  "test/stores/*tests.js" : ["browserify"],
		  "test/components/common/Button/*tests.js/" : ["browserify"],
		  "test/components/common/List/*tests.js/" : ["browserify"],
		  "test/components/common/Modal/*tests.js/" : ["browserify"],
		  '**/lib/*.js': 'coverage'
	},
	
	browserify: {
        debug: true,
        	
		transform: ['babelify',  ["reactify", {"es6": true}], "browserify-css"],

		 // don't forget to register the extensions
		 extensions: ['.js', '.jsx'],
	},

	// test results reporter to use
	// possible values: 'dots', 'progress'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	//reporters: ['progress', 'coverage'],
	reporters: ['mocha'],
	
	 // // any of these options are valid: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
    // coverageIstanbulReporter: {
      // // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      // reports: ['html', 'lcovonly', 'text'],
 
      // // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      // // dir: path.join(__dirname, 'coverage'),
	  // dir: './coverage',
 
      // // Combines coverage information from multiple browsers into one report rather than outputting a report
      // // for each browser.
      // combineBrowserReports: true,
 
      // // if using webpack and pre-loaders, work around webpack breaking the source path
      // fixWebpackSourcePaths: true,
 
      // // Omit files with no statements, no functions and no branches from the report
      // skipFilesWithNoCoverage: true,
 
      // // Most reporters accept additional config options. You can pass these through the `report-config` option
      // 'report-config': {
        // // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
        // html: {
          // // outputs the report in ./coverage/html
          // subdir: 'html'
        // }
      // }
	// },


	// web server port
	port: 9876,


	// enable / disable colors in the output (reporters and logs)
	colors: true,


	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	logLevel: config.LOG_INFO,


	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: true,


	// start these browsers
	// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	browsers: ['Chrome'],


	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	singleRun: false,

	// Concurrency level
	// how many browser should be started simultaneous
	concurrency: Infinity,

	browserDisconnectTimeout : 100000, // default 2000
	browserDisconnectTolerance : 1, // default 0
	browserNoActivityTimeout : 4*60*1000, //default 10000
	captureTimeout : 4*60*1000 //default 60000
  })
}