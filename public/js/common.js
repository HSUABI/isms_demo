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

function appendFileBlock(name) {
  const fileBlock = $($('#file-block').html());
  fileBlock.find('.file-container-name').text(name);
  fileBlock.find('.file-container-name').on('click', function (e) {
    const link = document.createElement('a');
    link.href = `/uploads/${name}`;
    link.download = name;
    link.click();
  });
  $('#file-uploaded-container').append(fileBlock);
}

$(document).on('click', '.system-toggle-item', function () {
  onClickSystemToggleItem(this.dataset.key, this.innerText);
});

$(document).on('click', '.year-toggle-item', function () {
  onClickYearToggleItem(this.dataset.key, this.innerText);
});

$(document).on('click', '.file-uploader-btn', function (e) {
  $('#file-uploader-input').click();
});

$(document).on('click', '.remove-file-btn', function (e) {
  // Swal.fire({
  //   title: '정말 삭제하시겠습니까?',
  //   showCancelButton: true,
  //   confirmButtonText: '확인',
  //   cancelButtonText: '취소',
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     $(this).closest('.file-container').remove();
  //     toastr.info('삭제되었습니다.');
  //   }
  // });

  $(this).closest('.file-container').remove();
});

$(document).on('show.bs.modal', '#my-info-modal', function (e) {
  console.log(e.relatedTarget);

  $('#my-info-modal .modal-body').html($('#my-info-form-template').html());
  $('#my-info-systems-select').removeClass('d-none');

  new SlimSelect({
    select: '#my-info-systems-select',
    settings: {
      openPosition: 'down',
      placeholderText: '여기를 클릭해 검색하세요',
      contentLocation: document.getElementById('my-info-modal'),
    },
  });
});

$(document).on('click', '#my-info-save-btn', function (e) {
  // TODO: 백엔드에 내 정보 저장 구현
  console.log($('#my-info-form').serializeArray());

  Swal.fire({
    title: '저장하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
});

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
  loadSystemToggle();
  loadYearToggle();
});
