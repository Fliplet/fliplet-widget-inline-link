Fliplet.Widget.instance('inline-link', function (config) {
  $(this).on('click keydown', function (event) {
    event.preventDefault();

    if (event.type !== 'click' && event.keyCode !== 13 && event.keyCode !== 32) {
      return;
    }

    Fliplet.Navigate.to(config.action);
  });
});
