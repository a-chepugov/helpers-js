export default function (html) {
	return (
		html instanceof String ?
			html.replace(/<[^>]+>/g, '') :
			html
	)
}
