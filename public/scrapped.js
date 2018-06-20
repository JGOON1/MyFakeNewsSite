$(document).ready(() => {


    if ($("#newInfo2").length < 1) return;

    $.getJSON("/all", (data) => {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#newInfo2").append(`
                <div class="container jumbotron">
                <h3 class="col-md-7 newInfo1">${data[i].title}</h3>
                <p>${data[i].body}</p>
                <button id="savedBtn">Save Me!</button>
                </div>`);
        };

    });

    $(document).on("click", "button", function() {

        const savedTitle = $(this).parent().find(".newInfo1").text();
        const savedBody = $(this).parent().find("p").text();

        let result = {
            title: savedTitle,
            body: savedBody
        };

        $.ajax({
            method: "POST",
            url: "/saved",
            data: result
        })
            .done((msg) => {
                console.log(msg);
            });
        
        console.log(result);
        // console.log($(".newInfo1").attr("value"));

        // console.log($("div.newInfo1").attr("id").text());
        // const savedTitle = $(this).find(".newInfo1").text();

        // $.post("/saved", savedTitle, (data, status) => {
        //     console.log(data);
        // })
    
    });
});