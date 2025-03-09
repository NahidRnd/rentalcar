

function PaymentBox({children, title, subtitle, step}) {
  return (
    <div className="bg-white p-20 rounded-[10px]">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="font-bold text-xl">{title}</h2>
            <span className="text-text-light text-sm">{subtitle}</span>
        </div>
        <p className="text-text-light text-sm">{step}</p>
      </div>
      <div className="pt-20">
        {children}
      </div>
    </div>
  )
}

export default PaymentBox
