/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useAuth } from '../hooks/AuthProvider'
import { API_URL } from '../configs/api'
import Navbar from './navbar/Navbar'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [Profiles, setProfiles] = useState([])
  const [Params, setParams] = useState({
    filter: '',
    filter_value: ''
  })

  const handleChange = (e) => {
    setParams({
      ...Params,
      [e.target.name]: [e.target.value]
    })
  }

  const configs = {
    headers: {
      'Authorization': auth.token
    },
    params: Params
  }

  const getProfiles = async (configs) => {
    try {
      const response = await axios.get(API_URL + "admin/profiles", configs)
      setProfiles(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const resetParams = () => {
    setParams({ filter: '', filter_value: '' })
    getProfiles(configs)
  }

  useEffect(() => {
    getProfiles(configs)
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Home</h1>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <select name="filter" className="custom-select" onChange={(e) => handleChange(e)} value={Params.filter}>
                    <option hidden>Pilih filter</option>
                    <option value="name">Nama</option>
                    <option value="position">Posisi</option>
                    <option value="education">Pendidikan Terakhir</option>
                  </select>
                </div>
                <div className="col">
                  <input type="text" className="form-control" name="filter_value" value={Params.filter_value} onChange={(e) => handleChange(e)} />
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary mr-2" onClick={() => getProfiles(configs)}><i className="fa fa-search"></i></button>
                  <button type="button" className="btn btn-secondary" onClick={() => resetParams()}><i className="fa fa-times" aria-hidden="true"></i></button>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Tempat, Tanggal Lahir</th>
                          <th scope="col">Posisi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          Profiles.map((v, k) => {
                            return (
                              <tr key={k}>
                                <th scope="row">{k + 1}</th>
                                <td><p className="text-info" style={{cursor: 'pointer'}} onClick={() => navigate('/profile/'+v.id)}>{v.name}</p></td>
                                <td>{v.birthplace}, {moment(v.birthdate).format('DD/MM/YYYY')}</td>
                                <td>{v.position}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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

export default Home