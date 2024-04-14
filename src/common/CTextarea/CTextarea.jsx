import "./CTextarea.css"

export const CTextarea = ({ className, placeholder, type, name, value, disabled, changeEmit, onBlurFunction }) => {
    return (
        <textarea
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