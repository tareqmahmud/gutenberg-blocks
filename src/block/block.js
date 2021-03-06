/**
 * BLOCK: guten
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {RichText, InspectorControls, ColorPalette} = wp.blockEditor;
const {PanelBody} = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-guten', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Call To Action'), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('guten — CGB Block'),
		__('CGB Example'),
		__('create-guten-block'),
	],

	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2'
		},

		titleColor: {
			type: 'string',
			default: '#000'
		},

		body: {
			type: 'string',
			source: 'html',
			selector: 'p'
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ({attributes, setAttributes}) => {
		function onChangeTitle(title) {
			setAttributes({title})
		}

		function onChangeBody(body) {
			setAttributes({body})
		}

		function onChangeTitleColor(titleColor) {
			setAttributes({titleColor})
		}

		const colors = [
			{name: 'firebrick', color: '#813939'},
			{name: 'white', color: '#fff'},
			{name: 'black', color: '#000'},
		];

		return ([
			<InspectorControls style={{marginBottom: '40px'}}>
				<PanelBody title={"Font Color Settings"}>
					<p><strong>Select a Title Color: </strong></p>
					<ColorPalette value={attributes.titleColor}
								  colors={colors}
								  onChange={onChangeTitleColor}/>
				</PanelBody>
			</InspectorControls>,

			<div className="cta-container">
				<RichText key="editable"
						  tagName="h2"
						  placeholder="Your CTA Title"
						  value={attributes.title}
						  style={{color: attributes.titleColor}}
						  onChange={onChangeTitle}/>

				<RichText key="editable"
						  tagName="p"
						  placeholder="Your CTA Content"
						  value={attributes.body}
						  onChange={onChangeBody}/>
			</div>
		]);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ({attributes}) => {
		return (
			<div className="cta-container">
				<h2 style={{color: attributes.titleColor}}>{attributes.title}</h2>
				<RichText.Content tagName="p"
								  value={attributes.body}/>
			</div>
		);
	},
});
