// 5 colors;
// one by one;
// maxium 5 items highlight
// disable hightlight double click

$().ready(function () {
  // Library view: drag & drop function
  $('#library-view ol.sortable').on('click', function (event) {
    // If shift key is pressed => duplicate the element on drop
    if (event.shiftKey) {
      $(this).nestedSortable({
        forcePlaceholderSize: true,
        handle: 'div',
        // Duplicate the element with events
        helper: function (e, li) {
          this.copyHelper = li.clone(true).insertAfter(li)
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
        rootID: 'root'
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
    helper: function (e, li) {
      this.copyHelper = li.clone(true).insertAfter(li)
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
    // Run functions when drag & drop is finished
    stop: function (e, li) {
      // Delete the duplicated li in the competency view
      $('#competency-view').find('.copy').remove()
      // Remove the flag('copy' class) in the library view
      $('#library-view').find('.copy').removeClass('copy')
    }
  })

  // Trigger dtag & drop functions
  $('#library-view ol.sortable').click()

  // Set events on the buttons
  $('.expandEditor').attr('title', 'Click to show/hide item editor')
  $('.disclose').attr('title', 'Click to show/hide children')
  $('.delete-menu').attr('title', 'Click to delete item.')

  // SHow/hide child elements
  $('.disclose').on('click', function () {
    $(this).closest('li').toggleClass('mjs-nestedSortable-collapsed').toggleClass('mjs-nestedSortable-expanded')
    $(this).toggleClass('glyphicon-plus').toggleClass('glyphicon-minus')
  })

  // Library view: Show/hide description
  $('#library-view .expandEditor, #library-view .itemTitle').click(function () {
    $(this).parent().find('.menuEdit').toggleClass('hidden').toggleClass('show')
    $(this).parent().find('.expandEditor').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up')
  })

  // Competency view: Show/hide description
  $('#competency-view .expandEditor, #competency-view .itemTitle').click(function () {
    $(this).parent().find('.menuEdit').toggleClass('hidden').toggleClass('show')
    $(this).parent().find('.expandEditor').toggleClass('glyphicon-chevron-down').toggleClass('glyphicon-chevron-up')
  })

  // Delete list
  $('.delete-menu').click(function () {
    $(this).parent().parent().remove()
  })

  // $('.highlight').click(function () {
  //   // create color array
  //   var colors = ['#f7e30c', '#ff0000', '#00ff00', '#0000ff']
  //   // random color array
  //   var randColor = colors[Math.floor(Math.random() * colors.length)]
  //   // Get the second class name of the parent li
  //   var highlightClass = $(this).parent().parent().attr('class').split(' ')[0]
  //   var highlightItem = '.' + highlightClass + ' > .menuDiv .glyphicon-star'
  //   // add random color class
  //   $(highlightItem).css('color', randColor)
  // })

  $(document).ready(function () {
    var colors = ['#f7e30c', '#ff0000', '#00ff00', '#0000ff']
    var index = 0
    clicked = true

    $('.highlight').click(function () {
      var highlightClass = $(this).parent().parent().attr('class').split(' ')[0]
      var highlightItem = '.' + highlightClass + ' > .menuDiv .glyphicon-star'
      if (index >= colors.length) { index = 0 } // reset back to first color
      if (clicked) {
        $(highlightItem).css('color', colors[index])
        index++
        clicked = false
      } else {
        $(highlightItem).css('color', 'black')
        clicked = true
      }
    })
  })

  // Sort EOs by course name/course code
  $('#sort-menu').change(function () {
    let sortFlg // 'name' or 'code'
    let sortTitle = [] // EO titles to sort
    const currentTitle = [] // Current EO titles (i.e. GIS4212 - PM Methods)
    const sortedElement = []
    const sortView = document.getElementById('competency-view')
    const currentOl = sortView.getElementsByClassName('ol-level') // 'ol' elements
    const currentLis = sortView.getElementsByClassName('list-item') // 'li' elements
    const sortTarget = sortView.getElementsByClassName('itemTitle') // 'span' elements with 'itemTitle' class

    // Function to sort elements of sortTitle array
    function sortItems (sortFlg) {
      sortTitle.sort(function (a, b) {
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

    // Get a value of sort menu: course code/course name
    let value = $(this).val()
    if (value === 'Course code') {
      sortFlg = 'code'
    } else if (value === 'Course name') {
      sortFlg = 'name'
    }

    // Set array to sort
    for (let i = 0; i < sortTarget.length; i++) {
      // If sort by course name
      if (sortFlg === 'name') {
        // Divide the EO into a code and title
        let tmp = sortTarget[i].textContent.split('- ')
        // If EO doesn't have a code
        if (typeof (tmp[1]) === 'undefined') {
          currentTitle.push(tmp[0])
        } else {
          currentTitle.push(tmp[1])
        }
      // If sort by course code
      } else {
        currentTitle.push(sortTarget[i].textContent)
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
})

<<<<<<< HEAD
const movies = [
  {
    courseName: "Team Word",
    courseCode: GIS4111
  },
=======
// Function to search through list and hide the items that don't have the characters that were inputted
function filterNames (view) {
  const filterView = document.getElementById(view)
  // Get value of input
  const filterValue = filterView.getElementsByClassName('filterInput')[0].value.toUpperCase()
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
>>>>>>> master
