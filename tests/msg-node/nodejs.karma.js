// Karma configuration
// Generated on Wed Sep 16 2015 12:17:06 GMT+0100 (WEST)

module.exports = function(config) {
  config.set({
    browserNoActivityTimeout: 10000,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    client: {
       args: ['nodejs']
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      'src/stub/**/*.js',
      // 'test/**/*.spec.js',
      // ******* conformance tests
      'test/**/connect.spec.js',
      'test/**/hyperty-allocation.spec.js',
      'test/**/object-allocation.spec.js',
      'test/**/subscription.spec.js',
      'test/**/registration.spec.js',
      // // ******* performance tests
      // 'test/**/performance-alloc-hyperties.spec.js',
      // 'test/**/performance-alloc-objects.spec.js',
      // 'test/**/performance-hyp-messages.spec.js',
      // 'test/**/performance-publish.spec.js',
    ],

    proxies: {
      '/': 'http://localhost:4000/'
    },

    urlRoot: '/',

    // list of files to exclude
    exclude: [],

    // loggers: [{type : 'console'}],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/stub/**/*.js': ['browserify'],
      'test/**/*.spec.js': ['browserify']
    },

    browserify: {
      debug: true,
      transform: [["babelify", { "presets": ["es2015"] }]]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_small'],
    customLaunchers: {
      Chrome_small: {
        base: 'Chrome',
        flags: [
          '--window-size=200,400',
          '--window-position=-400,-400'
        ]
      }
    },
    // set the inactivity timout to 100 seconds
    browserNoActivityTimeout: 100000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });

};
