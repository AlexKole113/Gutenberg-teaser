class Rest {
	static getPostDataByID = (id) => fetch(`/wp-json/wp/v2/posts/${id}`).then(response => response.json())
	static searchPostByTitle = (val) => fetch(`/wp-json/wp/v2/search?search=${val}&subtype=post`).then(response => response.json())
	static getImageLinkByID = (mediaID) => fetch(`/wp-json/wp/v2/media/${mediaID}`).then(response => response.json())
}

export default Rest;
