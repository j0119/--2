// ── 讀取測驗分數 ──
const scores = JSON.parse(localStorage.getItem('petQuizScores')) || {
    環境: 0, 經濟: 0, 時間: 0, 包容力: 0, 穩定度: 0
};

// ── 各面向描述文字 ──
const descriptions = {
    環境: [
        { max: 3, text: '居住環境對飼養寵物有一定限制，建議優先考慮不需要大空間的小型或籠飼寵物。' },
        { max: 6, text: '居住空間尚可，適合中小型且活動量不高的寵物，如貓咪或小型犬。' },
        { max: 9, text: '居住空間與環境條件良好，非常適合飼養各類寵物，包含需要活動空間的中大型犬。' },
    ],
    經濟: [
        { max: 3, text: '目前預算較為有限，建議選擇日常開銷較低的寵物，並提前規劃緊急醫療基金。' },
        { max: 6, text: '每月預算充足，能負擔基本醫療與日常開銷，可考慮中等花費的寵物品種。' },
        { max: 9, text: '經濟條件優渥，能提供寵物良好的醫療照護與生活品質，適合各類寵物。' },
    ],
    時間: [
        { max: 3, text: '日常時間較為緊張，建議選擇獨立性強、不需要頻繁互動的寵物，如貓咪或魚類。' },
        { max: 6, text: '每日在家時間充裕，能提供足夠的陪伴，適合需要一定互動的寵物。' },
        { max: 9, text: '擁有充裕的時間陪伴寵物，非常適合需要大量互動與運動的活潑寵物。' },
    ],
    包容力: [
        { max: 3, text: '對寵物帶來的生活影響接受度較低，建議選擇安靜、掉毛少的寵物品種。' },
        { max: 6, text: '對掉毛與聲音有一定接受度，適合大多數常見的貓狗品種。' },
        { max: 9, text: '對掉毛與聲音接受度高，包容力強，幾乎能適應任何寵物帶來的生活改變。' },
    ],
    穩定度: [
        { max: 3, text: '目前飼養承諾度有待加強，建議再評估自身狀況後再做決定。' },
        { max: 6, text: '有一定的飼養心理準備，建議先了解目標寵物的長期需求再做決定。' },
        { max: 9, text: '飼養心理準備充分，穩定度佳，能給予寵物長期且穩定的照顧與陪伴。' },
    ],
};

// ── 更新分數顯示 ──
const dims = ['環境', '經濟', '時間', '包容力', '穩定度'];

dims.forEach(dim => {
    const score = scores[dim] ?? 0;

    document.getElementById('score-val-' + dim).textContent = score + '/9';
    document.getElementById('score-bar-' + dim).style.width = (score / 9 * 100) + '%';

    const desc = descriptions[dim].find(d => score <= d.max);
    if (desc) document.getElementById('score-desc-' + dim).textContent = desc.text;
});

// ── 隱藏佔位文字 ──
document.getElementById('chart-placeholder').style.display = 'none';

// ── Chart.js 雷達圖 ──
const ctx = document.getElementById('radar-chart').getContext('2d');

new Chart(ctx, {
    type: 'radar',
    data: {
        labels: dims,
        datasets: [{
            label: '你的評分',
            data: dims.map(d => scores[d] ?? 0),
            backgroundColor: 'rgba(201, 151, 91, 0.2)',
            borderColor: 'rgba(201, 151, 91, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(201, 151, 91, 1)',
            pointRadius: 5,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                min: 0,
                max: 9,
                ticks: { stepSize: 3, display: false },
                grid: { color: 'rgba(215, 205, 193, 0.6)' },
                angleLines: { color: 'rgba(215, 205, 193, 0.6)' },
                pointLabels: {
                    font: { size: 14, family: "'Noto Sans TC', sans-serif", weight: '700' },
                    color: '#2a2018',
                },
            }
        },
        plugins: { legend: { display: false } },
    }
});
