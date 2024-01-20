import { useState } from "react";

const GradeSelector = () => {

    let years = [];
    for (let i = 1; i <= 9; i++) {
        years.push(`${i.toString()}°`);
    }
    
    const types = ["E.F.", "E.M."];

    const [year, setYear] = useState(years[0]);
    const [type, setType] = useState(types[0])

    const onChangeYear = (event) => {
        setYear(event.target.value)
    }

    const onChangeType = (event) => {
        setType(event.target.value);
    }

    return (
        <div className="flex">
            <select value={year} onChange={onChangeYear}>
                {
                    years.map(item => <option value={item}>{item}</option>)
                }
            </select>
            <span>Ano</span>
            <select value={type} onChange={onChangeType}>
                {
                    types.map(item => <option value={item}>{item}</option>)
                }
            </select>

            <p>{year} Ano {type}</p>
        </div>
    )
}

export default GradeSelector;