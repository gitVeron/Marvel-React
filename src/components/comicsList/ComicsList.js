import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (comicsList) => {
        setComicsList(comicsList);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

        const errorMsg = error ? <ErrorMessage/> : null;
        const spinner = loading && !newItemLoading ? <Spinner/> : null;
        const items = comicsList.map(item => {
            return (
            <li key={item.id} className="comics__item">
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </li>
            )
        })


    return (
        <div className="comics__list">
                {spinner}
            <ul className="comics__grid">
                {errorMsg}
                {items}
            </ul>
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicsEnded ? 'none': 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;