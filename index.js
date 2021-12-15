const privateKeyToAddress = require('ethereum-private-key-to-address')

const addressToMatch = "Target Address";

// Pattern
const list = [
    ["Target PK", -1],   // Subtract one
    ["Target PK", -2],   // Subtract two         
]

list.forEach((item) => {
    findCorrectPK(item[0], addressToMatch, item[1]);
});

function findCorrectPK(inputPK, inputAddressToMatch, inputAddTarget) {
    const numberIndex = findNumberIndex(inputPK);

    // 1.
    console.log("\n=== Trying to match one by one ===")
    let pka = inputPK.split("");
    for (let idx = 0; idx < numberIndex.length; idx++) {
        const loc = numberIndex[idx];
        const temp = pka[loc];
        const tgt = parseInt(pka[loc]);
        const result = tgt + inputAddTarget;

        if (result < 0 && inputAddTarget < 0) {
            pka[loc] = 9;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc)
        
            pka[loc] = tgt;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc)
        } else if (result > 9 && inputAddTarget > 0) {
            pka[loc] = 0;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc)
            
            pka[loc] = tgt;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc) 
        } else { 
            pka[loc] = result;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc)
        }

        pka[loc] = temp;
    }

    // 2.
    console.log("\n=== Trying incremental match with rounding ===")
    pka = inputPK.split("");
    for (let idx = 0; idx < numberIndex.length; idx++) {
        const loc = numberIndex[idx];
        const tgt = parseInt(pka[loc]);
        const result = tgt + inputAddTarget;
        if (result < 0 && inputAddTarget < 0) {
            pka[loc] = 9;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc)
        } else if (result > 9 && inputAddTarget > 0) {
            pka[loc] = 0;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc)        
        } else { 
            pka[loc] = result;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc)
        }
    }

    // 3.
    console.log("\n=== Trying incremental match without rounding ===")
    pka = inputPK.split("");
    for (let idx = 0; idx < numberIndex.length; idx++) {
        const loc = numberIndex[idx];
        const tgt = parseInt(pka[loc]);
        const result = tgt + inputAddTarget;
        if (result < 0 && inputAddTarget < 0) {
            printResult(pka, inputAddressToMatch, loc)
        } else if (result > 9 && inputAddTarget > 0) {
            printResult(pka, inputAddressToMatch, loc)          
        } else { 
            pka[loc] = result;
            pka[loc] = pka[loc].toString();
            printResult(pka, inputAddressToMatch, loc)
        }
    }    

    // 4.
    console.log("\n=== Trying to match whole one by one ===")
    pka = inputPK.split("");
    for (let idx = 0; idx < pka.length; idx++) {
        const temp = pka[idx];
        const tgt = parseInt(pka[idx], 16);
        const result = tgt + inputAddTarget;
        
        if (result < 0 && inputAddTarget < 0) {
            pka[idx] = 0xF;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx)
        
            pka[idx] = tgt;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx)
        } else if (result > 0xF && inputAddTarget > 0) {
            pka[idx] = 0;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx)
            
            pka[idx] = tgt;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx) 
        } else { 
            pka[idx] = result;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx)
        }

        pka[idx] = temp;
    }
    
    // 5.
    console.log("\n=== Trying to match whole incremental with rounding ===")
    pka = inputPK.split("");
    for (let idx = 0; idx < pka.length; idx++) {
        const tgt = parseInt(pka[idx], 16);
        const result = tgt + inputAddTarget;
        
        if (result < 0 && inputAddTarget < 0) {
            pka[idx] = 0xF;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx)
        } else if (result > 0xF && inputAddTarget > 0) {
            pka[idx] = 0;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx)
        } else { 
            pka[idx] = result;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx)
        }
    }   
    
    // 6.
    console.log("\n=== Trying to match whole incremental not rounding ===")
    pka = inputPK.split("");
    for (let idx = 0; idx < pka.length; idx++) {
        const tgt = parseInt(pka[idx], 16);
        const result = tgt + inputAddTarget;
        
        if (result < 0 && inputAddTarget < 0) {
            printResult(pka, inputAddressToMatch, idx)
        } else if (result > 0xF && inputAddTarget > 0) {
            printResult(pka, inputAddressToMatch, idx)
        } else { 
            pka[idx] = result;
            pka[idx] = pka[idx].toString(16).toUpperCase();
            printResult(pka, inputAddressToMatch, idx)
        }
    }    
}

function printResult(pka, inputAddressToMatch, loc) {
    const newPK = pka.join("");
    const newAddress = privateKeyToAddress(newPK)
    if (newAddress.toLowerCase() === inputAddressToMatch.toLowerCase()) {
        console.log("We have a match PK: ", newPK);
        process.exit();
    } else {
        console.log(`[${loc}] : ${newPK} ${newAddress}`)
    }
}

function findNumberIndex(input) {
    const result = [];

    const ia = input.split("");

    for(let idx = 0; idx < ia.length; idx++) {
        if (ia[idx].match(/^\d+$/) !== null) {
            result.push(idx)
        }
    }

    return result;
}