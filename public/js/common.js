function onClickSystemToggleItem(key, name) {
  if (!key || !name) {
    return;
  }

  const systemToggle = document.getElementById('system-toggle');

  if (!systemToggle) {
    return;
  }

  systemToggle.dataset.key = key;
  systemToggle.innerText = name;

  try {
    window.sessionStorage.setItem('systemToggleKey', systemToggle.dataset.key);
  } catch (e) {
    console.error(e);
  }

  $(systemToggle).trigger('change');
  $(systemToggle).dropdown('hide');
}

function onClickYearToggleItem(key, name) {
  if (!key || !name) {
    return;
  }

  const yearToggle = document.getElementById('year-toggle');

  if (!yearToggle) {
    return;
  }

  yearToggle.dataset.key = key;
  yearToggle.innerText = name;

  try {
    window.sessionStorage.setItem('yearToggleKey', yearToggle.dataset.key);
  } catch (e) {
    console.error(e);
  }

  $(yearToggle).trigger('change');
  $(yearToggle).dropdown('hide');
}

function loadSystemToggle() {
  try {
    const savedSystem = $(
      `.system-toggle-item[data-key="${window.sessionStorage.getItem(
        'systemToggleKey'
      )}"]`
    );

    if (savedSystem[0]) {
      savedSystem[0].click();
    } else {
      $('#system-toggle')
        .closest('.dropdown')
        .find('.system-toggle-item')
        .first()
        .click();
    }
  } catch (e) {
    $('#system-toggle')
      .closest('.dropdown')
      .find('.system-toggle-item')
      .first()
      .click();
  }
}

function loadYearToggle() {
  try {
    const savedYear = $(
      `.year-toggle-item[data-key="${window.sessionStorage.getItem(
        'yearToggleKey'
      )}"]`
    );

    if (savedYear[0]) {
      savedYear[0].click();
    } else {
      $('#year-toggle')
        .closest('.dropdown')
        .find('.year-toggle-item')
        .first()
        .click();
    }
  } catch (e) {
    $('#year-toggle')
      .closest('.dropdown')
      .find('.year-toggle-item')
      .first()
      .click();
  }
}

$(document).on('click', '.system-toggle-item', function () {
  onClickSystemToggleItem(this.dataset.key, this.innerText);
});

$(document).on('click', '.year-toggle-item', function () {
  onClickYearToggleItem(this.dataset.key, this.innerText);
});

$(function () {
  loadSystemToggle();
  loadYearToggle();
});
