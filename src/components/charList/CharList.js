import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessege/ErrorMessege';

import './charList.scss';

const CharList = (props) => {

  const [char, setChar] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  // 1551

  const { loading, error, getAllCharacters } = useMarvelService();
  const itemRefs = useRef([]);

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset)
      .then(onCharLoaded);
  }

  const onCharLoaded = (newChar) => {
    let ended = false;
    if (newChar.length < 9) {
      ended = true
    }

    setChar(char => [...char, ...newChar]);
    setNewItemLoading(newItemLoading => false);
    setOffset(offset => offset + 9);
    setCharEnded(charEnded => ended)
  }

  const focusOn = (id) => {
    if (itemRefs.current[id]) {
      itemRefs.current.forEach(item => item.classList?.remove('char__item_selected'));
      itemRefs.current[id].classList.add('char__item_selected');
      itemRefs.current[id].focus();
    }
  };

  console.log('render');
  

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { 'objectFit': 'cover' };
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'unset' };
      }

      return (
        <li
          className="char__item"
          tabIndex={0}
          ref={el => itemRefs.current[i] = el}
          key={item.id}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOn(i);
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === "Enter") {
              props.onCharSelected(item.id);
              focusOn(i);
            }
          }}>
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      )
    });

    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(char);
  const errorMessege = error ? <ErrorMessege /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  // const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMessege}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => onRequest(offset)}
        style={{ 'display': charEnded ? 'none' : 'block' }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )

}

// const View = ({ char, onCharSelected, focusOn, itemRefs } ) => {
//   const elems = char.map((item, i) => {
//     const { id, name, thumbnail } = item;
//     const blank = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'


//     return (
//       <li 
//         className="char__item" 
//         key={id}
//         ref={el => itemRefs.current[i] = el}
//         tabIndex={0}
//         onClick={() => {
//           onCharSelected(id); 
//           focusOn(i);
//         }}
//       >
//         <img
//           src={thumbnail}
//           alt={name}
//           style={{ objectFit: blank ? 'contain' : 'cover' }}
//         />
//         <div className="char__name">{name}</div>
//       </li>
//     );
//   });

//   return elems;
// }

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}
export default CharList;