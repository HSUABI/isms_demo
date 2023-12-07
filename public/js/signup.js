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
