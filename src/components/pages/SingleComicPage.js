import './singleComicPage.scss';
import xMen from '../../resources/img/x-men.png';
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/spinner';

const SingleComicPage = () => {

    const [comic, setComic] = useState(null);

    const {loading, error, clearError, getComics} = useMarvelService();
    const {comicId} = useParams();

    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        clearError();
        getComics(comicId)
            .then(setComic)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = error ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage || spinner || content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;