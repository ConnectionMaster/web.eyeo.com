(function(){
  function addListener(target, event, callback)
  {
    if (target.addEventListener)
      return target.addEventListener(event, callback, false);
    else
      return target.attachEvent("on" + event, callback);
  }

  function onLoad(callback)
  {
    if (document.addEventListener)
      return addListener(document, "DOMContentLoaded", callback);
    else
      return addListener(window, "load", callback);
  }

  onLoad(function()
  {
    // expand & contract fixed header
    var header = document.getElementById("header");
    var headerPadding = 13;
    addListener(window, "scroll", function()
    {
      var scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY < headerPadding)
        header.className = "top";
      else
        header.className = "";
    });
    // open & close header menu (on small screens)
    var menu = document.getElementById("menu");
    var menuButton = document.getElementById("header-hamburger");
    addListener(menuButton, "click", function()
    {
      if (menu.className === "open")
      {
        menu.className = "";
        menu.setAttribute("aria-expanded", false);
      }
      else
      {
        menu.className = "open";
        menu.setAttribute("aria-expanded", true);
      }
    });
  });
}());
