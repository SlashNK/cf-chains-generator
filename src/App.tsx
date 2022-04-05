import React, {useState} from 'react';
import './App.css';
import {generateWords, Grammar} from "./Logic/Grammar";
import {NonTermInputComponent} from "./Components/GrammarGenerator/NonTermInputComponent";
import {TermInputComponent} from "./Components/GrammarGenerator/TermInputComponent";
import {RulesInputComponent} from "./Components/GrammarGenerator/RulesInputComponent";

function App() {
    const [terminals, setTerminals] = useState(new Array<string>())
    const [nonTerminals, setNonTerminals] = useState(new Array<string>())
    const [outputChains, setOutputChains] = useState(new Array<string>())
    const [chainLength, setChainLength] = useState(0)
    const [prodRules, setProdRules] = useState(new Array<{ input: string, output: string }>())
    return (
        <div className={"content"}>
            <div className={"tests"}>
                <button onClick={() => {
                    setTerminals(['a', 'b', 'c'])
                    setNonTerminals(['S', 'Q'])
                    setProdRules([{input: 'S', output: 'aQb'}, {input: 'S', output: 'accb'}, {
                        input: 'Q',
                        output: 'cSc'
                    }])
                }}>Тест1
                </button>

                <button onClick={() => {
                    setTerminals(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-'])
                    setNonTerminals(['S', 'F', 'T'])
                    setProdRules([
                        {input: 'S', output: 'T'},
                        {input: 'S', output: '+T'},
                        {input: 'S', output: '-T'},
                        {input: 'T', output: 'F'},
                        {input: 'T', output: 'TF'},
                        {input: 'F', output: '0'},
                        {input: 'F', output: '1'},
                        {input: 'F', output: '2'},
                        {input: 'F', output: '3'},
                        {input: 'F', output: '4'},
                        {input: 'F', output: '5'},
                        {input: 'F', output: '6'},
                        {input: 'F', output: '7'},
                        {input: 'F', output: '8'},
                        {input: 'F', output: '9'},
                    ])
                }}>Тест2
                </button>
                <button onClick={() => {
                    setTerminals(['a', 'b'])
                    setNonTerminals(['S'])
                    setProdRules([{input: 'S', output: 'aSa'}, {input: 'S', output: 'bSb'}, {input: 'S', output: 'aa'},
                        {input: 'S', output: 'bb'}])
                }}>Тест3
                </button>
                <button onClick={() => {
                    setTerminals(['a', 'b', 'c'])
                    setNonTerminals(['S', 'A', 'B', 'D', 'E'])
                    setProdRules([
                        {input: 'S', output: 'AB'},
                        {input: 'S', output: 'ε'},
                        {input: 'A', output: 'Aa'},
                        {input: 'A', output: 'S'},
                        {input: 'A', output: 'a'},
                        {input: 'B', output: 'bD'},
                        {input: 'B', output: 'bS'},
                        {input: 'B', output: 'b'},
                        {input: 'D', output: 'ccE'},
                        {input: 'D', output: 'c'},
                        {input: 'E', output: 'eE'},
                    ])
                }}>Тест4
                </button>
                <button onClick={() => {
                    setTerminals(['a', 'b'])
                    setNonTerminals(['S', 'A', 'B'])
                    setProdRules([
                        {input: 'S', output: 'aSB'},
                        {input: 'S', output: 'bSA'},
                        {input: 'S', output: 'aSBS'},
                        {input: 'S', output: 'bSAS'},
                        {input: 'S', output: 'ε'},
                        {input: 'A', output: 'a'},
                        {input: 'B', output: 'b'},
                    ])
                }}>Тест5
                </button>
                <button onClick={() => {
                    setTerminals(['a', 'b'])
                    setNonTerminals(['S'])
                    setProdRules([{input: 'S', output: 'aSb'}, {input: 'S', output: 'bSa'}, {
                        input: 'S',
                        output: 'SS'
                    }, {
                        input: 'S',
                        output: 'ε'
                    }])
                }}>Тест6
                </button>
                <button onClick={() => {
                    setTerminals(['a', 'b'])
                    setNonTerminals(['S', 'A', 'B'])
                    setProdRules([
                        {input: 'S', output: 'AB'},
                        {input: 'A', output: 'aAb'},
                        {input: 'A', output: 'ε'},
                        {input: 'B', output: 'bBa'},
                        {input: 'B', output: 'ε'},
                    ])
                }}>Тест7
                </button>
                {/*S→ A | B*/}
                {/*A→ a | Ba*/}
                {/*B→b | Bb | Ab*/}

                <button onClick={() => {
                    setTerminals(['a', 'b', ''])
                    setNonTerminals(['S', 'A', 'B'])
                    setProdRules([
                        {input: 'S', output: 'A'},
                        {input: 'S', output: 'B'},
                        {input: 'A', output: 'a'},
                        {input: 'A', output: 'Ba'},
                        {input: 'B', output: 'b'},
                        {input: 'B', output: 'Bb'},
                        {input: 'B', output: 'Ab'},
                    ])
                }}>Тест8
                </button>
            </div>
            <div className={"input"}>
                <NonTermInputComponent
                    addNewNT={(val: string) => {
                        setNonTerminals(nonTerminals.concat(val));
                    }}
                    removeNT={(val: string) => {
                        setNonTerminals(nonTerminals.filter((value) => value !== val))
                        setProdRules(prodRules.filter((value) => {
                            for (let i = 0; i < value.input.length; i++) {
                                if (val === value.input[i]) return false
                            }
                            return true
                        }).filter((value) => {
                            for (let i = 0; i < value.output.length; i++) {
                                if (val === value.output[i]) return false
                            }
                            return true
                        }))
                    }}
                    nonTerminals={nonTerminals}/>
                <TermInputComponent
                    addNewT={(val: string) => {
                        setTerminals(terminals.concat(val));
                    }}
                    removeT={(val: string) => {
                        setTerminals(terminals.filter((value) => value !== val))
                        setProdRules(prodRules.filter((value) => {
                            for (let i = 0; i < value.output.length; i++) {
                                if (val === value.output[i]) return false
                            }
                            return true
                        }))
                    }}
                    terminals={terminals}/>
                <RulesInputComponent
                    addNewR={(val: { input: string, output: string }) => {
                        for (let i = 0; i < val.input.length; i++) {
                            if (!nonTerminals.includes(val.input[i])) return
                        }
                        if (val.output !== 'ε') {
                            for (let i = 0; i < val.output.length; i++) {
                                if (!terminals.includes(val.output[i]) && !nonTerminals.includes(val.output[i])) return
                            }
                        }
                        setProdRules(prodRules.concat(val))
                    }}
                    removeR={(val: { input: string, output: string }) => {
                        setProdRules(prodRules.filter((value) => value !== val))
                    }}
                    rules={prodRules}/>
                <p>G=({"{" + terminals + "},"}{"{" + nonTerminals + "},P,"}{nonTerminals[0]})</p>
                <p>P:</p>
                {prodRules.map((value) => <p key={value.input + "→" + value.output}>{value.input}→{value.output}</p>)}
            </div>
            <div className={"generationOptions"}>
                <input type={"number"} placeholder={"Макс. длина"}
                       onChange={(event) => setChainLength(Number(event.target.value))}></input>
                <button onClick={() => {
                    setOutputChains(generateWords(new Grammar(terminals, nonTerminals, prodRules), chainLength))
                }}>Сгенерировать
                </button>
            </div>
            <div className={"output"}>
                <p>{outputChains.sort().filter(function (item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                }).join(', ')}</p>
            </div>
        </div>)
}

export default App;
