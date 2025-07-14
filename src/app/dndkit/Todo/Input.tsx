import { useState } from "react"

export default function Input({onSubmit}: {onSubmit: (input: string) => void}) {
    const [input, setInput] = useState('')

    const handleSubmit = () => {
        if (!input) return
        onSubmit(input)
        setInput("")
    }

    return <div className={`flex gap-2.5`}>
        <input type="text" 
        className={`border-2 border-grey border-solid rounded-lg p-2.5`}
        value={input} 
        onChange={(e) => setInput(e.currentTarget.value)} />
        <button 
        className={`border-none rounded-lg px-4 py-0 bg-[#2563eb] text-white cursor-pointer`}
        onClick={handleSubmit}>
            Add
        </button>
    </div>
}