//前端自定义Cookie接收服务器信息
function getCookie(key) {
    var cookierStr = document.cookie;
    var arr = cookierStr.split("; ");
    for (var i = 0; i < arr.length; i++) {
        var subArr = arr[i].split("=");
        if (subArr[0] == key) {
            return subArr[1];
        }
    }
}


// if (!isLogin) {
//     location.href = "../html/login.html#" + location.href;
// }

function setCookie(key, value) {
    document.cookie = key + "=" + value;

}

function clearCookie(key) {
    document.cookie = key + "=" + "22;max-age=-1";
    console.log("清除了");
}