import {useCallback} from 'react'

export const Input = ({className, onChange}) => {
    console.log(className);
    const handleChange = useCallback((event) => {
            onChange(event.target.value);
        }, [className, onChange])

    return <input type='text' className={className} onChange={handleChange}/>
}