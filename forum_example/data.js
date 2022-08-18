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

var container = document.querySelector('ol');
for (let thread of threads) {
    var html = `
    <li class="row">
        <a href="thread.html?${thread.id}">
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
        </a>
    </li>
    `
    container.insertAdjacentHTML('beforeend', html);
}




