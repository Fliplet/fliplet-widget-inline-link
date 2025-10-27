Fliplet.Widget.instance('inline-link', function(config) {
  if ($(this).data('initialized')) {
    return;
  }

  $(this).on('click', async function(event) {
    event.preventDefault();
    config.action = config.action || {};

    try {
      config.action.dynamicContext = await Fliplet.Widget.getDynamicContext($(this));
    } catch (e) {
      config.action.dynamicContext = {};
    }

    Fliplet.Navigate.to(config.action);
  }).data('initialized', true);
});
