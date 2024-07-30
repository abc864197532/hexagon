let currentColor = '#ff8080';

const hexContainer = document.getElementById('hexContainer');
const paletteContainer = document.getElementById('palette');
const offset = 20;

function hexChangeColor(p, col) {
    var top = p.firstChild;
    var middle = top.nextSibling;
    var bottom = middle.nextSibling;
    top.style.borderBottomColor = col;
    middle.style.backgroundColor = col;
    bottom.style.borderTopColor = col;
}

function hexResetColor() {
    document.querySelectorAll('.hex').forEach(p => {
        hexChangeColor(p, '#ffffff');
    });
}

function selectColor(col) {
    currentColor = col;
    document.querySelectorAll('.bar').forEach(p => {
        if (p.parentNode.firstChild.getAttribute('data-color') == col) {
            p.style.backgroundColor = '#ffffff'
        } else {
            p.style.backgroundColor = '#2f2f2f'
        }
    });
}

colorList = ['#ff8080', '#80ff80', '#8080ff', '#ffff80', '#ff80ff', '#80ffff', '#ffffff'];
function buildPalette() {
    for (let i = 0; i < colorList.length; ++i) {
        const col = document.createElement('div');
        const cir = document.createElement('div');
        const bar = document.createElement('div');
        cir.classList.add('color');
        cir.style.backgroundColor = colorList[i];
        cir.setAttribute('data-color', colorList[i]);
        cir.addEventListener('click', function() { selectColor(this.getAttribute('data-color')); });
        bar.classList.add('bar');
        col.appendChild(cir);
        col.appendChild(bar);
        paletteContainer.appendChild(col);
    }
    const reset = document.createElement('button');
    reset.classList.add('reset');
    reset.setAttribute('type', 'button');
    reset.innerHTML = 'reset'
    reset.addEventListener('click', function() { hexResetColor(); });
    paletteContainer.appendChild(reset);
}

let n;
function buildBoard(_n) {
    n = _n;
    hexContainer.innerHTML = '';
    for (let row = 1; row <= n * 2 - 1; ++row) {
        let cnt = n + row - 1;
        if (row >= n) {
            cnt = n + (n * 2 - 1 - row);
        }
        const hexRow = document.createElement('div');
        hexRow.classList.add('hex-row');
        hexRow.style.marginLeft = offset * (n * 2 - 1 - cnt) + 'px';
        for (let col = 0; col < cnt; ++col) {
            const hex = document.createElement('div');
            const top = document.createElement('div');
            const middle = document.createElement('div');
            const bottom = document.createElement('div');
            hex.classList.add('hex');
            top.classList.add('top');
            middle.classList.add('middle');
            bottom.classList.add('bottom');
            top.addEventListener('click', function() { hexChangeColor(this.parentNode, currentColor); });
            middle.addEventListener('click', function() { hexChangeColor(this.parentNode, currentColor); });
            bottom.addEventListener('click', function() { hexChangeColor(this.parentNode, currentColor); });
            hex.appendChild(top);
            hex.appendChild(middle);
            hex.appendChild(bottom);
            hexRow.appendChild(hex);
        }
        hexContainer.appendChild(hexRow);
    }
}

buildPalette();
selectColor(colorList[0]);
buildBoard(6);

document.getElementById('hexSize').addEventListener('change', function() {
    const size = parseInt(this.value);
    if (2 <= size && size <= 9) {
        buildBoard(size);
    }
});