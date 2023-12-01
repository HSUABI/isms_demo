$(document).on('click', '.system-toggle-item', function () {
  const systemToggle = document.getElementById('system-toggle');
  systemToggle.innerText = this.innerText;
  systemToggle.dataset.key = this.dataset.key;

  $(systemToggle).dropdown('hide');
});

new Chart(document.getElementById('year-statistics'), {
  type: 'bar',
  data: {
    labels: [...window.data.yearStatistics].reverse().map((row) => row[0]),
    datasets: [
      {
        label: '종합점수',
        data: [...window.data.yearStatistics].reverse().map((row) => row[1]),
        backgroundColor: [...window.data.yearStatistics]
          .reverse()
          .map((row) => {
            const score = row[1];

            if (score < 30) {
              return '#FF6384';
            } else if (score < 70) {
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
        display: true,
        text: '연도별 종합점수',
        font: {
          size: 16,
        },
      },
      datalabels: {
        formatter: function (value, context) {
          return value + '점';
        },
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
  },
});

new Chart(document.getElementById('management-statistics'), {
  type: 'pie',
  data: {
    labels: ['우수', '보통', '미흡'],
    datasets: [
      {
        label: '비율',
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
      },
      datalabels: {
        formatter: function (value, context) {
          return value + '%';
        },
        font: {
          size: 12,
          weight: 'bold',
        },
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
        label: '비율',
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
      },
      datalabels: {
        formatter: function (value, context) {
          return value + '%';
        },
        font: {
          size: 12,
          weight: 'bold',
        },
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
        label: '비율',
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
      },
      datalabels: {
        formatter: function (value, context) {
          return value + '%';
        },
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
  },
});
