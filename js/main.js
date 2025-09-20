const card_colors = ["#FFF4E2", "#FED7CC", "#FAC2BF", "#B8A9DC", "#58A1CA"];
const card_titles = ["關於", "參與成員", "行萬里路", "感謝信", "狀元出品"];
const card_icons = [
  "../image/icon/about.svg",
  "../image/icon/members.svg",
  "../image/icon/trip.svg",
  "../image/icon/mails.svg",
  "../image/icon/publications.svg",
];

const card_container = document.getElementById("card-container");

if (card_container) {
  card_titles.forEach((ctitle, idx) => {
    let card = document.createElement("div");
    card.className = "card";
    card.style.backgroundColor = card_colors[idx];
    let card_compon1 = document.createElement("div");
    card_compon1.className = "card-compon1";
    card.appendChild(card_compon1);

    let card_compon2 = document.createElement("div");
    card_compon2.className = "card-compon2";

    let card_compon2_titlebox = document.createElement("div");
    card_compon2_titlebox.className = "card-compon2-titlebox";
    let card_compon2_icon = document.createElement("img");
    card_compon2_icon.src = card_icons[idx];
    card_compon2_icon.alt = "icon";
    card_compon2_icon.className = "card-compon2-img";
    card_compon2_titlebox.appendChild(card_compon2_icon);
    let title = document.createElement("h3");
    title.innerText = ctitle;
    card_compon2_titlebox.appendChild(title);
    card_compon2.appendChild(card_compon2_titlebox);

    let card_arrow = document.createElement("img");
    card_arrow.src = "./image/card_arrow.svg";
    card_arrow.alt = "card arrow";
    card_arrow.className = "card-compon2-img";
    card_compon2.appendChild(card_arrow);

    card.appendChild(card_compon2);
    card_container.appendChild(card);
  });

  const scrollWidth = card_container.scrollWidth / 2;
  card_container.scrollLeft = scrollWidth / 4; //need to adjust
}

const reveal = Array.from(
  document.getElementsByClassName("reveal_to_l")
).concat(Array.from(document.getElementsByClassName("reveal_to_r")));

if (reveal.length > 0) {
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  reveal.forEach((elem) => io.observe(elem));
}

const reveal_to_t = Array.from(document.getElementsByClassName("reveal_to_t"));

if (reveal_to_t.length > 0) {
  const isTrip = window.location.href.includes("day");
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: isTrip ? 0.25 : 0.1 }
  );

  reveal_to_t.forEach((elem) => io.observe(elem));
}

const thumbnail_to_r = Array.from(
  document.getElementsByClassName("thumbnail_to_r")
);
const thumbnail_to_l = Array.from(
  document.getElementsByClassName("thumbnail_to_l")
);

if (thumbnail_to_r) {
  thumbnail_to_r.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.cursor = "pointer";
      item.getElementsByTagName("div")[0].style.opacity = "0.8";
      item.getElementsByTagName("div")[0].style.transform = "translateX(0)";
    });
    item.addEventListener("mouseleave", () => {
      item.getElementsByTagName("div")[0].style.opacity = "0";
      item.getElementsByTagName("div")[0].style.transform = "translateX(-100%)";
    });
  });
}
if (thumbnail_to_l) {
  thumbnail_to_l.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.cursor = "pointer";
      item.getElementsByTagName("div")[0].style.opacity = "0.8";
      item.getElementsByTagName("div")[0].style.transform = "translateX(0)";
    });
    item.addEventListener("mouseleave", () => {
      item.getElementsByTagName("div")[0].style.opacity = "0";
      item.getElementsByTagName("div")[0].style.transform = "translateX(100%)";
    });
  });
}

const slides_container = document.getElementById("slides_container");
if (slides_container) {
  const taiwan = window.location.href.includes("taiwan");
  const china = window.location.href.includes("china");
  const day = window.location.href[window.location.href.indexOf("day") + 3];
  if (taiwan) {
    if (day !== "5") {
      for (let i = 1; i <= 9; ++i) {
        let img = document.createElement("img");
        img.src = `../../image/trip/taiwan/day${day}/${i}.png`;
        img.alt = "slide";
        img.className = "object-cover";
        slides_container.appendChild(img);
      }
    } else {
      for (let i = 1; i <= 4; ++i) {
        let img = document.createElement("img");
        img.src = `../../image/trip/taiwan/day${day}/${i}.png`;
        img.alt = "slide";
        img.className = "object-cover";
        slides_container.appendChild(img);
      }
    }
  } else if (china) {
    if (day !== "3" && day != "5") {
      for (let i = 1; i <= 9; ++i) {
        let img = document.createElement("img");
        img.src = `../../image/trip/china/day${day}/${i}.png`;
        img.alt = "slide";
        img.className = "object-cover";
        slides_container.appendChild(img);
      }
    } else {
      for (let i = 1; i <= 8; ++i) {
        let img = document.createElement("img");
        img.src = `../../image/trip/china/day${day}/${i}.png`;
        img.alt = "slide";
        img.className = "object-cover";
        slides_container.appendChild(img);
      }
    }
  }
}

(function () {
  // 允許多個獨立的 slideshow（用 data-slideshow 區分）
  const sliders = document.querySelectorAll(".slideshow[data-slideshow]");

  sliders.forEach((root) => {
    const name = root.getAttribute("data-slideshow"); // 例如 "about"
    const slidesTrack = root.querySelector(".slides");
    const imgs = Array.from(root.querySelectorAll("img"));
    const total = imgs.length;
    let index = 0;
    let timer = null;

    // 建立對應的 dots 容器（可選）
    const dotsHost = document.querySelector(
      `.slideshow-dots[data-slideshow-dots="${name}"]`
    );
    let dots = [];
    if (dotsHost) {
      dotsHost.innerHTML = "";
      dots = imgs.map((_, i) => {
        const d = document.createElement("span");
        d.className = "dot" + (i === 0 ? " active" : "");
        d.addEventListener("click", () => goTo(i, true));
        dotsHost.appendChild(d);
        return d;
      });
    }

    function update() {
      slidesTrack.style.transform = `translateX(${-index * 100}%)`;
      if (dots.length) {
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
      }
    }

    function goTo(i, pause) {
      index = (i + total) % total;
      update();
      if (pause) restart(); // 使用者操作後，重啟自動輪播
    }

    function next() {
      goTo(index + 1);
    }

    function start() {
      stop();
      // 自動輪播：每 3 秒換一張（可自行調整）
      timer = setInterval(next, 3000);
    }
    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }
    function restart() {
      stop();
      start();
    }

    // 可選：滑鼠移入暫停、移出繼續
    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);

    // 初始化
    update();
    start();
  });
})();

(function () {
  const ham = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  const backdrop = document.getElementById("backdrop");

  if (!ham || !menu) return;

  function openMenu() {
    ham.classList.add("active");
    ham.setAttribute("aria-expanded", "true");

    // 面板：從右側滑入 + 淡入
    menu.classList.remove("translate-x-full", "opacity-0");
    menu.classList.add("translate-x-0", "opacity-100");

    // 遮罩：淡入並可點擊
    if (backdrop) {
      backdrop.classList.remove("pointer-events-none");
      backdrop.classList.add("opacity-100");
    }
  }

  function closeMenu() {
    ham.classList.remove("active");
    ham.setAttribute("aria-expanded", "false");

    // 面板：滑出 + 淡出
    menu.classList.add("translate-x-full", "opacity-0");
    menu.classList.remove("translate-x-0", "opacity-100");

    // 遮罩：淡出與禁用點擊
    if (backdrop) {
      backdrop.classList.add("pointer-events-none");
      backdrop.classList.remove("opacity-100");
    }
  }

  function isOpen() {
    return menu.classList.contains("translate-x-0");
  }

  function toggleMenu() {
    isOpen() ? closeMenu() : openMenu();
  }

  ham.addEventListener("click", toggleMenu);
  backdrop?.addEventListener("click", closeMenu);

  // 可選：ESC 關閉
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });
})();

// const teacher_names = ["f"];
// const student_names = [
//   "黃思穎",
//   "周妍芝",
//   "陳凱琳",
//   "陳昇葳",
//   "顧懷允",
//   "陳卲宇",
//   "王睿宇",
//   "林宜璿",
//   "陳巧羚",
//   "呂卿華",
//   "曾稚甯",
//   "謝清槐",
//   "歐庭芳",
//   "宋宇倫",
//   "謝宜臻",
//   "李媛",
//   "許晨維",
//   "劉綵瑜",
//   "劉威廷",
//   "謝琬昀",
// ];

// const members_container = document.getElementById("members_container");

// if (members_container) {
//   const tabs = Array.from(document.getElementsByClassName("members_tab"));
//   const selectors = Array.from(
//     document.getElementsByClassName("member_selector")
//   );
//   const ntu_name = document.getElementById("ntu_member_name");
//   const ntu_img = document.getElementById("ntu_member_img");

//   const tabChangeHandler = (group_num) => {
//     tabs.forEach((tab, idx) => {
//       if (idx === group_num) {
//         tab.classList.add("members_tab_clicked");
//       } else {
//         tab.classList.remove("members_tab_clicked");
//       }
//     });

//     if (group_num != 0) {
//       for (let i = 0; i < 5; ++i) {
//         selectors[i].getElementsByTagName(
//           "img"
//         )[0].src = `./image/members/group${group_num}/ntu/${i + 1}.jpg`;

//         selectors[i].getElementsByTagName("h5")[0].innerText =
//           student_names[i + (group_num - 1) * 5];
//       }
//     }
//   };
//   tabChangeHandler(1);

//   tabs.forEach((tab, idx) => {
//     tab.addEventListener("click", () => {
//       tabChangeHandler(idx);
//       selectorChangeHandler(0);
//     });
//   });

//   const selectorChangeHandler = (selector_num) => {
//     selectors.forEach((selector, idx) => {
//       if (idx === selector_num) {
//         selector.classList.add("member_selector_clicked");
//       } else {
//         selector.classList.remove("member_selector_clicked");
//       }
//     });

//     ntu_name.innerText =
//       selectors[selector_num].getElementsByTagName("h5")[0].innerText;
//     ntu_img.src = selectors[selector_num].getElementsByTagName("img")[0].src;
//   };
//   selectorChangeHandler(0);

//   selectors.forEach((selector, idx) => {
//     selector.addEventListener("click", () => {
//       selectorChangeHandler(idx);
//     });
//   });
// }

// 依你的需求：NTU 與 PKU 各自一份名單（這裡先共用同一份，之後你可替換）
const ntu_student_names = [
  "黃思穎",
  "周妍芝",
  "陳凱琳",
  "陳昇葳",
  "顧懷允",
  "陳卲宇",
  "王睿宇",
  "林宜璿",
  "陳巧羚",
  "呂卿華",
  "曾稚甯",
  "謝清槐",
  "歐庭芳",
  "宋宇倫",
  "謝宜臻",
  "李媛",
  "許晨維",
  "劉綵瑜",
  "劉威廷",
  "謝琬昀",
];

// 如果有不同名單，把這份換成 PKU 的 20 名
const pku_student_names = [
  "羅思葳",
  "應越",
  "許邁",
  "王語涵",
  "毛嘉藝",
  "郭馨潔",
  "彭亮文",
  "李欢笙",
  "王鍵豪",
  "李姸姿",
  "張書瑜",
  "林嘉樂",
  "李皓夫",
  "黃鄭煊",
  "俞方圓",
  "郭奕彤",
  "王啟軒",
  "韓曄",
  "區豪燊",
  "邵睿思",
];

const members_container = document.getElementById("members_container");

if (members_container) {
  const tabs = Array.from(document.getElementsByClassName("members_tab"));

  // 抓 NTU 盒子中的節點
  const ntu_name = document.getElementById("ntu_member_name");
  const ntu_img = document.getElementById("ntu_member_img");
  const ntuSelectors = Array.from(
    document.querySelectorAll("#ntu_members_box .member_selector")
  );

  // 抓 PKU 盒子中的節點
  const pku_name = document.getElementById("pku_member_name");
  const pku_img = document.getElementById("pku_member_img");
  const pkuSelectors = Array.from(
    document.querySelectorAll("#pku_members_box .member_selector")
  );

  // 切換 Tab：同時更新 NTU 與 PKU 的 5 個 selector 內容（圖與名）
  const tabChangeHandler = (group_num) => {
    // tab 樣式
    tabs.forEach((tab, idx) => {
      if (idx === group_num) {
        tab.classList.add("members_tab_clicked");
      } else {
        tab.classList.remove("members_tab_clicked");
      }
    });

    if (group_num !== 0) {
      // NTU
      for (let i = 0; i < 5; ++i) {
        const imgEl = ntuSelectors[i].getElementsByTagName("img")[0];
        const nameEl = ntuSelectors[i].getElementsByTagName("h5")[0];

        imgEl.src = `./image/members/group${group_num}/ntu/${i + 1}.jpg`;
        nameEl.innerText = ntu_student_names[i + (group_num - 1) * 5];
      }

      // PKU
      for (let i = 0; i < 5; ++i) {
        const imgEl = pkuSelectors[i].getElementsByTagName("img")[0];
        const nameEl = pkuSelectors[i].getElementsByTagName("h5")[0];

        imgEl.src = `./image/members/group${group_num}/pku/${i + 1}.jpg`;
        nameEl.innerText = pku_student_names[i + (group_num - 1) * 5];
      }

      // 切換分組時，兩個 box 都回到各自 selector 第 0 個被選中
      selectMember("ntu", 0);
      selectMember("pku", 0);
    }
  };

  // 讓兩個 box 各自只會有一個 selector 被選中
  const selectMember = (box, selectorIndex) => {
    if (box === "ntu") {
      ntuSelectors.forEach((selector, idx) => {
        selector.classList.toggle(
          "member_selector_clicked",
          idx === selectorIndex
        );
      });
      ntu_name.innerText =
        ntuSelectors[selectorIndex].getElementsByTagName("h5")[0].innerText;
      ntu_img.src =
        ntuSelectors[selectorIndex].getElementsByTagName("img")[0].src;
    } else if (box === "pku") {
      pkuSelectors.forEach((selector, idx) => {
        selector.classList.toggle(
          "member_selector_clicked",
          idx === selectorIndex
        );
      });
      pku_name.innerText =
        pkuSelectors[selectorIndex].getElementsByTagName("h5")[0].innerText;
      pku_img.src =
        pkuSelectors[selectorIndex].getElementsByTagName("img")[0].src;
    }
  };

  // 初始狀態：預設第一組，兩邊都選第 0 個
  tabChangeHandler(1);

  // 點擊 Tab：兩個 box 一起切換
  tabs.forEach((tab, idx) => {
    tab.addEventListener("click", () => {
      tabChangeHandler(idx);
    });
  });

  // 點擊 NTU 的 selector：只影響 NTU box 的選取與大圖
  ntuSelectors.forEach((selector, idx) => {
    selector.addEventListener("click", () => {
      selectMember("ntu", idx);
    });
  });

  // 點擊 PKU 的 selector：只影響 PKU box 的選取與大圖
  pkuSelectors.forEach((selector, idx) => {
    selector.addEventListener("click", () => {
      selectMember("pku", idx);
    });
  });
}
