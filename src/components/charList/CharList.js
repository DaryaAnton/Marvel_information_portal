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
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChars();
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true
    })
  }


  onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

  updateChars = () => {
    this.onCharLoading
    this.marvelService
      .getAllCharacters()
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
    const { char, loading, error } = this.state
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
        <button className="button button__main button__long">
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