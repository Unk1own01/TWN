document.addEventListener('DOMContentLoaded', function() {
    let rbPoints = 100000000000; // Example starting points
    let history = [];
    let spinning = false;

    document.getElementById('rbPoints').innerText = rbPoints;

    document.getElementById('spinButton').addEventListener('click', handleSpin);
    document.getElementById('shopButton').addEventListener('click', () => showSection('shopSection'));
    document.getElementById('historyButton').addEventListener('click', () => showSection('historySection'));
    document.getElementById('helpButton').addEventListener('click', () => showSection('helpSection'));

    document.getElementById('goBackShopButton').addEventListener('click', () => showSection('spinSection'));
    document.getElementById('goBackHistoryButton').addEventListener('click', () => showSection('spinSection'));
    document.getElementById('goBackHelpButton').addEventListener('click', () => showSection('spinSection'));

    document.getElementById('redeemButton').addEventListener('click', redeemCode);

    function handleSpin() {
        if (spinning) {
            alert('Please wait before spinning again.');
            return;
        }

        spinning = true;
        generateCharacter();
        setTimeout(() => {
            spinning = false;
        }, 10000); // 10 seconds cooldown
    }

    function generateCharacter() {
        const glowingNames = new Set([
            "TWN Pyro", "TWN Tundra", "TWN Animalia", "TWN Yang", "TWN Toaa Yang",
            "TWN Apollo", "TWN Chloe", "TWN Maya", "TWN Jessica", "TWN Goat",
            "TWN Wild", "TWN Ceasar", "TWN Nemesis Ceasar", "TWN Noyan", "TWN Jose",
            "TWN Azreal", "TWN Delilah", "TWN Airo", "TWN Metaz", "TWN Ying",
            "TWN Time King", "TWN Xeus - Game0", "TWN Justin", "TWN Red Fur",
            "TWN Blue Fur", "TWN Jia", "TWN Venga", "TWN Terror", "TWN Shinichi - CL",
            "TWN Kimmichi", "TWN Maleficia", "TWN Ignis", "TWN Ignus", "TWN Pyura",
            "TWN Yundra", "TWN Nexus Yang", "TWN Toaa Nexus Yang", "TWN White Fur",
            "TWN Red and Blue Fur Fused", "TWN Grey Fur", "TWN Yellow Fur",
            "TWN Gray Fur", "TWN Black Fur", "TWN White Wolf Fur"
        ]);

        const firstNames = ["Liam", "Noah", "Ethan", "Ava", "Mia", "Sophia", "Lucas", "Ella", "Jackson", "Aiden"];
        const types = ["Defense", "Healer", "Attack"];
        const powers = ["Fire", "Water", "Lightning", "Air", "Plasma", "Ice", "Shadow", "Light", "Earth", "Mind Control"];

        let rating;
        let typeClass = '';
        const rand = Math.random();

        if (rand < 0.01) { // 1% chance for TWN characters
            rating = Math.floor(Math.random() * (50000000000 - 20000000000 + 1)) + 20000000000;
            typeClass = 'rainbow-text'; // Rainbow glowing text for TWN characters
        } else if (rand < 0.11) { // 10% chance for Mythical Enhanced
            rating = Math.floor(Math.random() * (20000000000 - 999 + 1)) + 999;
            typeClass = 'dark-text'; // Dark color text for Mythical Enhanced characters
        } else if (rand < 0.41) { // 30% chance for Legendary-Mythical characters
            rating = Math.floor(Math.random() * (999 - 80 + 1)) + 80;
            typeClass = 'orange-text'; // Orange text for Legendary-Mythical characters
        } else { // 59% chance for Bad characters
            rating = Math.floor(Math.random() * (80 - 1 + 1)) + 1;
            typeClass = 'grey-text'; // Grey text for Bad characters
        }

        const name = rand < 0.01 ? Array.from(glowingNames)[Math.floor(Math.random() * glowingNames.size)] : firstNames[Math.floor(Math.random() * firstNames.length)];
        const type = types[Math.floor(Math.random() * types.length)];
        const power = powers[Math.floor(Math.random() * powers.length)];

        // Update character result
        document.getElementById('characterResult').innerHTML = `
            <p class="${typeClass}"><strong>Name:</strong> ${name}</p>
            <p class="${typeClass}"><strong>Type:</strong> ${type}</p>
            <p class="${typeClass}"><strong>Power:</strong> ${power}</p>
            <p class="${typeClass}"><strong>Rating:</strong> ${rating}</p>
            <p class="${typeClass}"><strong>Character Type:</strong> ${getCharacterType(rating)}</p>
        `;

        // Add to history
        history.push({ name, type, power, rating, characterType: getCharacterType(rating) });
        updateHistory();
    }

    function getCharacterType(rating) {
        if (rating >= 20000000000) {
            return 'TWN';
        } else if (rating >= 999) {
            return 'Mythical Enhanced';
        } else if (rating >= 80) {
            return 'Legendary-Mythical';
        } else {
            return 'Bad';
        }
    }

    function buyCharacter(characterName, cost) {
        if (rbPoints >= cost) {
            rbPoints -= cost;
            document.getElementById('rbPoints').innerText = rbPoints;
            document.getElementById('purchaseResult').innerHTML = `
                <p>You successfully bought <strong>${characterName}</strong>!</p>
            `;
        } else {
            document.getElementById('purchaseResult').innerHTML = `
                <p>Not enough RB points to buy <strong>${characterName}</strong>.</p>
            `;
        }
    }

    function redeemCode() {
        const code = document.getElementById('redeemCodeInput').value;
        const specialCodes = {
            'KVKC': { type: 'character', value: 'Pyura Fused Xavek', rating: Infinity },
            'RB100': { type: 'rb', value: 0 }
        };

        if (specialCodes[code]) {
            const prize = specialCodes[code];
            if (prize.type === 'character') {
                document.getElementById('redeemResult').innerHTML = `
                    <p>You have redeemed a special character: <strong>${prize.value}</strong> with rating ${prize.rating}!</p>
                `;
            } else if (prize.type === 'rb') {
                rbPoints += prize.value;
                document.getElementById('rbPoints').innerText = rbPoints;
                document.getElementById('redeemResult').innerHTML = `
                    <p>You have received ${prize.value} RB points!</p>
                `;
            }
        } else {
            document.getElementById('redeemResult').innerHTML = `
                <p>Invalid or incorrect code.</p>
            `;
        }
    }

    function showSection(sectionId) {
        const sections = ['spinSection', 'shopSection', 'historySection', 'helpSection'];
        sections.forEach(id => {
            document.getElementById(id).style.display = (id === sectionId) ? 'block' : 'none';
        });
    }

    function updateHistory() {
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = '';
        history.forEach(entry => {
            historyList.innerHTML += `
                <p><strong>Name:</strong> ${entry.name}, <strong>Type:</strong> ${entry.type}, <strong>Power:</strong> ${entry.power}, <strong>Rating:</strong> ${entry.rating}, <strong>Character Type:</strong> ${entry.characterType}</p>
            `;
        });
    }
});

function buyCharacter(characterName, cost) {
    if (rbPoints >= cost) {
        rbPoints -= cost;
        document.getElementById('rbPoints').innerText = rbPoints;
        document.getElementById('purchaseResult').innerHTML = `
            <p>You successfully bought <strong>${characterName}</strong>!</p>
        `;
    } else {
        document.getElementById('purchaseResult').innerHTML = `
            <p>Not enough RB points to buy <strong>${characterName}</strong>.</p>
        `;
    }
}

function buyCharacter(characterName, cost) {
    if (rbPoints >= cost) {
        rbPoints -= cost;
        document.getElementById('rbPoints').innerText = rbPoints.toLocaleString();
        document.getElementById('purchaseResult').innerHTML = `
            <p>You successfully bought <strong>${characterName}</strong>!</p>
        `;
    } else {
        document.getElementById('purchaseResult').innerHTML = `
            <p>Not enough RB points to buy <strong>${characterName}</strong>.</p>
        `;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let rbPoints = 10; // Example starting points
    document.getElementById('rbPoints').innerText = rbPoints.toLocaleString();
    
    let pointsEarned = 0; // Track points earned in each spin

    document.getElementById('spinButton').addEventListener('click', generateCharacter);

    function generateCharacter() {
        // Existing character generation code...

        // Earn 10 RB points for each spin
        pointsEarned = 10;
        rbPoints += pointsEarned;
        document.getElementById('rbPoints').innerText = rbPoints.toLocaleString();
        document.getElementById('pointsEarned').innerText = pointsEarned;

        // Existing character generation result display code...
    }

    // Existing functions for redeeming codes, buying characters, etc.
});
