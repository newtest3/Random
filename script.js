let random = document.querySelector('.random');
let valueKey = document.querySelector('.valueKey');
let answerKey = document.querySelector('.answerKey');
let deleteValue = document.querySelector('.deleteValue');
let changeSymbols = document.querySelector('.changeSymbols');


changeSymbols.addEventListener('click', () => {
    if (changeSymbols.textContent == 'Change Motorola') {

        changeSymbols.textContent = 'Change Symbols';

    } else if (changeSymbols.textContent == 'Change Symbols') {

        changeSymbols.textContent = 'Change Motorola';

    }

});

valueKey.addEventListener('click', () => {
    return valueKey.value = '';
});

random.addEventListener('click', () => {
    if (changeSymbols.textContent == 'Change Motorola') {
        answerKey.textContent = generateSecurePassword(valueKey.value);
    } else if (changeSymbols.textContent == 'Change Symbols') {
        answerKey.textContent = motorola(valueKey.value);
    }
});


function generateSecurePassword(length) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{}<>?/';

    const all = lowercase + uppercase + digits + symbols;

    const getRandomChar = (charset) => {
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % charset.length;
        return charset[randomIndex];
    };

    // ✅ Гарантуємо, що пароль містить хоч один символ з кожної групи
    const passwordChars = [
        getRandomChar(lowercase),
        getRandomChar(uppercase),
        getRandomChar(uppercase),
        getRandomChar(digits),
        getRandomChar(digits),
        getRandomChar(symbols)
    ];
    // console.log(getRandomChar(uppercase));
    // Дозаповнюємо інші символи випадково
    const remainingLength = length - passwordChars.length;
    const randomValues = new Uint8Array(remainingLength);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < remainingLength; i++) {
        const char = all[randomValues[i] % all.length];
        passwordChars.push(char);
    }

    // 🔀 Перемішуємо символи в паролі (щоб групи не були на початку)
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
        [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    return passwordChars.join('');
}

// console.log(generateSecurePassword(15)); // приклад: 'D4g@xM#q81!aPsZy'



// =================================================================================


function motorola(length) {
    const uppercase = 'ABCDEF';
    const digits = '0123456789';

    const all = uppercase + digits;

    const getRandomChar = (charset) => {
        const randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % charset.length;
        return charset[randomIndex];
    };

    // ✅ Гарантуємо, що пароль містить хоч один символ з кожної групи
    const passwordChars = [
        getRandomChar(uppercase),
        getRandomChar(uppercase),
        getRandomChar(digits),
        getRandomChar(digits),
    ];

    const remainingLength = length - passwordChars.length;
    const randomValues = new Uint8Array(remainingLength);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < remainingLength; i++) {
        const char = all[randomValues[i] % all.length];
        passwordChars.push(char);
    }

    // 🔀 Перемішуємо символи в паролі (щоб групи не були на початку)
    for (let i = passwordChars.length - 1; i > 0; i--) {
        const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1);
        [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
    }

    return passwordChars.join('');
}
// console.log(motorola(64));