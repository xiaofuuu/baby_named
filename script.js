document.getElementById('luckyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const birthdate = new Date(document.getElementById('birthdate').value);
    const name = document.getElementById('name').value;
    const budget = document.getElementById('budget').value;

    // 计算吉利日期（示例算法）
    const luckyDates = calculateLuckyDates(birthdate, name);
    const luckyFloors = calculateLuckyFloors(birthdate, budget);

    // 显示结果
    displayResults(luckyDates, luckyFloors);
});

function calculateLuckyDates(birthdate, name) {
    // 简单的示例算法
    const today = new Date();
    const luckyDates = [];
    
    // 计算生命数字（简化版）
    const birthDay = birthdate.getDate();
    const birthMonth = birthdate.getMonth() + 1;
    const birthYear = birthdate.getFullYear();
    const lifeNumber = (birthDay + birthMonth + sumDigits(birthYear)) % 9 || 9;

    // 根据生命数字选择未来30天内的吉日
    for(let i = 0; i < 30; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);
        
        const dayNumber = (futureDate.getDate() + futureDate.getMonth() + 1 + sumDigits(futureDate.getFullYear())) % 9 || 9;
        
        // 如果日期数字与生命数字相合（示例规则）
        if((dayNumber + lifeNumber) % 3 === 0) {
            luckyDates.push(futureDate);
        }
    }

    return luckyDates.slice(0, 3); // 返回前3个吉日
}

function calculateLuckyFloors(birthdate, budget) {
    // 简单的示例算法
    const birthDay = birthdate.getDate();
    const luckyFloors = [];
    
    // 根据出生日期和预算计算吉利楼层
    const baseNumber = birthDay % 5 + 1;
    
    // 生成3个吉利楼层
    for(let i = 0; i < 3; i++) {
        let luckyFloor = (baseNumber + i * 3) % 33;
        if(luckyFloor === 0) luckyFloor = 33;
        if(luckyFloor !== 4 && luckyFloor !== 13) { // 避开不吉利的数字
            luckyFloors.push(luckyFloor);
        }
    }

    return luckyFloors;
}

function sumDigits(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

function displayResults(luckyDates, luckyFloors) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>您的购房吉日推荐：</h3>
        <p class="lucky-date">
            ${luckyDates.map(date => date.toLocaleDateString('zh-CN')).join('<br>')}
        </p>
        <h3>建议选择的楼层：</h3>
        <p class="lucky-floor">
            ${luckyFloors.join('层, ')}层
        </p>
        <p><small>* 本计算结果仅供娱乐参考，请理性购房</small></p>
    `;
    resultDiv.classList.add('show');
} 