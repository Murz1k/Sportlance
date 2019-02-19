const execSync = require('child_process').execSync;
const package = require('../package.json');

const currentVersion = package.version;
let newVersion;

if (process.argv[2] === 'major') {
  const currentMajor = +currentVersion.split('.')[0];
  newVersion = `${currentMajor + 1}.0.0`;
}
if (process.argv[2] === 'minor') {
  const currentMinor = +currentVersion.split('.')[1];
  newVersion = currentVersion.substring(0, currentVersion.indexOf('.') + 1) + `${(currentMinor + 1)}.0`;
}
if (process.argv[2] === 'patch') {
  const currentPatch = +currentVersion.split('.')[2];
  newVersion = currentVersion.substring(0, currentVersion.indexOf('.', currentVersion.indexOf('.') + 1) + 1) + (currentPatch + 1);
}

execSync('npm version ' + newVersion, {stdio: [0, 1, 2]});
