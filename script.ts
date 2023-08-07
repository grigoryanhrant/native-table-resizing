const enableColumnResizing = (): void => {
    let thElm: HTMLElement | undefined;
    let startOffset: number;

    const tableHeaders: NodeListOf<HTMLElement> = document.querySelectorAll("table th");
    tableHeaders.forEach(function (th: HTMLElement): void {
        th.style.position = 'relative';

        const grip: HTMLDivElement = document.createElement('div');
        grip.textContent = "\u00A0";
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

    function createMouseDownHandler(th: HTMLElement) {
        return function (evt: MouseEvent): void {
            thElm = th;
            startOffset = th.offsetWidth - evt.pageX;

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };
    }

    function mouseMoveHandler(evt: MouseEvent): void {
        if (thElm !== undefined) {
            thElm.style.width = startOffset + evt.pageX + 'px';
        }
    }

    function mouseUpHandler(): void {
        thElm = undefined;

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }
}

document.addEventListener('DOMContentLoaded', enableColumnResizing);
