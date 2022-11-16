import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const Management = () => {
    const {state: {id, action}} = useLocation()
    const [user, setUser] = useState({name: '', url_image: '', email: '', phone: ''})
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3001/users/${id}`)
                .then(res => {
                    setUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    const handleChange = e => {
        if (e.target.name === 'image') {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                const url = reader.result
                setUser({
                    ...user, 
                    url_image: url
                })
            })
            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({
                ...user, [e.target.name] : e.target.value
            })
        }
        
    }

    const validateChema = Yup.object().shape({
        name: Yup.string().required("Enter your name"),
        url_image: Yup.string().required("Choose your image"),
        email: Yup.string().required("Enter your email").email("Invalid email!"),
        phone: Yup.string().required("Enter your phone").matches(/^[\d-]{9,12}$/, "Phone contains from 9 to 12 digits!")
    })

    const handleSubmit = (values) => {
        if (action === 'add') {
            axios.post('http://localhost:3001/users', values)
                .then(res => {
                    alert('Adding successful!')
                    console.log(res)
                    navigate('/')
                })
                .catch(err => {
                    alert('Something error!')
                    console.log(err)
                })
        } else {
            axios.put(`http://localhost:3001/users/${id}`, values) 
                .then(res => {
                    alert('Updating successful!')
                    console.log(res)
                    navigate('/')
                })
                .catch(err => {
                    alert('Something error!')
                    console.log(err)
                })
        }
    }

    return (
        <div className="wrapper w-[70%] m-auto text-center">
            <h1 className='my-10'>{action === 'edit' ? 'Edit' : 'Add Contact'}</h1>
            <Formik
                initialValues={user}
                enableReinitialize
                validationSchema={validateChema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className='my-[30px] flex items-center flex-col'>
                        <div className='flex items-center'>
                            <Field type='file' name='image' id='image' className='hidden' onChange={handleChange}/>
                            <img src={user.url_image} alt="" className='h-[100px] w-[100px] mr-[20px] object-cover'/>
                            <label htmlFor='image' className='bg-indigo-600 text-white p-3 rounded-[5px] h-[50%]'>Change image</label>
                        </div>
                        <ErrorMessage component='div' name='url_image' className='error mt-[10px]'/>
                    </div>
                    
                    <p className='mb-[10px]'>Name</p>
                    <Field className='w-[300px] p-[5px]' placeholder='Enter your name' name='name' value={user.name || ''} onChange={handleChange}/>
                    <ErrorMessage component='div' name='name' className='error mt-[10px]'/>
                    <div className="mt-[10px]"></div>

                    <p className='mb-[10px]'>Email</p>
                    <Field className='w-[300px] p-[5px]' placeholder='Enter your email' name='email' value={user.email || ''} onChange={handleChange}/>
                    <ErrorMessage component='div' name='email' className='error mt-[10px]'/>
                    <div className="mt-[10px]"></div>

                    <p className='mb-[10px]'>Phone</p>
                    <Field className='w-[300px] p-[5px]' placeholder='Enter your phone' name='phone' value={user.phone || ''} onChange={handleChange}/>
                    <ErrorMessage component='div' name='phone' className='error mt-[10px]'/>
                    <div className="mt-[20px]"></div>

                    <button type='submit' className='bg-green-500'>{action === 'edit' ? 'Save' : 'Add'}</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Management