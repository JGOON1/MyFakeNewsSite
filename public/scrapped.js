$(document).ready(() => {


    if ($("#newInfo2").length < 1) return;

    $.getJSON("/all", (data) => {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#newInfo2").append(`
                <p class="col-md-7 newInfo1">${data[i].title}</p>`);
        };

    });

    $(document).on("click", "p", function() {

        console.log($(this));
        // console.log($(".newInfo1").attr("value"));

        // console.log($("div.newInfo1").attr("id").text());
        // const savedTitle = $(this).find(".newInfo1").text();

        // $.post("/saved", savedTitle, (data, status) => {
        //     console.log(data);
        // })
    })
});