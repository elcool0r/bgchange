    on('chat:message', function (msg) {
        if (msg.type == "api" && msg.content.startsWith("!bgchange")) {
            if (playerIsGM(msg.playerid)) {
                let args = msg.content.split(" ");
                bgname = args[1]

                let currentPageID = Campaign().get('playerpageid'),
                    currentPage = getObj('page', currentPageID);

                let page = findObjs({
                    _id: currentPageID
                });  

                let bgmap = findObjs({
                    layer: 'map',
                    _pageid: currentPageID,
                    gmnotes: "%3Cp%3Ebg%3C/p%3E",
                    name: bgname
                });
                                
                if (bgmap.length > 1) {
                    var maps = findObjs({
                        layer: 'map',
                        _pageid: currentPageID,
                        gmnotes: "%3Cp%3Ebg%3C/p%3E"
                    });

                    var infront = Boolean(page[0].get("_zorder").endsWith(bgmap[0].get("_id")))
                }

                if (bgmap.length == 0) {
                    sendChat(msg.who, "<div class='sheet-rolltemplate-simple' style='margin-top:-7px;'><div class='sheet-container'><div class='sheet-label' style='margin-top:5px;'><span>" + "Could not find any map token named \"" + bgname + "\" on player page" + "</span></div></div></div>");
                } else if (bgmap.length > 1) {
                    sendChat(msg.who, "<div class='sheet-rolltemplate-simple' style='margin-top:-7px;'><div class='sheet-container'><div class='sheet-label' style='margin-top:5px;'><span>" + "Found multiple map tokens named \"" + bgname + "\" " + "</span></div></div></div>");
                } else if (infront) {
                    // nothing to do if already in front
                } else {
                    maps.forEach(function (map) {
                        if (map.get("_id") != bgmap[0].get("_id")) {
                            toBack(map);
                        }
                    });
                    }
        }
        }
    });

