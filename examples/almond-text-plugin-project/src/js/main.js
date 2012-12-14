require.config({
  paths: {
    jquery: 'lib/jquery',
    text: 'lib/text'
  }
});

require(['app/textinsert', 'text!app/msg.txt'], function (textinsert, text) {
    'use strict';
    textinsert('#i-shall-contain-text', text);
});
