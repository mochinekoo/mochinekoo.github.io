const filterBox = document.querySelectorAll<HTMLElement>(".box2_tagButton");
const items = document.querySelectorAll<HTMLElement>(".portfolio_item");

//    color: black;
//     background-color: rgb(189 184 184);
//

filterBox.forEach((filter) => {
    filter.addEventListener("click", (e) => {
        const selectFilter = filter.dataset.filter;
        items.forEach((item) => {
            if (selectFilter === "All" || item.dataset.category == selectFilter) {
                item.style.display = "";
            }
            else {
                item.style.display = "none";
            }
        })
    })
});