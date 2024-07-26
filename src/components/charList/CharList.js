import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessege/ErrorMessege';

import './charList.scss';

class CharList extends Component {

  state = {
    characters: [],
    loading: true,
    error: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChars();
  }

  onCharLoaded = (characters) => {
    this.setState({
      characters,
      loading: false
    })
  }

  onError = () => {
		this.setState({
			loading: false,
			error: true
		})
	}

  updateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
    const { characters, loading, error } = this.state
    const errorMessege = error ? <ErrorMessege /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <View characters={characters}/> : null

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

const View = ({ characters }) => {
  const elem = characters.map((item) => {
    const { id, name, thumbnail } = item;
    const blank = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    return (
      <li className="char__item" key={id}>
        <img
          src={thumbnail}
          alt={name}
          style={{ objectFit: blank ? 'contain' : 'cover' }}
        />
        <div className="char__name">{name}</div>
      </li>
    );
  });

  return elem;
}
export default CharList;