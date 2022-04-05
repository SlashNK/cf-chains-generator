import React, {useState} from "react";

interface INonTermProps {
    nonTerminals: Array<string>
    addNewNT(value: string): void
    removeNT(val:string):void
}

export const NonTermInputComponent: React.FC<INonTermProps> = (props: INonTermProps) => {
    const [nonTerm, setNonTerm] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNonTerm(event.target.value);
    }
    const addNewNonTerm = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && nonTerm.trim()) {
            if (!props.nonTerminals.includes(nonTerm))
                props.addNewNT(nonTerm.toUpperCase())
            setNonTerm('')
        }
    }
    return <div style={{display: "flex"}}>
        <h1>Нетерминалы:</h1>
        {props.nonTerminals.map((value) => (<p title={"Press to remove"} key={value} onClick={()=>{props.removeNT(value)}}>{value}</p>))}
        <input type={"text"} maxLength={1} value={nonTerm} onChange={handleChange} onKeyPress={addNewNonTerm}/>
    </div>

}