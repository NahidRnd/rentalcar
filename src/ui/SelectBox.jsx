

function SelectBox({name, label, options, value, onChange, style="text-text-light pt-10 text-sm"}) {
  return (
    <div className="flex flex-col">
      <label className="font-bold" htmlFor={name}>{label}</label>
      <select className={style} name={name} id={name} value={value} onChange={onChange} >
        <option value="0">Select {label}</option>
          {
            options && options.map((option, index)=>{
              return <option key={index} value={option.name}>{option.name}</option>
            })
          }
      </select>
    </div>
  )
}

export default SelectBox
