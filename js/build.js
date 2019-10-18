$(document).on('click', '[data-inline-link-id]', function (event) {
  event.preventDefault();

  var data = Fliplet.Widget.getData($(this).data('inline-link-id'));

  Fliplet.Navigate.to(data.action);
});
