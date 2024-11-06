function printHashes() {
    let count = document.getElementById('count').value;
    let output = '';
    let i = 0;

    while (i < count) {
        output += '#';
        i++;
    }

    document.getElementById('output').innerText = output;
}