// ==UserScript==
// @name                          Twitch Latency Overlay
// @name:ja                       Twitch 遅延オーバーレイ
// @name:zh-CN                    Twitch 延迟浮窗
// @license                       CC-BY-NC-SA-4.0
// @namespace                     https://twitch.tv/kikka1225
// @version                       2024-04-04
// @description                   Display latency to the broadcaster as an overlay on Twitch without embedding. - Fixed version of https://greasyfork.org/scripts/416704
// @description:ja                配信者への遅延を埋め込みなしで Twitch 上のオーバーレイとして表示します。 - https://greeasyfork.org/scripts/416704 の修正バージョン
// @description:zh-CN             将延迟显示为 Twitch 上的叠加层，无需嵌入。 - 修复了 https://greasyfork.org/scripts/416704 的版本
// @author                        Misha
// @match                         https://www.twitch.tv/*
// @icon                          data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
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
// Set the position for the Overlay: [0 by default (menu bar)](you can click on the overlay button to toggle to the next position automatically)
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
                            },1000);
                        },1000);
                    },1000);
                },2000);
            },5000);
//////////////////////////////////////////////
        }, tlo_create_delay);
//////////////////////////////////////////////
    })
//////////////////////////////////////////////
})();
