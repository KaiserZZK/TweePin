var defaultPins = [
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
                content: "hola me yamo juan"
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

var pins = defaultPins;

// if (localStorage && localStorage.getItem('threads')) {
//     threads = JSON.parse(localStorage.getItem('threads'));
// } else {
//     threads = defaultThreads;
//     localStorage.setItem('threads', JSON.stringify(defaultThreads));
// }

