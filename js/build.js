$('[data-inline-link-id]').click(function (event) {
  event.preventDefault();

  var data = Fliplet.Widget.getData($(this).data('inline-link-id'));

  Fliplet.Navigate.to(data.action);
});
