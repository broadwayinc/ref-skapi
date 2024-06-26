<template lang="pug">
.grad
    header(style='color:white;width:800px;')
        img(src='@/assets/img/logo/logo-white.svg' style='height:3rem;')
        h1 The Serverless Backend =>
        h3 Build Full-Stack Web Application from Your HTML Frontend

        small For HTML Projects -
        Code(:hidecopy='true')
            pre.
                #[span(style="color:#999") &lt;]#[span(style="color:#33adff") script] #[span(style="color:#44E9FF") src]=#[span(style="color:#FFED91") "https://cdn.jsdelivr.net/npm/skapi-js@latest/dist/skapi.js"]#[span(style="color:#999") &gt;&lt;/]#[span(style="color:#33adff") script]#[span(style="color:#999") &gt;]
        br
        small For SPA Projects -
        Code(:hidecopy='true')
            pre npm i skapi-js@latest

        br

        h4
            | Check out our&nbsp;
            a(href='https://docs.skapi.com/introduction/getting-started.html' target='_blank' style='color:yellow') Documentation
            | &nbsp;
            span.wordset to get started
        a(href="https://docs.skapi.com/introduction/getting-started.html" target="_blank")    
            button.final(style='background-color:white;color:black;width:146px') Read Docs

        .readyHead(v-if='user.user_id')
            h4
                | ...or go to&nbsp;
                router-link(to='my-services' style='color:yellow') My Services
                | &nbsp;and start building!
            router-link(to="my-services")
                button.final(style='background-color:white;color:black;width:146px') My Services
        .readyHead(v-else)
            h4
                | ...or&nbsp;
                router-link(to='signup' style='color:yellow') Sign-up
                | &nbsp;for free and start building!
            router-link(to="signup")
                button.final(style='background-color:white;color:black;width:146px') Sign-Up

    section.intact
        br
        br
        .explain.one
            .image
                img(src="@/assets/img/landingpage/feature2.png")
            .desc
                h2 Serverless Technology, #[span.wordset Scale without limits]
                p Skapi requires no additional server between your #[span.wordset website and your users.]
                p Just import the API and start building immediately!
        br
        br
        .explain.two
            .image
                img(src="@/assets/img/landingpage/feature1.png") 
            .desc
                h2 User-Centric #[span.wordset Database Design]
                p Your users own their data, defining access levels and indexing for each piece of data.
                p Skapi introduces a secure, user-centric database approach that requires no pre-configuration.
        br
        br
        .explain.three
            .image
                img(src="@/assets/img/landingpage/feature3.png")
            .desc
                h2 3rd Party API Integration #[span(style='display:inline-block') Made Easy]
                p Skapi provides the simplest solution to make secure requests to your 3rd-party APIs.

        br
        br
        .explain.four
            .image
                img(src="@/assets/img/landingpage/frameworks.png")
            .desc
                h2 Compatible with #[span.wordset Any Frameworks]
                p Skapi is compatible with vanilla HTML as well as any frontend framework, including React, Vue, Angular, and more.
        br
        br

    section.ready
        br
        br
        div(v-if='user.user_id')
            h2 Ready to build your next big thing?
            p
                | You are already signed in.
                span.wordset
                    | Go to&nbsp;
                    router-link(to='my-services' style='color:yellow') My Services
                | &nbsp;and start building!
            router-link(to="my-services")
                button.final(style='background-color:white;color:black;width:146px') My Services
        div(v-else)
            h2 Ready to build your next big thing?
            p   
                span.wordset
                    router-link(to='signup' style='color:yellow') Sign-up
                    | &nbsp;for free
                | &nbsp;and start building!
            router-link(to="signup")
                button.final(style='background-color:white;color:black;width:146px') Sign-Up
        br
        br
        br
        br

footer
    img(src="@/assets/img/logo/logo-white.svg" style="height:1rem;")
    router-link(to="public/pp.html" target="_blank") Terms of service • Privacy policy
    span BROADWAYINC PTE. LTD. Singapore.
    
</template>

<script setup lang="ts">
import Code from '@/components/code.vue';
import { user } from '@/code/user'
</script>

<style lang="less" scoped>
footer {
    background-color: black;

    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    &>* {
        font-size: 0.8rem;
        color: #fff;
        margin: 1rem 8px;
    }
}

.grad {
    background:
        linear-gradient(32deg, rgb(0, 0, 255), rgba(255, 0, 0, 0) 80%),
        linear-gradient(229deg, rgba(0, 0, 255, 0.77), rgba(0, 255, 0, 0) 80%),
        linear-gradient(151deg, rgba(0, 255, 170, 1), rgba(252, 208, 75, 0.8) 80%);
}

.grad {
    &>* {
        max-width: 100%;
    }

    header>* {
        color: white;
    }

    p,
    li,
    h1,
    h2,
    h3,
    h4 {
        color: white;
        text-shadow: 1px 1px 4px #000;
    }

    p {
        font-weight: 500;
    }

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 8px;
    min-height: 100vh;
    flex-wrap: wrap;
    gap: 2rem;
}

.intact {
    width: 800px;
}

section {
    .image {
        width: 30%;

        img {
            width: 200px;
            max-width: 100%;
        }
    }

    .desc {
        width: 640px;
        z-index: 1;
    }
}

.explain {
    display: flex;
    position: relative;
    gap: 1rem;
}

.ready {
    display: none;
    width: 800px;
}

@media (max-width: 1650px) {
    .readyHead {
        display: none;
    }

    .ready {
        display: block;
    }
}

@media (max-width: 600px) {

    .explain {
        position: relative;

        &::before {
            pointer-events: none;
            position: absolute;
            content: '';
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            background-repeat: no-repeat;
            background-position: right top;
            opacity: 0.2;
        }

        &.one {
            &::before {
                background-size: 9rem;
                background-image: url('@/assets/img/landingpage/feature2.png');
            }
        }

        &.two {
            &::before {
                background-image: url('@/assets/img/landingpage/feature1.png');
                background-size: 10rem;
            }
        }

        &.three {
            &::before {
                background-image: url('@/assets/img/landingpage/feature3.png');
                background-size: 10rem;
            }
        }

        &.four {
            &::before {
                background-size: 9rem;
                background-image: url('@/assets/img/landingpage/frameworks.png');
            }
        }

        .image {
            display: none;
        }
    }
}
</style>
