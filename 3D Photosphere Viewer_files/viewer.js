/***************************************************************************
 *   Copyright (C) 2021, Paul Lutus                                        *
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

// Created on 22 May 2021, 22:33:13

"use strict";

class Viewer {
  constructor() {
    this.pano = this.id('panorama');
    this.label = this.id('label');
    this.initial_drop = true;
    // this.label.innerHTML = "Drag & drop here";
    this.filestring = this.id('filename');
    this.file_selector = this.id('file-selector');
    this.file_selector.addEventListener('change', (event) => {
        var file = event.target.files[0];
        this.launch_viewer(file);
    });
  }
  
  id(arg) {
    return document.getElementById(arg);
  }
  
  allowDrop(ev) {
    ev.preventDefault();
    if(this.initial_drop) {
      this.label.innerHTML = "Drop OK";
      this.initial_drop = false;
    }
  }
  
  drag(ev) {
    ev.preventDefault();
    console.log("drag");
    
  }
  
  drop(ev) {
    ev.preventDefault();
    
    if (ev.dataTransfer.items) {
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          this.launch_viewer(file);
          break;
        }
      }
    }
  }
  
  launch_viewer(file) {
    this.pano.innerHTML = '';
    var path = (window.URL || window.webkitURL).createObjectURL(file);
    pannellum.viewer('panorama', {
        "type" : "equirectangular",
        "panorama" : path,
        "autoLoad" : true,
    });
    this.pano.title="Click square at upper left for full-screen, Esc to exit.";
    this.filestring.innerHTML = ':&nbsp;&nbsp;' + file.name;
  }
}

var viewer = null;

window.onload = function() {
  viewer = new Viewer();
};