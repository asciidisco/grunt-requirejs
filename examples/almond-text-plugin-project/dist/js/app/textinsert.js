define(['jquery'], function ($) {
  
  return function (selector, text) {
    $(selector).text(text);
  };
});
