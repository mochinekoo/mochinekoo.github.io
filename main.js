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
function createCardView() {
    fetch("./portfolio.json")
        .then((response) => response.json())
        .then((data) => {
        data.forEach((data_) => {
            const github_urlText = data_.github_url;
            const github_url = new URL(github_urlText);
            const [_, user, title] = github_url.pathname.split("/");
            const description = data_.description;
            const tags = data_.tags;
            const boxParent = document.querySelector(".box2_parent");
            const box2 = document.createElement("div");
            box2.classList.add("box2");
            box2.classList.add("portfolio_item");
            box2.dataset.category = tags.join(",");
            let tagHTML = "";
            tags.forEach((tag) => {
                tagHTML += '<a class="box2_tagButton">' + tag + '</a>' + "\n";
            });
            box2.innerHTML =
                '<div class="box2_leftChild">\n' +
                    '        <a class="box2_title">' + title + '</a>\n' +
                    '        <div class="box2_description">' + description + '</div>\n' +
                    '        <div class="box2_tagButtonParent">\n' +
                    '            ' + tagHTML +
                    '        </div>\n' +
                    '        <div class="box2_linkButtonParent">\n' +
                    '            <a class="box2_linkButton">🔗Githubで開く</a>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '    <div class="box2_rightChild">\n' +
                    '        <img class="box2_img" src="https://opengraph.githubassets.com/2/' + user + '/' + title + '">' +
                    '    </div>' +
                    '</div>';
            boxParent?.appendChild(box2);
        });
    })
        .catch((error) => console.error("読み込みエラー:", error));
}
createCardView();
export {};
