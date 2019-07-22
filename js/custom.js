/**
* Function to search through list and hide the items that don't have the characters that were inputted 
*/
function filterNames(view) {
  const filterView = document.getElementById(view)
  // Get value of input
  const filterValue = filterView
    .getElementsByClassName('filterInput')[0]
    .value.toUpperCase()
  // Get all EO elements
  filterTitle = filterView.getElementsByClassName('itemTitle')

  // Loop through the EO elements
  for (let i = 0; i < filterTitle.length; i++) {
    // Get the EO title
    const title = filterTitle[i].textContent.toUpperCase()
    // If the EO title matched with the value of input, do nothing
    if (title.indexOf(filterValue) > -1) {
      filterTitle[i].parentNode.style.display = ''
      // If the EO title didn't match with the value of input, hide the parent div
    } else {
      filterTitle[i].parentNode.style.display = 'none'
    }
  }
}
$().ready(function() {
  /**
  * Make EO list on the right side
  * -Set HTML of EOs
  * -Insert the HTML codes inside the 'ol' on the right side
  */
  // Initialize the competency view
  const titleArray = ["GIS4207 - Create Dynamic Web Pages", "GIS4204 - Electromagnetic Spectrum", "GIS4110 - Extracting and Combining Features", "GIS4111 - Feature Generalization", "GIS4111 - Geographic Reference Systems", "GIS4112 - Historic Cartography", "GIS4110 - Human Geography", "GIS4112 - Information Graphic Principles", "GIS4204 - Knowledge of Physics and Sensors", "Map Design Principles", "GIS4110 - Physical Geography", "GIS4111 - Projection Transformation", "GIS4107 - Simple Programs", "GIS4111 - Static Web Pages with Design", "GIS4111, GIS4113 - Strategic Purpose", "GIS4112 - Summary Statistics (non-spatial)", "GIS4111 - Tech Writing", "GIS4112 - Various Map Types", "Visual Variables", "Web Mapping Applications HTML/CSS/JS API", "* Leading Projects"]
  const statementArray = ["Create dynamic web pages. Create web pages that display content from a database", "Describe the Electromagnetic Spectrum", "Perform Extracting and Combining Features", "Feature Generalization", "Describe and apply various horizontal and vertical geographic reference systems", "Outline the evolution of cartography through history", "Awareness of Human Geography Methods", "Organize information for maximum clarity and effectiveness using graphic principles", "Demonstrate theoretical knowledge of physics, sensors and imagery", "Describe and effectively apply Map Design principles in the creation of thematic map products", "Awareness of Physical Geography Methods", "Describe and apply coordinate conversion and projection transformation methods", "Create simple programs using structured programming concepts and techniques", "Create Static Web Pages with HTML/CSS Design", "Determine The Strategic Purpose", "Summarize non-spatial data using appropriate statistical techniques", "Experience with technical writing for documentation of processes, training", "Describe and understand the uses of various map types", "Describe and apply visual variables appropriately with data measurement scales and spatial data types", "Create Web Mapping Applications using HTML/CSS and JavaScript, and the ESRI JS API","Experience with participating in, and leading, projects"]
  const htmlArray = []
  for (let i = 0; i < titleArray.length; i++) {
    let guidNum = i + 1
    let guidHtml = 'guid_' + guidNum
    htmlArray.push(`</div>
    <li style="display: list-item;" class="${guidHtml} competency list-item mjs-nestedSortable-leaf">
      <div class="menuDiv">
        <span title="Click to show/hide children" class="disclose glyphicon glyphicon-minus"></span>
        <span class="glyphicon glyphicon-share-alt"></span>
        <span class="itemTitle">${titleArray[i]}</span>
        <span title="Click for options." class="dot-menu glyphicon glyphicon-option-vertical"><span class="counter">0</span></span>
        <span title="Click to highlight item." class="highlight glyphicon glyphicon-star"></span>
        <div class="dot-popup hide">
          <div class="delete-menu">Delete<span title="Click to delete item." class="glyphicon glyphicon-remove"></span>
          </div>
          <button class="cancel">Cancel</button>
        </div>
        <span title="Click to show/hide item editor" class="expandEditor glyphicon glyphicon-chevron-down"></span>

        <div class="menuEdit hidden">
          <p>${statementArray[i]}</p>

          <!-- Performance Standard/Statement information for EO -->
          <div class="performance">
            <div>
              <p><b>Performance Statement</b></p>
              <p>${statementArray[i]}</p>
            </div>
          </div>

          <!-- Learning Objectives table for EO -->
          <div class="learning-objectives">
            <p><b>Learning Objective</b></p>
            <table>
              <tr>
                <th>Serial</th>
                <th>Learning Objective</th>
                <th>Teaching Topics</th>
                <th colspan="3">Method Timing</th>
                <th>References/Remarks</th>
                <th>Supported Tasks</th>
              </tr>
              <tr>
                <td colspan="3"></td>
                <th>L</th>
                <th>D</th>
                <th>P</th>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="3"></td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <th>0</th>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </li>`)
  }

  //Add HTML in the competency view
  const sortView = document.getElementById('competency-view')
  const parent = sortView.getElementsByClassName('competencies') // 'ol' elements
  parent[0].innerHTML = htmlArray.join('')

  /** 
  * Function to update the EO counter
  */
  function updateEoCounter (action, guids) {
    for (let i=0; i < guids.length;i++) {
      let guidInCompetency = '#competency-view .' + guids[i]
      let guidInTree = '#library-view .' + guids[i]
      let countIndex = guids[i].replace(/guid_/g, '') - 1

      // If dragged from the right side
      if (action === 'drag') {
        eoNum = $(guidInTree).length
      // If deleted in the tree
      } else if (action === 'delete') {
        eoNum = countEOs[countIndex].num - 1
      }
      countEOs[countIndex].num = eoNum

      // Update the number of EO
      let counter = guidInCompetency + ' .counter'
      $(counter).html(`${countEOs[countIndex].num}`)
      // Gray out the EO
      if (eoNum > 0) {
        $(guidInCompetency).css('background-color', '#eee')
      } else {
        $(guidInCompetency).css('background-color', '#fff')
      }
    }
  }

  // Create an array of guid
  const countEOs = []
  const guids = []
  for (let i = 1; i <= titleArray.length; i++) {
    let guid = 'guid_' + i
    countEOs.push({guid: guid, num: 0})
  }

  // Initialize the EO counter: Count up the default EOs in the tree
  const defaultGuid = []
  defaultGuid.push($('#library-view').find('.list-item').attr('class').split(" ")[0])
  updateEoCounter('drag', defaultGuid)

  /**
  * Add onclick event of drag and drop function
  * -Left side: Drag & drop EOs to chanage the order of EOs in the list. Allows making unlimited nest in the list.
  * -Right side: Drag & drop EOs to chanage the order of EOs in the list. Duplicate an EO on drag & drop to the left side. 
  * Note: Drag & Drop function uses NestedSortable.js  
  */
  // Library view: drag & drop function 
  $('#library-view ol.sortable').on('click', function(event) {
    // If shift key is pressed => duplicate the element on drop
    if (event.shiftKey) {
      $(this).nestedSortable({
        forcePlaceholderSize: true,
        handle: 'div',
        // Duplicate the element with events
        helper: function(e, li) {
          this.copyHelper = li.clone(true).insertAfter(li)
          // Get guid
          guids[0] = $(li).attr('class').split(" ")[0]
          $(this).data('copied', false)
          return li.clone()
        },
        items: 'li',
        opacity: 0.6,
        placeholder: 'placeholder',
        revert: 250,
        tabSize: 25,
        tolerance: 'pointer',
        toleranceElement: '> div',
        maxLevels: 0, // 0:Allow unlimited nested list
        isTree: true,
        expandOnHover: 700,
        startCollapsed: false,
        excludeRoot: true,
        rootID: 'root',
        // Run functions when drag & drop is finished
        stop: function(e, li) {
          // Update the number of the dragged EO
          updateEoCounter('drag', guids)
        }
      })
    // If shift key is not pressed => just move the element
    } else {
      $(this).nestedSortable({
        forcePlaceholderSize: true,
        handle: 'div',
        helper: 'clone',
        items: 'li',
        opacity: 0.6,
        placeholder: 'placeholder',
        revert: 250,
        tabSize: 25,
        tolerance: 'pointer',
        toleranceElement: '> div',
        maxLevels: 0, // 0:Allow unlimited nested list
        isTree: true,
        expandOnHover: 700,
        startCollapsed: false,
        excludeRoot: true,
        rootID: 'root'
      })
    }
  })

  // Competency view: drag & drop function
  $('#competency-view ol.sortable').nestedSortable({
    forcePlaceholderSize: true,
    handle: 'div',
    // Duplicate the element with events
    helper: function(e, li) {
      this.copyHelper = li.clone(true).insertAfter(li)
      guids[0] = $(li).attr('class').split(" ")[0]
      $(this).data('copied', false)
      // Return the copied li with a flag ('copy' class)
      return li.addClass('copy').clone()
    },
    items: 'li',
    opacity: 0.6,
    placeholder: 'placeholder',
    revert: 250,
    tabSize: 25,
    tolerance: 'pointer',
    toleranceElement: '> div',
    maxLevels: 1, // Disable nested list
    isTree: true,
    expandOnHover: 700,
    startCollapsed: false,
    excludeRoot: true,
    rootID: 'root',
    // Enable drag & drop between the columns
    connectWith: '#library-view ol.sortable',
    // Run a function when drag & drop is finished
    stop: function(e, li) {
      // Delete the duplicated li in the competency view
      $('#competency-view').find('.copy').remove()
      // Remove the flag('copy' class) in the library view
      $('#library-view').find('.copy').removeClass('copy')
      // Update the number of the dragged EO
      updateEoCounter('drag', guids)
    }
  })

  // Trigger drag & drop functions
  $('#library-view ol.sortable').click()

  /**
  * Add events on icons
  * -Show/hide child elements: minus icon
  * -Show/hide description: down arrow icon
  * -Show options: delete, copy: three dot icon 
  */
  // SHow/hide child elements
  $('.disclose').on('click', function() {
    $(this).closest('li').toggleClass('mjs-nestedSortable-collapsed').toggleClass('mjs-nestedSortable-expanded')
    $(this).toggleClass('glyphicon-plus').toggleClass('glyphicon-minus')
  })

  // Library view: Show/hide description
  $('#library-view .expandEditor, #library-view .itemTitle').click(function() {
    $(this).parent().find('.menuEdit').toggleClass('hidden').toggleClass('show')
    $(this).parent().find('.expandEditor').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up')
  })

  // Competency view: Show/hide description
  $('#competency-view .expandEditor, #competency-view .itemTitle').click(
    function() {
      $(this).parent().find('.menuEdit').toggleClass('hidden').toggleClass('show')
      $(this).parent().find('.expandEditor').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up')
    }
  )

  // Show/hide options
  $('.dot-menu').click(function() {
    $(this).parent().find('.dot-popup').removeClass('hide')
    $(this).parent().find('.dot-popup').addClass('show-popup')
  })

  // Delete EO
  $('.delete-menu').click(function() {
    // Get guid
    const guids = []
    guids.push($(this).parent().parent().parent().attr('class').split(" ")[0])
    // Get guids of all child elements
    let guidChildLis = $(this).parent().parent().parent().find('.list-item').toArray()
    for (let i = 0;i < guidChildLis.length;i++) {
    guids.push($(guidChildLis[i]).attr('class').split(" ")[0])
    }

    // Update the number of EOs
    updateEoCounter('delete', guids)

    // Delete the EO element
    $(this).parent().parent().parent().remove()
  })

  // Cancel button
  $('.cancel').click(function() {
    $(this).parent().removeClass('show-popup')
    $(this).parent().addClass('hide')
  })

  /**
  * Sort function on the right side
  * -Sort by course name
  * -Sort by course code
  * -Sort by the number of EOs on the left side
  */
  // Show/hide options
  $('#competency-view #sort-menu').click(function() {
    $('#sort-options').toggleClass('hide').toggleClass('show-popup')
  })
  // When Course name/Course code/Counter is clicked
  $('.sort-option').click(function() {
    let sortFlg // name/code/counter
    let sortTitle = [] // EO titles to sort
    const currentTitle = [] // Current EO titles (i.e. GIS4212 - PM Methods)
    const sortedElement = []  // Li elements after sort
    const sortView = document.getElementById('competency-view')
    const currentOl = sortView.getElementsByClassName('ol-level') // 'ol' elements
    const currentLis = sortView.getElementsByClassName('list-item') // 'li' elements
    const sortTarget = sortView.getElementsByClassName('itemTitle') // 'span' elements with 'itemTitle' class
    const sortCounter = sortView.getElementsByClassName('counter')  // number of the EO in the tree

    // Function to sort elements of sortTitle array
    function sortItems(sortFlg) {
      sortTitle.sort(function(a, b) {
        // If sort targets are course names
        if (sortFlg === 'name') {
          a = a.toString().toLowerCase()
          b = b.toString().toLowerCase()
        }
        // Sort elements of sortTitle array
        if (a < b) {
          return -1
        } else if (a > b) {
          return 1
        }
        return 0
      })
    }

    // Get a value of sort menu
    let value = $(this).attr('value')
    if (value === 'Course code') {
      sortFlg = 'code'
    } else if (value === 'Course name') {
      sortFlg = 'name'
    } else if (value === 'Counter') {
      sortFlg = 'counter'
    }

    // Set an array to sort
    for (let i = 0; i < sortTarget.length; i++) {
      // If sort by course name
      if (sortFlg === 'name') {
        // Divide the EO into a code and title
        let tmp = sortTarget[i].textContent.split('- ')
        // If EO doesn't have a code
        if (typeof tmp[1] === 'undefined') {
          currentTitle.push(tmp[0])
        } else {
          currentTitle.push(tmp[1])
        }
      // If sort by course code
      } else if (sortFlg === 'code') {
        currentTitle.push(sortTarget[i].textContent)
      // If sort by course counter
      } else if (sortFlg === 'counter') {
        // Combine the counter with EO title including code to differentiate each EO
        // (i.e. "GIS4212 - PM Methods 0" -> "0GIS4212 - PM Methods")
        currentTitle.push(sortCounter[i].textContent + sortTarget[i].textContent)
      }
    }

    // Duplicate currentTitle array
    sortTitle = currentTitle.slice()

    // Sort EOs in sortTitle array
    sortItems(sortFlg)

    // Set Lis in the order of sortTitle array
    for (let j = 0; j < currentLis.length; j++) {
      // Check if the current EO title matches with the new order
      for (let k = 0; k < sortTitle.length; k++) {
        // If matched, add the element in sortedElement array and break from loop
        if (currentTitle[j] === sortTitle[k]) {
          sortedElement[k] = currentLis[j]
          break
        }
      }
    }

    // Replace the existing elements by sorted elements
    for (let l = 0; l < sortedElement.length; l++) {
      currentOl[0].appendChild(currentOl[0].removeChild(sortedElement[l]))
    }
  })

  /**
  * Highlight star icons and scrollbar
  * Note: scrollbar function uses mark.js
  */
  const colors = ['#f9bc00', '#e81515', '#38bb56', '#1f22cc', '#d000ff']
  let colorIndex = 0
  let clicked = []
  const view = document.getElementById('competency-view')
  const lis = view.getElementsByClassName('list-item')
  const container = view.querySelector('.ol-level')
  const containerY = container.offsetTop      // Distance from 'ol'
  const containerH = container.scrollHeight   // Hight of 'ol'
  const customStyle = document.createElement('style', {class: 'scroll-style'});
  const styleClass = 'scroll-style'

  // Add a scrollbar on the competency view
  container.appendChild(customStyle);

  // Create array of guids
  for (let i = 0; i < lis.length; i++) {
    let guid = lis[i].getAttribute('class').split(' ')[0] // All guids
    clicked.push({guid: guid, clicked: false})
  }

  // When a star icon is clicked
  $('.highlight').click(function() {
    // Get the clicked star icon
    const highlightClass = $(this).parent().parent().attr('class').split(' ')[0]
    const highlightItem = '.' + highlightClass + ' > .menuDiv .glyphicon-star'
    // Get the number of guid (i.e. guid_3 -> 3)
    const guidIndex = highlightClass.replace(/guid_/g, '') - 1
    // Get EO title
    const highlightTitle = '#competency-view .' + highlightClass + ' .itemTitle'
    const highlightText = $(highlightTitle).text()  // EO title including the code

    // Reset the index of colour array if it reached the max number
    if (colorIndex >= colors.length) {
      colorIndex = 0
    }
    // Set ticks on the scrollbar
    let renderScrollMarker = ($parent, posArr) => {
      let _posArr = posArr.map(i => {
        // Return percentage of transparent/highlight colours on the scrollbar
        return `transparent ${i}, currentColor ${i}, currentColor calc(${i} + 4px), transparent calc(${i} + 4px)`;
      })
      // Add ticks on the scrollbar
      customStyle.setAttribute('class', styleClass)
      customStyle.innerHTML = `ol::-webkit-scrollbar-track {
        background: linear-gradient(${_posArr.join()});
      }`
    }

    // Calculate the position of a tick
    let calcEleRelativePos = $ele => {
      return ($ele.offsetTop - containerY) / containerH
    }

    // Set options for mark function
    let markOpt = {
      className: 'mark',          // Add a class name
      separateWordSearch: false,  // Treat words sparated by space as one word
      done: function () {         // Callback function called after all marks are done
        let marks = document.querySelectorAll(`.mark`);
        // Create a new array with the result of a function on every element in the calling array
        let allY = [].map.call(marks, (mark) => {
          // Get the position of the tick with two decimals
          return (calcEleRelativePos(mark) * 100).toFixed(2) + '%'
        })
        // Add a tick on the scrollbar
        renderScrollMarker(container, allY);
      }
    }
    let instance = new Mark(container);

    // If the clicked star is already highlighted
    if (clicked[guidIndex].clicked) {
      // Disable the highlight of the star
      $(highlightItem).css('color', 'black')
      clicked[guidIndex] = {guid: highlightClass, clicked: false}
      // Remove all ticks from the scrollbar
      instance.unmark(markOpt)
     // Remark the rest of the highlighted elements
      for (let i = 0; i < clicked.length; i++) {
        if (clicked[i].clicked) {
          // Get EO title
          let highlightTitle = '#competency-view .' + clicked[i].guid + ' .itemTitle'
          let highlightText = $(highlightTitle).text()
          // Add a tick next to the highlighted EO
          instance.mark(highlightText, markOpt);
        }
      }
    // If the clicked star is not highlighted
    } else {
      // Add highlight to the star
      $(highlightItem).css('color', colors[colorIndex])
      // Add a tick next to the clicked EO
      instance.mark(highlightText, markOpt);
      colorIndex++
      clicked[guidIndex] = {guid: highlightClass, clicked: true}
    }
  })
})

