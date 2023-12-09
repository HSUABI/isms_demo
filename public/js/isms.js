function drawCharts() {
    for (let no = 1; no <= 3; no++) {
        $("#statistics-" + no)
            .parent()
            .html('<canvas id="statistics-' + no + '"></canvas>');

        const stat = window.data.statistics.find(
            (s) => s.type === String(no)
        ).categories;

        if (!stat) {
            continue;
        }

        new Chart(document.getElementById("statistics-" + no), {
            type: "bar",
            data: {
                labels: stat.map((s) => s.name),
                datasets: [
                    {
                        label: "우수",
                        data: stat.map(
                            (s) =>
                                s.score[0] / s.score.reduce((a, b) => a + b, 0)
                        ),
                        backgroundColor: "#4BC0C0",
                    },
                    {
                        label: "보통",
                        data: stat.map(
                            (s) =>
                                s.score[1] / s.score.reduce((a, b) => a + b, 0)
                        ),
                        backgroundColor: "#FFCD56",
                    },
                    {
                        label: "미흡",
                        data: stat.map(
                            (s) =>
                                s.score[2] / s.score.reduce((a, b) => a + b, 0)
                        ),
                        backgroundColor: "#FF6384",
                    },
                ],
            },
            options: {
                indexAxis: "y",
                scales: {
                    x: {
                        stacked: true,
                        display: false,
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            font: {
                                size: 14,
                                weight: "bold",
                            },
                        },
                    },
                },
                plugins: {
                    legend: {
                        display: true,
                        position: "top",
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
                            return (value * 100).toFixed(2) + "%";
                        },
                        font: {
                            size: 14,
                        },
                        color: "black",
                    },
                },
            },
        });
    }
}

$(document).on("change", "#system-toggle", function (e) {
    $.ajax({
        url:
        "/restful/getISMS?systemID=" +
        $("#system-toggle").attr("data-key") +
        "&year=" +
        $("#year-toggle").attr("data-key"),
        type: "GET",
        success: (data) => {
            window.data = data;
            drawCharts();
        },
        error: function onError(error) {
            console.error(error);
        },
    });
    drawCharts();
});

$(document).on("change", "#year-toggle", function (e) {
    console.log(this.dataset.key);
    $.ajax({
        url:
            "/restful/getISMS?systemID=" +
            $("#system-toggle").attr("data-key") +
            "&year=" +
            $("#year-toggle").attr("data-key"),
        type: "GET",
        success: (data) => {
            window.data = data;
            drawCharts();
        },
        error: function onError(error) {
            console.error(error);
        },
    });
    drawCharts();
});

$(document).on("click", "#isms-summary", function (e) {
    $.ajax({
        url:
            "/restful/getISMS?systemID=" +
            $("#system-toggle").attr("data-key") +
            "&year=" +
            $("#year-toggle").attr("data-key"),
        type: "GET",
        success: (data) => {
            window.data = data;
            drawCharts();
        },
        error: function onError(error) {
            console.error(error);
        },
    });
});

$(document).on("click", ".isms-category", function (e) {
    // TODO: 백엔드에서 새로운 내역 불러오기
    console.log(this.dataset.category);

    $("#isms-detail-title").text(this.innerText);
    $("#isms-description-rule").val(
        "최고경영자는 정보보호 및 개인정보보호 관리체계의 수립과 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 체계를 수립하여 운영하여야 한다."
    );
    $("#isms-description-check").val(
        "- 정보보호 및 개인정보보호 관리체계의 수립 및 운영활동 전반에 경영진의 참여가 이루어질 수 있도록 보고 및 의사결정 등의 책임과 역할을 문서화하고 있는가?\n- 경영진이 정보보호 및 개인정보보호 활동에 관한 의사결정에 적극적으로 참여할 수 있는 보고, 검토 및 승인 절차를 수립·이행하고 있는가?"
    );
    $("#isms-description-file").val(
        "정보보호 및 개인정보보호 보고 체계(의사소통계획 등)\n정보보호 및 개인정보보호 위원회 회의록\n정보보호 및 개인정보보호 정책·지침(경영진 승인내역 포함)\n정보보호계획 및 내부 관리계획(경영진 승인내역 포함)\n정보보호 및 개인정보보호 조직도"
    );
    $("#isms-description-failure").val(
        "사례 1 : 정보보호 및 개인정보보호 정책서에 분기별로 정보보호 및 개인정보보호 현황을 경영진에게 보고하도록 명시하였으나, 장기간 관련 보고를 수행하지 않은 경우\n사례 2 : 중요 정보보호 활동(위험평가, 위험수용수준 결정, 정보보호대책 및 이행계획 검토, 정보보호대책 이행결과 검토, 보안감사 등)을 수행하면서 관련 활동관련 보고, 승인 등 의사결정에 경영진 또는 경영진의 권한을 위임받은 자가 참여하지 않았거나 관련 증거자료가 확인되지 않은 경우"
    );
    $("#year-history-select").trigger("change");

    $(".ai-report-badge").removeClass("d-inline");
    $(
        ["#ai-report-success", "#ai-report-warning", "#ai-report-danger"][
            Math.floor(Math.random() * 3)
        ]
    ).addClass("d-inline");
    $('#ai-report-start-btn').val(this.dataset.category);
    $("#ai-report-content").val(
        "AI 분석을 실시해 주세요."
    );

    $("#report-special").val(
        ""
    );
    $("#report-result").val("");

    // TODO: 백엔드에서 증빙자료 불러오기
    $("#file-uploaded-container").html("");
    [].forEach((name, index) => {
        appendFileBlock(name);
    });
});

$(document).on("change", "#year-history-select", function (e) {
    // TODO: 백엔드에서 새로운 내역 불러오기
    console.log(this.value);

    $("#isms-history").val("개인정보위원회 회고록이 작성되지 않음");
});

$(document).on("change", "#file-uploader-input", function (e) {
    // TODO: 백엔드로 파일 업로드 구현
    const file = this.files[0];
    const formData = new FormData();

    this.value = "";

    if (!file) {
        return;
    }

    formData.append("file", file);

    $.ajax({
        type: "POST",
        url: "/upload",
        processData: false,
        contentType: false,
        data: formData,
        success: function (result) {
            console.log(result);
            appendFileBlock(file.name);
        },
    });
});

$(document).on("click", "#ai-report-start-btn", function (e) {
    // TODO: AI 분석 기능 구현
    Swal.fire({
        title: "AI 분석을 시작하시겠습니까?\n분석에는 일정 시간이 소요됩니다.",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }
        $(".ai-report-badge").removeClass("d-inline");
        if ($(e.target).val() == '2-5-2') {
            $(
                ["#ai-report-success", "#ai-report-warning", "#ai-report-danger"][
                    Math.floor(2)
                ]
            ).addClass("d-inline");
            $("#ai-report-content").val(
                `
원래 규칙: 관리자 및 특수권한 계정은 쉽게 추측 가능한 식별자(root, admin, administrator 등)의 사용을 제한한다.

서버 실제 점검결과: admin:x:1002:1002::/home/admin:/bin/sh

위의 점검결과를 확인해보면, 점검결과는 원래의 규칙에 위배되고 있습니다. 관리자 계정명이 'admin'으로 설정되어 있어, 쉽게 추측 가능한 식별자를 사용하고 있기 때문입니다. 따라서, 이 부분에 대하여 수정이 필요합니다.
                `
            );
        } else if ($(e.target).val() == '2-5-3') {
            $(
                ["#ai-report-success", "#ai-report-warning", "#ai-report-danger"][
                    Math.floor(2)
                ]
            ).addClass("d-inline");
            $("#ai-report-content").val(
                `
세션타임아웃 시간 설정 부분에 대해 이야기하겠습니다. 원래 규칙에 따르면 세션타임아웃은 300초 미만으로 설정되어야 합니다. 하지만 증빙자료인 보안정책 지침에서는 세션타임아웃을 600초 이상으로 설정하라고 되어 있습니다. 

또한, 서버의 실제 점검결과에서는 세션타임아웃이 900초로 설정되어 있다고 나와있습니다.

따라서 증빙자료와 서버점검결과는 원래 규칙에 부합하지 않습니다. 이는 원래 규칙이 틀리지 않고, 증빙자료와 서버점검결과가 잘못된 것으로 판단됩니다. 

따라서 세션타임아웃 설정 부분을 원래 규칙인 300초 미만으로 수정하도록 권고드립니다.
                `
            );
        } else if ($(e.target).val() == '2-5-4') {
            $(
                ["#ai-report-success", "#ai-report-warning", "#ai-report-danger"][
                    Math.floor(2)
                ]
            ).addClass("d-inline");
            $("#ai-report-content").val(
                `
원래 규칙에 따르면 패스워드 최대 사용기간은 30일 이하로 설정되어야 합니다.
하지만 증빙자료에는 패스워드 최대 사용기간이 60일로 설정되어 있는 것을 확인할 수 있습니다.
또한 서버 실제 점검결과에서도 패스워드 최대 사용기간이 99999일로 나와 있습니다.
따라서 두 설정 모두 원래 규칙과 일치하지 않습니다.
결과적으로 증빙자료와 서버 점검결과 모두 패스워드 최대 사용기간 설정 부분이 원래 규칙에 위반됩니다.
                `
            );
        }  else if ($(e.target).val() == '2-9-6') {
            $(
                ["#ai-report-success", "#ai-report-warning", "#ai-report-danger"][
                    Math.floor(0)
                ]
            ).addClass("d-inline");
            $("#ai-report-content").val(
                `
원래 규칙에 따르면, "시간이 구글서버시간과 오차가 30초이내"라고 되어 있습니다. 

하지만 자료와 서버 점검 결과를 보면,
4. Time Synchronization Check의 결과에서 "서버 시간: 2023-12-10 01:24:54, 구글 시간: Sun Dec 10 01:24:53 2023. 시간 차이: 1.0 초. 시간이 30초 이내로 동기화 되어 있다"라고 명시되어 있습니다. 이는 실제 서버 시간과 구글 시간 사이에 1초의 차이가 있음을 나타내며, 이는 원래 규칙에 어긋나지 않습니다. 원래 규칙에 따르면 시간 동기화를 하지 않아도 된다고 되어있지만, 현재 서버 시간이 구글 시간과 동기화 되어 있어 문제가 되지 않습니다.

즉, 시간 동기화 설정 부분에 대해 원래 규칙과 서버 점검 결과는 일치하며 증빙자료에서도 이를 확인할 수 있습니다. 

따라서, 시간 동기화 설정 부분은 원래 규칙에 부합하며 서버 점검 결과와 증빙자료의 설정 부분 역시 이를 따르고 있습니다.
                `
            );
        }   else if ($(e.target).val() == '2-10-9') {
            $(
                ["#ai-report-success", "#ai-report-warning", "#ai-report-danger"][
                    Math.floor(2)
                ]
            ).addClass("d-inline");
            $("#ai-report-content").val(
                `
원래의 규칙에 따르면 백신 정책에 명시되어 있는 "V3백신 설치를 필수로해야한다."입니다.

그러나 서버 실제 점검 결과에 대한 증빙 자료에 따르면 "Antivirus(V3) Installation Check: No antivirus installed(V3)"로서 V3백신이 설치되지 않았음이 확인됩니다.

따라서, 이 부분은 원래 규칙에 부합하지 않습니다.
                `
            );
        }
    });
});

$(document).on("click", "#report-save-btn", function (e) {
    // TODO: 점검 내용 저장 구현
    Swal.fire({
        title: "정말 저장하시겠습니까?",
        showCancelButton: true,
        confirmButtonText: "확인",
        cancelButtonText: "취소",
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }

        console.log($("#report-special").val());
        console.log($("#report-result").val());

        toastr.success("저장되었습니다.");
    });
});
