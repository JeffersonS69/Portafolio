import { c as createComponent, r as renderTemplate } from '../chunks/astro/server_BzW_gVoO.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Sections = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<!-- ---
import Layout from "../layouts/Layout.astro";
import TextGenerator from "../components/TextGenerator.astro";
---

<Layout title="Portafolio">
    <section class="main-box">
        <article class="profile">
            <img
                class="profile-picture"

                alt="foto de perfil"
            />
            <hr class="bar" />
            <div class="flex-content-right">
                <div class="content-text">
                    <div>
                        <p>Hola, mi nombre es</p>
                        <h1>Jefferson Garcia</h1>
                    </div>
                    <div>
                        <TextGenerator />
                    </div>
                </div>
                <div class="btn-cv">
                    <button>Descargar CV</button>
                </div>
                <div class="list-icons">
                    <a
                        href="https://github.com/JeffersonS69"
                        target="_blank"
                        class="btn-github"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#171515"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"
                            ><path stroke="none" d="M0 0h24v24H0z" fill="none"
                            ></path><path
                                d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                            ></path></svg
                        >
                    </a>
                    <a
                        href="https://www.linkedin.com/in/jefferson-garcia-ibarra-558822244/"
                        target="_blank"
                        class="btn-linkedin"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0e76a8"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
                            ><path stroke="none" d="M0 0h24v24H0z" fill="none"
                            ></path><path
                                d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
                            ></path><path d="M8 11l0 5"></path><path
                                d="M8 8l0 .01"></path><path d="M12 16l0 -5"
                            ></path><path d="M16 16v-3a2 2 0 0 0 -4 0"
                            ></path></svg
                        >
                    </a>
                    <a
                        href="https://gitlab.com/JeffryS69"
                        target="_blank"
                        class="btn-gitlab"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fc6d26"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-gitlab"
                            ><path stroke="none" d="M0 0h24v24H0z" fill="none"
                            ></path><path
                                d="M21 14l-9 7l-9 -7l3 -11l3 7h6l3 -7z"
                            ></path></svg
                        >
                    </a>
                </div>
            </div>
        </article>
    </section>
</Layout>
<style>
    .main-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .profile {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #eaebed;
        width: auto;
        height: auto;
        gap: 20px;
        border-radius: 15px;
        padding: 20px;
        z-index: 1;
        box-shadow: 0 0 20px #006989;
    }
    @media (max-width: 800px) {
        .profile {
            flex-direction: column;
        }
        .profile-picture {
            width: 100% !important;
            height: 280px !important;
        }
        .flex-content-right {
            flex: 100%;
        }
        .flex-photo-left {
            flex: 100%;
        }
        .bar {
            width: 100% !important;
            height: 5px !important;
        }
    }

    @media (max-width: 320px) {
        .profile {
            width: 70%;
            height: 50%;
            gap: 10px;
        }
        .profile-picture {
            width: 100% !important;
            height: 280px !important;
        }

        h1 {
            font-size: 23px !important;
        }

        p {
            font-size: 12px;
        }
        .flex-content-right {
            gap: 25px !important;
        }
    }

    .flex-photo-left {
        text-align: center;
    }

    .flex-content-right {
        display: flex;
        flex-direction: column;
        gap: 30px;
    }
    .profile-picture {
        width: 250px;
        height: 100%;
        border-radius: 12px;
        box-shadow: 1px 2px 5px #a3bac3;
    }
    .bar {
        border: none;
        width: 3px;
        height: 100%;
        background-color: #636363;
    }
    .list-icons {
        display: flex;
        justify-content: space-evenly;
        color: #006989;
    }
    .btn-cv {
        display: flex;
        justify-content: center;
    }
    a {
        display: flex;
        text-align: center;
        color: #a3bac3;
        font-size: 25px;
        border-radius: 50%;
        padding: 5px;
        box-shadow: 1px 2px 5px;
    }

    .btn-github:hover {
        color: #171515;
    }

    .btn-linkedin:hover {
        color: #0e76a8;
    }

    .btn-gitlab:hover {
        color: #fc6d26;
    }

    button {
        background-color: #006989;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 5px 20px;
        font-size: 15px;
        cursor: pointer;
        box-shadow: 1px 2px 10px #a3bac3;
        font-family: "Kalam", cursive;
    }

    button:hover {
        background-color: #004d5c;
    }

    .content-text {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 20px;
    }

    h1 {
        font-size: 40px;
        margin: 0%;
    }
</style>
 -->`;
}, "/home/jeff/Portafolio/src/pages/sections.astro", void 0);

const $$file = "/home/jeff/Portafolio/src/pages/sections.astro";
const $$url = "/sections";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Sections,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
