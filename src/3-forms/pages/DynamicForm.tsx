import { MySelect, MyTextInput } from '../components';
import formJson from '../data/custom-form.json';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

// Creamos dos objetos vacíos para almacenar los valores iniciales del formulario y sus reglas de validación.
const initialValues: {[key: string]: any} = {};
const requiredFields: {[key: string]: any} = {};

/* 
    Recorremos cada entrada del JSON (formJson) para establecer los valores iniciales y las validaciones.
    Si una entrada tiene validaciones, se crean esquemas de validación usando Yup.
 */
for (const input of formJson){
    initialValues[input.name] = input.value;

    if(!input.validations) continue;

    let schema = Yup.string();

    for (const rule of input.validations) {
        if(rule.type === 'required'){
            schema = schema.required('Este campo es obligatorio');
        }

        if(rule.type === 'minLength'){
            schema = schema.min((rule as any).value || 1, `Mínimo de ${(rule as any).value || 1} caracteres`);
        }

        if(rule.type === 'email'){
            schema = schema.required('Revise el formato del email');
        }
    }

    requiredFields[input.name] = schema;
}

// Creamos un esquema de validación combinando todas las reglas definidas.
const validationSchema = Yup.object({...requiredFields});

/*
    Renderizamos un formulario dinámico utilizando Formik.
    Dependiendo del tipo de entrada, se renderizan diferentes componentes.
    Al enviar el formulario, los valores se imprimen en la consola.
*/
export const DynamicForm = () => {
    return (
        <div>
            <h1>Dynamic Form</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {
                    (formik) => (
                        <Form noValidate>
                            {formJson.map(({type, name, placeholder, label, options}) => {
                                if(type === 'input' || type === 'password' || type === 'email'){
                                    return <MyTextInput
                                            key={name}
                                            type={(type as any)} 
                                            name={name} 
                                            label={label} 
                                            placeholder={placeholder}
                                        />
                                } else if(type === 'select'){
                                    return(
                                        <MySelect 
                                            key={name}
                                            label={label}
                                            name={name}
                                        >
                                            <option value="">Select an option</option>
                                            {
                                                options?.map(({id, label}) => (
                                                    <option key={id} value={id}>{label}</option>
                                                ))
                                            }
                                        </MySelect>
                                    )
                                }
                                throw new Error(`El type: ${type}, no es soportado`);
                            })}

                            <button type='submit'>Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}