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
