import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { API_URL } from '../configs/api'

const Register = () => {
  const navigate = useNavigate()
  const validation = yup.object().shape({
    email: yup.string().email('Format email tidak valid').required('Masukkan email'),
    password: yup.string().min(6, 'Kata sandi minimal 6 karakter').max(32, 'Kata sandi maksimal 32 karakter').required('Masukkan kata sandi')
  })

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      if (values.email !== '' && values.password !== '') {
        try {
          const response = await axios.post(API_URL + "/register", values, config)
          if (response.response.data.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Sukses',
              text: 'Berhasil mendaftarkan akun'
            })
            navigate('/login')
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Sudah ada akun'
            })
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi error internal'
          })
        }
      }
    },
    enableReinitialize: true
  })

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="p-5">
                  <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Daftar Akun</h1>
                  </div>
                  <form className="user" onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control form-control-user"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Masukkan email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <span className='small text-danger'>{formik.errors.email}</span>
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        id="password"
                        placeholder="Masukkan kata sandi"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <span className='small text-danger'>{formik.errors.password}</span>
                    </div>
                    <button type='submit' className="btn btn-primary btn-user btn-block">
                      Register
                    </button>
                  </form>
                  <hr />
                  <div className="text-center">
                    <span className="small" style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>Sudah punya akun? Masuk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register