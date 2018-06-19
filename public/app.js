$(document).ready(() => {


if ($("#newInfo").length < 1) return;

    console.log('hello1');

    $(".scrapeBtn").on("click", () => {

        console.log("hello2");
        $.get("/scrape", (data, status) => {
            console.log("hello");
            console.log(data);
            
        });
        
        console.log("hello3");

    });

    // $(".displayScrapped").on("click", () => {
    //     $.getJSON("/all", (data) => {
    //         console.log(data);
    //         data.map((x, i) => {
    //             $("#newInfo").append(`
    //                     <div class="col-md-7 newInfo1" id="bob${i}">
    //                         ${x.title}
    //                         <button class="btn btn-primary saveBtn" id="bob${i}" >Save Me!</button>
    //                     </div>`);
    //         })
            
    //     })
    // });

    $(document).on("click", "div.newInfo1", () => {

        console.log($(this));
        // console.log($(".newInfo1").attr("value"));

        // console.log($("div.newInfo1").attr("id").text());
        // const savedTitle = $(this).find(".newInfo1").text();
        
        // $.post("/saved", savedTitle, (data, status) => {
        //     console.log(data);
        // })
    })
});