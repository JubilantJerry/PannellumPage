/***************************************************************************
 *   Copyright (C) 2021 by Paul Lutus                                      *
 *   lutusp@arachnoid.com                                                  *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 *   This program is distributed in the hope that it will be useful,       *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of        *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the         *
 *   GNU General Public License for more details.                          *
 *                                                                         *
 *   You should have received a copy of the GNU General Public License     *
 *   along with this program; if not, write to the                         *
 *   Free Software Foundation, Inc.,                                       *
 *   59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.             *
 ***************************************************************************/

"use strict"

// the current sleep method

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// toggles a block element by a mouse click

function open_sesame(name) {
  var sw = document.getElementById(name);
  var q = sw.style.display != 'inherit';
  sw.style.display = q?'inherit':'none';
}

// cycles through a whitespace-separated list of images

function cycleImages(source,imgstr) {
  var imgarray=imgstr.split(" ");
  var mod = imgarray.length;
  var i=0;
  while(source.src.search(imgarray[i]) <= 0)
    i++;
  i = (++i % mod);
  source.src = imgarray[i];
}

function writeResult(id,s) {
  var target =  document.getElementById(id);
  if(target) {
    target.innerHTML = s;
  }
  else {
    console.log('Error: No " + id + " ID in ' + window.location.href);
  }
}

var month_to_n = { 'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12' };


function writeLastModifiedHeader(id, url) {
  try {
    var req=new XMLHttpRequest();
    req.onload = function() {
      if (req.readyState === 4 && req.status == 200) {
        var s = req.getResponseHeader('Last-Modified');
        s = s.replace(/.*, (\S+) (\S+) (\S+).*/,"$2 $1 $3").split(" ");
        s[0] = month_to_n[s[0]];
        s = s.join('.');
        writeResult(id,s);
      }
    };
    req.open("HEAD", url, true);
    req.send(null);
  }
  catch(e) {
    console.log(e);
  }
}

function getMostRecentUpdate(id,url) {
  if(url == null || url == '') {
    writeResult(id,document.lastModified.replace(/(\S+)\/(\S+)\/(\S+)\s.*/,"$1.$2.$3"));
  }
  else {
    writeLastModifiedHeader(id,url);
  }
}

function getUrlContent(id,url) {
  try {
    var req=new XMLHttpRequest();
    req.onload = function() {
      if (req.readyState === 4 && req.status == 200) {
        writeResult(id,req.responseText);
      }
    };
    req.open("GET", url, true);
    req.send(null);
  }
  catch(error) {
    console.log('Error in ' + window.location.href + ": " + error);
  }
}



