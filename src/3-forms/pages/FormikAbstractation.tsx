import '../styles/styles.css';
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import { MyTextInput, MySelect, MyCheckBox } from '../components';


export const FormikAbstractation = () => {
    return (
        <div>
            <h1>Formik Abstractation</h1>

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    terms: false,
                    jobType: ''
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validationSchema={
                    Yup.object({
                        firstName: Yup.string()
                                      .max(15, 'Debe tener 15 caracteres o menos')
                                      .required('Requerido'),
                        lastName: Yup.string()
                                     .max(15, 'Debe tener 15 caracteres o menos')
                                     .required('Requerido'),
                        email: Yup.string()
                                  .email('Email inválido')
                                  .required('Requerido'),
                        terms: Yup.boolean()
                                  .oneOf([true], 'Debe aceptar las condiciones'),
                        jobType: Yup.string()
                                    .notOneOf(['it-junior'], 'Esta opción no está permitida')
                                    .required('Requerido')
                    })
                }
            >

                {
                    (formik) => (
                        <Form>
                            <MyTextInput 
                                label='First Name' 
                                name='firstName'
                                placeholder='Gracia'
                            />

                            <MyTextInput 
                                label='Last Name' 
                                name='lastName'
                                placeholder='Martin'
                            />

                            <MyTextInput 
                                label='Email Address'
                                name='email'
                                placeholder='gracia@google.com'
                                type='email'
                            />

                            <MySelect label='Job Type' name='jobType'>
                                <option value="">Pick something</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="it-senior">IT Senior</option>
                                <option value="it-junior">IT Junior</option>
                            </MySelect>

                            <MyCheckBox label='Terms & Conditions' name='terms'/>
                            
                            <button type='submit'>Submit</button>
                        </Form>
                    )
                }   
            </Formik>
        </div>
    )
}