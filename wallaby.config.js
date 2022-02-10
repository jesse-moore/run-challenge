module.exports = function (wallaby) {
    const path = require('path')
    process.env.NODE_PATH += path.delimiter + path.join(wallaby.localProjectDir, 'node_modules')
	console.log("<------------------------------------------->")
    return {
        files: [
            'src/dtos/**/*.*',
            'src/models/**/*.*',
            'src/types/**/*.*',
            'src/utils/**/*.*',
            'test/data/*.*',
        ],

        tests: ['test/**/*.test.ts'],
        env: {
            type: 'node',
            // runner: 'C:/Users/Jesse/AppData/Roaming/nvm/v17.2.0',
        },
        setup: (wallaby) => {
            const chai = require('chai')
            chai.use(require('sinon-chai'))
            // chai.use(require('chai-as-promised'));
            // chai.use(require('chai-like'));
            chai.should()

            global.expect = require('chai').expect
        },
        testFramework: 'mocha',
        filesWithNoCoverageCalculated: [],
        runMode: 'onsave',
        trace: true,
    }
}
