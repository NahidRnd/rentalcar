import heart from '/img/heart.svg';
import notification from '/img/notification.svg';
import setting from '/img/setting.svg';
import user from '/img/user.jpg';


function HeaderMenu() {
  return (
    <ul className="flex gap-x-12 items-center">
        <li className='border-li'><img src={heart} /></li>
        <li className='border-li'><img src={notification} /></li>
        <li className='border-li'><img src={setting} /></li>
        <li><img src={user} className='w-45 h-45' /></li>
    </ul>
  )
}

export default HeaderMenu
