const filterBox = document.querySelectorAll(".box2_tagButton");
const items = document.querySelectorAll(".portfolio_item");
const boxInputs = document.querySelectorAll(".box2_input");
const filterList = [];
let searchTypeContain = false;
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
        });
    });
});
boxInputs.forEach((boxInput) => {
    boxInput.addEventListener("input", (e) => {
        const inputWord = boxInput.value;
        items.forEach((item) => {
            const tagTitles = item.querySelectorAll(".box2_title");
            tagTitles.forEach((tagTitle) => {
                if (inputWord == "") {
                    item.style.display = "flex";
                    return;
                }
                if (searchTypeContain) {
                    if (tagTitle.textContent.includes(inputWord)) {
                        item.style.display = "flex";
                        return;
                    }
                }
                else {
                    if (inputWord == tagTitle.textContent) {
                        item.style.display = "flex";
                        return;
                    }
                }
                item.style.display = "none";
            });
        });
    });
});
function setContainType(flag) {
    searchTypeContain = flag;
    console.log(searchTypeContain);
}
window.setContainType = setContainType;
export {};
