import React from "react";
import {platform} from "os";
import {Simulate} from "react-dom/test-utils";

export class Grammar {
    terminals: Array<string>
    non_terminals: Array<string>
    start:string
    prodRules: Array<{ input: string, output: string }>

    constructor(terminals: Array<string>, non_terminals: Array<string>, prodRules: Array<{ input: string, output: string }>,start = non_terminals[0]) {
        this.terminals = terminals
        this.non_terminals = non_terminals
        this.prodRules = prodRules
        this.start = start
    }
}
//generateWords(new Grammar(['a', 'b', 'c'], ['S', 'Q'], [{input:'S', output:'aQb'}, {input:'S', output:'accb'}, {input:'Q', output:'cSc'}], 'S'), 15  ).toString()}
export function generateWords(grammar: Grammar, maxSize=-1): Array<string> {
    let res = Array<string>()
    function generate(word:string):void{
        if(maxSize!=-1 && word.length>maxSize) return
        console.log(word)
        let isNonTerminalFound = false;
        for (let i=0;i<word.length;i++){
            grammar.prodRules.map(
                (value) =>{
                    if(value.input===word[i]){
                        generate(word.replace(word[i],value.output))
                        isNonTerminalFound = true;
                    }
                }
            )
        }
        if(!isNonTerminalFound) {
            if(word.length>1) word = word.replace(new RegExp('ε', 'g'), '');
            res.push(word)
        }
    }
    generate(grammar.start)
    return res
}

