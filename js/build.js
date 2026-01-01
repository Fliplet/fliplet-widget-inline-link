Fliplet.Widget.instance('inline-link', function(config) {
  var $element = $(this);

  if ($element.data('initialized')) {
    return;
  }

  // Get the actual widget wrapper (parent element with data-fl-widget-instance)
  var $wrapper = $element.closest('[data-fl-widget-instance]');
  var widgetId = $wrapper.data('id');

  // Apply initial linkStyle by directly styling the <a> tag
  // Appearance panel classes on wrapper will override via CSS specificity
  if (config.linkStyle) {
    // Check if wrapper has appearance-related classes
    var hasAppearanceClasses = $wrapper.attr('class') &&
      ($wrapper.attr('class').includes('fl-text-') ||
       $wrapper.attr('class').includes('fl-color-') ||
       $wrapper.attr('class').includes('fl-font-'));

    if (!hasAppearanceClasses) {
      // Apply styles directly to the <a> tag
      // CSS inheritance will let wrapper's appearance classes override
      var existingStyle = $element.attr('style') || '';
      var newStyle = existingStyle + '; ' + config.linkStyle;
      $element.attr('style', newStyle);
      $element.addClass('fl-inline-link-has-default-style');
      
      // Update highlight immediately after applying styles
      if (typeof Fliplet !== 'undefined' && Fliplet.Widget && Fliplet.Widget.updateHighlightDimensions) {
        // Use a short delay to ensure styles are rendered
        setTimeout(function() {
          Fliplet.Widget.updateHighlightDimensions(widgetId);
        }, 50);
      }
    }
  }

  // Watch for wrapper style changes (from appearance panel)
  if (window.MutationObserver) {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {

        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {

          // Check if appearance panel added classes
          var hasAppearanceClasses = $wrapper.attr('class') &&
            ($wrapper.attr('class').includes('fl-text-') ||
             $wrapper.attr('class').includes('fl-color-') ||
             $wrapper.attr('class').includes('fl-font-'));

          if (hasAppearanceClasses && config.linkStyle) {
            // Remove inline styles from <a> tag to let wrapper appearance classes take precedence
            if ($element.hasClass('fl-inline-link-has-default-style')) {
              $element.removeAttr('style');
              $element.removeClass('fl-inline-link-has-default-style');
            }
          }

          // Update highlight after class change with delay to ensure styles are rendered
          if (Fliplet.Widget && Fliplet.Widget.updateHighlightDimensions) {
            setTimeout(function() {
              Fliplet.Widget.updateHighlightDimensions(widgetId);
            }, 100);
          }
        }
      });
    });

    observer.observe($wrapper[0], {
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true
    });
  }

  // Update highlight dimensions after initial styles are applied
  if (typeof Fliplet !== 'undefined' && Fliplet.Widget && Fliplet.Widget.updateHighlightDimensions) {
    setTimeout(function() {
      Fliplet.Widget.updateHighlightDimensions(widgetId);
    }, 100);
  }

  $element.on('click', function(event) {
    event.preventDefault();

    Fliplet.Navigate.to(config.action);
  }).data('initialized', true);
});
