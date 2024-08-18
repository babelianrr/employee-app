/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import Navbar from './navbar/Navbar'
import { useAuth } from '../hooks/AuthProvider'
import { API_URL } from '../configs/api'

const UserProfile = () => {
  const navigate = useNavigate()
  const [Profile, setProfile] = useState(false)
  const [editing, setEditing] = useState(false)
  const auth = useAuth()

  const configs = {
    headers: {
      "Content-type": "application/json",
      "Authorization": auth.token
    },
  }

  const formik = useFormik({
    initialValues: {
      id: "",
      user_id: "",
      position: "",
      name: "",
      ktp: "",
      birthplace: "",
      birthdate: "",
      gender: "",
      religion: "",
      bloodtype: "",
      marriage: "",
      ktpaddress: "",
      currentaddress: "",
      email: "",
      phone: "",
      pic: "",
      skill: "",
      placement: "",
      salary: "",
      education: [],
      course: [],
      experience: []
    },
    onSubmit: async (values) => {
      Swal.fire({
        icon: 'question',
        text: 'Apakah anda ingin memperbarui profil?',
        showConfirmButton: true,
        confirmButtonText: 'Ya',
        showDenyButton: true,
        denyButtonText: 'Tidak'
      }).then(async () => {
        try {
          const response = await axios.put(API_URL + "profile/" + values.id, values, configs)
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Sukses',
              text: 'Berhasil memperbarui profil'
            })
            setEditing(false)
            getProfile(configs)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Terjadi error internal'
            })
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error internal'
          })
        }
      })
    }
  })

  const getProfile = async (configs) => {
    try {
      const response = await axios.get(API_URL + "profile/" + auth.user.id, configs)
      const data = response.data.data
      formik.setFieldValue('id', data.id,)
      formik.setFieldValue('user_id', data.user_id,)
      formik.setFieldValue('position', data.position,)
      formik.setFieldValue('name', data.name,)
      formik.setFieldValue('ktp', data.ktp,)
      formik.setFieldValue('birthplace', data.birthplace,)
      formik.setFieldValue('birthdate', data.birthdate,)
      formik.setFieldValue('gender', data.gender,)
      formik.setFieldValue('religion', data.religion,)
      formik.setFieldValue('bloodtype', data.bloodtype,)
      formik.setFieldValue('marriage', data.marriage,)
      formik.setFieldValue('ktpaddress', data.ktpaddress,)
      formik.setFieldValue('currentaddress', data.currentaddress,)
      formik.setFieldValue('email', data.email,)
      formik.setFieldValue('phone', data.phone,)
      formik.setFieldValue('pic', data.pic,)
      formik.setFieldValue('skill', data.skill,)
      formik.setFieldValue('placement', data.placement,)
      formik.setFieldValue('salary', data.salary,)
      formik.setFieldValue('education', data.education,)
      formik.setFieldValue('course', data.course,)
      formik.setFieldValue('experience', data.experience)
      setProfile(true)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        text: 'Terjadi error internal'
      })
    }
  }

  const handleAddEducation = () => {
    formik.values.education.push({
      level: "",
      institution: "",
      major: "",
      graduate: 2024,
      gpa: 0
    })
    formik.setFieldValue('education', formik.values.education)
  }

  const handleRemoveEducation = (k) => {
    formik.values.education.splice(k, 1)
    formik.setFieldValue('education', formik.values.education)
  }

  const handleChangeEducation = (e, k) => {
    let education = formik.values.education
    if (e.target.name === `level${k}`) {
      education[k].level = e.target.value
    } else if (e.target.name === `institution${k}`) {
      education[k].institution = e.target.value
    } else if (e.target.name === `major${k}`) {
      education[k].major = e.target.value
    } else if (e.target.name === `graduate${k}`) {
      education[k].graduate = e.target.value
    } else if (e.target.name === `gpa${k}`) {
      education[k].gpa = e.target.value
    }
    formik.setFieldValue('education', education)
  }

  const handleAddCourse = () => {
    formik.values.course.push({
      course_name: "",
      certificate: 0,
      year: 2024
    })
    formik.setFieldValue('course', formik.values.course)
  }

  const handleRemoveCourse = (k) => {
    formik.values.course.splice(k, 1)
    formik.setFieldValue('course', formik.values.course)
  }

  const handleChangeCourse = (e, k) => {
    let course = formik.values.course
    if (e.target.name === `course_name${k}`) {
      course[k].course_name = e.target.value
    } else if (e.target.name === `certificate${k}`) {
      course[k].certificate = e.target.value
    } else if (e.target.name === `year${k}`) {
      course[k].year = e.target.value
    }
    formik.setFieldValue('course', course)
  }

  const handleAddExperience = () => {
    formik.values.experience.push({
      company: "",
      position: "",
      salary: 0,
      year: 1970
    })
    formik.setFieldValue('experience', formik.values.experience)
  }

  const handleRemoveExperience = (k) => {
    formik.values.experience.splice(k, 1)
    formik.setFieldValue('experience', formik.values.experience)
  }

  const handleChangeExperience = (e, k) => {
    let experience = formik.values.experience
    if (e.target.name === `company${k}`) {
      experience[k].company = e.target.value
    } else if (e.target.name === `position${k}`) {
      experience[k].position = e.target.value
    } else if (e.target.name === `salary${k}`) {
      experience[k].salary = e.target.value
    } else if (e.target.name === `year${k}`) {
      experience[k].year = e.target.value
    }
    formik.setFieldValue('experience', experience)
  }

  const handleCancel = () => {
    Swal.fire({
      icon: 'question',
      text: 'Apakah anda ingin membatalkan?',
      showCloseButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Ya',
      showDenyButton: true,
      denyButtonText: 'Tidak'
    }).then((result) => {
      if (result.isConfirmed) {
        setEditing(false)
        getProfile(configs)
      }
    })
  }

  useEffect(() => {
    getProfile(configs)
  }, [])

  // console.log(Profile)

  return (
    <>
      <div className="container-fluid">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Profil Saya</h1>
              </div>
              {
                Profile ? (
                  <div className="row">
                    <div className="col">
                      <form onSubmit={formik.handleSubmit}>
                        {
                          editing ? (
                            <>
                              <div className="row mb-4">
                                <div className="col-6">
                                  <button className="btn btn-success mr-2" type="submit">Simpan</button>
                                  <button className="btn btn-danger" onClick={handleCancel} type="button">Batal</button>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="row mb-4">
                              <div className="col-6">
                                <button className="btn btn-info" type="button" onClick={() => setEditing(true)}>Edit</button>
                              </div>
                            </div>
                          )
                        }
                        <div className="row">
                          <div className="col-xl-8 col-lg-10 col-md-12">
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="position">Posisi yang dilamar</label>
                              </div>
                              <div className="col-8">
                                <input type="text" name="position" id="position" className="form-control" value={formik.values.position} onChange={formik.handleChange} readOnly={!editing} />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="name">Nama</label>
                              </div>
                              <div className="col-8">
                                <input type="text" name="name" id="name" className="form-control" value={formik.values.name} onChange={formik.handleChange} readOnly={!editing} />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="ktp">Nomor KTP</label>
                              </div>
                              <div className="col-8">
                                <input type="text" name="ktp" id="ktp" className="form-control" value={formik.values.ktp} onChange={formik.handleChange} readOnly={!editing} />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="birthplace">Tempat, Tanggal Lahir</label>
                              </div>
                              <div className="col-4">
                                <input type="text" name="birthplace" id="birthplace" className="form-control" value={formik.values.birthplace} onChange={formik.handleChange} readOnly={!editing} />
                              </div>
                              <div className="col-4">
                                <input type="date" name="birthdate" id="birthdate" className="form-control" value={formik.values.birthdate} onChange={formik.handleChange} readOnly={!editing} />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="gender">Jenis Kelamin</label>
                              </div>
                              <div className="col-8">
                                <div className="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="gender_male" name="gender" value="M" className="custom-control-input" checked={formik.values.gender === 'M'} onChange={formik.handleChange} disabled={!editing} />
                                  <label className="custom-control-label" htmlFor="gender_male">Laki-laki</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="gender_female" name="gender" value="F" className="custom-control-input" checked={formik.values.gender === 'F'} onChange={formik.handleChange} disabled={!editing} />
                                  <label className="custom-control-label" htmlFor="gender_female">Perempuan</label>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="religion">Agama</label>
                              </div>
                              <div className="col-8">
                                <select name="religion" id="religion" className="custom-select" value={formik.values.religion} onChange={formik.handleChange} disabled={!editing}>
                                  <option hidden value="">Pilih agama</option>
                                  <option value="Islam">Islam</option>
                                  <option value="Kristen">Kristen</option>
                                  <option value="Katolik">Katolik</option>
                                  <option value="Hindu">Hindu</option>
                                  <option value="Buddha">Buddha</option>
                                  <option value="Konghucu">Konghucu</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="bloodtype">Golongan Darah</label>
                              </div>
                              <div className="col-8">
                                <select name="bloodtype" id="bloodtype" className="custom-select" value={formik.values.bloodtype} onChange={formik.handleChange} disabled={!editing}>
                                  <option hidden value="">Pilih golongan darah</option>
                                  <option value="A">A</option>
                                  <option value="B">B</option>
                                  <option value="AB">AB</option>
                                  <option value="O">O</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="marriage">Status Perkawinan</label>
                              </div>
                              <div className="col-8">
                                <select name="marriage" id="marriage" className="custom-select" value={formik.values.marriage} onChange={formik.handleChange} disabled={!editing}>
                                  <option hidden value="">Pilih status perkawinan</option>
                                  <option value="Belum menikah">Belum menikah</option>
                                  <option value="Menikah">Menikah</option>
                                  <option value="Cerai">Cerai</option>
                                </select>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="ktpaddress">Alamat Sesuai KTP</label>
                              </div>
                              <div className="col-8">
                                <textarea className="form-control" id="ktpaddress" name="ktpaddress" rows="4" value={formik.values.ktpaddress} onChange={formik.handleChange} readOnly={!editing}></textarea>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="currentaddress">Alamat Domisili</label>
                              </div>
                              <div className="col-8">
                                <textarea className="form-control" id="currentaddress" name="currentaddress" rows="4" value={formik.values.currentaddress} onChange={formik.handleChange} readOnly={!editing}></textarea>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="email">Email</label>
                              </div>
                              <div className="col-8">
                                <input type="text" name="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange} readOnly={!editing} />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="phone">Nomor Telepon/HP</label>
                              </div>
                              <div className="col-8">
                                <input type="text" inputMode="numeric" name="phone" id="phone" className="form-control" value={formik.values.phone} onChange={formik.handleChange} readOnly={!editing} />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="pic">Kontak Darurat</label>
                              </div>
                              <div className="col-8">
                                <input type="text" name="pic" id="pic" className="form-control" value={formik.values.pic} onChange={formik.handleChange} readOnly={!editing} />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col">
                                <label htmlFor="education">Riwayat Pendidikan</label>
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Jenjang Pendidikan</th>
                                      <th scope="col">Nama Institusi</th>
                                      <th scope="col">Jurusan</th>
                                      <th scope="col">Tahun Lulus</th>
                                      <th scope="col">IPK</th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      formik.values.education.length > 0 ? (
                                        formik.values.education.map((v, k) => {
                                          return (
                                            <tr key={k}>
                                              <td>
                                                <select name={"level" + k} id={"level" + k} className="custom-select" value={v.level} onChange={(e) => handleChangeEducation(e, k)} disabled={!editing}>
                                                  <option hidden value="">Pilih jenjang pendidikan</option>
                                                  <option value="SMA/sederajat">SMA/sederajat</option>
                                                  <option value="Diploma 2">Diploma 2</option>
                                                  <option value="Diploma 3">Diploma 3</option>
                                                  <option value="Strata 1">Strata 1</option>
                                                  <option value="Strata 2">Strata 2</option>
                                                  <option value="Strata 3">Strata 3</option>
                                                </select>
                                              </td>
                                              <td><input type="text" name={"institution" + k} id={"institution" + k} className="form-control" onChange={(e) => handleChangeEducation(e, k)} value={v.institution} readOnly={!editing} /></td>
                                              <td><input type="text" name={"major" + k} id={"major" + k} className="form-control" onChange={(e) => handleChangeEducation(e, k)} value={v.major} readOnly={!editing} /></td>
                                              <td><input type="number" name={"graduate" + k} id={"graduate" + k} className="form-control" min={1970} onChange={(e) => handleChangeEducation(e, k)} value={v.graduate} readOnly={!editing} /></td>
                                              <td><input type="number" name={"gpa" + k} id={"gpa" + k} className="form-control" min={0} max={4} step={0.1} onChange={(e) => handleChangeEducation(e, k)} value={v.gpa} readOnly={!editing} /></td>
                                              <td>{editing && <button className="btn btn-outline-secondary btn-sm" onClick={() => handleRemoveEducation(k)} type="button"><i className="fas fa-minus text-danger"></i></button>}</td>
                                            </tr>
                                          )
                                        })) : (
                                        <></>
                                      )
                                    }
                                    {
                                      editing && (
                                        <tr>
                                          <td colSpan={6}>
                                            <button className="btn btn-info btn-sm" onClick={handleAddEducation} type="button">Tambah Riwayat Pendidikan</button>
                                          </td>
                                        </tr>
                                      )
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col">
                                <label htmlFor="education">Riwayat Pelatihan</label>
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Nama Kursus/Seminar</th>
                                      <th scope="col">Sertifikat</th>
                                      <th scope="col">Tahun</th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      formik.values.course.length > 0 ? (
                                        formik.values.course.map((v, k) => {
                                          return (
                                            <tr key={k}>
                                              <td><input type="text" name={"course_name" + k} id={"course_name" + k} className="form-control" onChange={(e) => handleChangeCourse(e, k)} value={v.course_name} readOnly={!editing} /></td>
                                              <td>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                  <input type="radio" id={"certificate" + k + "yes"} name={"certificate" + k} value={1} className="custom-control-input" onChange={(e) => handleChangeCourse(e, k)} checked={v.certificate} disabled={!editing} />
                                                  <label className="custom-control-label" htmlFor={"certificate" + k + "yes"}>Ada</label>
                                                </div>
                                                <div className="custom-control custom-radio custom-control-inline">
                                                  <input type="radio" id={"certificate" + k + "no"} name={"certificate" + k} value={0} className="custom-control-input" onChange={(e) => handleChangeCourse(e, k)} checked={!v.certificate} disabled={!editing} />
                                                  <label className="custom-control-label" htmlFor={"certificate" + k + "no"}>Tidak Ada</label>
                                                </div>
                                              </td>
                                              <td><input type="number" name={"year" + k} id={"year" + k} className="form-control" min={1970} onChange={(e) => handleChangeCourse(e, k)} value={v.year} readOnly={!editing} /></td>
                                              <td>{editing && <button className="btn btn-outline-secondary btn-sm" onClick={() => handleRemoveCourse(k)} type="button"><i className="fas fa-minus text-danger"></i></button>}</td>
                                            </tr>
                                          )
                                        })) : (
                                        <></>
                                      )
                                    }
                                    {
                                      editing && (
                                        <tr>
                                          <td colSpan={4}>
                                            <button className="btn btn-info btn-sm" onClick={handleAddCourse} type="button">Tambah Riwayat Pelatihan</button>
                                          </td>
                                        </tr>
                                      )
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col">
                                <label htmlFor="education">Riwayat Pekerjaan</label>
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Nama Perusahaan</th>
                                      <th scope="col">Posisi Terakhir</th>
                                      <th scope="col">Pendapatan Terakhir</th>
                                      <th scope="col">Tahun</th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      formik.values.experience.length > 0 ? (
                                        formik.values.experience.map((v, k) => {
                                          return (
                                            <tr key={k}>
                                              <td><input type="text" name={"company" + k} id={"company" + k} className="form-control" onChange={(e) => handleChangeExperience(e, k)} value={v.company} readOnly={!editing} /></td>
                                              <td><input type="text" name={"position" + k} id={"position" + k} className="form-control" onChange={(e) => handleChangeExperience(e, k)} value={v.position} readOnly={!editing} /></td>
                                              <td><input type="number" name={"salary" + k} id={"salary" + k} className="form-control" min={0} onChange={(e) => handleChangeExperience(e, k)} value={v.salary} readOnly={!editing} /></td>
                                              <td><input type="number" name={"year" + k} id={"year" + k} className="form-control" min={1970} onChange={(e) => handleChangeExperience(e, k)} value={v.year} readOnly={!editing} /></td>
                                              <td>{editing && <button className="btn btn-outline-secondary btn-sm" onClick={() => handleRemoveExperience(k)} type="button"><i className="fas fa-minus text-danger"></i></button>}</td>
                                            </tr>
                                          )
                                        })) : (
                                        <></>
                                      )
                                    }
                                    {
                                      editing && (
                                        <tr>
                                          <td colSpan={4}>
                                            <button className="btn btn-info btn-sm" onClick={handleAddExperience} type="button">Tambah Riwayat Pekerjaan</button>
                                          </td>
                                        </tr>
                                      )
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="skill">Skill</label>
                              </div>
                              <div className="col-8">
                                <textarea className="form-control" id="skill" name="skill" rows="4" value={formik.values.skill} onChange={formik.handleChange} readOnly={!editing}></textarea>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="placement">Bersedia ditempatkan di luar domisili</label>
                              </div>
                              <div className="col-8">
                                <div className="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="placement_yes" name="placement" value={1} className="custom-control-input" onChange={formik.handleChange} checked={formik.values.placement} disabled={!editing} />
                                  <label className="custom-control-label" htmlFor="placement_yes">Ya</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                  <input type="radio" id="placement_no" name="placement" value={0} className="custom-control-input" onChange={formik.handleChange} checked={!formik.values.placement} disabled={!editing} />
                                  <label className="custom-control-label" htmlFor="placement_no">Tidak</label>
                                </div>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <div className="col-4">
                                <label htmlFor="salary">Pendapatan yang diharapkan</label>
                              </div>
                              <div className="col-8 input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">Rp.</span>
                                </div>
                                <input type="text" inputMode="numeric" name="salary" id="salary" className="form-control" value={formik.values.salary} onChange={formik.handleChange} readOnly={!editing} />
                                <div className="input-group-append">
                                  <span className="input-group-text">/ Bulan</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col">
                      <h4 className="h4 text-gray-800">Tidak ada profil</h4>
                      <button className="btn btn-primary" onClick={() => navigate('/new-profile')}>Buat Profil</button>
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