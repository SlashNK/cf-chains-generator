import React, {useState} from "react";

interface IRulesProps {
    rules: Array<{ input: string, output: string }>

    addNewR(val: { input: string, output: string }): void

    removeR(val: { input: string, output: string }): void
}

export const RulesInputComponent: React.FC<IRulesProps> = (props: IRulesProps) => {
    const [ruleI, setRuleI] = useState('')
    const [ruleO, setRuleO] = useState('')
    const handleChangeI = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRuleI(event.target.value);
    }
    const handleChangeO = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRuleO(event.target.value);
    }
    const addNewRule = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && ruleI.trim()) {
            const termBuf = !ruleO.trim() ? 'ε' : ruleO
            if (!props.rules.filter((value) => value.input === ruleI && value.output === termBuf).length)
                props.addNewR({input: ruleI, output: termBuf})
        }
    }
    return (<div style={{display: "flex", flexWrap: "wrap"}}>
        <h1>Правила P:</h1>
        {props.rules.map((value) => (<p title={"Press to remove"} key={value.input + value.output} onClick={() => {
            props.removeR(value)
        }}>{value.input + "→" + value.output}</p>))}
        <input type={"text"} value={ruleI} onChange={handleChangeI} onKeyPress={addNewRule}/>
        <input type={"text"} value={ruleO} onChange={handleChangeO} onKeyPress={addNewRule}/>
    </div>)

}