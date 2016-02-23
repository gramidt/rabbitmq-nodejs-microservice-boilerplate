module.exports = (grunt) => {
  require('load-grunt-tasks')(grunt);

  const isparta = require('isparta');

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-istanbul');

  grunt.initConfig({
    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../../spec/coverage/instrument/app/',
      },
    },
    instrument: {
      files: 'app/**/*.js',
      options: {
        lazy: false,
        basePath: 'spec/coverage/instrument/',
        instrumenter: isparta.Instrumenter,
      },
    },
    eslint: {
      options: {
        ecmaFeatures: {
          modules: true,
        },
      },
      target: ['app/**/*.js'],
    },
    watch: {
      build: {
        files: ['app/**/*.js'],
        tasks: ['eslint'],
      },
    },
    mochaTest: {
      options: {
        reporter: 'spec',
      },
      src: ['spec/unit/**/*.js'],
    },
    jasmine_nodejs: {
      options: {
        specNameSuffix: '.spec.js',
        helperNameSuffix: 'helper.js',
        useHelpers: true,
        stopOnFailure: true,
      },
      junitreport: {
        report: true,
        savePath: './build/reports/jasmine/',
        useDotNotation: true,
        consolidate: true,
      },
      unit: {
        specs: './spec/unit/**',
        helpers: ['./spec/helpers/**'],
      },
      e2e: {
        specs: './spec/e2e/**',
        helpers: ['./spec/helpers/**'],
      },
    },
    storeCoverage: {
      options: {
        dir: 'spec/coverage/reports',
      },
    },
    makeReport: {
      src: 'spec/coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'spec/coverage/reports',
        print: 'detail',
      },
    },
  });

  grunt.registerTask('spec',
    [
      'env:coverage',
      'instrument',
      'jasmine_nodejs',
      'storeCoverage',
      'makeReport',
    ]);
  grunt.registerTask('spec:unit', ['jasmine_nodejs:unit']);
  grunt.registerTask('spec:e2e', ['jasmine_nodejs:e2e']);
};
