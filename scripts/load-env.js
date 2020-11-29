const spawn = require('cross-spawn');
const path = require('path');
const dotenv = require('dotenv');

const argv = require('minimist')(process.argv.slice(2));
const command = argv._[0];

const environmentFile = path.resolve(__dirname, '../configs', `.${argv.c}.env`);
dotenv.config({
  path: environmentFile
});
console.log(process.env)
spawn(command, argv._.slice(1), { stdio: 'inherit' }).on('exit', function(exitCode) {
  process.exit(exitCode);
});
