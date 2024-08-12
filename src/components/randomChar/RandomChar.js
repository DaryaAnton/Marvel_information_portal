import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessege from '../errorMessege/ErrorMessege';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';


const RandomChar = ({transformDescription}) => {


	const [char, setChar] = useState({});
	const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

	const marvelService = new MarvelService();

	useEffect(() => {
    updateChar()
  }, []);

	const onCharLoaded = (char) => {
		// this.setState({
		// 	char,
		// 	loading: false
		// })
		setChar(char);
    setLoading(false)
	}

	const onError = () => {
		setError(true);
    setLoading(false)
	}

	const updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		marvelService
			.getCharacter(id)
			.then(onCharLoaded)
			.catch(onError);
	}

	const onUpdateChar = () => {
		setError(false);
    setLoading(true)
		updateChar();
	}

		// const { char, loading, error } = this.state;
		const errorMessege = error ? <ErrorMessege /> : null;
		const spinner = loading ? <Spinner /> : null;
		const content = !(loading || error) ? <View char={char} transformDescription={transformDescription} /> : null

		return (
			<div className="randomchar">

				{errorMessege}
				{spinner}
				{content}

				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">
						Or choose another one
					</p>
					<button className="button button__main">
						<div
							className="inner"
							onClick={onUpdateChar}>
							try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		)
}

const View = ({ char }) => {
	const { name, description, thumbnail, homepage, wiki } = char;
	const blank = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

	return (
		<div className="randomchar__block">
			<img 
				src={thumbnail} 
				alt="Random character" 
				className="randomchar__img"
				style={{ objectFit: blank ? 'contain' : 'cover' }}
			/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">
					{description}
				</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	)
}

export default RandomChar;

	// componentDidMount() {
	// 	this.updateChar();
	// 	this.timerId = setInterval(this.updateChar, 20000)
	// }
	// componentWillUnmount() {
	// 	clearInterval(this.timerId)
	// }


