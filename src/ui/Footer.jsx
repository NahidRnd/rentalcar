import Logo from '/img/Logo.svg';

function Footer() {
  return (
    <div className="container">
      <div className="flex pt-60 pb-60 border-b border-[#13131329]">
        <div className="grow-1">
            <img src={Logo} alt="logo" />
            <p className='text-text-sec max-w-300 mt-30'>Our vision is to provide convenience and help increase your sales business.</p>
        </div>
        <div className='pr-60'>
            <h4 className='font-semibold text-[20px] mb-20'>About</h4>
            <ul className='flex flex-col gap-y-20 text-text-sec'>
                <li>How it works</li>
                <li>Featured</li>
                <li>Partnership</li>
                <li>Bussiness Relation</li>
            </ul>
        </div>
        <div className='pr-60'>
            <h4 className='font-semibold text-[20px] mb-20'>Community</h4>
            <ul className='flex flex-col gap-y-20 text-text-sec'>
                <li>Events</li>
                <li>Blog</li>
                <li>Podcast</li>
                <li>Invite a friend</li>
            </ul>
        </div>
        <div className='pr-60'>
            <h4 className='font-semibold text-[20px] mb-20'>Socials</h4>
            <ul className='flex flex-col gap-y-20 text-text-sec'>     
                <li>Discord</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>Facebook</li>
            </ul>
        </div>
      </div>
      <div className="flex justify-between gap-x-30 font-semibold pt-40">
            <div className="grow">©2025 MORENT. All rights reserved</div>
            <div>Privacy & Policy</div>
            <div>Terms & Condition</div>
      </div>
    </div>
  )
}

export default Footer
