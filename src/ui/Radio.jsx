

function Radio({value, label}) {
  return (
    <div>
      <input className="cursor-pointer w-4 accent-primary" type="radio" name={value} id={value} />
      <label htmlFor={value}>{label}</label>
    </div>
  )
}

export default Radio
