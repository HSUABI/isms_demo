// Global object to hold the selected menu item numbers
const selectedMenu = {
  fileItem1: '',
  fileItem2: '',
  fileItem3: '',
};

function toggleMenu(menuNumber) {
  // 클릭된 메뉴 아이템의 하위 메뉴들을 토글
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach((item) => {
    const itemMenuNumber = item
      .getAttribute('onclick')
      .match(/toggleMenu\('([^']+)'\)/)[1];
    if (itemMenuNumber.startsWith(menuNumber + '-')) {
      item.classList.toggle('hidden');
    } else if (itemMenuNumber === menuNumber) {
      item.classList.toggle('hidden');
    } else {
      item.classList.add('hidden');
    }
  });

  // 콘텐츠 영역 업데이트
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML =
    `<h1>${menuNumber.replace(/-/g, '.')}</h1>` + contentDiv.innerHTML;

  // Extract the menu numbers and set them in the global object
  const numbers = menuNumber.split('-');
  selectedMenu.fileItem1 = numbers[0] || '';
  selectedMenu.fileItem2 = numbers.slice(0, 2).join('-');
  selectedMenu.fileItem3 = menuNumber;

  // Update hidden form fields
  document.getElementById('fileItem1').value = selectedMenu.fileItem1;
  document.getElementById('fileItem2').value = selectedMenu.fileItem2;
  document.getElementById('fileItem3').value = selectedMenu.fileItem3;
}

// 파일 업로드 처리
document
  .getElementById('uploadForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // 기본 form 제출 행동 방지

    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
      alert('파일을 선택해주세요.');
      return;
    }
    console.log(fileInput);
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileItem1', selectedMenu.fileItem1);
    formData.append('fileItem2', selectedMenu.fileItem2);
    formData.append('fileItem3', selectedMenu.fileItem3);

    // AJAX 요청을 통해 서버에 파일 업로드
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        alert('파일 업로드 성공.');
      } else {
        alert('파일 업로드 실패.');
      }
    };
    xhr.send(formData);
  });
