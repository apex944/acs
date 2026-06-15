(function() {
  var emailInputs = document.querySelectorAll(".footer-email-input[data-email-user]");
  emailInputs.forEach(function(input) {
    var address = [
      input.getAttribute("data-email-user"),
      "@",
      input.getAttribute("data-email-domain"),
      ".",
      input.getAttribute("data-email-tld")
    ].join("");
    input.value = address;
    input.setAttribute("aria-label", address);
  });
})();

(function() {
  var toggle = document.querySelector(".site-mobile-toggle");
  var drawer = document.querySelector(".site-mobile-drawer");
  var drawerNav = document.querySelector(".site-mobile-nav");
  var desktopNav = document.querySelector(".site-nav");
  var closeButton = document.querySelector(".site-mobile-close");
  var backdrop = document.querySelector(".site-mobile-drawer__backdrop");
  var closeTimer = null;

  if (!toggle || !drawer || !drawerNav || !desktopNav) {
    return;
  }

  function normalizePath(path) {
    return (path || "").replace(/\/+$/, "") || "/";
  }

  function createSuspensionsItem() {
    var item = document.createElement("div");
    item.className = "site-nav-item site-nav-item--has-submenu";
    item.innerHTML = [
      '<a href="/mcs/" data-submenu-toggle="true" aria-haspopup="true" aria-expanded="false">Suspensions</a>',
      '<div class="site-submenu" aria-label="Suspensions submenu">',
        '<a href="#/mcs/rebuilds/">Rebuilds</a>',
        '<a href="#/mcs/mcs_faq.html">Damper FAQ</a>',
        '<a href="#/mcs/dampers-101/">Dampers 101</a>',
      "</div>"
    ].join("");
    return item;
  }

  function enhanceDesktopNav(nav) {
    var links = Array.prototype.slice.call(nav.children || []);
    var suspensionsLink = links.find(function(child) {
      return child.tagName === "A" && normalizePath(child.getAttribute("href")) === "/mcs";
    });

    if (!suspensionsLink || nav.querySelector(".site-nav-item--has-submenu")) {
      return;
    }

    nav.replaceChild(createSuspensionsItem(), suspensionsLink);
  }

  function markCurrentLinks(root) {
    var currentPath = normalizePath(window.location.pathname);
    var submenuItems = root.querySelectorAll(".site-nav-item--has-submenu");

    root.querySelectorAll("a").forEach(function(link) {
      link.classList.remove("is-current");
    });

    Array.prototype.slice.call(root.children || []).forEach(function(child) {
      if (child.matches && child.matches("a")) {
        if ((child.getAttribute("href") || "").charAt(0) === "#") {
          return;
        }
        var linkPath = normalizePath(new URL(child.href, window.location.origin).pathname);
        if (linkPath === currentPath) {
          child.classList.add("is-current");
        }
      }
    });

    submenuItems.forEach(function(item) {
      var trigger = item.querySelector("a");
      var matchedChild = false;

      item.querySelectorAll(".site-submenu a").forEach(function(link) {
        if ((link.getAttribute("href") || "").charAt(0) === "#") {
          return;
        }
        var linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
        if (linkPath === currentPath) {
          link.classList.add("is-current");
          matchedChild = true;
        }
      });

      if (trigger) {
        var triggerPath = normalizePath(new URL(trigger.href, window.location.origin).pathname);
        if (matchedChild || currentPath === triggerPath || currentPath.indexOf("/mcs/") === 0) {
          trigger.classList.add("is-current");
        }
      }

      if (matchedChild) {
        item.classList.add("is-open");
      }
    });
  }

  function bindSubmenuInteractions(root, isMobile) {
    var items = root.querySelectorAll(".site-nav-item--has-submenu");

    function setExpanded(item, expanded) {
      var trigger = item.querySelector("a");
      if (trigger) {
        trigger.setAttribute("aria-expanded", expanded ? "true" : "false");
      }
    }

    function closeAll(except) {
      items.forEach(function(item) {
        if (item !== except) {
          item.classList.remove("is-open");
          setExpanded(item, false);
        }
      });
    }

    items.forEach(function(item) {
      var trigger = item.querySelector("a");
      if (!trigger) {
        return;
      }

      setExpanded(item, item.classList.contains("is-open"));

      trigger.addEventListener("click", function(event) {
        if (!item.classList.contains("is-open")) {
          event.preventDefault();
          closeAll(item);
          item.classList.add("is-open");
          setExpanded(item, true);
          return;
        }

        if (isMobile) {
          closeAll();
        }
      });
    });

    if (!isMobile) {
      document.addEventListener("click", function(event) {
        if (!event.target.closest(".site-nav-item--has-submenu")) {
          closeAll();
        }
      });

      document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
          closeAll();
        }
      });
    }
  }

  enhanceDesktopNav(desktopNav);
  markCurrentLinks(desktopNav);
  drawerNav.innerHTML = desktopNav.innerHTML;
  markCurrentLinks(drawerNav);
  bindSubmenuInteractions(desktopNav, false);
  bindSubmenuInteractions(drawerNav, true);

  function openDrawer() {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }

    drawer.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(function() {
      window.requestAnimationFrame(function() {
        drawer.classList.add("is-open");
      });
    });
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");

    closeTimer = window.setTimeout(function() {
      drawer.hidden = true;
      document.body.style.overflow = "";
      closeTimer = null;
    }, 220);
  }

  toggle.addEventListener("click", function() {
    if (drawer.classList.contains("is-open")) {
      closeDrawer();
      return;
    }

    openDrawer();
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeDrawer);
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeDrawer);
  }

  drawerNav.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function(event) {
      if (link.getAttribute("data-submenu-toggle") === "true" && event.defaultPrevented) {
        return;
      }

      if (link.getAttribute("data-submenu-toggle") === "true") {
        return;
      }

      closeDrawer();
    });
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
})();
