function interpretAndOutput(){
    const code = document.querySelector("#code-txt").value;

    const result = brainfuckInterpreter(code);
    console.log(result);
    document.querySelector("#result").innerHTML = result;
}

function brainfuckInterpreter(code) {
    const tape = Array(30000).fill(0);
    let ptr = 0;
    let codePtr = 0;
    let output = "";

    let bracketStack = [];
    let matchingBrackets = {};

    for (let i = 0; i < code.length; i++) {
        if (code[i] === "[") {
            bracketStack.push(i);
        } else if (code[i] === "]") {
            let start = bracketStack.pop();
            matchingBrackets[start] = i;
            matchingBrackets[i] = start;
        }
    }

    while (codePtr < code.length) {
        switch (code[codePtr]) {
            case ">":
                ptr++;
                break;
            case "<":
                ptr--;
                break;
            case "+":
                tape[ptr] = (tape[ptr] + 1) % 256;
                break;
            case "-":
                tape[ptr] = (tape[ptr] - 1 + 256) % 256;
                break;
            case ".":
                output += String.fromCharCode(tape[ptr]);
                break;
            case ",":
                // input not handled at the moment
                break;
            case "[":
                if (tape[ptr] === 0) {
                    codePtr = matchingBrackets[codePtr];
                }
                break;
            case "]":
                if (tape[ptr] !== 0) {
                    codePtr = matchingBrackets[codePtr];
                }
                break;
        }
        codePtr++;
    }

    return output;
}

interpretAndOutput();