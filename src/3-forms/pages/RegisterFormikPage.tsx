import { Form, Formik } from 'formik';
import '../styles/styles.css';
import * as Yup from 'yup';
import { MyTextInput } from '../components';


export const RegisterFormikPage = () => {
    return (
        <div>
            <h1>Register Formik Page</h1>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password1: '',
                    password2: ''
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validationSchema={
                    Yup.object({
                        name: Yup.string()
                                 .min(2, 'El nombre debe tener 3 caracteres o más')
                                 .max(15, 'El nombre debe tener 15 caracteres o menos')
                                 .required('Requerido'),
                        email: Yup.string()
                                  .email('Revisa el formato del correo')
                                  .required('Requerido'),
                        password1: Yup.string()
                                      .min(6, 'Mínimo 6 letras')
                                      .required('Requerido'),
                        password2: Yup.string()
                                      .oneOf([Yup.ref('password1')], 'Las contraseñas no coinciden')
                                      .required('Requerido')
                    })
                }
            >
                {
                    ({handleReset}) => (
                        <Form>
                            <MyTextInput 
                                label='Nombre'
                                name='name'
                                placeholder='Gracia'
                            />

                            <MyTextInput 
                                label='Email'
                                name='email'
                                type='email'
                                placeholder='gracia@google.com'
                            />

                            <MyTextInput 
                                label='Password'
                                name='password1'
                                type='password'
                                placeholder='******'
                            />
                            
                            <MyTextInput 
                                label='Confirm Password'
                                name='password2'
                                type='password'
                                placeholder='******'
                            />

                            <button type="submit">Create</button>
                            <button type="button" onClick={handleReset}>Reset Form</button>
                        </Form>
                    )
                }
            </Formik>  
        </div>
    )
}