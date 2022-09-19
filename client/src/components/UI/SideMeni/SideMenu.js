import classes from "./SideMenu.module.css";

const SideMenu = props => {

  return (
    <aside className={`${classes['sidebar-menu']} ${classes['sidebar-mini']}`}>
      <div>
        <div className={classes['logo']}>
          <div>DMS</div>
        </div>
      </div>
      <nav>
        <ul className={classes['side-icons']}>
          <div className={classes['main-icons']}>
            <li>
              <div onClick={props.openStartPage}>
                <i className='bx bxs-home'></i><span>Pocetna</span>
              </div>
            </li>
            <li>
              <div onClick={props.onOpenUsers}>
                <i className="fa-solid fa-users"></i><span>Korisnici</span>
              </div>
            </li>
            <li>
              <div>
                <i className='bx bx-news'></i><span>Novosti</span>
              </div>
            </li>
            <li>
              <div>
                <i className='bx bx-cog'></i><span>Postavke</span>
              </div>
            </li>
          </div>
          <li className={classes['logout-button']}>
            <div onClick={props.onLogout}>
              <i className='bx bx-log-out-circle'></i><span>Odjava</span>
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default SideMenu;