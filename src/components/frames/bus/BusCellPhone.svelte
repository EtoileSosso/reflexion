<script>
    import {onMount} from 'svelte';
    import TweenMax from 'gsap';

    let titleSrc = './assets/png/bus/S2_FeedTitle.png';
    let noLikeSrc = './assets/png/bus/S2_NoLike.png';
    let noRetweetSrc = './assets/png/bus/S2_NoRetweet.png';
    let likeSrc = './assets/png/bus/S2_Like.png';
    let retweetSrc = './assets/png/bus/S2_Retweet.png';

    onMount(() => {
        let yStart;
        let translate = 0;
        let maximumSize = 0;
        document.querySelectorAll('.feed').forEach( (item) => { maximumSize += item.offsetWidth});

        const frame = document.querySelector('#scene2-frame5');
        const phone = document.querySelector('#phone-hitbox');
        const feed = document.querySelector('#social-media-feed');
        const lastPhoto = document.querySelectorAll('.feed')[4];

        TweenMax.to(frame, 0, {autoAlpha: 1, delay: 25});
        TweenMax.from(frame, 0.5, {yPercent: 50, rotation: -45, delay: 25});
        TweenMax.to('#scene2-frame2, #scene2-frame3, #scene2-frame4', 0.5, {autoAlpha: 0.4, delay: 25});

        function setActive(e, item) {
            const actions = item.querySelectorAll('.like, .retweet');
            actions.forEach( (a) => {
                if(e.touches[0].clientY - translate > item.offsetTop + a.offsetTop + feed.offsetTop - 50 && e.touches[0].clientY - translate < a.offsetTop + a.offsetHeight + feed.offsetTop + item.offsetTop && e.touches[0].clientX > a.offsetLeft + feed.offsetLeft + frame.offsetLeft + item.offsetLeft && e.touches[0].clientX < a.offsetWidth + a.offsetLeft + feed.offsetLeft + frame.offsetLeft + item.offsetLeft)
                    a.src = a.classList.contains("like")?likeSrc:retweetSrc;
            });
        }

        phone.addEventListener("touchstart", (e) => {
            yStart = e.touches[0].clientY;
            document.querySelectorAll('.feed').forEach( (p) => setActive(e, p));
        });

        phone.addEventListener("touchmove", (e) => move(e));

        function move(e) {
            if(yStart < e.touches[0].clientY && translate < 0) translate += 8;
            else if(yStart > e.touches[0].clientY && translate > - maximumSize - 100) translate -= 8;
            document.querySelectorAll('#social-media-feed .feed').forEach( (item) => { item.style.transform = `translateY(${translate}px)`; });
                if(translate < - maximumSize - 99) {
                    const width = lastPhoto.querySelector('.publication').offsetWidth;
                    const height = lastPhoto.querySelector('.publication').offsetHeight;
                    phone.removeEventListener("touchmove", move);
                    TweenMax.to(frame, 1, {borderWidth: 8, width: width, height: height, left: lastPhoto.offsetLeft + frame.offsetLeft + feed.offsetLeft, top: lastPhoto.offsetTop + feed.offsetTop + translate + 100, delay: 1});
                    TweenMax.to('#scene2-frame2, #scene2-frame3, #scene2-frame4', 1, {autoAlpha: 0, delay: 1});
                    TweenMax.to('#phone, #phone-hitbox, #hand, #navbar, #social-media-feed', 0, {autoAlpha: 0, delay: 1});
                    TweenMax.to(frame, 1, { position: "absolute", left: `calc(50% - ${width / 2}px)`, top: `calc(50% - ${height / 2}px)`, delay: 3});
                    TweenMax.to(frame, 0, {backgroundImage: 'url("./assets/png/bus/S2_Feed5.png")', backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundSize: "100%", delay: 1});
                    TweenMax.to(frame, 1, {backgroundImage: 'url("./assets/png/bus/S2_Pool.png")', delay: 4});
                    TweenMax.to(frame, 1, {transformOrigin: "center", scale: 2,  delay: 5});

                }
        }
    });
</script>

<style>
    #phone {
        background-image: url("./assets/png/bus/S2_CellPhone.png");
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: 100%;
        height: 100%;
        width: 100%;
    }

    #hand {
        background-image: url("./assets/png/bus/S2_CellPhoneHand.png");
        background-repeat: no-repeat;
        background-position: bottom;
        background-size: 100%;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 4px;
    }

    #phone-hitbox {
        position: absolute;
        width: 47%;
        height: 56%;
        top: 26%;
        left: 21%;
    }

    #navbar {
        background-image: url("./assets/png/bus/S2_FeedTop.png");
        background-position: top;
        background-repeat : no-repeat;
        background-size: 100%;
        position: absolute;
        width: 46%;
        height: 10%;
        top: 26.2%;
        left: 21.5%;
    }

    #social-media-feed {
        padding-top: 50px;
        background-color: white;
        position: absolute;
        width: 46%;
        height: 49%;
        top: 26.5%;
        left: 21.5%;
        display: flex;
        overflow: hidden;
        flex-direction: column;
    }

    #social-media-feed .feed {
        width: 90%;
        margin-left: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transform: translate(0);
    }

    .publication {
        border: 3px solid black;
        width: 100%;
        height: 80%;
    }

    #social-media-feed img:first-of-type:not(.like) {
        width: 50%;
        margin-bottom: 10px;
    }

    .feed div {
        margin-top: 10px;
        margin-bottom: 30px;
    }

    .feed div img {
        height: 25px;
    }
</style>

<div id="phone"></div>
<div id="social-media-feed">
    <div class="feed">
        <img src={titleSrc} alt=""/>
        <img class="publication" src="./assets/png/bus/S2_Feed1.png" alt=""/>
        <div>
            <img class="like" src={noLikeSrc} alt=""/>
            <img class="retweet" src={noRetweetSrc} alt=""/>
        </div>
    </div>
    <div class="feed">
        <img src={titleSrc} alt=""/>
        <img class="publication" src="./assets/png/bus/S2_Feed2.png" alt=""/>
        <div>
            <img class="like" src={noLikeSrc} alt=""/>
            <img class="retweet" src={noRetweetSrc} alt=""/>
        </div>
    </div>
    <div class="feed">
        <img src={titleSrc} alt=""/>
        <img class="publication" src="./assets/png/bus/S2_Feed3.png" alt=""/>
        <div>
            <img class="like" src={noLikeSrc} alt=""/>
            <img class="retweet" src={noRetweetSrc} alt=""/>
        </div>
    </div>
    <div class="feed">
        <img src={titleSrc} alt=""/>
        <img class="publication" src="./assets/png/bus/S2_Feed4.png" alt=""/>
        <div>
            <img class="like" src={noLikeSrc} alt=""/>
            <img class="retweet" src={noRetweetSrc} alt=""/>
        </div>
    </div>
    <div class="feed">
        <img src={titleSrc} alt=""/>
        <img class="publication" src="./assets/png/bus/S2_Feed5.png" alt=""/>
        <div>
            <img class="like" src={noLikeSrc} alt=""/>
            <img class="retweet" src={noRetweetSrc} alt=""/>
        </div>
    </div>
</div>
<div id="navbar"></div>
<div id="hand"></div>
<div id="phone-hitbox"></div>