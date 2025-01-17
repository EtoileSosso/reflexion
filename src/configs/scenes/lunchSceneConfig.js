import TweenMax from "gsap";
import anchor from "../../constants/anchor";
import {frameNumberLunch} from "../../stores/frameStore";

import Title from "../../components/Title.svelte";
import Lane1 from "../../components/frames/lunch/Lane1.svelte";
import Lane2 from "../../components/frames/lunch/Lane2.svelte";
import Eat from "../../components/frames/lunch/Eat.svelte";
import BtnNext from "../../components/frames/wakeup/BtnNext.svelte";

export default [
    {
        id: 's5-bell',
        x: 50,
        y: 26,
        anchor: anchor.center,
        width: 30,
        height: 30,
    },

    {
        id: 's5-title',
        x: 50,
        y: 50,
        anchor: anchor.center,
        width: 30,
        height: 10,
        content: Title,
        title: 'LA CANTINE',
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
                border: 0,
                webkitBorderImage: 'none',
            });
            window.addEventListener('scroll', () => {
                const lane1 = document.getElementById('s5-lane-1');
                if(el.getBoundingClientRect().top <= 0){
                    TweenMax.to(lane1, 1, {display: 'block', opacity: 1});
                    TweenMax.to(el, 1, {opacity: 0});
                } else {
                    TweenMax.to(lane1, 1, { opacity: 0});
                    TweenMax.to(el, 1, { opacity: 1});
                }
            });
        }
    },

    {
        id: 's5-lane-1',
        x: 16,
        y: 70,
        anchor: anchor.topLeft,
        width: 42,
        height: 35,
        content: Lane1,
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
                zIndex: 1,
                display: 'none',
                opacity: 0,
            });
        }
    },

    {
        id: 's5-lane-2',
        x: 79,
        y: 75.5,
        anchor: anchor.topRight,
        width: 20,
        height: 35,
        content: Lane2,
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
                zIndex: 2,
                display: 'none',
                opacity: 0,
                backgroundColor: 'white',
            });
            frameNumberLunch.subscribe(value => {
                if(value !== 1) return;
                TweenMax.to(el, 1, {
                    display: 'block',
                    opacity: 1,
                    left: '-=2vw',
                    top: '+=2vw',
                    onComplete: () => {
                        frameNumberLunch.update(n => n + 1);
                }});
            })
        }
    },

    {
        id: 's5-eat',
        x: 25,
        y: 138,
        anchor: anchor.bottomLeft,
        width: 25,
        height: 25,
        square: true,
        content: Eat,
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
                zIndex: 3,
                display: 'none',
                opacity: 0,
                backgroundColor: 'white',
            });
            frameNumberLunch.subscribe(value => {
               if(value !== 2) return;
               TweenMax.to(el, 1, {delay: 1, display: 'block', opacity: 1, onComplete: () => {
                   const btnNext = document.getElementById('s5-next');
                   TweenMax.to(btnNext, 1, {display: 'block', opacity: 1, delay: .5});
               }})
            });
        }
    },

    {
        id: 's5-next',
        x: 90,
        y: 145,
        anchor: anchor.bottomRight,
        width: 20,
        height: 10,
        content: BtnNext,
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
               display: 'none',
               opacity: 0,
            });
        }
    }
]
