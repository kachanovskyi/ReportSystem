// import $ from 'jquery';
//
// export const notifyModalShow = (message, type) => {
//     const notifyModal = $('#notifyModal');
//     let timeout = 1000;
//
//     if(type === "undo") {
//         notifyModal.addClass('undo');
//         timeout = 200000;
//     }
//
//     let notifyModalTimeout;
//
//     if ( notifyModal && (notifyModal !== undefined) ) {
//
//         if(!notifyModal.is('hidden')) {
//             notifyModal.addClass('hidden')
//         }
//         window.clearTimeout(notifyModalTimeout);
//     }
//
//     notifyModal.removeClass('hidden');
//     notifyModal.find('.message-text').text(message);
//     notifyModal.animate({
//         "opacity": 1
//     }, 333);
//
//     notifyModalTimeout = window.setTimeout(function () {
//         notifyModal.animate({
//             "opacity": 0
//         }, 333, () => {
//             $(this).addClass('hidden');
//         });
//     }, timeout);
// };

export const ifStringEmpty = (text) => {
    return (text.length === 0 && !text.trim());
};

export const ifNotEmptyArray = (arr) => {
    return (arr && arr.length > 0);
};

 export const BASEURL = 'http://localhost:8080/';
//export const BASEURL = 'https://lnu.botscrew.com/';
