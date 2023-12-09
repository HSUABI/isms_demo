$(function () {
    $('#admin-company-select').removeClass('d-none');
  
    new SlimSelect({
      select: '#admin-company-select',
      settings: {
        openPosition: 'down',
        placeholderText: '여기를 클릭해 검색하세요',
      },
    });
  });

  $(function () {
    $('#admin-affi-select').removeClass('d-none');
  
    new SlimSelect({
      select: '#admin-affi-select',
      settings: {
        openPosition: 'down',
        placeholderText: '여기를 클릭해 검색하세요',
      },
    });
  });

  $(function () {
    $('#admin-approve-select').removeClass('d-none');
  
    new SlimSelect({
      select: '#admin-approve-select',
      settings: {
        openPosition: 'down',
        placeholderText: '여기를 클릭해 검색하세요',
      },
    });
  });

  $(function () {
    $('#admin-admin-select').removeClass('d-none');
  
    new SlimSelect({
      select: '#admin-admin-select'
    });
  });



function createResourceTableRow(id, columns) {
    const row = $('<tr style="white-space: nowrap"></tr>');
    row.attr("data-id", id);

    for (let i = 0; i < columns.length; i++) {
        const cell = $("<td></td>");
        cell.text(columns[i]);
        cell.css("vertical-align", "middle");
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

$(document).on('show.bs.modal', '#resource-write-modal', function (e) {
    $('#resource-write-form input').val('');
    $('#resource-write-form select option').attr('selected', null);
    $('#resource-write-form select option:first-child').attr('selected', 'true');
  
    console.log($(e.relatedTarget).closest('tr').data('id'));
    let target = $(e.relatedTarget).closest('tr').data('id');
    let user_id = window.data[target].user_id;
    let name = window.data[target].user_name;
    let team = window.data[target].team_id;
    let ip = window.data[target].ip;
    let affiliation = window.data[target].affiliation;
    let is_confirmed = window.data[target].is_confirmed;
    let is_admin = window.data[target].is_admin;


    $('#resource-write-form input[name="name"]').val(name);
    $('#resource-write-form input[name="ip"]').val(ip);
    $('#resource-write-form select[name="team[]"] option[value="'+team+'"]').attr('selected', 'true');
    $('#resource-write-form select[name="affi[]"] option[value="'+affiliation+'"]').prop('selected', 'selected');
    $('#resource-write-form input[name="id"]').val(user_id);
    
    if (is_confirmed) {
        $('#resource-write-form select[name="approve[]"] option[value="1"]').attr('selected', 'true');
    } else {
        $('#resource-write-form select[name="approve[]"] option[value="0"]').attr('selected', 'true');
    }
    if (is_admin) {
        $('#resource-write-form select[name="admin[]"] option[value="1"]').attr('selected', 'true');
    } else {
        $('#resource-write-form select[name="admin[]"] option[value="0"]').attr('selected', 'true');
    }
  });

  function dictToURI(dict) {
    var str = [];
    for(var p in dict){
       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(dict[p]));
    }
    return str.join("&");
  }

$(document).on("click", "#resource-save-btn", function (e) {
    // TODO: 백엔드에 저장 구현
    let data = {
        id: $("#resource-write-form")[0][6].value,
        name: $("#resource-write-form")[0][0].value,
        affiliation: $("#resource-write-form")[0][1].value,
        ip: $("#resource-write-form")[0][2].value,
        team: $("#resource-write-form")[0][3].value,
        approve: $("#resource-write-form")[0][4].value,
        admin: $("#resource-write-form")[0][5].value
    }

    console.log("/restful/modify/user?" + dictToURI(data));

    Swal.fire({
        title: "저장하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
    }).then((result) => {
        if (result.isConfirmed) {
            $("#resource-write-modal").modal("hide");
            $(".resource-category.active").trigger("click");
            $.ajax({
                url:
                    "/restful/modify/user?" + dictToURI(data),
                type: "GET",
                success: (data) => {
                    location.reload();
                },
                error: function onError(error) {
                    console.error(error);
                },
            });
            toastr.info("저장되었습니다.");
        }
    });
});

$(() => {
    $("#resource-table tbody").html("");

    $(document).on("click", ".resource-delete-btn", function (e) {
        // TODO: 백엔드에서 자산 삭제 구현
        console.log($(this).closest("tr").data("id"));
        // console.log($(this).closest("tr").children('td:eq(0)').text());

        Swal.fire({
            title: "정말 삭제하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
        }).then((result) => {
            if (result.isConfirmed) {
                $(this).closest("tr").remove();
                $.ajax({
                    url:
                        "/restful/remove/user?id=" + $(this).closest("tr").children('td:eq(0)').text(),
                    type: "GET",
                    success: (data) => {
                        location.reload();
                    },
                    error: function onError(error) {
                        console.error(error);
                    },
                });
                toastr.info("삭제되었습니다.");
            }
        });
    });

    const type = 5;

    const userList = window.data;

    console.log(userList);

    $("#resource-table thead th").each((index, elem) => {
        if (String(elem.dataset.allowType).indexOf(type) !== -1) {
            $(elem).removeClass("d-none");
            $(elem).attr("disabled", null);
        } else {
            $(elem).addClass("d-none");
            $(elem).attr("disabled", "true");
        }
    });

    userList.forEach((element, idx) => {
        $("#resource-table tbody").append(
            createResourceTableRow(idx, [
                element.user_id,
                element.user_name,
                element.affiliation,
                element.team_name,
                element.is_confirmed ? '승인' : '미승인',
                element.is_admin ? '관리자' : '사용자',
            ])
        );
    });
});
