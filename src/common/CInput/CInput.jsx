import "./CInput.css"

export const CInput = ({ className, placeholder, type, name, value, disabled, changeEmit, onBlurFunction }) => {
    return (
        <input
            className={className}
            placeholder={placeholder}
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onChange={changeEmit}
            onBlur={onBlurFunction}
        />
    )
}