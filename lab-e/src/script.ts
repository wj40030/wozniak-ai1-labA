interface Style {
    name: string;
    file: string;
}

const styles: Record<string, Style> = {
    'style1': { name: 'Styl 1', file: 'style-1.css' },
    'style2': { name: 'Styl 2', file: 'style-2.css' }
};

let currentStyleKey: string = 'style1';

function applyStyle(styleKey: string): void {
    const style = styles[styleKey];
    if (!style) return;

    const existingLinks = document.querySelectorAll('link[data-app-style]');
    existingLinks.forEach(link => link.remove());

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `./${style.file}`;
    link.setAttribute('data-app-style', 'true');
    document.head.appendChild(link);

    console.log(`Zmieniono styl na: ${style.name} (${style.file})`);

    currentStyleKey = styleKey;
    renderStyleSwitcher();
}

function renderStyleSwitcher(): void {
    const switcher = document.getElementById('style-switcher');
    if (!switcher) return;

    switcher.innerHTML = 'Zmień styl: ';
    const list = document.createElement('ul');
    list.classList.add('style-switcher-list');

    for (const key in styles) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = styles[key].name;
        link.classList.add('style-switcher-link');
        if (key === currentStyleKey) {
            link.classList.add('active');
        }
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            applyStyle(key);
        });

        item.appendChild(link);
        list.appendChild(item);
    }
    
    switcher.appendChild(list);
}

applyStyle(currentStyleKey);
