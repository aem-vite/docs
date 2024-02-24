---
layout: home
sidebar: false

titleTemplate: Next generation front end tooling made simple for AEM

heroImage: /static/logo-outlined.png
heroAlt: AEM Vite logo
heroText: AEM Vite

hero:
  name: AEM Vite
  text: Bringing the magic of Vite to AEM
  tagline: Gone are the days of needing to reinvent the wheel. Front end in AEM has become a whole lot more powerful.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: View on GitHub
      link: https://github.com/aem-vite
  image:
    src: data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==
    alt:

features:
  - icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 256.32"><defs><linearGradient id="a" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"/><stop offset="100%" stop-color="#BD34FE"/></linearGradient><linearGradient id="b" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"/><stop offset="8.333%" stop-color="#FFDD35"/><stop offset="100%" stop-color="#FFA800"/></linearGradient></defs><path fill="url(#a)" d="M255.153 37.938 134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"/><path fill="url(#b)" d="M185.432.063 96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028 72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"/></svg>
    title: Vite-Powered
    details: Powered by one of the fastest build tools available. Do more with less.

  - icon: 💪
    title: Heavy Lifter
    details: AEM Vite does most of the work so you don't have to. We'll handle the complex stuff.

  - icon: 🔥
    title: What Complexity?
    details: The main objective of AEM Vite is to simplify tech debt and tooling efforts.

  - icon: ⚙️
    title: Extensible
    details: We leave you in full control of your needs. AEM Vite will handle the rest.

  - icon: 🔋
    title: Supercharged
    details: Maintaining complex tools is not how it should be. Lets change the status quo.

  - icon: 🚀
    title: It's fast... no, really!
    details: No explantion really needed, Vite + AEM Vite makes for the best DX.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(-120deg, var(--vp-c-brand-alt) 30%, var(--vp-c-brand));

  --vp-home-hero-image-background-image: linear-gradient(45deg, var(--vp-c-brand) 50%, var(--vp-c-brand-alt) 50%);
  --vp-home-hero-image-filter: blur(50px);
}

.VPHero.VPHomeHero {
  padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
}

.VPFeature.VPLink {
  border-color: #f4414a10;
}

.Layout > .VPFooter {
  border-top-width: 0;
}

.image > .image-container {
  height: 100px;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, var(--vp-c-brand-alt) 30%, var(--vp-c-brand));

    --vp-home-hero-image-filter: blur(70px);
  }

  .VPHero.VPHomeHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 30px) 48px 64px;
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(120px);
  }

  .VPHero.VPHomeHero {
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 30px) 64px 100px;
  }

  .VPNavBar:not(.top) > .wrapper ~ .divider > .divider-line {
    background-color: transparent;
  }

  .VPNavBar:not(.has-sidebar):not(.top) > .wrapper ~ .divider {
    background-color: transparent;
  }
}
</style>
