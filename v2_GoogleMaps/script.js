const firebaseConfig = {
    apiKey: "AIzaSyD9UnaLsQq-aonfxwZtzyw5Gx4-nTBjmBk",
    authDomain: "tweepin.firebaseapp.com",
    databaseURL: "https://tweepin-default-rtdb.firebaseio.com",
    projectId: "tweepin",
    storageBucket: "tweepin.appspot.com",
    messagingSenderId: "916556146792",
    appId: "1:916556146792:web:d4909e3a670f4eb6b7b3dd",
    measurementId: "G-D5HQL2TJ11"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);


const extractedTweetTemplate = document.querySelector("[extracted-tweets-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

var button = document.getElementById('searchButton');
var notification = document.getElementById('instructions');
// reference your database
var dbReference;
var tweepinDB;


const BASE_URL = "https://zekaizhang.pythonanywhere.com"


var map
var markers = [] // tweet, loc_text, lat, lng
// var pinID = 1;

let prompt_1 = '</br></br> double click on the icon to view discussion!';
const viewDiscussion = prompt_1.bold();


// function that initializes and updates the map division 
function initMap() {
    const myLatLng = { lat: 40.8044693, lng: -73.96611799999999};
    // const myLatLng = { lat: 40.8015095, lng: -73.9641977};

    map = new google.maps.Map(document.getElementById("map"), {
        mapId: "fe7c219e4e3c5459",
        zoom: 17,
        center: myLatLng,
    });

    var contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
    
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
  
    // The following example marker contains a marker near the 110th st metro station, using a DROP animation. Clicking on the marker will toggle the animation between a BOUNCE animation and no animation.
    const marker = new google.maps.Marker({
        // geo-location of the specific marker
        position: {lat: 40.804291, lng: -73.966407},
        map,
        // change the title here
        title: "Hi this is a random location -_-",
        // change the icon here
        icon: {
        url: "assets/warning_mono.svg",
        scaledSize: new google.maps.Size(50, 40)
        },
        animation: google.maps.Animation.DROP,
    });
    // marker.addListener("mouseover", toggleBounce());
    marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
    });

    //call function to create marker
    google.maps.event.addListener(map, 'click', function(event) {
    // google.maps.event.addListener(button_s, 'click', function(event) {

        for (let i = 0; i < markers.length; i++){
            var currentMarker = markers[i];
            newMarker = createMarker(currentMarker[1], currentMarker[0], currentMarker[2], currentMarker[3]);
            // console.log('added');
            createNewPinData(currentMarker[1], currentMarker[0]); // create new firebase data entry 
            // pinID = pinID + 1;
        }
        markers = []; // emptying the array to avoid repeated addition of elements  
    });

}

// function toggleBounce() {
//     if (marker.getAnimation() !== null) {
//         marker.setAnimation(null);
//     } else {
//         marker.setAnimation(google.maps.Animation.BOUNCE);
//     }
// }
 
window.initMap = initMap;

// google.maps.event.addListener(button_s, "click", initMap);


/* communicating with API
https://www.pythonanywhere.com/forums/topic/28368/
https://flask-cors.readthedocs.io/en/latest/
https://stackoverflow.com/questions/59060113/sending-data-from-a-search-bar-to-a-url
*/
button.addEventListener('click', ()=> {
    startSearch();
    notification.textContent = 'Please click anywhere on the map to refresh your results!';
    // console.log(markers);
    // initMap();
});


function startSearch(event) {
    var userInputValue = document.getElementById('mySearch').value;
    dbReference = userInputValue + '-pins';
    tweepinDB =  firebase.database().ref(dbReference)

    var urlBase = BASE_URL
    if (userInputValue === null || userInputValue === '') return;
    userInputValue = userInputValue.replace(/ /g, "%20");
    var searchUrl = urlBase + "/?input=" + userInputValue;
    // console.log(searchUrl)
    performSearch(searchUrl);
}

function performSearch(searchUrl) {
    // here it is vanila JS solution of how to get data via AJAX call
    var requestData = new XMLHttpRequest();
    // because AJAX is always async, we need to wait until file is loaded
    // once it is loaded we want to call function handleResults
    requestData.addEventListener('load', handleResults);
    requestData.open('GET', searchUrl);
    requestData.send();
}

function handleResults() {
    var responseJSON = JSON.parse(this.response);
    // console.log(responseJSON)

    for (var obj of responseJSON) {
        // console.log(obj.tweet);
        // console.log(obj.latitude);
        markers.push([obj.tweet, obj.streets, +obj.latitude, +obj.longitude]);
        // console.log(markers);
    }

}

// funtions that toggle the detailed Pin page
function on() {
    document.getElementById("overlay").style.display = "block";
  }
function off() {
    document.getElementById("overlay").style.display = "none";
}
document.getElementById ("overlay").addEventListener('dblclick', ()=> {
    off();
});

// function that creates new Pins based on returned Twitter search
function createMarker(title, content, latitude, longitude) {
    // console.log(typeof +latitude);

    const marker = new google.maps.Marker({
        // geo-location of the specific marker

        position: {lat: +latitude, lng: +longitude},
        map,
        // change the title here
        title: title,
        // change the icon here
        icon: {
            url: "assets/warning_mono.svg",
            scaledSize: new google.maps.Size(50, 40)
        },
        animation: google.maps.Animation.DROP,
    });

    const infowindow = new google.maps.InfoWindow({
        content: content + viewDiscussion,
    });

    marker.addListener("click", () => {
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    });

    marker.addListener("dblclick", () => {
        // console.log('haha!');
        if (document.getElementById("overlay").style.display == "block") {
            off();
        } else {
            on();
        }

        // retrieving data from db, based on content, for display 
        let rootRef = firebase.database().ref();
        rootRef
            .child(dbReference)
            .orderByChild('content')
            .equalTo(content)
            .once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    var pin = snapshot.val();
                    var key = Object.keys(pin)
                    console.log(pin)
                    console.log(key)
                    pin = Object.values(pin);

                    console.log(pin)

                    // var idString = pin[0].content
                    // var id = idString.replace(/\s/g, '')
                    var id = window.location.search.slice(1);

                    var title = pin[0].title
                    var content = pin[0].content
                    var date = pin[0].date
                    var comments = pin[0].comments

                    // var key = DocumentSnapshot.get("content")
                    console.log(pin[0])
                    // comments, content, date, title
                    console.log(pin[0].content)
                    // console.log(key)

                    console.log(id)
                    console.log(comments)
                    console.log(comments.length)

                    var headerBlock = document.querySelector('.header');
                    var commentsBlock = document.querySelector('.comments');

                    console.log(headerBlock)

                    var headerHtml = `
                        <h4 class="title">
                            ${title}
                        </h4>
                        <p class="content"> 
                            ${content}
                        </p>
                        <div class="bottom">
                            <p class="timestamp">
                                ${new Date(date).toLocaleString()}
                            </p>
                            <p class="comment-count">
                                ${comments.length} comments
                            </p>
                        </div>
                    `

                    var commentsHtml = ``
                    for (let individualComment of comments){
                        var individualCommentHtml = `
                            <div class="comment">
                                <div class="top-comment">
                                    <p class="comment-ts">
                                        ${new Date(individualComment.date).toLocaleString()}
                                    </p>
                                </div>
                                <div class="comment-content">
                                    ${individualComment.content}
                                </div>
                            </div>
                        `
                        commentsHtml = commentsHtml.concat(individualCommentHtml);
                    }
                    
                    headerBlock.innerHTML = headerHtml;
                    commentsBlock.innerHTML = commentsHtml;

                    var btn = document.querySelector('#commentButton');
                    btn.addEventListener('click', function() {
                        var txt = document.querySelector('textarea');
                        console.log('booyeah')
                        console.log(pin[0].comments)

                        var newComment = {
                            date: Date.now(),
                            content: txt.value,
                        }

                        // var newPostKey = firebase.database().ref().child('comments').push().key;
                        var updates = {};
                        
                        refString = dbReference + '/' + key + '/comments/' + comments.length

                        // updates['/comments/' + newPostKey] = newComment;
                        updates[refString] = newComment;

                        return firebase.database().ref().update(updates);

                        // var reference = mFirebaseDatabaseReference.child("comments");
                        // reference.push().setValue(newComment);


                        // const saveMessages = (content, date) => {
                        //     var newComment = tweepinDB.push();
                        //     newComment.set({
                        //         content: txt,
                        //         date: Date.now(),
                        //         comments: [
                        //             {
                        //                 author: "Tovamo",
                        //                 date: Date.now(),
                        //                 content: "Hey! Just a test..."
                        //             }
                        //         ]
                        //     });
                        // };
                        // saveMessages(content, date);
                        // const getElementVal = (id) => {
                        //     return document.getElementById(id).value;
                        // };

                        // var newComment = {
                        //     content: txt.value,
                        //     date: Date.now(),
                        // }
                        // addComment(newComment);
                        // txt.value = '';
                        // pin.comments.push(comment);
                        // localStorage.setItem('pins', JSON.stringify(pins));
                    })
                }
            });

    });
    // console.log(pinID);

    // google.maps.event.addListener(marker, 'click', function() {
    //     infowindow.setContent(content); 
    //     infowindow.open(map, marker);
    // });

    // google.maps.event.trigger(marker, 'click'); 

    return marker; 
}

// function that creates new Firebase data entry 
function createNewPinData(title, content) {

    let rootRef = firebase.database().ref();
    console.log(rootRef);
    // var contentMock = 'wweeveverwv!!!!';
    var contentCheck = content;

    // var id = id;
    var title = title;
    var contentLoad = content;

    // check if a pin entry already exists in the db to avoid repeated addition
    // credits https://stackoverflow.com/questions/56334485/react-native-firebase-check-if-user-already-exisits-in-real-time-database
    rootRef
        .child(dbReference)
        .orderByChild('content')
        .equalTo(contentCheck)
        .once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                let userData = snapshot.val();
                console.log(userData)
                console.log('blehblah');
                // Alert.alert('username is taken');
                // return userData;
            } else {
                // console.log('not found leh....')
                // credits https://github.com/Vetrivel-VP/contact_form_firebase 
                const saveMessages = (title, content) => {
                    var newPin = tweepinDB.push();
                    newPin.set({
                        title: title,
                        date: Date.now(),
                        content: contentLoad,
                        comments: [
                            {
                                author: "Tovamo",
                                date: Date.now(),
                                content: "Hey! Just a test..."
                            }
                        ]
                    });
                };
                saveMessages(title, content);
                const getElementVal = (id) => {
                    return document.getElementById(id).value;
                };
            }
        });

}

// test search: SHENMEGRUUIK KAIZEGNAH