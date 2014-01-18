(function() {
  $(function () {
    if ($.cookie("bda-search")) {
      $("#searchterm").val($.cookie("bda-search"))
    }

    $("#searchform").on('submit', function (ev) {
      var search_term, search_items

      ev.preventDefault()

      // display searching spinner
      $('.searching_sites').show()

      search_term = $("#searchterm").val()

      search_items = [
        {
          id: 'emoo',
          site_name: 'Emoo',
          site_link: 'http://www.emoo.bm',
          search_url: '/classifieds.aspx?moo&catId=1&q=' + search_term + '&idcatsearch=1&idr=40&lang=en&rows=50',
          selector: '.listing-box .li-classified'
        },
        {
          id: 'sun',
          site_name: 'Sun Shopper',
          site_link: 'http://www.sunshopper.bm',
          search_url: '/for-sale/search?keywords=' + search_term,
          selector: 'table.list-grid .list-item td.col-three'
        },
        {
          id: 'bermy',
          site_name: 'Bermy Link',
          site_link: 'http://www.bermylink.com',
          search_url: '/default.aspx?Keyphrase=' + search_term,
          selector: '.Listing table tbody tr td[width="100%"]'
        }
      ]

      async.concat(search_items, function (search_item, callback) {
        var search_item_id = search_item.id,
          ajax_url = search_item.site_link + search_item.search_url,
          site_url = search_item.site_link

        $.ajax({
          url: ajax_url,
          type: 'GET',
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown)
          },
          success: function (res) {
            var body = res.responseText,
              search_results = []

            $(body).find(search_item.selector).each(function (idx, el) {
              var item = {}
              switch (search_item_id) {
                case 'emoo':
                  item = {
                    site:  search_item_id,
                    link:  site_url + $(el).find('a').attr('href'),
                    title: $(el).find('p').html(),
                    desc:  ''
                  }
                  break;
                case 'sun':
                  item = {
                    site:  search_item_id,
                    link:  site_url + $(el).find('a').attr('href'),
                    title: $(el).find('a').text(),
                    desc:  $(el).find('p').html()
                  }
                  break;
                case 'bermy':
                  item = {
                    site:  search_item_id,
                    link:  site_url + $($(el).find('p')[0]).find('a').attr('href'),
                    title: $($(el).find('p')[0]).find('a').text(),
                    desc:  $($(el).find('p')[1]).text()
                  }
                  break;
              }
              search_results.push(item)
            })

            callback(null, search_results)
          }
        })

      }, function (err, final_search_results) {
        $.each(final_search_results, function (idx, item) {
          $('#results_table tbody').append('<tr><td>' + item.site + '</td><td><a href="' + item.link + '" target="_blank">' + item.title + '</a></td><td>' + item.desc + '</td></tr>')
        })

        $('#results_table').dataTable({
          'bFilter': false
        })

        // hide searching spinner
        $('.searching_sites').hide()

        // display results
        $('#results_table').show()
      })
    })
  })

}).call(this)