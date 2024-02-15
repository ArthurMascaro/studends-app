import { Controller } from "react-hook-form";

export default function Checkbox ({ name, checked, control,  label, error, ...args }) {

    return (
        <Controller
            name={name}
            defaultValue={checked}
            rules={{required: true}}
            control={control}
            render={({ field: { value, onChange } }) => {
                return (
                    <div className="w-full p-2">
                        <h3 className="font-bold text-lg">{label}</h3>
                        <input type="checkbox" {...args} onChange={onChange} checked={value} className="w-full p-2 font-bold border-2 border-darkBlue rounded-md"/>
                        <div>
                            {error && <span className="font-bold text-primaryBlue">preencha corretamente o campo</span>}
                        </div>
                    </div>
                )
            }}
        />
    )
}