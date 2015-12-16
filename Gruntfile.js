module.exports = function(grunt) {
    var path = require('path');
    var timer = require('grunt-timer');

    timer.init(grunt, {
        totalOnly: true,
        friendlyTime: true,
    });

    // main package
    grunt.config('pkg', grunt.file.readJSON('package.json'));
    pkg = grunt.config.get('pkg');
    pkg.pkg = pkg.name.toLowerCase().replace(/\s+/g, '-');
    grunt.config.set('pkg', pkg);

    // assets dir
    grunt.config('assets', {
        root: 'build\\',
        js: 'build\\js\\',
        img: 'build\\img\\',
        font: 'build\\font\\',
        css: 'build\\css\\',
        html: 'build\\html\\',
        static: 'build\\static\\',
    });

    // Clean Generated Files & Scripts
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', [
        '<%= assets.root %>',
    ]);

    // private app info
    grunt.config('secret', grunt.file.readJSON('private.json'));
    secret = grunt.config.get('secret');
    for(var k in secret.servers) // get PPK for all servers
        if(grunt.file.exists(secret.servers[k].privateKey))
            secret.servers[k].privateKey = grunt.file.read(secret.servers[k].privateKey);
    grunt.config.set('secret', secret);

    // define constants
    grunt.config('constants', grunt.file.readYAML('constants.yml'));

    // make constants
    grunt.loadNpmTasks('grunt-php-config');
    grunt.config('php_config', {
        dev: {
            options: {
                constants: '<%= constants.dev %>'
            },
            dest: '<%= assets.root %>constants.php'
        },
        live: {
            options: {
                constants: '<%= constants.live %>'
            },
            dest: '<%= assets.root %>constants.php'
        },
    });

    // Local Commands
    grunt.loadNpmTasks('grunt-shell');
    grunt.config('shell', {
        html: {
            command: 'php -d auto_prepend_file="<%= assets.root %>constants.php" index.php > <%= assets.root %>index.html'
        },
    });

    // Files to Upload to server
    grunt.loadNpmTasks('grunt-ssh');
    grunt.config('sshconfig', {
        serverdev: secret.servers.dev,
    });
    grunt.config('sftp', {
        dev: {
            options: {
                config: 'serverdev',
                createDirectories: true,
                directoryPermissions: parseInt(755, 8),
            },

            files: {
                './': [
                    '<%= assets.root %>**',
                ],
            }
        },
    });

    // Sass Compiler
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.config('compass', {
        options: {
            relativeAssets: false,

            // On Local Machine
            sassDir: 'assets\\css',
            cssDir: '<%= assets.css %>', // save to
            imagesDir: 'assets\\img',
            fontsDir: 'assets\\font',
            javascriptsDir: 'assets\\js',
        },

        live: {
            options: {
                outputStyle: 'compressed',
                environment: 'production',
                sourcemap: false,
                assetCacheBuster: false,

                // On Server
                httpGeneratedImagesPath: '<%= constants.live.url.img %>',
                httpImagesPath: '<%= constants.live.url.img %>',
                httpFontsPath: '<%= constants.live.url.font %>',
                httpJavascriptsPath: '<%= constants.live.url.js %>',
            }
        },
        dev: {
            options: {
                outputStyle: 'expanded',
                environment: 'development',
                sourcemap: true,

                // On Server
                httpGeneratedImagesPath: '<%= constants.dev.url.img %>',
                httpImagesPath: '<%= constants.dev.url.img %>',
                httpFontsPath: '<%= constants.dev.url.font %>',
                httpJavascriptsPath: '<%= constants.dev.url.js %>',
            }
        }
    });

    // Image Optimizer
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.config('imagemin', {
        live: {
            files: [{
                expand: true,
                cwd: 'assets\\img/',
                src: ['**/*.{png,jpg,gif}'],
                dest: "<%= assets.img %>",
            }]
        }
    });

    // Move Files
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config('copy', {
        devSymLink: { // Copy because we can't make Symlinks instead
            files: [{
                expand: true,
                cwd: 'assets/img/',
                src: ['**'],
                dest: '<%= assets.img %>',
            }, {
                expand: true,
                cwd: 'assets/font/',
                src: ['**'],
                dest: '<%= assets.font %>',
            }, {
                src: '<%= assets.root %>index.html',
                dest: '<%= assets.html %>index.html'
            }]
        },
        liveSymLink: {
            files: [{
                expand: true,
                cwd: 'assets/static/',
                src: ['**'],
                dest: '<%= assets.static %>',
            }, {
                expand: true,
                cwd: 'assets/font/',
                src: ['**'],
                dest: '<%= assets.font %>',
            }]
        }
    });

    // Optimize JS
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.config('uglify', {
        dev: {
            options: {
                mangle: false,
                compress: false,
                beautify: true,
                sourceMap: true,
                sourceMapIncludeSources : true,
                banner: '"use strict";\n/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd @ h:MM:ss") %> */'
            },
            files: [{
                src: ['assets/js/**/*.js'],
                dest: '<%= assets.js %><%= pkg.pkg %>.js'
            }]
        },
        live: {
            options: {
                banner: '"use strict";',
                compress: true,
            },
            files: [{
                src: ['assets/js/**/*.js'],
                dest: '<%= assets.js %><%= pkg.pkg %>.js'
            }]
        }
    });

    // Amazon S3
    grunt.loadNpmTasks('grunt-aws');
    grunt.config('s3', {
        options: {
            bucket: 'mauriceprosper.com',
            region: 'us-east-1', //'US Standard',
            endpoint: 'http://mauriceprosper.com.s3-website-us-east-1.amazonaws.com/',
            access: 'public-read',
            overwrite: true,
            sslEnabled: true,
            maxRetries: 3,
        },
        live: {
            options: {
                headers: {
                    CacheControl: 315360000, //'max-age=315360000',
                    ContentEncoding: 'gzip',
                    Expires: new Date('Thu, 31 Dec 2037 23:55:55 GMT')
                }
            },
            files: [{ // homepage
                cwd: '<%= assets.html %>',
                src: ['index.html'],
            }, { // fonts
                expand: true,
                cwd: '<%= assets.font %>',
                src: ['**'],
                dest: 'font/',
            }, { // images
                expand: true,
                cwd: '<%= assets.img %>',
                src: ['**'],
                dest: 'img/',
            }, { // js
                expand: true,
                cwd: '<%= assets.js %>',
                src: ['**'],
                dest: 'js/',
            }, { // extra files
                expand: true,
                cwd: '<%= assets.static %>',
                src: ['**'],
                dest: 'static/',
            }, { // css
                expand: true,
                cwd: '<%= assets.css %>',
                src: ['**'],
                dest: 'css/',
            }]
        }
    });

    // HTML min
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.config('htmlmin', {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            quoteCharacter: true,

            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        },
        live: {
            src: '<%= assets.root %>index.html',
            dest: '<%= assets.html %>index.html',
        }
    });

    // Parallel Tasks
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.config('concurrent', {
        devMake:  ['compass:dev',   'uglify:dev',   'php_config:dev',   'copy:devSymLink'],
        liveMake: ['compass:live',  'uglify:live',  'php_config:live',  'copy:liveSymLink', 'imagemin'],
    });

    // tasks
    grunt.registerTask('dev', ['clean', 'concurrent:devMake', 'shell', 'sftp:dev', 'clean']);
    grunt.registerTask('live', ['clean', 'concurrent:liveMake', 'shell', 'htmlmin', 's3', 'clean']);
    grunt.registerTask('default', ['dev']);
};