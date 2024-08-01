import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessege/ErrorMessege';

import './charList.scss';

class CharList extends Component {

  state = {
    char: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 1551,
    charEnded: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest()
  }

  onRequest = (offset) => {
    this.onCharListLoading()
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  on

  onCharLoaded = (newChar) => {
    let ended = false;
    if(newChar.length < 9) {
      ended = true
    }

    this.setState(({offset, char}) => ({
      char: [...char, ...newChar],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }))
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true
    })
  }

  onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}


  render() {
    const { char, loading, error, offset, newItemLoading, charEnded } = this.state
    const errorMessege = error ? <ErrorMessege /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <View char={char} onCharSelected={this.props.onCharSelected}/> : null

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
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

const View = ({ char, onCharSelected } ) => {
  const elems = char.map((item) => {
    const { id, name, thumbnail } = item;
    const blank = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    
    return (
      <li 
        className="char__item" 
        key={id}
        onClick={() => onCharSelected(id)}
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
export default CharList;