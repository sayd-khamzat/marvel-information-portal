import {Field, Form, Formik, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';
import './charSearchForm.scss';
import {useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import {Link} from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharSearchForm = () => {
    const [char, setChar] = useState(null);

    const {loading, error, clearError, getCharacterByName} = useMarvelService();

    const searchChar = (name) => {
        clearError();
        getCharacterByName(name)
            .then(res => setChar(res))
    }

    const errorMessage = error ? <div className='char__search-critical-error'><ErrorMessage/></div> : null;
    const results = !char ? null : char.length > 0
        ? <div className='char__search-wrapper'>
            <div className='char__search-success'>There is! Visit {char[0].name} page?</div>
            <Link className='button button__secondary' to={`/characters/${char[0].id}`}>
                <div className='inner'>To page</div>
            </Link>
        </div>
        : <div className='char__search-error'>
            The character was not found. Check the name abd try again
        </div>

    return (
        <div className='char__search-form'>
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('This field is required!')
                })}
                onSubmit={values => searchChar(values.name)}
            >
                <Form className='formBlock'>
                    <label className='char__search-label' htmlFor="charName">Or find a character by name:</label>
                    <div className='char__search-wrapper'>
                        <Field id='name'
                               name='name'
                               type='text'
                               placeholder='Enter name'/>
                        <button className='button button__main'
                                type='submit'
                                disabled={loading}>
                            <div className='inner'>Find</div>
                        </button>
                    </div>
                    <FormikErrorMessage className='char__search-error'
                                        name='name'
                                        component='div'/>
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchForm;