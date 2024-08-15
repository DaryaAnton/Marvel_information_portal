import React, { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessege/ErrorMessege';

import './singleComic.scss';

const SingleComic = ({ comicsId }) => {

  const [comics, setComics] = useState([]);
  const { loading, error, getComics } = useMarvelService();

  useEffect(() => {
    updateComics()
  }, [comicsId]);

  const updateComics = () => {
    if (!comicsId) {
      return;
    }

    // clearError();
    getComics(comicsId)
      .then(onCharLoaded)
  }

  const onCharLoaded = (comics) => {
    setComics(comics);
  }

  const errorMessege = error ? <ErrorMessege /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comics) ? <View comics={comics} /> : null

  return (

    <div className="single-comic">

    </div>
  )
}

const View = ({ comics }) => {
  const { title, description, thumbnail, price } = comics;

  return (
    <>
      <img 					
        src={thumbnail} 
				alt={title} 
        className="single-comic__img" 
      />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">144 pages</p>
        <p className="single-comic__descr">Language: en-us</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <a href="#" className="single-comic__back">Back to all</a>
    </>
  )
}

export default SingleComic;