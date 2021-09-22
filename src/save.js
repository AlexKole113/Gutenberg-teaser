import { useBlockProps } from '@wordpress/block-editor';

export default function Save({attributes:{title, excerpt, link, imgURL, topTextMain, topTextExtra}}) {
	return (
		<div { ...useBlockProps.save() }>
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
								<span>
									{topTextMain}
								</span>
							</div>
							<div className="teaser-post__header_add-part">
								<span>
									{topTextExtra}
								</span>
							</div>
						</header>
						<h5 className={'teaser-post__title'}>{title}</h5>
						<blockquote className={'teaser-post__excerpt'}>{excerpt}</blockquote>
					</div>
				</div>
				{
					link && (<a className={'teaser-container__post-link'} href={link}></a>)
				}
			</div>
		</div>
	);
}
