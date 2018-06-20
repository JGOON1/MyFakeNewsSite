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
});