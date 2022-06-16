export function domInject(seletor) {
    return function (target, propertyKey) {
        let element;
        const getter = function () {
            if (!element) {
                element = document.querySelector(seletor);
            }
            return element;
        };
        Object.defineProperty(target, propertyKey, { get: getter });
    };
}
