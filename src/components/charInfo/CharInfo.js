import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessege from '../errorMessege/ErrorMessege';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = ({charId}) => {

	const [char, setChar] = useState(null);
	const {loading, error, getCharacter, clearError} = useMarvelService();

	useEffect(() => {
    updateChars()
  }, [charId]);

	const updateChars = () => {
		if (!charId) {
			return;
		}

		clearError();
		getCharacter(charId)
			.then(onCharLoaded)
	}

	const onCharLoaded = (char) => {
		setChar(char);
	}


		const skeleton = char || loading || error ? null : <Skeleton />
		const errorMessege = error ? <ErrorMessege /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error || !char) ? <View char={char} /> : null

		return (
			<div className="char__info">
				{skeleton}
				{errorMessege}
				{spinner}
				{content}
			</div>
		)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki, comics } = char;
	const blank = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
	return (
		<>
			<div className="char__basics">
				<img 
					src={thumbnail} 
					alt={name} 
					style={{ objectFit: blank ? 'contain' : 'cover' }}
				/>
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={homepage} className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr">
				{description}
			</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">

				{comics.length > 0 ? null : 'У этого персонажа нет комиксов. Пока нет...'}

				{
					comics.map((item, i) => {
						if (i > 9) return;
						return (
							<li
								className="char__comics-item"
								key={i}
							>
								{item.name}
							</li>
						)
					})
				}
			</ul>
		</>
	)
}

CharInfo.propTypes = {
	charId: PropTypes.number
}
export default CharInfo;