import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/AuthProvider'
import { useFormik } from 'formik'
import * as yup from 'yup'

const Login = () => {
  const navigate = useNavigate()
  const validation = yup.object().shape({
    email: yup.string().email('Format email tidak sesuai').required('Masukkan email'),
    password: yup.string().required('Masukkan kata sandi')
  })

  const auth = useAuth()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validation,
    onSubmit: values => {
      if (values.email !== '' && values.password !== '') {
        auth.loginAction(values)
      }
    }
  })

  return (
    <>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-6 col-lg-8 col-md-10'>
            <div className='card o-hidden border-0 shadow-lg my-5'>
              <div className='card-body p-0'>
                <div className='p-5'>
                  <div className='text-center'>
                    <h1 className='h4 text-gray-900 mb-4'>Selamat Datang!</h1>
                  </div>
                  <form className='user' onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                      <input
                        type='email'
                        className='form-control form-control-user'
                        id='email'
                        aria-describedby='emailHelp'
                        placeholder='Masukkan email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      {formik.errors.email && formik.touched.email && <span className='small text-danger'>{formik.errors.email}</span>}
                    </div>
                    <div className='form-group'>
                      <input
                        type='password'
                        className='form-control form-control-user'
                        id='password'
                        placeholder='Masukkan kata sandi'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      {formik.errors.password && formik.touched.password && <span className='small text-danger'>{formik.errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-primary btn-user btn-block' disabled={formik.isSubmitting}>
                      Masuk
                    </button>
                  </form>
                  <hr />
                  <div className='text-center'>
                    <span className='small' style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>Daftar akun baru</span>
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

export default Login