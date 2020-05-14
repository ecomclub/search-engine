import query from './../lib/dsl'

export default (self, enumOrder) => {
  // get default sort array
  const sort = query.sort.slice()

  // defines most common sorting options
  switch (enumOrder) {
    case 'sales':
      // sort by sales after relevance
      sort.splice(2, 0, {
        sales: {
          order: 'desc'
        }
      })
      break

    case 'news':
      // sort by creation date after relevance
      sort.splice(2, 0, {
        created_at: {
          order: 'asc'
        }
      })
      break

    case 'lowest_price':
      // sort by price
      // lowest price -> highest price
      sort.splice(1, 0, {
        price: {
          order: 'asc'
        }
      })
      break

    case 'highest_price':
      // sort by price
      // highest price -> lowest price
      sort.splice(1, 0, {
        price: {
          order: 'desc'
        }
      })
      break

    default:
      // default sort by views after preseted sorting options
      sort.push({
        views: {
          order: 'desc'
        }
      })
  }

  // set instance query sort
  self.dsl.sort = sort
  return self
}

/**
 * @method
 * @name EcomSearch#setSortOrder
 * @description Defines most common sorting options and set
 * on instance query for next search request.
 *
 * @param {('sales'|'news'|'lowest_price'|'highest_price'|'views')} [enumOrder='views'] - Sort option
 * @returns {self}
 *
 * @example

// Set sort by top selling products and run search request
search.setSortOrder('sales').fetch()

* @example

// Sort next search result starting by most popular products
// It's the default preseted sort order (views)
search.setSortOrder()

 */
