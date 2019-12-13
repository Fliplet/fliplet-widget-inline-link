Fliplet.Widget.instance('inline-link', function (config) {
  $('[data-inline-link-id="' + config.id + '"]').on('click', function (event) {
    event.preventDefault();

    var data = Fliplet.Widget.getData($(this).data('inline-link-id'));

    Fliplet.Navigate.to(data.action);
  });
});
