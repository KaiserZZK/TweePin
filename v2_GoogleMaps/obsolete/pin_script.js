// data section; to be replaced with Firebase later
var defaultPins = [
    {
        id: 1,
        title: "Foo",
        author: "Aaron",
        date: Date.now(),
        content: "Pin content",
        comments: [
            {
                author: "Jack",
                date: Date.now(),
                content: "Hey there"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "Hey to you too"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "hola me yamo juan"
            }
        ]
    },
    {
        id: 2,
        title: "Baz",
        author: "Aaron",
        date: Date.now(),
        content: "Pin content 2",
        comments: [
            {
                author: "Jack",
                date: Date.now(),
                content: "Hey there"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "Hey to you too"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "Hey to you too"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "Hey to you too"
            }
        ]
    }
];

var pins = defaultPins;

// if (localStorage && localStorage.getItem('threads')) {
//     threads = JSON.parse(localStorage.getItem('threads'));
// } else {
//     threads = defaultThreads;
//     localStorage.setItem('threads', JSON.stringify(defaultThreads));
// }

// similar to thread.js

// var id = window.location.search.slice(1);
var id = 1;
var pin = pins.find(t => t.id == id);


var header = document.querySelector('.header');
var comments = document.querySelector('.comments');

var headerHtml = `
    <h4 class="title">
        ${pin.title}
    </h4>
    <div class="bottom">
        <p class="timestamp">
            ${new Date(pin.date).toLocaleString()}
        </p>
        <p class="comment-count">
            ${pin.comments.length} comments
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

for (let comment of pin.comments) {
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
    pin.comments.push(comment);
    localStorage.setItem('pins', JSON.stringify(pins));
})