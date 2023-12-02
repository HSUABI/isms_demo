$(document).on('change', '#system-toggle', function (e) {
  // TODO: 백엔드에서 새로운 내역 불러와서 window.data 객체 안에 저장하기
  console.log(e);
  drawCharts(true, true);
});

$(document).on('change', '#year-toggle', function (e) {
  // TODO: 백엔드에서 새로운 내역 불러와서 window.data 객체 안에 저장하기
  console.log(e);
  $('#year-statistics-year').text(this.dataset.key);
  drawCharts(false, true);
});

function drawCharts(drawSummary, drawDetail) {
  if (drawSummary) {
    $('#year-statistics')
      .parent()
      .html('<canvas id="year-statistics"></canvas>');
  }

  if (drawDetail) {
    $('#management-statistics')
      .parent()
      .html('<canvas id="management-statistics"></canvas>');
    $('#protection-statistics')
      .parent()
      .html('<canvas id="protection-statistics"></canvas>');
    $('#privacy-statistics')
      .parent()
      .html('<canvas id="privacy-statistics"></canvas>');
  }

  if (drawSummary) {
    new Chart(document.getElementById('year-statistics'), {
      type: 'bar',
      data: {
        labels: [...window.data.yearStatistics].reverse().map((row) => row[0]),
        datasets: [
          {
            label: '종합점수',
            data: [...window.data.yearStatistics]
              .reverse()
              .map((row) => row[1]),
            backgroundColor: [...window.data.yearStatistics]
              .reverse()
              .map((row) => {
                const score = row[1];

                if (score <= 30) {
                  return '#FF6384';
                } else if (score <= 70) {
                  return '#FFCD56';
                } else {
                  return '#4BC0C0';
                }
              }),
          },
        ],
      },
      options: {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 1,
          },
        },
        scales: {
          x: {
            min: 0,
            max: 100,
          },
        },
        plugins: {
          legend: {
            display: false,
            position: 'bottom',
          },
          title: {
            display: false,
            text: '년도별 종합점수',
            font: {
              size: 16,
            },
          },
          datalabels: {
            formatter: function (value, context) {
              return value + '점';
            },
            font: {
              size: 16,
            },
            color: 'black',
          },
        },
      },
    });
  }

  if (drawDetail) {
    new Chart(document.getElementById('management-statistics'), {
      type: 'pie',
      data: {
        labels: ['우수', '보통', '미흡'],
        datasets: [
          {
            label: '개수',
            data: window.data.detailStatistics.management,
            backgroundColor: ['#4BC0C0', '#FFCD56', '#FF6384'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: '1. 관리체계 수립 및 운영',
            font: {
              size: 14,
            },
          },
          datalabels: {
            formatter: function (value, context) {
              return (
                (
                  (value * 100) /
                  window.data.detailStatistics.management.reduce(
                    (a, b) => a + b,
                    0
                  )
                ).toFixed(2) + '%'
              );
            },
            font: {
              size: 12,
            },
            color: 'black',
          },
        },
      },
    });

    new Chart(document.getElementById('protection-statistics'), {
      type: 'pie',
      data: {
        labels: ['우수', '보통', '미흡'],
        datasets: [
          {
            label: '개수',
            data: window.data.detailStatistics.protection,
            backgroundColor: ['#4BC0C0', '#FFCD56', '#FF6384'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: '2. 보호대책 요구사항',
            font: {
              size: 14,
            },
          },
          datalabels: {
            formatter: function (value, context) {
              return (
                (
                  (value * 100) /
                  window.data.detailStatistics.protection.reduce(
                    (a, b) => a + b,
                    0
                  )
                ).toFixed(2) + '%'
              );
            },
            font: {
              size: 12,
            },
            color: 'black',
          },
        },
      },
    });

    new Chart(document.getElementById('privacy-statistics'), {
      type: 'pie',
      data: {
        labels: ['우수', '보통', '미흡'],
        datasets: [
          {
            label: '개수',
            data: window.data.detailStatistics.privacy,
            backgroundColor: ['#4BC0C0', '#FFCD56', '#FF6384'],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: '3. 개인정보 처리 단계별 요구사항',
            font: {
              size: 14,
            },
          },
          datalabels: {
            formatter: function (value, context) {
              return (
                (
                  (value * 100) /
                  window.data.detailStatistics.privacy.reduce(
                    (a, b) => a + b,
                    0
                  )
                ).toFixed(2) + '%'
              );
            },
            font: {
              size: 12,
            },
            color: 'black',
          },
        },
      },
    });
  }
}
