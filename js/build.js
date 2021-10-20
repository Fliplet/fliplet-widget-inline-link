Fliplet.Widget.instance('inline-link', function(config) {
  $(this).on('click', function(event) {
    event.preventDefault();

    Fliplet.Navigate.to(config.action);
  });
});
