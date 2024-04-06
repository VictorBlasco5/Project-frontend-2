import "./CInput.css"

export const CInput = ({ placeholder, type, name, value, disabled, changeEmit, onBlurFunction}) => {
    return (
        <input 
        className="cInputDesign"
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e)=>changeEmit(e)}
        onBlur={onBlurFunction}
        />
    )
}