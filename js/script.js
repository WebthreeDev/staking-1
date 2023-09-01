$(document).ready(function () {
    $("#claim-button").prop("disabled", false);
    startTimer(800);
    notify();

    var myInterval = setInterval(notify, 5000);
    var interval2 = setInterval(hideLoader, 2000);
});
const addresses = ["0x877...", "0x8A8...", "0xB99...", "0x84V7...", "0xZ3j...", "0x8C7...", "0x337...", "0x347...", "0x947...", "0x3Fv...", "0x394...", "0x39C...", "0xc9D...", "0x39E...", "0x3D2...", "0x948..."];

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function hideLoader() {
    $("#custom-loader").hide();
}
function notify() {
    var random = Math.floor(Math.random() * addresses.length);
    var address = addresses[random];
    var amount = getRandomNumberBetween(300, 3000);
    toastr.clear()
    toastr.info(address + " Just Claimed " + numberWithCommas(amount) + " $USDC");
}

function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function saveStopTime(stopTime) {
    localStorage.setItem('stopTime', stopTime)
}

function startTimer(totalTime) {
    clearInterval(timer);
    timer = setInterval(function () {
        totalTime--
        $('#timer').html(secondsToHms(totalTime))
    }, 1000);
}
function countdownStart() {
    var hour = parseInt($('#h1').val() + "" + $('#h2').val() || 0)
    var min = parseInt($('#m1').val() + "" + $('#m2').val() || 0)
    var sec = parseInt($('#s1').val() + "" + $('#s2').val() || 0)

    var totalTime = hour * 60 * 60 + min * 60 + sec
    totalTime = totalTime * 1000
    var currentTime = new Date()
    saveStopTime(currentTime.getTime() + totalTime)
    startTimer(totalTime / 1000)
}
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "0" : "0") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";
    $('#hours').html(hDisplay ? "0" : "0");
    $('#minutes').html(mDisplay);
    $('#seconds').html(sDisplay);
    // console.log(hDisplay);
    // console.log(mDisplay);
    // console.log(sDisplay);
    // return hDisplay + mDisplay + sDisplay; 
}

function checkHasTimer() {
    var stopTime = localStorage.getItem('stopTime')
    if (stopTime) {
        var currentTime = new Date()
        secondsToHms((stopTime - currentTime.getTime()));
        startTimer((stopTime - currentTime.getTime()) / 1000);
    }
}

