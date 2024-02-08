import { Controller } from "react-hook-form"

export default function Field ({ name, control, rules, label, error, ...args }) {
    return (
        <Controller
            rules={rules}
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <div className="w-full p-2">
                        <h3 className="font-bold text-lg">{label}</h3>
                        <input {...args} {...field} className="w-full p-2 font-bold border-2 border-darkBlue rounded-md"/>
                        <div>
                            {error && <span className="font-bold text-primaryBlue">preencha corretamente o campo</span>}
                        </div>
                    </div>
                )
            }}
        />
    )
}