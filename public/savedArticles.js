$(document).ready(() => {


    $.getJSON("/saved", (data) => {
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#savedArticlesDisplay").append(`
                <div class="container jumbotron">
                <h3 class="col-md-7 newInfo1" data-id="${data[i]._id}">${data[i].title}</h3>
                <p data-id="${data[i]._id}">${data[i].body}</p>
                <button data-toggle="modal" data-target="#myModal" data-id="${data[i]._id}" class="writeNote">Write a note</button>
                <button data-id="${data[i]._id}" class="deleteNote">Delete the article from saved</button>
                </div>`);
        };
    });

    //user clicks on to write a note
    $(document).on("click", "button", function () {
        // console.log($(this).attr("data-id"));
        //Empty the notes from the note section
        $("#notes").empty();

        let thisId = $(this).attr("data-id");

        $.ajax({
            type: "GET",
            url: "/savedArticles/" + thisId
        })
            .then(function (data) {
                console.log("hello");
                console.log(data);
                // The title of the article
                $("#modal-title").val(`Notes: ${data._id}`);
                // An input to enter a new title
                $("#inputBoxTitle").val();

                $("#saveNote").attr("data-id", data._id);

                // If there's a note in the article
                if (data.note) {
                    // Place the title of the note in the title input
                    $("#inputBoxTitle").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#inputBoxBody").val(data.note.body);
                }
            });

    });
    //when user clicks save note
    $(document).on("click", "#saveNote", function() {
        console.log($(this).attr("data-id"))
        $.ajax({
            type: "POST",
            url: "/savedArticles/" + $(this).attr("data-id"),
            data: {
                title: $("#inputBoxTitle").val(),
                body: $("#inputBoxBody").val()
            }
        })
        .then(function(data) {
            console.log(data);
            
        })

    });

    //when user clicks to delete a note
    $(document).on("click", ".deleteNote", function() {
        // console.log($(this).attr("data-id"));
        $.ajax({
            type: "DELETE",
            url: "/saved",
            data: {_id: $(this).attr("data-id")}
        })
        .then(function(data) {
            console.log(data);
            location.reload();
        });
    });

});