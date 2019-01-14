class UI {
	constructor() {
		this.posts = document.querySelector('#posts');
		this.titleInput = document.querySelector('#title');
		this.bodyInput = document.querySelector('#body');
		this.idInput = document.querySelector('#id');
		this.postSubmit = document.querySelector('.post-submit');
		this.formState = 'add';
	}

	renderPosts(posts) {
		let output = '';

		posts.forEach(post => {
			output += `
				<div class="card mb-3">
					<div class="card-body">
						<h4 class="card-title">${post.title}</h4>
						<p class="card-text">${post.body}</p>
						<a href="#" class="edit card-link" data-id="${post.id}">
							<span class="fa fa-pencil"></span>
						</a>
						<a href="#" class="delete card-link" data-id="${post.id}">
							<span class="fa fa-remove"></span>
						</a>
					</div>
				</div>
			`;
		});
		this.posts.innerHTML = output; 
	}

	showAlert(message, className) {
		this.clearAlert();

		// Create div
		const div = document.createElement('div');

		// Add classes
		div.className = className;

		// Add text
		div.textContent = message;

		// Get parent
		const container = document.querySelector('.postsContainer');

		// Insert div
		container.insertBefore(div, this.posts);

		// Timeoute
		setTimeout(() => {
			this.clearAlert();
		}, 3000)
	}

	clearAlert() {
		const currentAlert = document.querySelector('.alert');

		if(currentAlert) {
			currentAlert.remove();
		}
	}

	clearFields() {
		this.titleInput.value = '';
		this.bodyInput.value = '';
	}

	fillForm(data) {
		this.titleInput.value = data.title;
		this.bodyInput.value = data.body;
		this.idInput.value = data.id;

		this.changeFormState('edit');
	}

	//Clear ID hidden value
	clearIdInput() {
		this.idInput.value = '';
	}

	// Change form stte
	changeFormState(type) {
		if(type === 'edit') {
			this.postSubmit.textContent = 'Update Post';
			this.postSubmit.className = 'post-submit btn btn-warning btn-block';

			// Create cancel button
			const button = document.createElement('button');
			button.className = 'post-cancel btn btn-light btn-block mt-2';
			button.textContent = 'Cancel Edit';

			// Get the parent
			const cardForm = document.querySelector('.card-form');

			// Get the element to insert before
			const formEnd = document.querySelector('.form-end');

			// Insert the cancel button
			cardForm.insertBefore(button, formEnd);


		} else {
			this.postSubmit.textContent = 'Post It!';
			this.postSubmit.className = 'post-submit btn btn-primary btn-block';

			// Remove cancel btn if it is there
			if(document.querySelector('.post-cancel')) {
				document.querySelector('.post-cancel').remove();
			}

			// Clear ID fromt the hidden field
			this.clearIdInput();

			// Clear Fields
			this.clearFields();
		}
	}
}

export const ui = new UI();