Fliplet.Widget.instance('inline-link', function(config) {
  $(this).hover(function() {
    $(this).css('cursor', 'pointer');
  });

  $(this).on('click', function(event) {
    event.preventDefault();

    Fliplet.Navigate.to(config.action);
  });
});
