async function load() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    await delay(5000);
    document.location.href = './../index2.html';
};

load();