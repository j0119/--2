async function loadPartial(selector, url) {
    const container = document.querySelector(selector);
    if (!container) return; // 這頁沒放空位就跳過

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        container.innerHTML = await response.text();
    } catch (error) {
        console.error(`載入 ${url} 失敗：`, error);
    }
}

function markCurrentPage() {
    // 例：網址 /encyclopedia.html → "encyclopedia.html"；網址只有 / 時當成 index.html
    const fileName = decodeURIComponent(location.pathname.split('/').pop()) || 'index.html';

    document.querySelectorAll('.nav-links a, .footer-links a').forEach((link) => {
        if (link.getAttribute('href') === `./${fileName}`) {
            link.setAttribute('aria-current', 'page');
        }
    });
}

async function initLayout() {
    await Promise.all([
        loadPartial('#site-header', './partials/header.html'),
        loadPartial('#site-footer', './partials/footer.html'),
    ]);
    markCurrentPage();
}

initLayout();