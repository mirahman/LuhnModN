/*
*
*  This class is used to generate random checksum string of a given length using Luhn algorithm
*  Few characters are removed specially vowels and some digits like 0 and 1 to avoid confusion 
*/

class LuhnModN {

    constructor(len) {
        this.alphabet = 'BCDFGHJKMNPQRSTVWXYZ23456789';
        this.alphaLength = this.alphabet.length;
        this.factor = 2;
        this.codeLength = len;
        this.checksumCalcChars = this.codeLength-1;
    }


    getLinkString() {
        let code = "";
        // leave space for the checksum
        let length = this.codeLength - 1;
        //checking the string key is faster than checking string length

        while (code.length < length) {
            let rand = this.getRandomInt(0, this.alphaLength - 1);
            code += this.alphabet.charAt(rand);
        }

        code = this.attachCheckSum(code, this.generateCheckSum(code));
        return code;
    }

    validateCheckSum(code) {
        // if the code isn't the right length, it's not valid
        if (code.length != this.codeLength) {
            return false;
        }

        let checkSum = this.generateCheckSum(this.removeCheckSum(code));
        let checkCode = this.attachCheckSum(this.removeCheckSum(code), checkSum);
        if (checkCode === code) {
            return true;
        } else {
            return false;
        }
    }

    generateCheckSum(code) {
        let sum = 0;
        let codeLen = code.length;
        let curFactor = this.factor;
        for (let i = codeLen - 1; i >= (codeLen - this.checksumCalcChars); i--) {
            let num = i;
            let codePoint = this.alphabet.indexOf(code.charAt(num));
            let addend = parseInt(curFactor) * parseInt(codePoint);
            //alternate the factor that each point is multiplied by
            curFactor = (curFactor == this.factor) ? 1 : this.factor;
            addend = (addend / this.alphaLength) + (addend % this.alphaLength);
            sum += addend;
        }
        let remainder = parseInt(sum % this.alphaLength);
        let checkCodePoint = (this.alphaLength - remainder) % this.alphaLength;
        return this.alphabet.charAt(checkCodePoint);
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    attachCheckSum(code, checksum) {
        return code + "" + checksum;
    }

    removeCheckSum(code) {
        return code.substring(0, code.length - 1);
    }
}

// to check an existing code for validity 

var myCheck = new LuhnModN(9);

if (myCheck.validateCheckSum('FCSFSGBPX'))
    console.log('valid')
else
    console.log('invalid');

// to generate a new code

let myCode = myCheck.getLinkString();
