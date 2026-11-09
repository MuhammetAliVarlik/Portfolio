(function () {
    var root = document.documentElement;
    var lang = "en";
    try { lang = localStorage.getItem("portfolioLang") === "tr" ? "tr" : "en"; } catch (e) { /* storage blocked */ }

    function apply(l) {
        root.setAttribute("data-lang", l);
        root.lang = l;
        var btn = document.getElementById("lang-toggle");
        if (btn) btn.textContent = l === "en" ? "TR" : "EN";
        var t = root.getAttribute("data-title-" + l);
        if (t) document.title = t;
    }
    apply(lang);

    document.addEventListener("DOMContentLoaded", function () {
        apply(lang);

        var btn = document.getElementById("lang-toggle");
        if (btn) btn.addEventListener("click", function () {
            lang = lang === "en" ? "tr" : "en";
            try { localStorage.setItem("portfolioLang", lang); } catch (e) { /* storage blocked */ }
            apply(lang);
        });

        var bar = document.querySelector(".progress");
        if (bar) window.addEventListener("scroll", function () {
            var h = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
        }, { passive: true });

        // Arrow keys move between chapters (ignored while typing)
        document.addEventListener("keydown", function (e) {
            if (e.altKey || e.ctrlKey || e.metaKey) return;
            var tag = (e.target && e.target.tagName) || "";
            if (tag === "INPUT" || tag === "TEXTAREA") return;
            var rel = e.key === "ArrowLeft" ? "prev" : e.key === "ArrowRight" ? "next" : null;
            if (!rel) return;
            var link = document.querySelector('link[rel="' + rel + '"]');
            if (link) window.location.href = link.getAttribute("href");
        });
    });
})();
