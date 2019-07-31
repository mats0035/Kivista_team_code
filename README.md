# Prototype for Kivista DBV-Capstone Foundation View

## Basic infomation
This is a prototype for DBV-Capstone foundation view (http://www.kivista.com/dbv/Foundation/DesignTree?designId=29&ShowPO=False&ShowEO=True&ShowTask=False&ShowTargetMod=False&profileType=Designer&returnUrl=~%2FDesign%2FDetail%3Fid%3D29%26profileType%3DDesigner%26showedComment%3DFalse). By default, 20 EOs are displayed in the EO list, and 10 EOs are displayed in the foundation view.


## Features

### Drag and drop elements
Foundation view:
Drag and drop EOs to chanage the order of EOs. Able to create unlimited nested list. If shift key is pressed before dragging, the element will be duplicated on drop.

EO list:
Drag and drop EOs to add the element to the foundation view. Can't have a nested list.

Drag and drop function is created using NestedSortable.js. For more information about NestedSortable, please see https://github.com/mjsarfatti/nestedSortable.

### Search
filterNames function will be triggered when the search bar is clicked. filterNames checks EO titles and hides the elements that don't contain the searched word.

### EO counter
updateEoCounter function counts the number of EOs in the foundation view by guids, and updates the counters in the EO list. If the counter is more than 0 (the EO exists in the foundation view), the EO in the EO list will be grayed out.

### Sort EOs
Sort elements in the EO list by course name, course code and counter in the EO list.
Sort by course name: Sort elements in alphabetical order of the EO titles (i.e. "PM Methods")
Sort by course code: Sorts elements by couse codes and EO titles (i.e. "GSI4212 - PM Mothodes"). This is to sort the EOs with a same course code in alphabetical order.
Sort by counter: Sort elements by the number of EOs in the foundation view. To differentiate the EOs with a same number, this option combines the counter with the course code and course name before sorting. (i.e. "GIS4212 - PM Methods 0" -> "0GIS4212 - PM Methods")

### Highlight EOs
Star icons of the same EOs will be highlighted when a star is cliced. Tick marks which indicate the position of the highlighted EOs will be displayed on the scrollbar. The highlight color is chosed from colors array. Scrollbar function is created using a plugin mark.js. The plugin adds a mark tag under the span tag with itemTitle class of the clicked element, and a style tag in the bottom of the list holds the position of the mark tags. This style tag displays tick marks on the scrollbar.

Note: Scrollbar is displayed when the lsit is longer the height of 40em.
For more information about mark.js, please see https://markjs.io/. 

### Events on icons
Minus/plus icons: Show/hide child elements in the nested list.
Down/up arrow icons: Show/hide the detail information of EOs.
Dot icons: Show/hide copy and delete options. Copy option makes a copy of the EO including the child elements, and add the copy under the clicked EO. Delete option deletes the EO including the child elements.

