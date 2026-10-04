const filterBox = document.querySelectorAll<HTMLElement>(".box2_tagButton");
const items = document.querySelectorAll<HTMLElement>(".portfolio_item");

const boxInputs = document.querySelectorAll<HTMLInputElement>(".box2_input");

const filterList: string[] = [];

let searchTypeContain: boolean = false;

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
    });
});

boxInputs.forEach((boxInput) => {
    boxInput.addEventListener("input", (e) => {
        const inputWord = boxInput.value;
        items.forEach((item) => {
            const tagTitles = item.querySelectorAll<HTMLElement>(".box2_title");
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

function setContainType(flag: boolean) {
    searchTypeContain = flag;
    console.log(searchTypeContain);
}
(window as any).setContainType = setContainType;