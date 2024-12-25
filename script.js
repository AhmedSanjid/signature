const nameInput = document.querySelector('#First-name');
const signButton = document.querySelector('.sign');
const sign = document.querySelector('.signature-main');
const uppercase = document.querySelectorAll('.letter-bank .up');
const lowercase = document.querySelectorAll('.letter-bank .lo');
const signedBy = document.querySelector('.signed-by');
const modal = document.querySelector('.modal');

// Initial state of the button
signButton.disabled = true;

nameInput.addEventListener("input", validateName);
signButton.addEventListener('click', (event) => {
    const nameValue = nameInput.value.trim();
    
    // Check if the button is disabled
    if (signButton.disabled) {
        event.preventDefault(); // Prevent the default action if the button is disabled
        return; // Exit the function early
    }

    // Validation checks
    if (nameValue.length < 3) {
        alert("Name must be at least 3 characters long.");
        event.preventDefault(); // Prevent navigation
    } else if (isAllSame(nameValue)) {
        alert("Invalid name: all characters cannot be the same.");
        event.preventDefault(); // Prevent navigation
    } else {
        window.location.href = 'https://ahmedsanjid.github.io/jarvispro/';
    }

    console.log("Button clicked, name value:", nameValue);
});

function validateName() {
    const nameValue = nameInput.value.trim();
    const isValid = nameValue.length >= 3 && !isAllSame(nameValue);
    
    signButton.disabled = !isValid; // Enable or disable the button based on validation
    if (isValid) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

function isAllSame(name) {
    return name.split('').every(char => char === name[0]);
}

nameInput.addEventListener("keydown", (event) => {
    if ((event.code === `Key${event.key.toUpperCase()}`) || (event.code == 'Space')) {
        var key = event.key;   
        draw(key, true);
    } else if (event.code == 'Backspace') {
        setTimeout(function() {     
            var value = nameInput.value;
            sign.innerHTML = '';
            var letters = value.split('');
            letters.forEach((item, i) => {
                draw(item, false);
            });
        }, 50);
    }
    setTimeout(function() {  
        if (!nameInput.value) {
            modal.classList.remove('active');
        } else {
            modal.classList.add('active');
        }
    }, 50);
});

function draw(key, animate) {
    if (key == " ") {
        const space = document.createElement("div");
        space.style.minWidth = '12px';   
        sign.appendChild(space);   
    } else {
        const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

        for (i = 0; i < alphabet.length; i++) {
            var item = alphabet[i];

            if (key.toLowerCase() == item) {
                const letter = document.createElement("div");  
                if (key == item.toUpperCase()) {
                    letter.innerHTML = uppercase[i].innerHTML;
                    letter.classList.add('up');
                } else {
                    letter.innerHTML = lowercase[i].innerHTML;
                    letter.classList.add('lo');
                }
                letter.classList.add(item);
                if (animate) {
                    setTimeout(function() { 
                        letter.querySelector('svg path').style.strokeDashoffset = '0';
                    }, 50);
                } else {
                    letter.querySelector('svg path').style.strokeDashoffset = '0';
                }
                sign.appendChild(letter);
            }
        }
    }
}

