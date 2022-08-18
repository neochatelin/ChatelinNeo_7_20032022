const JsonToHtml = (e) => {let elem = document.createElement(e.elementType || "div");
    Object.keys(e).map((k)=>{

        switch(k) {
            case "elementType" : break;

            case "class": e.class.split(' ').map(c => elem.classList.add(c)); break;

            case "textContent" : elem.textContent = e.textContent; break;

            case "children" :
                e.children.map(child => {
                    let childElement = JsonToHtml(child);
                    return elem.appendChild(childElement);
                });
                break;

            default : elem.setAttribute(k, e[k]);
        }
        return elem;
    })
};

export default JsonToHtml;