// ==UserScript==
// @name                          Twitch Latency Overlay
// @name:ja                       Twitch 遅延オーバーレイ
// @name:zh-CN                    Twitch 延迟浮窗
// @name:zh-TW                    Twitch 延遲覆蓋
// @license                       CC-BY-NC-SA-4.0
// @namespace                     https://twitch.tv/kikka1225
// @version                       2024-04-25
// @description                   Display latency to the broadcaster as an overlay on Twitch without embedding. - Fixed version of https://greasyfork.org/scripts/416704
// @description:ja                配信者への遅延を埋め込みなしで Twitch 上のオーバーレイとして表示します。 - https://greeasyfork.org/scripts/416704 の修正バージョン
// @description:zh-CN             将延迟显示为 Twitch 上的叠加层，无需嵌入。 - 修复了 https://greasyfork.org/scripts/416704 的版本
// @description:zh-TW             將延遲顯示為 Twitch 上的疊加層，無需嵌入。 - 為 https://greasyfork.org/scripts/416704 的修復版本
// @author                        Misha
// @match                         https://www.twitch.tv/*
// @icon                          data:image/png;base64,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
// @grant                         none
// @run-at                        document-end
// @updateURL                     https://github.com/Mishasama/UserScript/raw/master/Misha's%20US/Twitch%20Latency%20Overlay.user.js
// @installURL                    https://github.com/Mishasama/UserScript/raw/master/Misha's%20US/Twitch%20Latency%20Overlay.user.js
// @downloadURL                   https://github.com/Mishasama/UserScript/raw/master/Misha's%20US/Twitch%20Latency%20Overlay.user.js
// @supportURL                    https://github.com/Mishasama/UserScript/issues
// @homepageURL                   https://github.com/Mishasama/UserScript/tree/master/Misha's%20US
// @contributionURL               https://ko-fi.com/mishasama
// @contributionAmount            1￥
// @compatible                    chrome
// @compatible                    edge
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
//////////////////////////////////////////////
// Set the position for the Overlay: [1 by default (top right)](you can click on the overlay button to toggle to the next position automatically)
// 0: Outside of the Video (not visible for Theatre and Full-Screen) - 1, 2, 3, 4: Inside of the Video (work for Theatre and Full-Screen)
// 0 = Menu Bar (in the top), near the search bar.
// 1 = Top Right.
// 2 = Bottom Right.
// 3 = Bottom Left.
// 4 = Top Left.
    var tlo_position=1;
// Set the font color for the Overlay ["#a263ff" by default (light-purple)]
    var tlo_font_color="#a263ff";
// Set the font size for the Overlay [13 by default]
    var tlo_font_size=13;
// Set the delay required before creating the overlay (in milliseconds, after loading the page) [3000 by default]
    var tlo_create_delay=3000;
//////////////////////////////////////////////
///////// DO NOT EDIT PAST THIS LINE /////////
//////////////////////////////////////////////
    var tlo_main;
    var tlo_index="width:90px;height:30px;font:bold "+tlo_font_size+"px Arial,sans-serif;line-height:30px;border-radius:4px;text-align:center;cursor:pointer;color:"+tlo_font_color;
    var tlo_list=[];
    tlo_list[0]="right:15px;top:10px;"+tlo_index;
    tlo_list[1]="position:absolute;right:15px;top:10px;box-shadow:#111011 0px 0px 2px;background:#18181b;"+tlo_index;
    tlo_list[2]="position:absolute;right:15px;bottom:44px;box-shadow:#111011 0px 0px 2px;background:#18181b;"+tlo_index;
    tlo_list[3]="position:absolute;left:15px;bottom:44px;box-shadow:#111011 0px 0px 2px;background:#18181b;"+tlo_index;
    tlo_list[4]="position:absolute;left:15px;top:10px;box-shadow:#111011 0px 0px 2px;background:#18181b;"+tlo_index;
//////////////////////////////////////////////
    function tlo_function_click(){
        if(tlo_position == 4 || tlo_position == -1){tlo_position=0;document.querySelector("div[class='Layout-sc-1xcs6mc-0 kuGBVB']").appendChild(tlo_main);}
        else{tlo_position+=1;document.querySelector("div[data-a-target='video-player']").appendChild(tlo_main);}
        tlo_main.style.cssText=tlo_list[tlo_position];
    }
//////////////////////////////////////////////
    function tlo_function_over(){tlo_main.style.background="#9147ff";tlo_main.style.color="#ffffff";if(tlo_position != 0){tlo_main.style.boxShadow="#7346b5 0px 0px 2px";}}
//////////////////////////////////////////////
    function tlo_function_out(){tlo_main.style.color=tlo_font_color;if(tlo_position == 0){tlo_main.style.background="transparent";}else{tlo_main.style.background="#18181b";tlo_main.style.boxShadow="#111011 0px 0px 2px";}}
//////////////////////////////////////////////
    window.addEventListener('load',function(){
//////////////////////////////////////////////
        setTimeout(function(){
//////////////////////////////////////////////
            setTimeout(function(){
                document.querySelector("button[data-a-target='player-settings-button']").click();
                setTimeout(function(){
                    document.querySelector("button[data-a-target='player-settings-menu-item-advanced']").click();
                    setTimeout(function(){
                        document.querySelector("div[data-a-target='player-settings-submenu-advanced-video-stats'] input").click();
                        setTimeout(function(){
                            document.querySelector("div[data-a-target='player-overlay-video-stats']").style.display="none";
//////////////////////////////////////////////
                            tlo_main=document.querySelector("div[data-a-target='player-overlay-video-stats'] > table > tbody > tr:nth-child(5) > td:nth-child(2) > p");
//////////////////////////////////////////////
                            tlo_main.addEventListener("click", tlo_function_click);
                            tlo_main.addEventListener("mouseover", tlo_function_over);
                            tlo_main.addEventListener("mouseout", tlo_function_out);
//////////////////////////////////////////////
                            tlo_position-=1;tlo_function_click();
                            setTimeout(function(){
                                document.querySelector("button[data-a-target='player-settings-button']").click();
                            },150);
                        },100);
                    },250);
                },500);
            },5000);
//////////////////////////////////////////////
        }, tlo_create_delay);
//////////////////////////////////////////////
    })
//////////////////////////////////////////////
})();
