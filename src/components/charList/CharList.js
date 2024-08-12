import React,{ useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessege/ErrorMessege';

import './charList.scss';

const CharList = (props) => {

  const [char, setChar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  // 1551

  const marvelService = new MarvelService();
  const itemRefs = useRef([]);

  useEffect(() => {
    onRequest()
  }, []);

  const onRequest = (offset) => {
    onCharListLoading()
    marvelService
      .getAllCharacters(offset)
      .then(onCharLoaded)
      .catch(onError);
  }

  const onCharLoaded = (newChar) => {
    let ended = false;
    if(newChar.length < 9) {
      ended = true
    }

    setChar(char => [...char, ...newChar]);
    setLoading(loading => false);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended)
  }

  const onCharListLoading = () => {
    setNewItemLoading(true)
  }

  const onError = () => {
    setError(true);
    setLoading(false)
	}

  const focusOn = (id) => {
    if (itemRefs.current[id]) {
      itemRefs.current.forEach(item => item.classList?.remove('char__item_selected'));
      itemRefs.current[id].classList.add('char__item_selected');
      itemRefs.current[id].focus();
    }
  };

  
    const errorMessege = error ? <ErrorMessege /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <View char={char} onCharSelected={props.onCharSelected} focusOn={focusOn} itemRefs={itemRefs}/> : null

    return (
      <div className="char__list">
        {errorMessege}
        {spinner}
        <ul className="char__grid">
          {content}
        </ul>
        <button 
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{'display': charEnded ? 'none' : 'block'}}
          onClick={() => onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    )

}

const View = ({ char, onCharSelected, focusOn, itemRefs } ) => {
  const elems = char.map((item, i) => {
    const { id, name, thumbnail } = item;
    const blank = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    

    return (
      <li 
        className="char__item" 
        key={id}
        ref={el => itemRefs.current[i] = el}
        tabIndex={0}
        onClick={() => {
          onCharSelected(id); 
          focusOn(i);
        }}
      >
        <img
          src={thumbnail}
          alt={name}
          style={{ objectFit: blank ? 'contain' : 'cover' }}
        />
        <div className="char__name">{name}</div>
      </li>
    );
  });

  return elems;
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}
export default CharList;