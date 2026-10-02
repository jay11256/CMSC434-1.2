function openTab(filename, button) {
    // displays ts page
    document.getElementById("content").src = filename;

    //  inactive butt
    document.querySelectorAll("nav button").forEach(function(btn) {
        btn.classList.remove("active");
    });

    // activates the active button hopefully highlights in the nav bar
    button.classList.add("active");
}