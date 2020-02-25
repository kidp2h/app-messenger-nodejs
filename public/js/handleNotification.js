function increaseRequestContact(className) {
    let currentNumberNotify = +$(`.${className}`).find("em").text()
    currentNumberNotify += 1;
    if (currentNumberNotify === 0) {
        $(`.${className}`).find("em").text("")
    } else {
        $(`.${className}`).find("em").text(currentNumberNotify)
    }
}

function decreaseRequestContact(className) {
    let currentNumberNotify = +$(`.${className}`).find("em").text()
    currentNumberNotify -= 1
    if (currentNumberNotify === 0) {
        $(`.${className}`).find("em").html("")
    } else {
        $(`.${className}`).find("em").html(currentNumberNotify)
    }
}

function increaseCountRequestContact(className) {
    let currentNumberReq = +$(`.${className}`).text()
    currentNumberReq += 1
    if (currentNumberReq === 0) {
        $(`.${className}`).css("display", "none").html("")
    } else {
        $(`.${className}`).css("display", "block").html(currentNumberReq)
    }
}

function decreaseCountRequestContact(className) {
    let currentNumberReq = +$(`.${className}`).text()
    currentNumberReq -= 1
    if (currentNumberReq === 0) {
        $(`.${className}`).css("display", "none").html("")
    } else {
        $(`.${className}`).css("display", "block").html(currentNumberReq)
    }
}