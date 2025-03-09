

function Checkbox({value, name, id, onClick}) {
  return (
    <div key={id} className="flex items-center mb-15 gap-x-10">
        <input onClick={onClick} id={name} type="checkbox" 
        value={name} defaultChecked={(id===value) ? "checked" : ""} 
        className="w-22 h-22 text-primary bg-text-light border-text-light rounded-xl" />
        <label htmlFor={id} className="ms-2 text-lg font-medium text-dark-gr">{name}</label>
    </div>
  )
}

export default Checkbox
