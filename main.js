const filterBox = document.querySelectorAll(".filter_box");
const items = document.querySelectorAll(".portfolio_item");
//    color: black;
//     background-color: rgb(189 184 184);
//
filterBox.forEach((filter) => {
    filter.addEventListener("click", (e) => {
        filterBox.forEach((filter1) => {
            filter1.style.color = "black";
            filter1.style.backgroundColor = "rgb(189 184 184)";
        });
        filter.style.color = "white";
        filter.style.backgroundColor = "black";
        const selectFilter = filter.dataset.filter;
        items.forEach((item) => {
            if (selectFilter === "All" || item.dataset.category == selectFilter) {
                item.style.display = "";
            }
            else {
                item.style.display = "none";
            }
        });
    });
});
export {};
