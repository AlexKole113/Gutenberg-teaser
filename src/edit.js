import { useBlockProps , RichText} from '@wordpress/block-editor';
const {
	useState
} = wp.element;

import Rest from "../utils/Rest";

import './styles/editor.scss';
export default function Edit({attributes:{title, excerpt, link, imgURL, topTextMain, topTextExtra}, setAttributes }) {

	const getAllAttrs = () => ({ title, excerpt, link, imgURL, topTextMain, topTextExtra});

	const [options, setOptions] = useState([]);

	const searchPostByTitle = (val) => {
		if(!val) return;
		Rest.searchPostByTitle(val)
		.then(( dataFromRest ) => {
			if(dataFromRest && dataFromRest.length){
				setOptions(() => ([...dataFromRest.map( ({title, id}) => ({title, id}) )]) )
			}
		})
	}

	const getPostDataByID = (id) => {
		if(!id) return
		setAttributes({
			...getAllAttrs(),
			title: '',
			excerpt: '',
			link :'',
			postID: '',
			imgURL: '',
		})
		Rest.getPostDataByID(id)
		.then(( dataFromRest ) => {
				if(dataFromRest.id){
					const { title:{rendered:title}, excerpt:{rendered:excerpt}, featured_media, link } = dataFromRest;
					if( featured_media ) {
						Rest.getImageLinkByID(featured_media)
						.then(imgData => {
							const {media_details: {sizes:{full:{source_url}}}} = imgData;
							setAttributes({
								title,
								link,
								excerpt: excerpt?.replace(/(<([^>]+)>)/ig,''),
								postID: id,
								imgURL: source_url
							})
						})
					} else {
						setAttributes({
							title,
							link,
							excerpt: excerpt?.replace(/(<([^>]+)>)/ig,''),
							postID: id,
							imgURL: ''
						})
					}
				}
			})
	}

	return (
		<div { ...useBlockProps() }>
			<div className={'teaser-container'}>
				<div className={'teaser-container__image'}>
					{
						imgURL && (<img src={imgURL} alt={title}/>)
					}
				</div>
				<div className={'teaser-container__content'}>
					<div className={'teaser-post'}>
						<header className={'teaser-post__header'}>
							<div className="teaser-post__header_main-part">
								<RichText
									tagName="span"
									value={topTextMain}
									onChange={ ( topTextMain ) => {
										setAttributes({
											...getAllAttrs(),
											topTextMain
										})
									} }
									placeholder={`Type...`}
								/>
							</div>
							<div className="teaser-post__header_add-part">
								<RichText
									tagName="span"
									value={topTextExtra}
									onChange={ ( topTextExtra ) => {
										setAttributes({
											...getAllAttrs(),
											topTextExtra
										})
									} }
									placeholder={`Type...`}
								/>
							</div>
						</header>
						<h5 className={'teaser-post__title'}>
							<RichText
								tagName="span"
								autocompleters={[
									{
										name: "Autocomplete",
										triggerPrefix: "",
										options,
										getOptionLabel: ({title}) => (<span>{ title }</span>),
										getOptionKeywords: option => [ option.label, option.value ],
										getOptionCompletion: ({title,id}) => { getPostDataByID(id); return '' },
									}
								]}
								value={title}
								onChange={ ( newValue ) => {
									searchPostByTitle( newValue );
								} }
								placeholder={`Type...`}
							/>
						</h5>
						<blockquote className={'teaser-post__excerpt'}>{excerpt}</blockquote>
					</div>
				</div>
			</div>
		</div>
	);
}
