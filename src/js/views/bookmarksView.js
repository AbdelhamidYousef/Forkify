import View from './view';
const icons = new URL('../../img/icons.svg', import.meta.url);

class Bookmarksview extends View {
  _parentEl = document.getElementById('bookmarks-container');

  

  _generateMarkup(bookmarks) {
    if (bookmarks.length === 0) return this._generateMessage();

    return bookmarks.map(bookmark => this._generateBookmark(bookmark)).join('');
  }

  _generateMessage() {
    return `
        <div class="message">
            <div>
                <svg>
                <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>
                No bookmarks yet. Find a nice recipe and bookmark it :)
            </p>
        </div>
                `;
  }

  _generateBookmark(bookmark) {
    const curId = window.location.hash.slice(1);


    return `
        <li 
            class="preview 
                ${bookmark.id === curId ? 'preview__link--active' : ''}"
            >
                <a class="preview__link" href="#${bookmark.id}">
                    <figure class="preview__fig">
                        <img src="${bookmark.imageUrl}" alt="Test">
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${bookmark.title}</h4>
                        <p class="preview__publisher">${bookmark.publisher}</p>
                        <div class="preview__user-generated hidden">
                            <svg>
                                <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                </a>
        </li>

          
       
    `;
  }
}

export default new Bookmarksview();
