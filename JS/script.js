$(document).ready(function () {
  $('#search-btn').click(function () {
    performSearch();
  });

  $('#search').on('keyup', function (e) {
    if (e.keyCode === 13) { // Check if Enter key is pressed (key code 13)
      performSearch();
    }
  });

  $('#clear-search').hide(); // Hide the clear icon initially

  $('#search').on('input', function () {
    if ($(this).val().trim() !== '') {
      $('#clear-search').show(); // Show the clear icon if input is not empty
    } else {
      $('#clear-search').hide(); // Hide the clear icon if input is empty
    }
  });

  $('#clear-search').click(function () {
    $('#search').val(''); // Clear the input field
    $('#clear-search').hide(); // Hide the clear icon
    performSearch(); // Perform search (if needed)
  });

  $('#category-filter').on('change', function () {
    performSearch();
  });

  function performSearch() {
    var $search = $("#search");
    var $categoryFilter = $("#category-filter");
    var selectedCategory = $categoryFilter.val().trim().toLowerCase();
    var searchInput = $search.val().trim().toLowerCase();

    var unmatchedKeyword = null; // Initialize the unmatched keyword as null

    $('.box').hide().filter(function () {
      var name = $(this).find('.name').text().toLowerCase();
      if ((selectedCategory === 'all' || $(this).hasClass(selectedCategory)) &&
        name.includes(searchInput)) {
        return true; // Match found, show the box
      } else {
        // No match found, save the unmatched keyword and hide the box
        unmatchedKeyword = searchInput;
        return false;
      }
    }).fadeIn(450);

    if ($('.box:visible').length === 0) {
      // No results found, display the unmatched keyword
      $('#no-results').show();
      $('#no-results').text('No 3D-Models exist with this keyword: ' + unmatchedKeyword);
    } else {
      $('#no-results').hide();
    }
  };

});
