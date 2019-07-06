$().ready(function () {
  // Library view: drag & drop function
  $('#library-view ol.sortable').on('click', function(event) {
    // If the shift key is pressed => duplicate the element on drop
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
    // If the shift key is not pressed => just move the element
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
        // Return the copied li with 'add' class
        return li.addClass('add').clone()
    },
    items: 'li',
    opacity: 0.6,
    placeholder: 'placeholder',
    revert: 250,
    tabSize: 25,
    tolerance: 'pointer',
    toleranceElement: '> div',
    maxLevels: 1,   // Disable nested list
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
      $('#competency-view').find('.add').remove()
      // Remove the flag('add' class) in the library view
      $('#library-view').find('.add').removeClass('add')
    }
  })

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

  // Highlight the element when the star icon is clicked
  $('.highlight').click(function () {
    // Get the second class name of the parent li
    var highlightClass = $(this).parent().parent().attr('class').split(' ')[1]
    var highlightItem = '.' + highlightClass + ' > .menuDiv .glyphicon-star'
    $(highlightItem).toggleClass('highlight-show')
  })
})

// Function to search through list and hide the items that don't have the characters that were inputted
function filterNames(view) {
  itemView = document.getElementById(view)
  // Get value of input
  let filterValue = itemView.getElementsByClassName('filterInput')[0].value.toUpperCase()
  // Get all EO elements
  itemTitle = itemView.getElementsByClassName('itemTitle')

  // Loop through the EO elements
  for (let i = 0; i < itemTitle.length; i++) {
    // Get the EO title
    const title = itemTitle[i].textContent.toUpperCase()
    // If the EO title matched with the value of input, do nothing
    if (title.indexOf(filterValue) > -1) {
      itemTitle[i].parentNode.style.display = ''
    // If the EO title didn't match with the value of input, hide the parent div
    } else {
      itemTitle[i].parentNode.style.display = 'none' 
    }
  }
}
