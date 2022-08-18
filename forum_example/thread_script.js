var defaultThreads = [
    {
        id: 1,
        title: "Foo",
        author: "Aaron",
        date: Date.now(),
        content: "Thread content",
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
                content: "hola me llamo juan"
            }
        ]
    },
    {
        id: 2,
        title: "Thread 2",
        author: "Aaron",
        date: Date.now(),
        content: "Thread content 2",
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

var threads = defaultThreads;
// if (localStorage && localStorage.getItem('threads')) {
//     threads = JSON.parse(localStorage.getItem('threads'));
// } else {
//     threads = defaultThreads;
//     localStorage.setItem('threads', JSON.stringify(defaultThreads));
// }




var id = window.location.search.slice(1);
var thread = threads.find(t => t.id == id);
/*for this to work porperly, need to manually input thread id;
e.g. .../thread.html?2
*/

/* 15 Aug 5.25pm
it appears that the issue appears during the fetching process;
next step is to figure out how to make this function perperly, 
also link to the url link display
*/
// var thread = threads[0];
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