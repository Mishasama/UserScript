// ==UserScript==
// @name				ビリビリライブモザイク削除君
// @name:en				Bilibili Live Mosaic Remover
// @name:zh-CN				破站直播马赛克删除君
// @name:zh-TW				B 站實況馬賽克移除君
// @license				CC-BY-NC-SA-4.0
// @namespace				https://space.bilibili.com/2033380
// @version				1.1
// @description				モザイクなんてクソ食らえだ！
// @description:en			Fuck you mosaic!
// @description:zh-CN			去你妈的傻逼马赛克！
// @description:zh-TW			幹你娘的白癡馬賽克！
// @author				Misha
// @match				*://live.bilibili.com/*
// @icon				https://icons.duckduckgo.com/ip2/bilibili.com.ico
// @grant				none
// @run-at				document-end
// @supportURL				https://github.com/Mishasama/UserScript/issues
// @homepageURL				https://github.com/Mishasama/UserScript/raw/master/Misha's%20US/Bilibili%20Live%20Mosaic%20Remover/
// @contributionURL			https://ko-fi.com/mishasama
// @contributionAmount			1￥
// @compatible				chrome
// @compatible				edge
// @updateURL				https://github.com/Mishasama/UserScript/raw/master/Misha's%20US/Bilibili%20Live%20Mosaic%20Remover/Bilibili%20Live%20Mosaic%20Remover.user.js
// @installURL				https://github.com/Mishasama/UserScript/raw/master/Misha's%20US/Bilibili%20Live%20Mosaic%20Remover/Bilibili%20Live%20Mosaic%20Remover.user.js
// @downloadURL				https://github.com/Mishasama/UserScript/raw/master/Misha's%20US/Bilibili%20Live%20Mosaic%20Remover/Bilibili%20Live%20Mosaic%20Remover.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
// ポーリング間隔を設定します（例：5000ミリ秒）
var interval = 5000;
var highestZIndex = 2147483647; // 最上層にボタンを保つための最大の32ビット整数

// 目的の要素をチェックし、ボタンの位置を更新する関数を定義します
function checkAndAddButton() {
  var targetDiv = document.getElementById('web-player-module-area-mask-panel');
  var button = document.getElementById('remove-button');
  
  // 目的の要素が見つかり、ボタンが存在しない場合、ボタンを作成します
  if (targetDiv && !button) {
    button = document.createElement('button');
    button.id = 'remove-button';
    button.innerHTML = '要素を削除';
    
    // ボタンのスタイルを設定します
    button.style.position = 'fixed'; // 固定位置を使用します
    button.style.zIndex = highestZIndex.toString(); // 最高のz-index値を設定します
    
    // ボタンにクリックイベントリスナーを追加します
    button.onclick = function() {
      // 目的のDIV要素を削除します
      targetDiv.remove();
      // ボタンを削除します
      button.remove();
    };
    
    // ボタンをbody要素に追加します
    document.body.appendChild(button);
  } else if (!targetDiv && button) {
    // 目的の要素が存在せず、ボタンが存在する場合、ボタンを削除します
    button.remove();
  }
  
  // 目的の要素が存在する場合、ボタンの位置を更新します
  if (targetDiv) {
    // 目的の要素の位置とサイズを取得します
    var rect = targetDiv.getBoundingClientRect();
    
    // ボタンの位置を更新します
    button.style.top = window.scrollY + rect.top + rect.height / 2 + 'px';
    button.style.left = window.scrollX + rect.left + rect.width / 2 + 'px';
  }
}

// setInterval関数を使用して、定期的にチェックとボタンの位置を更新します
setInterval(checkAndAddButton, interval);

})();
