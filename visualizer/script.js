const hexContainer = document.getElementById('hexContainer');
const button = document.getElementById('run');
const input = document.getElementById('input');
const error = document.getElementById('error');
const offset = 20;

function getRandomColor() {
    return 'rgb(' + 
    (Math.floor(Math.random() * 185) + 70) + ', ' +
    (Math.floor(Math.random() * 185) + 70) + ', ' +
    (Math.floor(Math.random() * 185) + 70) + ')';
}

function hexChangeColor(p, col) {
    var top = p.firstChild;
    var middle = top.nextSibling;
    var bottom = middle.nextSibling;
    top.style.borderBottomColor = col;
    middle.style.backgroundColor = col;
    bottom.style.borderTopColor = col;
}

function valid(n, x, y) {
    if (-n >= x || x >= n || -n >= y || y >= n) {
        return false;
    }
    if (x > 0 && y > 0 && x + y >= n) {
        return false;
    }
    if (x < 0 && y < 0 && x + y <= -n) {
        return false;
    }
    return true;
}

const mx = 9;
function buildBoard(n) {
    hexContainer.innerHTML = '';
    for (let row = 1; row <= mx * 2 - 1; ++row) {
        let cnt = mx + row - 1;
        let st = -mx + 1;
        if (row >= mx) {
            cnt = mx + (mx * 2 - 1 - row);
            st += row - mx;
        }
        const hexRow = document.createElement('div');
        hexRow.classList.add('hex-row');
        hexRow.style.marginLeft = offset * (mx * 2 - 1 - cnt) + 'px';
        for (let col = 0; col < cnt; ++col) {
            const hex = document.createElement('div');
            const top = document.createElement('div');
            const middle = document.createElement('div');
            const bottom = document.createElement('div');
            hex.classList.add('hex');
            top.classList.add('top');
            middle.classList.add('middle');
            bottom.classList.add('bottom');
            hex.appendChild(top);
            hex.appendChild(middle);
            hex.appendChild(bottom);
            hex.setAttribute('id', '(' + (col + st) + ',' + (mx - row) + ')');
            if (!valid(n, col + st, mx - row)) {
                hexChangeColor(hex, '#2f2f2f');
            }
            hexRow.appendChild(hex);
        }
        hexContainer.appendChild(hexRow);
    }
}

function drawBoard() {
    const lines = input.value.split('\n');
    if (lines.length > 1000) {
        error.innerHTML = 'Error: Too many lines.';
        return;
    }

    const numbers = lines[0].trim().split(/\s+/).map(Number);
    if (numbers.length > 1) {
        error.innerHTML = 'Error found at line 1:<br>not 1 number.';
        return;
    }

    let n = numbers[0];
    if (Number.isNaN(n) || !Number.isInteger(n) || 2 > n || n > 9) {
        error.innerHTML = 'Error found at line 1:<br>n should be an integer between 2 and 9.';
        return;
    }

    buildBoard(n);

    for (let i = 1; i < lines.length; ++i) {
        if (lines[i] == '') {
            continue;
        }
        const numbers = lines[i].trim().split(/\s+/).map(Number);
        for (let j = 0; j < numbers.length; ++j) {
            if (Number.isNaN(numbers[j]) || !Number.isInteger(numbers[j])) {
                error.innerHTML = 'Error found at line ' + (i + 1) + ':<br>coordinates should be integers';
                return;
            }
        }
        if (numbers.length != 6) {
            error.innerHTML = 'Error found at line ' + (i + 1) + ':<br>not 6 numbers.';
            return;
        }
        let col = getRandomColor();
        for (let j = 0; j < numbers.length; j += 2) {
            let x = numbers[j], y = numbers[j + 1];
            if (!valid(n, x, y)) {
                error.innerHTML = 'Error found at line ' + (i + 1) + ':<br>coordinates out of range.';
                return;
            }
            hexChangeColor(document.getElementById('(' + x + ',' + y + ')'), col);
        }
    }
    error.innerHTML = '<br><br>';
}

button.addEventListener('click', function() { drawBoard(); });
drawBoard();