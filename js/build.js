Fliplet.Widget.instance('inline-link', function(config) {
  if ($(this).data('initialized')) {
    return;
  }

  $(this).on('click', function(event) {
    event.preventDefault();

    Fliplet.Navigate.to(config.action);
  }).data('initialized', true);
});
