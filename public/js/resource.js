function drawCharts() {
  $('#resource-statistics')
    .parent()
    .html('<canvas id="resource-statistics"></canvas>');

  new Chart(document.getElementById('resource-statistics'), {
    type: 'bar',
    data: {
      labels: ['네트워크', '서버', 'PC', '보안장비', 'DB', '웹'],
      datasets: [
        {
          label: '개수',
          data: window.data.mainStatistics,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: {},
        y: {
          ticks: {
            font: {
              size: 14,
              weight: 'bold',
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
          position: 'top',
        },
        title: {
          display: false,
          font: {
            size: 14,
          },
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          formatter: function (value, context) {
            return value + '대';
          },
          font: {
            size: 14,
          },
          color: 'black',
        },
      },
    },
  });

  for (let no = 1; no <= 6; no++) {
    $('#resource-detail-statistics-' + no)
      .parent()
      .html('<canvas id="resource-detail-statistics-' + no + '"></canvas>');

    const stat = window.data.detailStatistics.find(
      (s) => s.type === String(no)
    ).categories;

    if (!stat) {
      continue;
    }

    new Chart(document.getElementById('resource-detail-statistics-' + no), {
      type: 'pie',
      data: {
        labels: stat.map((s) => s.name),
        datasets: [
          {
            label: '개수',
            data: stat.map((s) => s.value),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: ['네트워크', '서버', 'PC', '보안장비', 'DB', '웹'][no - 1],
            font: {
              size: 14,
            },
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            formatter: function (value, context) {
              return value + '대';
            },
            font: {
              size: 14,
            },
            color: 'black',
          },
        },
      },
    });
  }
}

function createResourceTableRow(id, columns) {
  const row = $('<tr style="white-space: nowrap"></tr>');
  row.attr('data-id', id);

  for (let i = 0; i < columns.length; i++) {
    const cell = $('<td></td>');
    cell.text(columns[i]);
    cell.css('vertical-align', 'middle');
    row.append(cell);
  }

  row.append(
    $(
      `<td class="text-center" style="width: 160px; vertical-align: middle">
        <button type="button" class="resource-edit-btn btn btn-sm btn-primary" data-toggle="modal" data-target="#resource-write-modal"><i class="fas fa-edit fa-fw"></i> 수정</button>
        <button type="button" class="resource-delete-btn btn btn-sm btn-danger"><i class="fas fa-times fa-fw"></i> 삭제</button>
      </td>`
    )
  );

  return row;
}

$(document).on('change', '#system-toggle', function (e) {
  // TODO: 백엔드에서 새로운 내역 불러오기
  console.log(this.dataset.key);

  drawCharts();
});

$(document).on('change', '#year-toggle', function (e) {
  // TODO: 백엔드에서 새로운 내역 불러오기
  console.log(this.dataset.key);

  drawCharts();
});

$(document).on('show.bs.modal', '#resource-write-modal', function (e) {
  console.log(e.relatedTarget);

  const type = $('.resource-category.active').data('resourceCategory');

  if (!type) {
    $('#resource-write-modal').hide();
    return;
  }

  $('#resource-write-form .form-group').each((index, elem) => {
    if (
      !elem.dataset.allowType ||
      String(elem.dataset.allowType).indexOf(type) !== -1
    ) {
      $(elem).removeClass('d-none');
      $(elem).find('input, select').attr('disabled', null);
    } else {
      $(elem).addClass('d-none');
      $(elem).find('input, select').attr('disabled', 'true');
    }
  });

  $('#resource-write-form input').val('');
  $('#resource-write-form select option').attr('selected', null);
  $('#resource-write-form select option:first-child').attr('selected', 'true');

  const isEdit = $(e.relatedTarget).hasClass('resource-edit-btn');

  if (isEdit) {
    $('#resource-write-modal .modal-title').text('자산 수정');

    // TODO: 백엔드에서 자산 상세 내용 불러오기
    console.log($(e.relatedTarget).closest('tr').data('id'));

    $('#resource-write-form input[type="text"]').val('');
    $('#resource-write-form input[type="password"]').val('');
    $('#resource-write-form select option').attr('selected', null);
    $('#resource-write-form select option:nth-child(2)').attr(
      'selected',
      'true'
    );

    // TODO: 백엔드에서 자료 불러오기
    $('#file-uploaded-container').html('');
    ['test1.pdf', 'test2.pdf'].forEach((name, index) => {
      appendFileBlock(name);
    });
  } else {
    $('#resource-write-modal .modal-title').text('자산 추가');
  }
});

$(document).on('click', '#resource-save-btn', function (e) {
  // TODO: 백엔드에 저장 구현
  console.log($('#resource-write-form').serializeArray());

  Swal.fire({
    title: '저장하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      $('#resource-write-modal').modal('hide');
      $('.resource-category.active').trigger('click');
      toastr.info('저장되었습니다.');
    }
  });
});

$(document).on('change', '#file-uploader-input', function (e) {
  // TODO: 백엔드로 파일 업로드 구현
  const file = this.files[0];
  const formData = new FormData();

  this.value = '';

  if (!file) {
    return;
  }

  formData.append('file', file);

  $.ajax({
    type: 'POST',
    url: '/upload',
    processData: false,
    contentType: false,
    data: formData,
    success: function (result) {
      console.log(result);
      appendFileBlock(file.name);
    },
  });
});

$(document).on('click', '.resource-delete-btn', function (e) {
  // TODO: 백엔드에서 자산 삭제 구현
  console.log($(this).closest('tr').data('id'));

  Swal.fire({
    title: '정말 삭제하시겠습니까?',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  }).then((result) => {
    if (result.isConfirmed) {
      $(this).closest('tr').remove();
      toastr.info('삭제되었습니다.');
    }
  });
});

$(document).on('click', '.resource-category', function (e) {
  // TODO: 백엔드에서 자산 목록 불러오기
  console.log(this.dataset.resourceCategory);

  const type = this.dataset.resourceCategory;

  $('#resource-table thead th').each((index, elem) => {
    if (String(elem.dataset.allowType).indexOf(type) !== -1) {
      $(elem).removeClass('d-none');
      $(elem).attr('disabled', null);
    } else {
      $(elem).addClass('d-none');
      $(elem).attr('disabled', 'true');
    }
  });

  $('#resource-table tbody').html('');

  if (type === '1') {
    // 네트워크
    $('#resource-table tbody').append(
      createResourceTableRow(1, [
        '라우터#1',
        'Cisco',
        'CL-99',
        'IOS',
        '28.1',
        '10.2.3.1',
      ])
    );
    $('#resource-table tbody').append(
      createResourceTableRow(2, [
        '라우터#2',
        'Cisco',
        'CL-99',
        'IOS',
        '28.1',
        '10.2.3.2',
      ])
    );
  } else if (type === '2') {
    // 서버
    $('#resource-table tbody').append(
      createResourceTableRow(3, [
        '운영서버',
        'HP',
        'DL320',
        'WINDOWS',
        'Windows server 21',
        '10.2.3.1',
      ])
    );
    $('#resource-table tbody').append(
      createResourceTableRow(4, [
        '백업서버',
        'DELL',
        'C640',
        'LINUX',
        'Ubuntu 22.04',
        '192.168.230.133',
      ])
    );
  } else if (type === '3') {
    // PC
    $('#resource-table tbody').append(
      createResourceTableRow(5, [
        '운영단말',
        'HP',
        'Optiplex 7040',
        'WINDOWS',
        '7',
        '10.2.3.1',
      ])
    );
    $('#resource-table tbody').append(
      createResourceTableRow(6, [
        '백업단말',
        'HP',
        'Optiplex 7040',
        'LINUX',
        'Centos 8.1',
        '10.2.3.2',
      ])
    );
  } else if (type === '4') {
    // 보안장비
    $('#resource-table tbody').append(
      createResourceTableRow(7, [
        '방화벽',
        '방화벽#1',
        '넥스지',
        'FW 600',
        'nexg os',
        '1.2.200',
        '10.2.3.1',
      ])
    );
    $('#resource-table tbody').append(
      createResourceTableRow(8, [
        '방화벽',
        '방화벽#2',
        '넥스지',
        'FW 600',
        'nexg os',
        '1.2.200',
        '10.2.3.2',
      ])
    );
  } else if (type === '5') {
    // DB
    $('#resource-table tbody').append(
      createResourceTableRow(9, [
        '운영 DB',
        'Oracle',
        '11g',
        'LINUX',
        'Centos 8.1',
        '10.2.3.1',
      ])
    );
    $('#resource-table tbody').append(
      createResourceTableRow(10, [
        '감사 DB',
        'Oracle',
        '11g',
        'LINUX',
        'Centos 8.1',
        '10.2.3.2',
      ])
    );
  } else if (type === '6') {
    // 웹
    $('#resource-table tbody').append(
      createResourceTableRow(11, [
        '학습시스템',
        'PHP',
        '5',
        'www.abc.com',
        '10.2.3.1',
      ])
    );
    $('#resource-table tbody').append(
      createResourceTableRow(12, [
        '인사시스템',
        'JAVA',
        '11',
        'www.aaa.com:801',
        '10.2.3.2',
      ])
    );
  }
});
