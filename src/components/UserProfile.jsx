import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { useFormik } from 'formik'
import profilePic from '../assets/img/undraw_profile.svg'
import { useAuth } from '../hooks/AuthProvider'
import { API_URL } from '../configs/api'

const UserProfile = () => {
  const navigate = useNavigate()
  const [Profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const auth = useAuth()
  const { id } = useParams()

  return (
    <>
      <div className="container-fluid">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
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
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Profil Saya</h1>
              </div>
              {
                Profile === null && (
                  <div className="row">
                    <div className="col">
                      <h4 className="h4 text-gray-800">Tidak ada profil</h4>
                      <button className="btn btn-primary" onClick={() => navigate('/new-profile')}>Buat Profil</button>
                    </div>
                  </div>
                )
              }
              {
                Profile !== null && (
                  <div className="row">
                    <div className="col">
                      <form>
                        <form>
                          <div className="row">
                            <div className="col">
                              <label htmlFor="position">Posisi yang dilamar</label>
                            </div>
                            <div className="col">
                              <input type="text" id="position" className="form-control" />
                            </div>
                          </div>
                        </form>
                      </form>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Employee {moment().format('YYYY')}</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default UserProfile