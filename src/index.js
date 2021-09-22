
import { registerBlockType } from '@wordpress/blocks';

import './styles/style.scss';
import edit from './edit';
import save from './save';

registerBlockType( 'alzheimer/teaser', {
	apiVersion: 2,
	supports: {
		html: false,
	},
	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.teaser-post__title',
		},
		excerpt: {
			type: 'string',
			source: 'text',
			selector: '.teaser-post__excerpt',
		},
		link: {
			type: 'string',
			source: 'attribute',
			selector: 'a.teaser-container__post-link',
			attribute: 'href'
		},
		imgURL: {
			type: 'string',
			source: 'attribute',
			selector: '.teaser-container__image img',
			attribute: 'src'
		},
		topTextMain: {
			type: 'string',
			source: 'text',
			selector: '.teaser-post__header_main-part span',
		},
		topTextExtra: {
			type: 'string',
			source: 'text',
			selector: '.teaser-post__header_add-part span',
		},
	},
	edit,
	save,
} );
