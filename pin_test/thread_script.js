var id = window.location.search.slice(1);
var thread = threads.find(t => t.id == id);
var header = document.querySelector('.header');
var comments = document.querySelector('.comments');

var headerHtml = `
    <h4 class="title">
        ${thread.title}
    </h4>
    <div class="bottom">
        <p class="timestamp">
            ${new Date(thread.date).toLocaleString()}
        </p>
        <p class="comment-count">
            ${thread.comments.length} comments
        </p>
    </div>
`
header.insertAdjacentHTML('beforeend', headerHtml);

function addComment(comment) {
    var commentHtml = `
        <div class="comment">
            <div class="top-comment">
                <p class="user">
                    ${comment.author}
                </p>
                <p class="comment-ts">
                    ${new Date(comment.date).toLocaleString()}
                </p>
            </div>
            <div class="comment-content">
                ${comment.content}
            </div>
        </div>
    `
    comments.insertAdjacentHTML('beforeend', commentHtml);
}

for (let comment of thread.comments) {
    addComment(comment);
}

var btn = document.querySelector('button');
btn.addEventListener('click', function() {
    var txt = document.querySelector('textarea');
    var comment = {
        content: txt.value,
        date: Date.now(),
        author: 'Aaron'
    }
    addComment(comment);
    txt.value = '';
    thread.comments.push(comment);
    localStorage.setItem('threads', JSON.stringify(threads));
})