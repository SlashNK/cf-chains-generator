import React, {useState} from "react";

interface ITermProps {
    terminals: Array<string>

    addNewT(value: string): void

    removeT(val: string): void
}

export const TermInputComponent: React.FC<ITermProps> = (props: ITermProps) => {
    const [term, setTerm] = useState('')
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value);
    }
    const addNewTerm = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && term.trim()) {
            if (!props.terminals.includes(term.toLowerCase()))
                props.addNewT(term.toLowerCase())
            setTerm('')
        }
    }
    return (<div style={{display: "flex"}}>
        <h1>Терминалы:</h1>
        {props.terminals.map((value) => (<p title={"Press to remove"} key={value} onClick={() => {
            props.removeT(value)
        }}>{value}</p>))}
        <input type={"text"} maxLength={1} value={term} onChange={handleChange} onKeyPress={addNewTerm}/>
    </div>)

}