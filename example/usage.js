module.exports = {
  npm: {
    install: 'npm install cqaso-kit-xxx --save',
    example: `
const transition = require('cqaso-kit-transition');
transition(element)
  .delay(600)
  .to({rotateY: '180deg'})
  .delay(600)
  .to({rotateY: '0deg'});`
  },
  bower: {
    install: 'bower install rainie-doc',
    example: `xxx`
  },
  cdn: {
    install: `<script src="http://cdn.xxx.org/xxx.min.js"></script>`,
    example: `xxx`,
    download: `http://cdn.xxx.org/v/xxx.min.js`
  }
};
