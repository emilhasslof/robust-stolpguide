
import { parse } from 'node-html-parser';


export default fetchData = async () => {
    const res = await fetch('https://robust-se.com/translate-table-mobile-app/')
    const raw = await res.text()
    const root = parse(raw)
    const tableBody = root.getElementsByTagName('tbody')
    const rows = tableBody[0].childNodes
    let data = []
    let count = 0

    /*
    höjd: "",
    bredd: "",
    elslutbleck: "",
    karmprofil: "",
    modell: "",
    plösmått: "",
    */
    for (const tr of rows) {
        let elements = tr.childNodes
        data.push({
            robust: elements[0].textContent,
            plösmått: elements[1].textContent,
            profil: elements[2].textContent,
            höjd: elements[3].textContent,
            bredd: elements[4].textContent,
            elslutbleck: elements[5].textContent,
            assa: elements[6].textContent,
            safetron: elements[7].textContent,
            step: elements[8].textContent,
            //'Ritning-pdf': elements[9]
            bild: elements[10].childNodes[0].getAttribute('data-thumb')
        })
    }
    return data
}

//console.log(data[0])
//console.log(data[1])
//console.log(data[172])
//console.log(data[173])



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