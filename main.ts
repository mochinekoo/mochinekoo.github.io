const filterList: string[] = [];

let searchTypeContain: boolean = false;

function createCardView() {
    interface Portfolio {
        github_url: string;
        description: string;
        tags: string[];
        image_path: string | null;
    }

    fetch("./portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((data_: Portfolio) => {
                const github_urlText: string = data_.github_url;
                const github_url = new URL(github_urlText);
                const [_, user, title] = github_url.pathname.split("/");
                const description: string = data_.description;
                const tags: string[] = data_.tags;

                const boxParent = document.querySelector<HTMLInputElement>(".box2_parent");
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


            const tagButtons = document.querySelectorAll<HTMLElement>(".box2_tagButton");
            const portfolioItems = document.querySelectorAll<HTMLElement>(".portfolio_item");
            const boxInputs = document.querySelectorAll<HTMLInputElement>(".box2_input");
            const hasTag = document.querySelector<HTMLElement>(".hasTag");
            tagButtons.forEach((tagButton) => {
                tagButton.addEventListener("click", (e) => {
                    const selectFilter = tagButton.dataset.filter;  //ボタンのフィルター
                    if (selectFilter == "All") {    // 押したやつがAll
                        filterList.length = 0;
                        filterList.push("All"); //押したやつがAllなら、空にしてAllを追加
                    }
                    else {  // 押したやつがAllじゃない
                        const index = filterList.indexOf(<string>selectFilter);
                        if (index == -1) {
                            // @ts-ignore
                            filterList.push(selectFilter);  // フィルターリストに含まれていない場合は追加
                        }
                        else {
                            filterList.splice(index, 1);    // フィルターリストに含まれている場合は、インデックスから削除
                        }
                    }

                    portfolioItems.forEach((portfolioItem) => {
                        const category = portfolioItem.dataset.category;
                        // @ts-ignore
                        const splitCategorys = category.split(",");
                        let hide = true;
                        filterList.forEach(filter_ => {
                            splitCategorys.forEach((split) => {
                                if (split == filter_ || filter_ == "All") {
                                    hide = false;
                                }
                            })
                        });

                        if (hide) {
                            portfolioItem.style.display = "none";
                        }
                        else {
                            portfolioItem.style.display = "flex";
                        }
                    });

                    // @ts-ignore
                    hasTag.textContent = "現在のタグ：" + filterList;
                });
            });

            boxInputs.forEach((boxInput) => {
                boxInput.addEventListener("input", (e) => {
                    const inputWord = boxInput.value;
                    portfolioItems.forEach((item) => {
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
        })
        .catch((error) => console.error("読み込みエラー:", error));
}

createCardView();

function setContainType(flag: boolean) {
    searchTypeContain = flag;
    console.log(searchTypeContain);
}
(window as any).setContainType = setContainType;