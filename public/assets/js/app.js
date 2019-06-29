$(document).on("click", ".save-btn", function() {
    var thisId = $(this).attr("data-id");
    console.log("saved id:" + thisId);
    $.ajax({
        method: "POST",
        url: "/saved",
        data: {
            id: thisId
        }
    });
});

$(document).on("click", ".delete-btn", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/saved",
        data: {
            id: thisId
        }
    });
});
