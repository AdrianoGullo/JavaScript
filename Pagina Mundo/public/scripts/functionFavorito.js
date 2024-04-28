document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("botaoFav").addEventListener("click", function() {
        var icon1 = document.getElementById("iconFav1");
        var icon2 = document.getElementById("iconFav2");
    
        if (icon1.style.display === "block") {
            icon1.style.display = "none";
            icon2.style.display = "block";
        } else {
            icon1.style.display = "block";
            icon2.style.display = "none";
        }
    });
});