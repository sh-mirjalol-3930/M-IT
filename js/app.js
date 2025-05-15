const darkBtn = document.querySelector(".darkbtn");
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
});

const TOKEN = "7260749852:AAHJ4BUjRbbpmdXjOjv935Zt0VruYcqz8mY";
const CHAT_ID = "6029850068";

const form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const type = document.getElementById("type").value;
    const phone = document.getElementById("phone").value;
    const savollar = document.getElementById("savollar").value;

    const message = `
 *Yangi o'quvchi so'rovi:*

👤 *Ism:* ${firstname}
👤 *Familiya:* ${lastname}
🧾 *Tur:* ${type}
📞 *Telefon:* ${phone}
🖐️ *savol:* ${savollar}
`;

    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: "Markdown",
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.ok) {
                alert("✅ Ma'lumotlar yuborildi!");
                form.reset();
            } else {
                alert("❌ Xatolik yuz berdi.");
                console.error(data);
            }
        })
        .catch((err) => {
            console.error("Xatolik:", err);
            alert("❌ Tarmoqda muammo bo'lishi mumkin.");
        });
});

const btn = document.getElementById("AloqaMenuBar");
const menu = document.querySelector(".AloqaMenuBar");

btn.addEventListener("click", function (e) {
    e.stopPropagation(); // tugmadan bosilganda, tashqariga bosilgan deb o‘ylamasin

    if (menu.classList.contains("active")) {
        hideMenu();
    } else {
        menu.style.display = "block";

        requestAnimationFrame(() => {
            menu.classList.add("active");
        });
    }
});

// ✅ Tashqariga bosilganda menyuni yopish
document.addEventListener("click", function (e) {
    if (
        menu.classList.contains("active") &&
        !menu.contains(e.target) &&
        e.target !== btn
    ) {
        hideMenu();
    }
});

// ✅ ESC tugmasi bilan ham yopish (ixtiyoriy qo‘shimcha)
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("active")) {
        hideMenu();
    }
});

// 🔧 Yopish funksiyasi (animatsiya bilan)
function hideMenu() {
    menu.classList.remove("active");

    menu.addEventListener("transitionend", function hide() {
        menu.style.display = "none";
        menu.removeEventListener("transitionend", hide);
    });
}

const mobileMenubtn = document.querySelector(".mobileMenu");
const mobileMenuBar = document.querySelector(".mobileMenuBar");

mobileMenubtn.addEventListener("click", function () {
    if (mobileMenuBar.classList.contains("active")) {
        mobileMenuBar.style.marginLeft = "-800px";
        mobileMenuBar.classList.remove("active");
    } else {
        mobileMenuBar.style.marginLeft = "0";
        mobileMenuBar.classList.add("active");
    }
});

const closeBtn = document.querySelector(".closebtn");
closeBtn.addEventListener("click", function () {
    mobileMenuBar.style.marginLeft = "-800px";
    mobileMenuBar.classList.remove("active");
});
