
function path(x) {
    var str = "";
    for (i = 0; i < x; i++) {
        str += "../";
    }
    return str;
}

function breadcrumbs(field) {
    var field = document.getElementById(field);
    var html = field.innerHTML;
    var url = window.location.toString();
    url = url.split("/");
    var first = true;

    html += "<div>";
    for (var i = 3; i < url.length - 1; i++) {
        if (first) {
            first = false;
        } else {
            html += " ::";
        }
        if (i == url.length - 2) {
            html += "<span> " + unescape(url[i]) + "</span>";
        } else {
            html += "<span> " + "<a href='" + path(url.length - i - 2) + "'>" + unescape(url[i]) + "</a></span>";
        }
    }
    html += "</div>";

    field.innerHTML = html;
}

window.onload = function() {
    breadcrumbs("bread");
    var wst = document.getElementById("wst");
    wst.onclick = function() {
        history.go(-1);
    }
    var ods = document.getElementById("ods");
    ods.onclick = function() {
        location.reload();
    }
    var nast = document.getElementById("nast");
    nast.onclick = function() {
        history.go(1);
    }

    var nowok = document.getElementById("nowok");
    nowok.onclick = function() {
        var name = document.getElementById("imie").value;
        if (imie.length == 0) {
            alert("Podaj imię");
        } else {
            imie = imie + " Hello";
            var param = "width=500, height=100, toolbar=no";
            win = window.open("", "nowe", param);
            win.document.write(imie);
        }
    }

    var zamok = document.getElementById("zamok");
    zamok.onclick = function() {
        win.close();
    }
}
