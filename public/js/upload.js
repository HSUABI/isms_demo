let uploadImage = function () {
  const formData = new FormData();
  formData.append('file', $('#uploadFile')[0].files[0]);
  $.ajax({
    type: 'POST',
    url: '/upload',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      console.log('HIHI');
      $('#status').text('파일 업로드 성공');
    },
    error: function (data) {
      $('#status').text('파일 업로드 실패');
    },
  }).done(function (data) {
    console.log('HIHI');
    $('#status').text('파일 업로드 성공');
  });
};

$('#uploadB').click(function () {
  return uploadImage();
});
