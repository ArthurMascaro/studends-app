import { Controller } from "react-hook-form"

export default function TextArea ({ name, control, label, ...args }) {
    return (
        <Controller
            rules={{ required: false }}
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <div className="w-full p-2">
                        <h3 className="font-bold text-lg">{label}</h3>
                        <textarea {...args} {...field} className="w-full p-2 font-bold border-2 border-darkBlue rounded-md"/>
                    </div>
                )
            }}
        />
    )
}