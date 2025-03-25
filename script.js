async function generatePrivateKey() {
    const key = new Uint8Array(32);
    window.crypto.getRandomValues(key);
    return btoa(String.fromCharCode(...key));
}

function generateRandomIP() {
    return "80.81." + (Math.floor(Math.random() * 256)) + "." + (Math.floor(Math.random() * 256));
}

async function generateConfig() {
    let privateKey = await generatePrivateKey();
    let address = "25." + (Math.floor(Math.random() * 256)) + "." + (Math.floor(Math.random() * 256)) + "." + (Math.floor(Math.random() * 256)) + "/24";
    let dns = generateRandomIP() + ", 10.202.10.10";
    let port = Math.floor(Math.random() * (65535 - 1024)) + 1024;
    let mtu = Math.floor(Math.random() * (1500 - 1280)) + 1280;

    let config = `[Interface]
PrivateKey = ${privateKey}
Address = ${address}
DNS = ${dns}
MTU = ${mtu}
ListenPort = ${port}`;

    document.getElementById("output").textContent = config;
}

function copyToClipboard() {
    let text = document.getElementById("output").textContent;
    let textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("متن با موفقیت کپی شد!");
}

function saveToFile() {
    let filename = prompt("نام فایل را وارد کنید:");
    if (!filename) return;
    if (!filename.endsWith(".conf")) {
        filename += ".conf";
    }
    let text = document.getElementById("output").textContent;
    let blob = new Blob([text], { type: "application/octet-stream" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
