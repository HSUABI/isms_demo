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
    console.log(this.dataset.key);
    $.ajax({
        url:
            "/restful/getISMS?systemID=" + $("#system-toggle").attr("data-key"),
        type: "GET",
        success: (data) => {
            window.data = data;
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
            "year=" +
            $("#year-toggle").attr("data-key"),
        type: "GET",
        success: (data) => {
            window.data = data;
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
            "year=" +
            $("#year-toggle").attr("data-key"),
        type: "GET",
        success: (data) => {
            window.data = data;
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
    $("#ai-report-content").val(
        "증빙자료가 잘 준비되어있음\n내부관리계획은 경영진 날인이 되지 않았으나 특별한 사유가 있고 관련 근거가 있어 괜찮을 것으로 추정"
    );

    $("#report-special").val(
        "경영진이 납치되어 내부관리계획에 경영진 승인 날인이 되지않음\n경영진 이사회이후 날인예정"
    );
    $("#report-result").val("경영진이 납치되었으면 부경영진이 날인해야함");

    // TODO: 백엔드에서 증빙자료 불러오기
    $("#file-uploaded-container").html("");
    ["test1.pdf", "test2.pdf"].forEach((name, index) => {
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
        $(
            ["#ai-report-success", "#ai-report-warning", "#ai-report-danger"][
                Math.floor(Math.random() * 3)
            ]
        ).addClass("d-inline");
        $("#ai-report-content").val(
            "자료가 잘 준비되어있음\n계획은 괜찮을 것으로 추정"
        );
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
