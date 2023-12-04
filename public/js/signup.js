$(document).on('input', '#phone', function (e) {
  if (!this.value.match(/^[0-9\-]{0,13}$/)) {
    this.value = this.dataset.prevValue || '';
    return;
  }

  if (this.value.length >= 10) {
    this.value = this.value
      .replace(/-/g, '')
      .replace(/^(\d{3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  }

  this.dataset.prevValue = this.value;
});

$(function () {
  $('#signup-systems-select').removeClass('d-none');

  new SlimSelect({
    select: '#signup-systems-select',
    settings: {
      openPosition: 'down',
      placeholderText: '여기를 클릭해 검색하세요',
    },
  });
});
