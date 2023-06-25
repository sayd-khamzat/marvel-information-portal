import './singlePage.scss';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {

    const [data, setData] = useState(null);

    const {loading, error, clearError, getComics, getCharacter} = useMarvelService();
    const {id} = useParams();

    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();
        switch (dataType) {
            case 'comic':
                getComics(id)
                    .then(data => {
                        console.log(data)
                        setData(data)
                    })
                break;
            case 'character':
                getCharacter(id)
                    .then(data => {
                        console.log(data)
                        setData(data)
                    })

        }
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = error ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage || spinner || content}
        </>
    )
}

export default SinglePage;