document.addEventListener("DOMContentLoaded", function () {
  let menu = document.querySelector(".menu");
  let main_headers = document.querySelector("header");
  let headers = document.querySelector("header nav .links .headers");
  let links = headers.querySelectorAll("a");
  let pElement = document.querySelector(".sp");
  let div = document.querySelector(".links");
  let btn = document.querySelector(".btn");

  let menuVisible = false;
  menu.onclick = function () {
    if (menuVisible) {
      headers.style.cssText =
        "position: absolute; left: 0; width: 100%; display: flex; flex-direction: column; z-index: -1; top: -700%; transition: top var(--transition);";
      menu.style.cssText = "color:#e5e7eb";
      main_headers.style.borderBottom = "none";
    } else {
      headers.style.cssText = `z-index: 20; top:calc(100% + 1px); transition: top var(--transition); background-color: ${
        getComputedStyle(main_headers).backgroundColor
      }`;
      menu.style.cssText = "color:#ffaa00b3";
      main_headers.style.borderBottom = "1px solid hsl(0deg 0% 80% / 30%)";
    }
    menuVisible = !menuVisible;
  };

  document.onclick = function (event) {
    if (
      menuVisible &&
      !headers.contains(event.target) &&
      !menu.contains(event.target)
    ) {
      headers.style.cssText =
        "position: absolute; left: 0; width: 100%; display: flex; flex-direction: column; z-index: -1; top: -700%; transition: top var(--transition);";
      menu.style.cssText = "color:#e5e7eb";
      menuVisible = false;
    }
  };

  window.onblur = function () {
    if (menuVisible) {
      menu.style.cssText = "color:#e5e7eb";
      menuVisible = false;
    }
  };

  function handleResize() {
    if (window.matchMedia("(min-width: 769px)").matches) {
      menuVisible = false;
      headers.style.cssText = "display:flex;";
      menu.remove();
      pElement.style.display = "none";
    } else {
      div.append(menu);
      headers.style.cssText =
        "position: absolute; left: 0; width: 100%; display: flex; flex-direction: column; z-index: -1; top: -700%; transition: top var(--transition);";
      pElement.style.display = "block";
    }
  }
  handleResize();
  window.addEventListener("resize", handleResize);

  window.onload = function () {
    links[0].classList.add("active");
    links.forEach(function (lin) {
      if (lin.href === location.href) {
        links.forEach(function (try_lin) {
          try_lin.classList.remove("active");
        });
        lin.classList.add("active");
      }
    });
  };

  window.onscroll = function () {
    if (window.scrollY >= 50) {
      main_headers.style.borderBottom = "1px solid hsl(0deg 0% 80% / 30%)";
    } else {
      main_headers.style.borderBottom = "none";
    }
    if (window.scrollY >= 400) {
      btn.style.display = "block";
      main_headers.style.backgroundColor = "rgb(0 0 0 / 90%)";
      if (window.matchMedia("(min-width: 769px)").matches) {
        headers.style.backgroundColor = "transparent";
      } else {
        headers.style.backgroundColor =
          getComputedStyle(main_headers).backgroundColor;
      }
    } else {
      btn.style.display = "none";
      main_headers.style.backgroundColor = "#131821";
      headers.style.backgroundColor =
        getComputedStyle(main_headers).backgroundColor;
    }
  };

  btn.onclick = function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
});
