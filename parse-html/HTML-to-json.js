import { parse, valid } from 'node-html-parser';
import https from 'https';


const res = await fetch('https://robust-se.com/translate-table-mobile-app/')
const raw = await res.text()
const root = parse(raw)
const tableBody = root.getElementsByTagName('tbody')
const rows = tableBody[0].childNodes
let data = []
let count = 0


for (const tr of rows) {
    let elements = tr.childNodes
    data.push({
        'Robust': elements[0].textContent,
        'Plosmatt': elements[1].textContent,
        'Profil': elements[2].textContent,
        'Hojd': elements[3].textContent,
        'Bredd': elements[4].textContent,
        'Elslutbleck': elements[5].textContent,
        'ASSA': elements[6].textContent,
        'Safetron': elements[7].textContent,
        'STEP': elements[8].textContent,
        //'Ritning-pdf': elements[9]
        'Bild': elements[10].childNodes[0].getAttribute('data-thumb')
    })
}

console.log(data[0])
console.log(data[1])
console.log(data[172])
console.log(data[173])


/*
for (const td of rows[173].childNodes) {
    console.log(count + ': ' + td.textContent)
    count += 1
}
The parsing is a bit strange, this code snippet prints:
0: 
1: TC30-15H
2: 15 mm
3: Vinklade stolpar
4: 245
5: 40
6: SERIE 200
7: 730EH, 930H
8: SA30H
9: ST4050
10: 15-mm
11: vinklade-stolpar
12: 245
13: 40
14: serie-200
15: 730eh 930h
16: sa30h
17: st4050

JSON structure:
{
    "Robust": S10,
    "Plösmått": 16,
    "profil": {
        "vinklade stolpar",
        "wicona",
        "wicona evo 75
    }
    "höjd": 245,
    "bredd": 50.3
    "passar elslutbleck": "SERIE 200",
    "ASSA": 275W,
    "Safetron": "SA76",
    "STEP": "ST4032"
}



*/