define(['jquery'], function ($) {
  'use strict';
  return function (selector, text) {
    $(selector).text(text);
  };
});
