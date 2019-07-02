import anchor from '../../constants/anchor';

import Title from '../../components/Title.svelte';
import ScrollDown from '../../components/instructions/ScrollDown.svelte';

export default [
    {
        id: 's3-pool',
        x: 51,
        y: 27,
        anchor: anchor.center,
        width: 22,
        height: 33,
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
                backgroundImage: 'url("./assets/png/bus/S2_Pool.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                transform: 'scale(1.5)'
            });
        }
    },

    {
        id: 's3-title',
        x: 50,
        y: 70,
        anchor: anchor.center,
        width: 30,
        height: 10,
        content: Title,
        title: 'LES VESTIAIRES',
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
                border: 0,
                webkitBorderImage: 'none',
                zIndex: 1
            });
            TweenMax.from(el, 0.5, {yPercent: -100, autoAlpha: 0});
        }
    },

    {
        id: 's3-instruction-scroll-down',
        x: 98,
        y: 95,
        anchor: anchor.bottomRight,
        width: 10,
        height: 35,
        content: ScrollDown,
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
                border: 0,
                borderImage: 'none',
                webkitBorderImage: 'none',
            })
        }
    },
]
