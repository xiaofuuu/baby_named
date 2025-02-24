document.getElementById('nameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const surname = document.getElementById('surname').value;
    const fatherName = document.getElementById('fatherName').value;
    const motherName = document.getElementById('motherName').value;
    const gender = document.getElementById('gender').value;

    const names = generateNames(surname, fatherName, motherName, gender);
    displayResults(names);
});

// 常用字库
const commonCharacters = {
    male: {
        positive: ['宇', '浩', '博', '文', '泽', '天', '明', '永', '志', '鸿'],
        elegant: ['雅', '致', '诚', '信', '然', '涵', '翰', '海', '德', '轩'],
        nature: ['山', '川', '木', '林', '风', '云', '星', '晨', '阳', '辰']
    },
    female: {
        positive: ['婷', '静', '雅', '美', '慧', '颖', '芸', '莉', '馨', '怡'],
        elegant: ['诗', '雨', '梦', '琪', '语', '璐', '瑶', '婉', '清', '韵'],
        nature: ['芳', '花', '月', '露', '雪', '霜', '春', '夏', '秋', '冬']
    }
};

function generateNames(surname, fatherName, motherName, gender) {
    const names = [];
    const charSet = commonCharacters[gender];
    
    // 从父母名字中提取特征
    const parentChars = (fatherName + motherName).split('');
    
    // 生成5个名字建议
    for (let i = 0; i < 5; i++) {
        let name = {
            characters: surname,
            meaning: ''
        };

        // 随机决定用一个字还是两个字
        const nameLength = Math.random() > 0.3 ? 2 : 1;

        if (nameLength === 1) {
            // 单字名
            const category = randomChoice(['positive', 'elegant', 'nature']);
            const char = randomChoice(charSet[category]);
            name.characters += char;
            name.meaning = generateMeaning(char, category);
        } else {
            // 双字名
            const categories = ['positive', 'elegant', 'nature'];
            const char1 = randomChoice(charSet[randomChoice(categories)]);
            const char2 = randomChoice(charSet[randomChoice(categories)]);
            name.characters += char1 + char2;
            name.meaning = generateMeaning(char1 + char2, 'combined');
        }

        names.push(name);
    }

    return names;
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateMeaning(chars, category) {
    const meanings = {
        positive: '寓意积极向上，充满朝气',
        elegant: '优雅大方，气质非凡',
        nature: '取自自然，意境优美',
        combined: '字义相辅相成，和谐统一'
    };

    return `${chars}：${meanings[category]}`;
}

function displayResults(names) {
    const resultDiv = document.getElementById('result');
    let html = '<h3>为您推荐以下名字：</h3>';
    
    names.forEach(name => {
        html += `
            <div class="name-card">
                <div class="name-characters">${name.characters}</div>
                <div class="name-meaning">${name.meaning}</div>
            </div>
        `;
    });
    
    html += '<p><small>* 本程序生成的名字仅供参考，建议咨询专业起名老师</small></p>';
    
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
} 