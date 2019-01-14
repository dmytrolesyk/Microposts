import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

// Listen for add post
ui.postSubmit.addEventListener('click', submitPost);

// Listen for delete post
ui.posts.addEventListener('click', deletePost);

// Listen for edit state
ui.posts.addEventListener('click', enableEdit);

// Listen for cancel edit state
document.querySelector('.card-form').addEventListener('click', cancelEditState);


function getPosts() {
	http.get('http://localhost:3000/posts')
	.then(data => ui.renderPosts(data))
	.catch(err => console.log(err));
}

function submitPost() {
	//get inputs from the form
	const title = ui.titleInput.value;
	const body = ui.bodyInput.value;
	const id = ui.idInput.value;

	const data = {
		title,
		body
	}

	//Validate input
	if(!title || !body) {
		ui.showAlert('Please fill in all fields', 'alert alert-danger');
	} else {

		// Check for ID
		if(!id) {
			// Create post
			http.post('http://localhost:3000/posts', data)
			.then(data => {
				ui.showAlert('Post added', 'alert alert-success');
				ui.clearFields();
				getPosts();
			})
			.catch(err => console.log(err));
		} else {
			// Update post
			http.put(`http://localhost:3000/posts/${id}`, data)
			.then(data => {
				ui.showAlert('Post updated', 'alert alert-success');
				ui.changeFormState('add');
				getPosts();
			})
			.catch(err => console.log(err));
		}
	}			
}

function deletePost(e) {
	e.preventDefault();

	if(e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.dataset.id;

		if(confirm('Are you sure?')) {
			http.delete(`http://localhost:3000/posts/${id}`)
			.then(data => {
				ui.showAlert('Posts removed', 'alert alert-success');
				getPosts();
			})
			.catch(err => console.log(err));
		}
	}
}

//Enable edit state
function enableEdit(e) {
	e.preventDefault();

	if(e.target.parentElement.classList.contains('edit')) {

		const id = e.target.parentElement.dataset.id;
		const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
		const body = e.target.parentElement.previousElementSibling.textContent;
		
		const data = {
			id,
			title,
			body
		}

		// Fill the form with the current post
		ui.fillForm(data);
	}
}


function cancelEditState(e) {
	e.preventDefault();
	if(e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}
}