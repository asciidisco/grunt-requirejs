require(['../src/js/app/textinsert', 'jquery'], function (textinsert, $) {
  'use strict';
  test('can insert text', function () {
    expect(1);
    textinsert('#qunit-fixture', 'FooBar');
    equal($('#qunit-fixture').text(), 'FooBar', 'Can insert text');
  });

});
