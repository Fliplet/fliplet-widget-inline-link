var widgetId = Fliplet.Widget.getDefaultId();
var data = Fliplet.Widget.getData() || {};
var page = Fliplet.Widget.getPage();
var omitPages = page ? [page.id] : [];

data.action = data.action || {};
data.action.omitPages = omitPages;

// Track if save was initiated from Studio save button
var savingFromStudioButton = false;
// Track if label was manually changed by user
var labelChangedByUser = false;

var linkActionProvider = Fliplet.Widget.open('com.fliplet.link', {
  // If provided, the iframe will be appended here,
  // otherwise will be displayed as a full-size iframe overlay
  selector: '#action',
  // Also send the data I have locally, so that
  // the interface gets repopulated with the same stuff
  data: data.action,
  closeOnSave: false,
  // Events fired from the provider
  onEvent: function (event, data) {
    if (event === 'interface-validate') {
      Fliplet.Widget.toggleSaveButton(data.isValid === true);
    }
  }

});

// 1. Fired from Fliplet Studio when the external save button is clicked
Fliplet.Widget.onSaveRequest(function () {
  savingFromStudioButton = true;
  $('form').submit();
});

// 2. Fired when the user submits the form
$('form').submit(function (event) {
  event.preventDefault();
  linkActionProvider.forwardSaveRequest();
});

// 3. Fired when the provider has finished
linkActionProvider.then(function (result) {
  data.action = result.data;
  save(savingFromStudioButton);
  savingFromStudioButton = false;
  labelChangedByUser = false;
});

function save(notifyComplete) {
  data.label = $('#linkLabel').val();
  // Clear linkStyle when user manually edits the label
  // to allow appearance panel styles to take effect
  if (labelChangedByUser) {
    delete data.linkStyle;
  }

  Fliplet.Widget.save(data).then(function () {
    if (notifyComplete) {
      Fliplet.Widget.complete();
      window.location.reload();
    } else {
      Fliplet.Studio.emit('reload-widget-instance', widgetId);
    }
  });
}

$('#linkLabel').on('keyup change paste', $.debounce(function() {
  labelChangedByUser = true;
  save();
}, 500));

$('#help_tip').on('click', function() {
  alert("During beta, please use live chat and let us know what you need help with.");
});
