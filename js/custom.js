$().ready(function () {
  // Library view: drag & drop function
  $('#library-view ol.sortable').nestedSortable({
    forcePlaceholderSize: true,
    handle: 'div',
    // helper: 'clone',
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
    maxLevels: 0, // 0:unlimited
    isTree: true,
    expandOnHover: 700,
    startCollapsed: false,
    excludeRoot: true,
    rootID: 'root'
  })

  // Competency view: drag & drop function
  $('#competency-view ol.sortable').nestedSortable({
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
    maxLevels: 1,
    isTree: true,
    expandOnHover: 700,
    startCollapsed: false,
    excludeRoot: true,
    rootID: 'root',
    // axis: 'x',
    // containment: 'parent',
    connectWith: '#library-view ol.sortable'  // Enable drag & drop between the columns
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
