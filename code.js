(function (doc, win, onclick, gid, classname, content, showMessage) {
    var
            a, b, c, messages, colorLabel, cid, players, current, finished, newgameLabel, wonLabel, laststart = 1,
            cellAt = function (i, j) {
                return doc[gid](cid + i + j);
            },
            isCurrentColor = function (i, j) {
                return cellAt(i, j)[classname] === players[current];
            },
            start = function () {
                current = laststart = (laststart + 1) % 2;
                finished = 0;
                colorLabel[content] = colorLabel[classname] = players[current = (current + 1) % 2];
                for (a = 1; a < 7; a++)
                    for (b = 1; b < 8; b++)
                        cellAt(a, b)[classname] = '';
            },
            makeMove = function (i, j, s) {
                s > 0 && (cellAt(s, j)[classname] = '');
                cellAt(s + 1, j)[classname] = players[current];
                s === i - 1 ? function (i, j) {
                    return function (i, j) {
                        for (a = j - 1; 0 < a && isCurrentColor(i, a); a--) {
                        }
                        for (b = j + 1; 8 > b && isCurrentColor(i, b); b++) {
                        }
                        return 4 < b - a;
                    }(i, j) || function (i, j) {
                        for (c = i + 1; 7 > c && isCurrentColor(c, j); c++) {
                        }
                        return 3 < c - i;
                    }(i, j) || function (i, j) {
                        for (a = i - 1, b = j - 1; 0 < a && !(1 > b) && isCurrentColor(a, b); a--)
                            b--;
                        for (c = i + 1, b = j + 1; 7 > c && !(7 < b) && isCurrentColor(c, b); c++)
                            b++;
                        return 4 < c - a
                    }(i, j) || function (i, j) {
                        for (a = i - 1, b = j + 1; 0 < a && !(7 < b) && isCurrentColor(a, b); a--)
                            b++;
                        for (c = i + 1, b = j - 1; 7 > c && !(1 > b) && isCurrentColor(c, b); c++)
                            b--;
                        return 4 < c - a;
                    }(i, j);
                }(i, j)
                        ? finished = 1 && win[showMessage](messages[wonLabel].replace("%s", players[current].toLowerCase())) && start()
                        : colorLabel[content] = colorLabel[classname] = players[current = (current + 1) % 2]
                        : setTimeout(function () {
                            makeMove(i, j, s + 1)
                        }, 20);

            },
            setClickHandlers = function (buttonId) {
                for (a = 1; a < 7; a++)
                    for (b = 1; b < 8; b++)
                        cellAt(a, b)[onclick] = function (b, a) {
                            return function () {
                                if (!finished)
                                    for (a = 6; a > 0; a--)
                                        if (!cellAt(a, b)[classname]) {
                                            makeMove(a, b, 0);
                                            break;
                                        }
                            };
                        }(b);
                ;
                doc[gid](buttonId)[onclick] = function () {
                    win[showMessage](messages[newgameLabel]) && start()
                };
            };

    return function (m, n, w, c, b, p1, p2) {
        cid = c;
        newgameLabel = n;
        wonLabel = w;
        colorLabel = doc[gid](c);
        messages = {};
        for (i in m = doc[gid](m).childNodes) {
            w = m[i];
            if ((c = w.id) !== undefined) {
                messages[c] = w[content];
            }
        }
        players = [messages[p1], messages[p2]];
        setClickHandlers(b);
        start();
    };
})(document, window, "onclick", "getElementById", "className", "innerHTML", "confirm")("messages", "newgame", "won", "color", "restart", "p1", "p2");
