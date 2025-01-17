import anchor from '../../constants/anchor';
import {frameNumberBreakfast} from '../../stores/frameStore';
import TweenMax from 'gsap';

import Meal from '../../components/frames/breakfast/Meal.svelte';
import Table from '../../components/frames/breakfast/Table.svelte';
import Phone from '../../components/frames/breakfast/Phone.svelte';
import BtnNext from "../../components/frames/wakeup/BtnNext.svelte";

export default [
    {
        id: 'meal-frame',
        x: 50,
        y: 25,
        anchor: anchor.center,
        width: 45,
        height: 30,
        content: Meal,
        callback: id => {
            const el = document.querySelector(`#${id}`);

            el.style.display = "none";
            el.style.opacity = 0;

            TweenMax.to(el, 1, {display: "block", opacity: 1, delay: .5});

            setTimeout(() => {
                frameNumberBreakfast.update(n => n + 1);
            }, 2000);
        }
    },

    {
        id: 'table-frame',
        x: 50,
        y: 65,
        anchor: anchor.center,
        width: 45,
        height: 40,
        content: Table,
        callback: id => {
            const el = document.querySelector(`#${id}`);

            el.style.display = "none";
            el.style.opacity = 0;

            frameNumberBreakfast.subscribe(value => {
                if(value === 1){
                    TweenMax.to(el, .5, {display: "block", opacity: 1});

                    setTimeout(() => {
                        TweenMax.to(el, 1, {x: "-=220", ease: Back.easeOut});
                        TweenMax.to("#meal-frame", 1, {x: "-=220", ease: Back.easeOut});

                        frameNumberBreakfast.update(n => n + 1);
                    }, 2000);
                }
            });
        }
    },

    {
        id: 'phone-frame',
        x: 100,
        y: 100,
        anchor: anchor.bottomRight,
        width: 45,
        height: 90,
        content: Phone,
        callback: id => {
            const el = document.querySelector(`#${id}`);

            el.style.border = 0;
            el.style.borderImage = "none";
            el.style.webkitBorderImage = "none";
            el.style.transformOrigin = "bottom right";
            el.style.transform = "rotate(-90deg)";
            el.style.zIndex = 4;

            frameNumberBreakfast.subscribe(value => {
               if(value !== 2) return;

               TweenMax.to(el, 1, {rotation: "+=90", ease: Power2.easeOut});
            });
        }
    },

    {
        id: 'breakfast-next-scene',
        x: 95,
        y: 95,
        anchor: anchor.bottomRight,
        width: 20,
        height: 10,
        content: BtnNext,
        callback: id => {
            const el = document.getElementById(id);
            Object.assign(el.style, {
                display: 'none',
                opacity: 0,
                zIndex: 5,
            });
            frameNumberBreakfast.subscribe(value => {
                if(value !== 3) return;
                TweenMax.to(el, 1, {display: 'block', opacity: 1});
            });
        }
    }
]
