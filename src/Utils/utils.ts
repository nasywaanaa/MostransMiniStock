

module.exports.paginateResults = ({
    after: cursor,
    pageSize = 20,
    results,
    // can pass in a function to calculate an item's cursor
    getCursor = () => null,
  }) => {
    if (pageSize < 1) return [];
    
    if (!cursor) return results.slice(0, pageSize);

    var cursorIndex = -1;
    results.find(function(results, i){
        if(results.KODEPROD === cursor){
            cursorIndex = i;
          return i;
        }
    });
    cursorIndex++;
    return cursorIndex >= 0
      ? cursorIndex === results.length - 1 // don't let us overflow
        ? []
        : results.slice(
            cursorIndex + 1,
            Math.min(results.length, cursorIndex + 1 + pageSize),
          )
      : results.slice(0, pageSize);
  
    results.slice(cursorIndex >= 0 ? cursorIndex + 1 : 0, cursorIndex >= 0);
  };

  module.exports.findDataByID = ({
    after : cursor,
    results
  })=>{
    var cursorIndex = -1;
    var filteredObject = results.find(function(results, i){
        if(results.KODEPROD === cursor){
            cursorIndex = i;
          return i;
        }
    });
    return filteredObject;
  };