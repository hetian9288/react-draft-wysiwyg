export function JavaDe(code: string){
    return String.fromCharCode(parseInt(code, 16));
}
export function getPageOffset(e: Object, fClassName) {
    var x = e.offsetLeft;
    var y = e.offsetTop;
    while (e = e.offsetParent) {
        if (fClassName != undefined && e.className.indexOf(fClassName) >= 0) {
            break;
        }
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    return {'x': x, 'y': y};
};