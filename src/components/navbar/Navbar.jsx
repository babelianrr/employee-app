import React from 'react'
import profilePic from '../../assets/img/undraw_profile.svg'

const Navbar = (auth) => {
  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
          <i className="fa fa-bars"></i>
        </button>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#!" id="userDropdown" role="button"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{auth.user?.email}</span>
              <img className="img-profile rounded-circle"
                src={profilePic} alt="" />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown">
              <span className="dropdown-item" onClick={() => auth.logOut()} style={{ cursor: 'pointer' }}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </span>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Navbar