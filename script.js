const enableColumnResizing = () => {
    let thElm;
    let startOffset;

    let tableHeaders = document.querySelectorAll("table th");
    tableHeaders.forEach(function (th) {
        th.style.position = 'relative';

        let grip = document.createElement('div');
        grip.innerHTML = "&nbsp;";
        Object.assign(grip.style, {
            top: 0,
            right: 0,
            bottom: 0,
            width: '5px',
            position: 'absolute',
            cursor: 'col-resize'
        });

        grip.addEventListener('mousedown', createMouseDownHandler(th));

        th.appendChild(grip);
    });

    function createMouseDownHandler(th) {
        return function (e) {
            thElm = th;
            startOffset = th.offsetWidth - e.pageX;

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
    }

    function mouseMoveHandler(e) {
        if (thElm) {
            thElm.style.width = startOffset + e.pageX + 'px';
        }
    }

    function mouseUpHandler() {
        thElm = undefined;

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }
}

document.addEventListener('DOMContentLoaded', enableColumnResizing);
